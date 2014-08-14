/**
 * DefectRate controller
 */
Ext.define('Hcc.controller.defect_rate.DefectRate', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Hcc.view.defect_rate.DefectRate', 'Hcc.view.defect_rate.DefectDetailPopup'],
	
	models : [],
			
	stores: ['Hcc.store.DefectRate'],
	
	views : ['Hcc.view.defect_rate.DefectRate'],
	
	refs: [ 
		{ ref : 'DefectRate', selector : 'hcc_defect_rate' },
		{ ref : 'DefectRateList', selector : 'hcc_defect_rate_list' },
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_defect_rate' : {
				paramschange : this.onParamsChange
			},
			'hcc_defect_rate_list grid' : {
				after_grid_loaded : this.afterGridLoaded,
				itemdblclick : this.onItemClick
			},
			'hcc_defect_rate_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'hcc_defect_detail_popup' : {
				paramschange : this.onDefectDetailPopupParamsChange,
				click_close : this.onCloseClick
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
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getDefectRateList().down('chart');
		
		// chart data {operation : '6APAK', 'prod_eff' : 30}
		var chartDataList = [];

		Ext.Array.each(records, function(record) {
			var wcName = record.data.workcenter;
			var defectRate = record.data.defect_rate;
			var chartData = null;
			
			// chartDataList내에 현재 record의 operation이 존재하는지 체크 
			Ext.Array.each(chartDataList, function(cd) {
				if(cd.workcenter == wcName) {
					chartData = cd;
					return;
				}
			});
			
			if(!chartData) {
				chartData = {'workcenter' : wcName, 'defect_rate' : 0, 'cnt' : 0};
				chartDataList.push(chartData);
			}
			
			chartData['defect_rate'] += defectRate;
			chartData['cnt'] += 1;
		});
		
		Ext.Array.each(chartDataList, function(list) {
			list['defect_rate'] = Ext.util.Format.number((list['defect_rate'] / list['cnt']), '0,000.00');
		});
		
		chartView.store.loadRawData(chartDataList);
	},
	
	onItemClick : function(grid, record, item, index, e, eOpts) {
		var selection = grid.getSelectionModel().getSelection();
		HF.popup('Hcc.view.defect_rate.DefectDetailPopup', selection[0].data);
	},
	
	onDefectDetailPopupParamsChange : function(view, params) {
		var grid = view.child('grid');
		var store = grid.getStore();
		var searchForm = this.getSearchForm();
		var formParams = searchForm.getValues();

		store.getProxy().extraParams = {
			'work_date-gte' : formParams['work_date-gte'],
			'work_date-lte' : formParams['work_date-lte'],
			'operation.name-eq' : params['operation']
		};
		grid.getStore().load();
	},
	
	onCloseClick : function(popup) {
		popup.close();
	},
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getDefectRate();
	}
});