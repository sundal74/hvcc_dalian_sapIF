/**
 * DefectCodeTop10 controller
 */
Ext.define('Hcc.controller.defect_code_top10.DefectCodeTop10', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.defect_code_top10.DefectCodeTop10'],
	
	models : [],
			
	stores: ['Hcc.store.DefectCodeTop10'],
	
	views : ['Hcc.view.defect_code_top10.DefectCodeTop10'],
	
	refs: [ { ref : 'DefectCodeTop10', selector : 'hcc_defect_code_top10' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_defect_code_top10' : {
				paramschange : this.onParamsChange
			},
			'hcc_defect_code_top10_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'hcc_defect_code_top10_list grid' : {
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
			params['work_date-gte'] = HF.getShiftDate(-7);
		}
		if(!params['work_date-lte']) {
			params['work_date-lte'] = HF.getCurrentShiftDate();
		}
		return params;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getDefectCodeTop10().down('chart');
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
		return this.getDefectCodeTop10();
	}
});