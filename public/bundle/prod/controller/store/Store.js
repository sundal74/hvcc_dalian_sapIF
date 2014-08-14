/**
 * Store controller
 */
Ext.define('Prod.controller.store.Store', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.Store', 
		'Prod.store.Store', 
		'Prod.view.store.Store' 
	],
	
	models : ['Prod.model.Store'],
			
	stores: ['Prod.store.Store'],
	
	views : ['Prod.view.store.Store'],
	
	refs: [ { ref : 'StoreView', selector : 'prod_store' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_store' : {
				paramschange : this.onParamsChange
			},
			'prod_store_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail
			},
			'prod_store_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	// Customized code here ...
		
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
		return this.getStoreView();
	}
});