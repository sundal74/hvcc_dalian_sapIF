/**
 * PmsMasterError controller
 */
Ext.define('Comp.controller.pms_master_error.PmsMasterError', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Comp.model.PmsMasterError', 
		'Comp.store.PmsMasterError', 
		'Comp.view.pms_master_error.PmsMasterError' 
	],
	
	models : ['Comp.model.PmsMasterError'],
			
	stores: ['Comp.store.PmsMasterError'],
	
	views : ['Comp.view.pms_master_error.PmsMasterError'],
	
	refs: [ { ref : 'PmsMasterError', selector : 'comp_pms_master_error' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_master_error' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'comp_pms_master_error_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'comp_pms_master_error_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'comp_pms_master_error_list #go_detail' : {
				click : this.onShowDetail
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	// Customized code here ...
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
		return this.getPmsMasterError();
	}
});