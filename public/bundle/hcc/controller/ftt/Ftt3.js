Ext.define('Hcc.controller.ftt.Ftt3', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.ftt.Ftt3'],
	
	models : [],
			
	stores: ['Hcc.store.Ftt3'],
	
	views : ['Hcc.view.ftt.Ftt3'],
	
	refs: [ 
		{ ref : 'Ftt3', selector : 'hcc_ftt3' },
		{ ref : 'Ftt3List', selector : 'hcc_ftt3_list' },
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_ftt3' : {
				paramschange : this.onParamsChange
			},
			'hcc_ftt3_list' : {
				click_export : this.onExport
			},
			'hcc_ftt3_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	
	parseClassName : function() {
		this.mainViewName = 'hcc_ftt3';
		this.gridViewName = 'hcc_ftt3_list';
		this.searchViewName = 'hcc_ftt3_search';
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
			if(range > 31) {
				HF.msg.notice(T("text.Period allowed X days", {x : '31'}));
				valid = false;
			}
		}
		
		return valid;
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/diy_selections/ftt3/query.xls';
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	
	getMainView : function() {
		return this.getFtt3();
	}
});