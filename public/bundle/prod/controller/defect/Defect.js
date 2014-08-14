/**
 * Defect controller
 */
Ext.define('Prod.controller.defect.Defect', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.Defect', 
		'Prod.store.Defect', 
		'Prod.view.defect.Defect' 
	],
	
	models : ['Prod.model.Defect'],
			
	stores: ['Prod.store.Defect'],
	
	views : ['Prod.view.defect.Defect'],
	
	refs: [ { ref : 'Defect', selector : 'prod_defect' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_defect' : {
				paramschange : this.onParamsChange
			},
			'prod_defect_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_inquiry : this.onInquiryDetail
			},
			'prod_defect_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	// Customized code here ...
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getCurrentShiftDate();
		}
		return params;
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
		return this.getDefect();
	}
});