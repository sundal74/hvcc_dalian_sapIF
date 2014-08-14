/**
 * PmsAlarms controller
 */
Ext.define('Comp.controller.pms_alarms.PmsAlarms', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [
		'Comp.store.PmsAlarms',
		'Comp.view.pms_alarms.PmsAlarms',
		'Comp.view.pms_alarms.PmsAlarmsList',
		'Comp.view.pms_alarms.PmsAlarmsSearch'
	],
	
	models : [],
			
	stores: ['Comp.store.PmsAlarms'],
	
	views : ['Comp.view.pms_alarms.PmsAlarms'],
	
	refs: [ { ref : 'PmsAlarms', selector : 'comp_pms_alarms' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_alarms' : {
				paramschange : this.onParamsChange
			},
			'comp_pms_alarms_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-gte']) {
			params['work_date-gte'] = HF.getCurrentShiftDate();
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getPmsAlarms();
	}
});