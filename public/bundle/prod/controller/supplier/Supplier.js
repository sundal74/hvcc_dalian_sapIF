/**
 * Supplier controller
 */
Ext.define('Prod.controller.supplier.Supplier', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.Supplier', 
		'Prod.store.Supplier', 
		'Prod.view.supplier.Supplier' 
	],
	
	models : ['Prod.model.Supplier'],
			
	stores: ['Prod.store.Supplier'],
	
	views : ['Prod.view.supplier.Supplier'],
	
	refs: [ { ref : 'Supplier', selector : 'prod_supplier' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_supplier' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_supplier_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_supplier_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
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
		return this.getSupplier();
	}
});