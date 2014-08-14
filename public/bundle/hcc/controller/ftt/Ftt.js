/**
 * Ftt controller
 */
Ext.define('Hcc.controller.ftt.Ftt', {
	
	extend: 'Base.abstract.PivotReportController',
	
	requires : ['Hcc.view.ftt.Ftt'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_ftt' : {
				paramschange : this.onParamsChange
			},
			'hcc_ftt_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
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
		
		/*if(!params['workcenter.name-eq']) {
			HF.msg.notice('Select Workcenter First!');
			valid = false;
		}*/
		return valid;
	}
});