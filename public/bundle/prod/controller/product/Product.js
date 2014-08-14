/**
 * Product controller
 */
Ext.define('Prod.controller.product.Product', {

	extend: 'Base.abstract.entity.ListMainController',

	requires : [ 
		'Prod.model.Product', 
		'Prod.store.Product', 
		'Prod.view.product.Product',
		'Prod.view.product.BomPopup'
	],

	models : ['Prod.model.Product'],

	stores: ['Prod.store.Product'],

	views : ['Prod.view.product.Product'],

	refs: [ 
		{ ref : 'Product', selector : 'prod_product' },
		{ ref : 'BomPopup', selector : 'prod_view_bom_popup' }
	],

	init: function() {
		this.callParent(arguments);

		this.control({
			'prod_product' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_product_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_product_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_product_list #go_bom' : {
				click : this.onBom
			},
			'prod_view_bom_popup' : {
				paramschange : this.onParamsChangeOnlyBom,
				after_detail_loaded : this.afterBomPopupLoaded,
				click_close : this.onPopupClose
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	onBom : function(gridView, td, rowIndex, colIndex, event, record, tr, grid) {
		HF.popup('Prod.view.product.BomPopup', {id : record.get('id')}, {});
	},
	
	afterBomPopupLoaded : function(record, operation) {
		var self = this;
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/products/' + record.get('id') + '/child_products.json',
			method : 'GET',
			success: function(response) {		    	
				var resultObj = Ext.JSON.decode(response.responseText);
				var popup = self.getBomPopup();
				var directoryTree = popup.getTreeChildren(resultObj.items);
				
				var root = {
					name: record.get('name'), description : record.get('description'), qty: '', leaf: false, expanded: true, children: directoryTree
				};
				popup.down('treepanel').store.setRootNode(root);
			}
		});	
	},
	
	onPopupClose : function(view) {
		view.close();
	},
	
	onParamsChangeOnlyBom : function(view, params) {
		var modelClass = Ext.ClassManager.get(this.models[0]);
		modelClass.load(params.id, {
			scope : this,
			success : function(record, operation) {
				view.fireEvent('after_detail_loaded', record, operation);
			}
		});
	},
	
	/**
	 * after import success
	 */
	onImportSuccess : function(response) {
		var gridView = this.getGridView();
		gridView.store.load();
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
		return this.getProduct();
	}
});