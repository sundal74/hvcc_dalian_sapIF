/**
 * DefectCode controller
 */
Ext.define('Prod.controller.defect_code.DefectCode', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.DefectCode', 
		'Prod.store.DefectCode', 
		'Prod.view.defect_code.DefectCode' 
	],
	
	models : ['Prod.model.DefectCode'],
			
	stores: ['Prod.store.DefectCode'],
	
	views : ['Prod.view.defect_code.DefectCode'],
	
	refs: [ { ref : 'DefectCode', selector : 'prod_defect_code' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_defect_code' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_defect_code_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_defect_code_search' : {
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
		return this.getDefectCode();
	}
});