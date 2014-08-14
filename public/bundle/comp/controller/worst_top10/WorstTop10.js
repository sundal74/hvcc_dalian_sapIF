Ext.define('Comp.controller.worst_top10.WorstTop10', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Comp.view.worst_top10.WorstTop10'],
	
	models : [],
			
	stores: ['Comp.store.WorstTop10'],
	
	views : ['Comp.view.worst_top10.WorstTop10'],
	
	refs: [ { ref : 'WorstTop10', selector : 'comp_worst_top10' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_worst_top10' : {
				paramschange : this.onParamsChange
			},
			'comp_worst_top10_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'comp_worst_top10_list grid' : {
				after_grid_loaded : this.afterGridLoaded
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
			params['work_date-gte'] = HF.getCurrentShiftDate();
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getWorstTop10().down('chart');
		var chartDataList = [];
		
		Ext.Array.each(records, function(record) {
			if(record.data.defect_code_name != 'Total') {
				var chartData = record.data;
				chartDataList.push(chartData);
			}			
		});
		
		chartView.store.loadRawData(chartDataList);
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getWorstTop10();
	}
});