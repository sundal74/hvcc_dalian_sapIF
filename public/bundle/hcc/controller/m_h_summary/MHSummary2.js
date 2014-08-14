Ext.define('Hcc.controller.m_h_summary.MHSummary2', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.m_h_summary.MHSummary2', 'Hcc.view.m_h_summary.UserDetailPopup'],
	
	models : [],
			
	stores: ['Hcc.store.MHSummary2'],
	
	views : ['Hcc.view.m_h_summary.MHSummary2'],
	
	refs: [ 
		{ ref : 'MHSummary2', selector : 'hcc_m_h_summary2' },
		{ ref : 'MHSummary2List', selector : 'hcc_m_h_summary2_list' },
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_m_h_summary2' : {
				paramschange : this.onParamsChange
			},
			'hcc_m_h_summary2_list' : {
				itemdblclick : this.onItemClick,
				click_export : this.onExport
			},
			'hcc_m_h_summary2_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'hcc_m_h_summary_user_detail_popup' : {
				paramschange : this.onUserDetailPopupParamsChange,
				click_close : this.onCloseClick
			}
		});
	},
	
	parseClassName : function() {
		this.mainViewName = 'hcc_m_h_summary2';
		this.gridViewName = 'hcc_m_h_summary2_list';
		this.searchViewName = 'hcc_m_h_summary2_search';
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	onCloseClick : function(popup) {
		popup.close();
	},
	
	beforeParamsChange : function(view, params) {
		params = this.getSearchForm().getValues();
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
	
	onItemClick : function(grid, record, item, index, e, eOpts) {
		var selection = this.getMHSummary2List().getSelectionModel().getSelection();
		HF.popup('Hcc.view.m_h_summary.UserDetailPopup', selection[0].data);
	},
	
	onUserDetailPopupParamsChange : function(view, params) {
		var grid = view.child('grid');
		var store = grid.getStore();
		var searchForm = this.getSearchForm();
		var formParams = searchForm.getValues();
		
		store.getProxy().extraParams = {
			'work_date-gte' : formParams['work_date-gte'],
			'work_date-lte' : formParams['work_date-lte'],
			'machine.name-eq' : params['machine'],
			'operation.name-eq' : params['operation'],
			'product.name-eq' : params['product']
		};
		grid.getStore().load();
	},
	
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/diy_selections/MHSummary2/query.xls';
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getMHSummary2();
	}
});