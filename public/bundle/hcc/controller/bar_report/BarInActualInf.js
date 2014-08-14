/**
 * BarInActualInf controller
 */
Ext.define('Hcc.controller.bar_report.BarInActualInf', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [
		'Hcc.store.BarInActualInf',
		'Hcc.view.bar_report.BarInActualInf',
		'Hcc.view.bar_report.BarInActualInfList',
		'Hcc.view.bar_report.BarInActualInfSearch'
	],
	
	models : [],
			
	stores: ['Hcc.store.BarInActualInf'],
	
	views : ['Hcc.view.bar_report.BarInActualInf'],
	
	refs: [ { ref : 'BarInActualInf', selector : 'hcc_bar_in_actual_inf' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_bar_in_actual_inf' : {
				paramschange : this.onParamsChange
			},
			'hcc_bar_in_actual_inf_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	beforeParamsChange : function(view, params) {
		// 검색은 오늘 날짜까지만 가능
		var searchView = this.getSearchView();
		searchView.down('datefield[name=work_date-gte]').setMaxValue(HF.getCurrentShiftDate());

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

	/**
	 * onParamsChange전에 처리, 파라미터 validation 체크 
	 */
	validateParams : function(view, params) {
		var valid = true;
		if(params['work_date-gte'] && params['work_date-lte']) {
			var range = HF.calDateRange(params['work_date-gte'], params['work_date-lte']);
			if(range > 31) {
				HF.msg.notice(T("text.Period allowed X days", {x : '31'}));
				valid = false;
			}
		}
		
		return valid;
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	parseClassName : function() {
		this.mainViewName = 'hcc_bar_in_actual_inf';
		this.gridViewName = 'hcc_bar_in_actual_inf_list';
		this.searchViewName = 'hcc_bar_in_actual_inf_search';
	},
	
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getBarInActualInf();
	}
});