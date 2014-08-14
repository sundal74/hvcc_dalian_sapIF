/**
 * ProdOverview controller
 */
Ext.define('Hcc.controller.prod_overview.ProdOverview', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [
		'Hcc.store.ProdOverview',
		'Hcc.view.prod_overview.ProdOverview',
		'Hcc.view.prod_overview.ProdOverviewList',
		'Hcc.view.prod_overview.ProdOverviewSearch'
	],
	
	models : [],
			
	stores: ['Hcc.store.ProdOverview'],
	
	views : ['Hcc.view.prod_overview.ProdOverview'],
	
	refs: [ { ref : 'ProdOverview', selector : 'hcc_prod_overview' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_prod_overview' : {
				paramschange : this.onParamsChange
			},
			'hcc_prod_overview_list' : {
				click_export : this.onExport
			},
			'hcc_prod_overview_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	/**
	 * override
	 */
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getShiftDate(0);
		}
		return params;
	},
		
	/**
	 * Excel export url
	 */
	getExportUrl : function() {
		return 'domains/' + login.current_domain_id + '/diy_selections/ProdOverview/query.xls';
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getProdOverview();
	}
});