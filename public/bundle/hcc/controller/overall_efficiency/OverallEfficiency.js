/**
 * OverallEfficiency controller
 */
Ext.define('Hcc.controller.overall_efficiency.OverallEfficiency', {
	
	extend: 'Base.abstract.PivotReportController',
	
	requires : ['Hcc.view.overall_efficiency.OverallEfficiency'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_overall_efficiency' : {
				paramschange : this.onParamsChange
			},
			'hcc_overall_efficiency_search' : {
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
			params['work_date-gte'] = HF.getShiftDate(-2);
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getShiftDate(-1);
		}
		return params;
	},
	
	/**
	 * onParamsChange전에 처리, 파라미터 validation 체크 
	 */
	validateParams : function(view, params) {
		var valid = true;
		if(params['work_date-gte'] && params['work_date-lte']) {
			var range = HF.calDateRange(params['work_date-gte'], params['work_date-lte']);
			if(range > 7) {
				HF.msg.notice(T("text.Period allowed X days", {x : '7'}));
				valid = false;
			}
		}
		
		return valid;
	}
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
});