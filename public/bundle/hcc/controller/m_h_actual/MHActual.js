/**
 * MHActual controller
 */
Ext.define('Hcc.controller.m_h_actual.MHActual', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.m_h_actual.MHActual'],
	
	models : [],
			
	stores: ['Hcc.store.MHActual'],
	
	views : ['Hcc.view.m_h_actual.MHActual'],
	
	refs: [ { ref : 'MHActual', selector : 'hcc_m_h_actual' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_m_h_actual' : {
				paramschange : this.onParamsChange
			},
			'hcc_m_h_actual_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'hcc_m_h_actual_list' : {
				click_export : this.onExport
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
			params['work_date-gte'] = HF.getShiftDate(-1);
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
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/diy_selections/m_h_actual/query.xls';
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getMHActual();
	}
});