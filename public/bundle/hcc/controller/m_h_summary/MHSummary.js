Ext.define('Hcc.controller.m_h_summary.MHSummary', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.m_h_summary.MHSummary'],
	
	models : [],
			
	stores: ['Hcc.store.MHSummary'],
	
	views : ['Hcc.view.m_h_summary.MHSummary'],
	
	refs: [ 
		{ ref : 'MHSummary', selector : 'hcc_m_h_summary' },
		{ ref : 'MHSummaryList', selector : 'hcc_m_h_summary_list' },
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_m_h_summary' : {
				paramschange : this.onParamsChange
			},
			'hcc_m_h_summary_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'hcc_m_h_summary_search' : {
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
			if(range > 31) {
				HF.msg.notice(T("text.Period allowed X days", {x : '31'}));
				valid = false;
			}
		}
		
		return valid;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getMHSummaryList().down('chart');
		chartView.store.loadRawData(records);
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getMHSummary();
	}
});