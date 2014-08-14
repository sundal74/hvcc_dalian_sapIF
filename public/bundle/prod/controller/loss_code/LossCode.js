/**
 * LossCode controller
 */
Ext.define('Prod.controller.loss_code.LossCode', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.LossCode', 
		'Prod.store.LossCode', 
		'Prod.view.loss_code.LossCode' 
	],
	
	models : ['Prod.model.LossCode'],
			
	stores: ['Prod.store.LossCode'],
	
	views : ['Prod.view.loss_code.LossCode'],
	
	refs: [ { ref : 'LossCode', selector : 'prod_loss_code' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_loss_code' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_loss_code_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_loss_code_search' : {
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
		return this.getLossCode();
	}
});