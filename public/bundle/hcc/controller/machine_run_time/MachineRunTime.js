Ext.define('Hcc.controller.machine_run_time.MachineRunTime', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.machine_run_time.MachineRunTime'],
	
	models : [],
			
	stores: ['Hcc.store.MachineRunTime'],
	
	views : ['Hcc.view.machine_run_time.MachineRunTime'],
	
	refs: [ 
		{ ref : 'MachineRunTime', selector : 'hcc_machine_run_time' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_machine_run_time' : {
				paramschange : this.onParamsChange
			},
			'hcc_machine_run_time_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'hcc_machine_run_time_list' : {
				click_export : this.onExport
			},
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
			params['work_date-gte'] = HF.getShiftDate(-7);
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getShiftDate(-1);
		}
		return params;
	},
	
	onParamsChange: function(view, params) {
		params = this.beforeParamsChange(view, params);
		if(params['work_date-gte'] && params['work_date-lte']) {
			var range = HF.calDateRange(params['work_date-gte'], params['work_date-lte']);
			if(range > 31) {
				HF.msg.notice(T("text.Period allowed X days", {x : '31'}));
				return;
			}
		}
		var searchForm = this.getSearchForm();
		searchForm.setValues(params);
		
		var grid = view.down('grid');
		var store = grid.getStore();
		store.getProxy().extraParams = searchForm.getValues();
		store.load({
			page : 1,
			callback : function(records, operation, success) {
				if(success) {
					grid.fireEvent('after_grid_loaded', records, operation);
				}
			}
		});
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/diy_selections/MachineRunTime/query.xls';
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getMachineRunTime();
	}
});