/**
 * BarGrBySer controller
 */
Ext.define('Hcc.controller.bar_report.BarGrBySer', {

	extend: 'Base.abstract.entity.ReportMainController',

	requires : ['Hcc.view.bar_report.BarGrBySer'],

	models : [],

	stores: ['Hcc.store.BarGrBySer'],

	views : ['Hcc.view.bar_report.BarGrBySer'],

	refs: [ 
		{ ref : 'BarGrBySer', selector : 'hcc_bar_gr_by_ser' }
	],

	init: function() {
		this.callParent(arguments);

		this.control({
			'hcc_bar_gr_by_ser' : {
				paramschange : this.onParamsChange
			},
			'hcc_bar_gr_by_ser_list' : {
				click_export : this.onExport
			},
			'hcc_bar_gr_by_ser_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/

	beforeParamsChange : function(view, params) {
		// 검색은 오늘 날짜까지만 가능
		var searchView = this.getSearchView();
		searchView.down('datefield[name=date-gte]').setMaxValue(HF.getCurrentShiftDate());

		if(!params) {
			params = {};
		}
		if(!params['date-gte']) {
			params['date-gte'] = HF.getCurrentShiftDate();
		}
		if(!params['date-lte']) {
			params['date-lte'] = HF.getCurrentShiftDate();
		}
		return params;
	},

	/**
	 * 실적 수정 팝업 close 버튼 클릭시 
	 */
	onClickClose : function(view) {
		view.close();
	},

	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	parseClassName : function() {
		this.mainViewName = 'hcc_bar_gr_by_ser';
		this.gridViewName = 'hcc_bar_gr_by_ser_list';
		this.searchViewName = 'hcc_bar_gr_by_ser_search';
	},
	
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getBarGrBySer();
	}
});