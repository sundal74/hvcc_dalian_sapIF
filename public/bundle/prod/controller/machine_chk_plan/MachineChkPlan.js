/**
 * MachineChkPlan controller
 */
Ext.define('Prod.controller.machine_chk_plan.MachineChkPlan', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.MachineChkPlan', 
		'Prod.store.MachineChkPlan', 
		'Prod.view.machine_chk_plan.MachineChkPlan' 
	],
	
	models : ['Prod.model.MachineChkPlan'],
			
	stores: ['Prod.store.MachineChkPlan'],
	
	views : ['Prod.view.machine_chk_plan.MachineChkPlan'],
	
	refs: [ { ref : 'MachineChkPlan', selector : 'prod_machine_chk_plan' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_machine_chk_plan' : {
				paramschange : this.onParamsChange
			},
			'prod_machine_chk_plan_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_machine_chk_plan_search' : {
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
		params = this.getSearchForm().getValues();
		if(!params['plan_date-gte']) {
			params['plan_date-gte'] = HF.getShiftDate(-7);
		}
		if(!params['plan_date-lte']) {
			params['plan_date-lte'] = HF.getCurrentShiftDate();
		}

		return params;
	},
		
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	onPopupNew : function() {
		HF.popup(this.getDetailViewName(), {openerXtype:'Prod.view.machine_chk_plan.MachineChkPlan'}, {});
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
		return this.getMachineChkPlan();
	}
});