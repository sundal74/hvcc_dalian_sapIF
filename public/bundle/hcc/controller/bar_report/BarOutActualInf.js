/**
 * BarOutActualInf controller
 */
Ext.define('Hcc.controller.bar_report.BarOutActualInf', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [
		'Hcc.store.BarOutActualInf',
		'Hcc.view.bar_report.BarOutActualInf',
		'Hcc.view.bar_report.BarOutActualInfList',
		'Hcc.view.bar_report.BarOutActualInfSearch'
	],
	
	models : [],
			
	stores: ['Hcc.store.BarOutActualInf'],
	
	views : ['Hcc.view.bar_report.BarOutActualInf'],
	
	refs: [ { ref : 'BarOutActualInf', selector : 'hcc_bar_out_actual_inf' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_bar_out_actual_inf' : {
				paramschange : this.onParamsChange
			},
			'hcc_bar_out_actual_inf_search' : {
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
		/*searchView.down('datefield[name=work_date-gte]').setMaxValue(HF.getCurrentShiftDate());

		if(!params) {
			params = {};
		}
		if(!params['work_date-gte']) {
			params['work_date-gte'] = HF.getCurrentShiftDate();
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getCurrentShiftDate();
		}*/
		
		if(!params) {
			params = {};
		}
		
		if(!params['work_date-eq']) {
			params['work_date-eq'] = HF.getCurrentShiftDate();
		}
		return params;
	},	
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
	parseClassName : function() {
		this.mainViewName = 'hcc_bar_out_actual_inf';
		this.gridViewName = 'hcc_bar_out_actual_inf_list';
		this.searchViewName = 'hcc_bar_out_actual_inf_search';
	},
	
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getBarOutActualInf();
	}
});