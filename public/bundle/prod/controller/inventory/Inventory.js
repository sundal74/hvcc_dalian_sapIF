/**
 * Inventory controller
 */
Ext.define('Prod.controller.inventory.Inventory', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.Inventory', 
		'Prod.store.Inventory', 
		'Prod.view.inventory.Inventory',
		'Prod.view.inventory.InventoryTransferPopup'
	],
	
	models : ['Prod.model.Inventory'],
			
	stores: ['Prod.store.Inventory'],
	
	views : ['Prod.view.inventory.Inventory'],
	
	refs: [ 
		{ ref : 'Inventory', selector : 'prod_inventory' },
		{ ref : 'InventoryList', selector : 'prod_inventory_list' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_inventory' : {
				paramschange : this.onParamsChange
			},
			'prod_inventory_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail,
				click_transfer : this.onTransfer
			},
			'prod_inventory_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_inventory_transfer_popup' : {
				paramschange : this.onEditorPopupParamsChange,
				click_save : this.onClickSave
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	/**
	 * override
	 */
	getMultipleUpdateUrl : function(grid) {
		if(!this.multipleUpdateUrl)
			this.multipleUpdateUrl = '/domains/' + login.current_domain_id + '/inventories/update_multiple.json';

		return this.multipleUpdateUrl;
	},
	
	onTransfer : function(bun) {
		var selection = this.getInventoryList().getSelectionModel().getSelection();

		if(selection.length > 0) {
			HF.popup('Prod.view.inventory.InventoryTransferPopup', selection[0].data);
		} else {
			HF.msg.alert(T('text.Nothing selected'));
		}
	},
	
	onEditorPopupParamsChange : function(view, params) {
		view.down('#store').setValue(params.store.name);
		view.down('#product').setValue(params.product.name);
		view.down('#qty').setValue(params.qty);
		view.down('#tran_product').setValue(params.product.name);
	},
	
	onClickSave: function(popup, grid) {
		var formView = popup.child('form');
		var self = this;
		
		var formValues = formView.getForm().getValues();
		var params = popup.getParams();
		
		if(!formValues.tran_store_id || !formValues.modify_qty) {
			HF.msg.alert(T('text.Invalid data'));
		} else if(params.store.id == formValues.tran_store_id) {
			HF.msg.alert(T('text.Sure to be Different', {x : T('title.store')}));
		} else if (parseInt(params.qty) < parseInt(formValues.modify_qty)) {
			HF.msg.alert(T('text.Cannot be exceeded', {x : params.qty}));
		} else {
			formView.getForm().submit({
			    clientValidation : true,
			    url : '/domains/' + login.current_domain_id + '/inventories/' + popup.getParams().id + '/transfer.json',
			    success: function(form, action) {
					var result = action.result;
					popup.close();
					HF.msg.alert({title : result.message, msg : T('text.Success to Process')});

					var view = self.getMainView();
					var gridStore = view.child('grid').getStore();
					gridStore.load();
			    }
			});
		}
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/inventories/export.xls';
	},
		
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
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
		return this.getInventory();
	}
});