/**
 * Bom controller
 */
Ext.define('Prod.controller.bom.Bom', {

	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.Bom', 
		'Prod.store.Bom', 
		'Prod.view.bom.Bom',
		'Prod.view.bom.BomUpdatePopup',
		'Prod.view.bom.BomAddPopup'
	],

	models : ['Prod.model.Bom'],

	stores: ['Prod.store.Bom'],

	refs: [ 
		{ ref : 'Bom', selector : 'prod_bom' },
		{ ref : 'BomList', selector : 'prod_bom_list' },
		{ ref : 'BomUpdatePopup', selector : 'prod_bom_update_popup' },
		{ ref : 'BomAddPopup', selector : 'prod_bom_add_popup' }
	],

	init: function() {
		this.callParent(arguments);

		this.control({
			'prod_bom' : {
				paramschange : this.onParamsChange,
				click_import : this.onImport,
				after_import : this.onImportSuccess
			},
			'prod_bom_list' : {
				after_grid_updated : this.afterGridUpdated,
				beforeitemexpand : this.beforeitemexpand,
				checkchange : this.checkchange,
				treeNodeAdd : this.goAdd,
				treeNodeUpdate : this.goUpdate,
				treeNodeRemove : this.onDelete
			},
			'prod_bom_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_bom_update_popup' : {
				paramschange : this.onParamsChangeOnlyBom,
				click_close : this.onPopupClose,
				click_update : this.onPopupUpdate
			},
			'prod_bom_add_popup' : {
				paramschange : this.onParamsChangeOnlyBom,
				click_close : this.onPopupClose,
				click_save : this.onPopupSave
			},
			'prod_bom_add_popup grid' : {
				after_grid_updated : this.afterPopupGridUpdated
			},
			'prod_bom_add_popup #btn_add' : {
				click : this.onGridAdd
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	/**
	 * after import success
	 */
	onImportSuccess : function(response) {
		this.onSearchClick();
	},

	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	
	onParamsChange:function(view, params) {
		var productId = params ? params['name-like'] : '';
		var bomList = this.getBomList();
		var prodStore = bomList.prodStore;
		prodStore.getProxy().extraParams = { '_q[prod_type-noteq]' : 'RM', '_q[name-like]' : productId };
		prodStore.load();
	},
	
	beforeitemexpand:function(node) {
		if(node.data.name == 'root') {
			return;
		}
		
		var self = this;
		if(!node.data.init) {
			Ext.Ajax.request({
				url : '/domains/' + login.current_domain_id + '/products/' + node.data.id + '/child_products.json',
				method : 'GET',
				success: function(response) {
					var removeNodeArr = [];
					for(var i = 0; i < node.childNodes.length; i++) {
						removeNodeArr.push(node.childNodes[i]);
					}
					for(var i = 0; i < removeNodeArr.length; i++) {
						node.removeChild(removeNodeArr[i])
					}
					var resultObj = Ext.JSON.decode(response.responseText);
					var bomList = self.getBomList();
					var treeItem = bomList.getTreeChildren(resultObj.items, node.data.checked, node.data.id);
					for(var i = 0; i < treeItem.length; i++) {
						node.appendChild(treeItem[i]);
					}
					node.data.init = true;
				}
			});	
		}
	},
	
	checkNode : new Ext.util.HashMap(),
	
	checkchange:function(node, checked){
		if(checked) {
			this.checkNode.add(node.data.id, node)
		} else {
			this.checkNode.removeAtKey(node.data.id)
		}
			
		var childDatas = node.childNodes;
		for(var i = 0; i < childDatas.length; i++) {
			childDatas[i].set('checked', checked);
			if(checked) {
				this.checkNode.add(childDatas[i].data.id, childDatas[i])
			} else {
				this.checkNode.removeAtKey(childDatas[i].data.id)
			}
		}
	},
	
	goAdd:function(record){
		// this.getBomList().getSelectionModel().select(record);
		var bomList = this.getBomList();
		var selection = bomList.getSelectionModel().getSelection()[0];
		// bomList.expandNode(selection);
		HF.popup('Prod.view.bom.BomAddPopup', selection.data, null);
	},
	
	goUpdate:function(record){
		this.getBomList().getSelectionModel().select(record);
		HF.popup('Prod.view.bom.BomUpdatePopup');
	},
	
	onPopupSave:function(btn){
		var self = this;
		var popup = this.getBomAddPopup();
		var popupGrid = popup.child('grid');
		var gridStore = popupGrid.getStore();
		var url = '/domains/' + login.current_domain_id + '/boms/update_multiple.json';
		this.saveGridData(popupGrid, url);
	},
	
	/**
	 * multiple update 성공 후 
	 */
	afterPopupGridUpdated : function(grid, updateType, response) {
		var popup = this.getBomAddPopup();
		var bomList = this.getBomList();
		var selection = bomList.getSelectionModel().getSelection()[0];
		if(selection.data.expanded) {
			bomList.collapseNode(selection);
			selection.data.init = false;
			bomList.expandNode(selection);
		}
		popup.close();
	},
	
	onPopupUpdate:function(btn){
		var popup = this.getBomUpdatePopup();
		var record = popup.getRecord();
		var bomList = this.getBomList();
		var chk = record.checked;
		record.set('checked', !chk);
		record.set('checked', chk);
		popup.close();
	},
	
	onDelete:function(btn) {
		var selection = this.getBomList().getSelectionModel().getSelection();
		if(this.checkNode.getCount()==0){
			HF.msg.alert(T('text.Nothing selected'));
			return;
		}
		var self = this;
		HF.msg.confirm({
			msg : T('text.Sure to Delete'),
			fn : function(confirmBtn) {
				if(confirmBtn == 'yes') {
					self.checkNode.each(function(key, value, length){
					    if(value.data.checked && !value.data.parentProduct){
					    	var parentNode = value.parentNode;
					    	if(selection[0]==parentNode){
					    		parentNode.removeChild(value);
						    	self.checkNode.removeAtKey(value.data.id);
						    	if(parentNode.childNodes.length==0){
						    		parentNode.appendChild({name:'', leaf:true});
						    		parentNode.collapse();
						    		parentNode.data.init = false;
						    		parentNode.set('checked', false);
						    	}
					    	}
					    }
					});
				}
			}
		});		
	},
	
	onGridAdd : function(btn) {
		var view = this.getBomAddPopup().child('grid');
		var gridStore = view.getStore();
		gridStore.add_row(this.getBomAddPopup().parentNode.data.id);
	},
	
	onPopupClose : function(view) {
		view.close();
	},
	
	onParamsChangeOnlyBom : function(view, params) {
		var selection = this.getBomList().getSelectionModel().getSelection();
		if(!selection[0].data.parentProduct) {
			var popup = this.getBomUpdatePopup();
			var self = this;
			popup.parentNode = selection[0].parentNode;
			popup.setRecord(selection[0]);
			view.down('#product').setValue(selection[0].parentNode.data.name);
		} else {
			var popup = this.getBomAddPopup();
			var gridStore = view.down('grid').getStore();
			popup.parentNode = selection[0];
			var prodInfo = selection[0].data.name;
			if(selection[0].data.description) {
				prodInfo += ' (' + selection[0].data.description + ')';
			}
			view.down('#product').setValue(prodInfo);
			gridStore.getProxy().url = '/domains/' + login.current_domain_id + '/products/' + view.getParams().id + '/child_products.json';
			gridStore.load();
		}
	},
	
	onPopupNew : function() {
		HF.popup(this.getDetailViewName(), {}, {});
	},

	/**
	 * detail view type(popup | view | none)을 리턴
	 */	
	getDetailViewType : function() {
		return 'popup';
	},

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getBom();
	}
});