/**
 * LineStopTop10 controller
 */
Ext.define('Prod.controller.line_stop_top10.LineStopTop10', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Prod.view.line_stop_top10.LineStopTop10', 'Prod.view.line_stop_top10.LineStopDetailPopup'],
	
	models : [],
			
	stores: ['Prod.store.LineStopTop10'],
	
	views : ['Prod.view.line_stop_top10.LineStopTop10'],
	
	refs: [ 
		{ ref : 'LineStopTop10', selector : 'prod_line_stop_top10' },
		{ ref : 'LineStopTop10List', selector : 'prod_line_stop_top10_list' },
		{ ref : 'LineStopTop10Search', selector : 'prod_line_stop_top10_search' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_line_stop_top10' : {
				paramschange : this.onParamsChange,
			},
			'prod_line_stop_top10_list grid' : {
				after_grid_loaded : this.afterGridLoaded,
				itemdblclick : this.onItemClick
			},
			'prod_line_stop_top10_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_line_stop_detail_popup' : {
				paramschange : this.onLineStopDetailPopupParamsChange,
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
		if(!params['grid_type']) {
			params['grid_type'] = 'loss_count';
		}
		return params;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getLineStopTop10List().down('chart');
		var searchView = this.getLineStopTop10Search().child(' radiofield');

		var chartDataList = [];
		
		if(searchView.getValue()) {
			if(records.length > 10) {
				for(var i = 0 ; i < 10 ; i++) {
					chartDataList.push({'machine' : records[i].data["machine"], 'loss_count' : parseInt(records[i].data["loss_count"])});
				}
			}else {
				for(var i = 0 ; i < records.length ; i++) {
					chartDataList.push({'machine' : records[i].data["machine"], 'loss_count' : parseInt(records[i].data["loss_count"])});
				}
			}
			chartView.axes.items[0].title = T('label.loss_count');
			chartView.series.items[0].title = [T('label.loss_count')];
		}else {
			if(records.length > 10) {
				for(var i = 0 ; i < 10 ; i++) {
					chartDataList.push({'machine' : records[i].data["machine"], 'loss_count' : parseInt(records[i].data["loss_term"])});
				}
			}else {
				for(var i = 0 ; i < records.length ; i++) {
					chartDataList.push({'machine' : records[i].data["machine"], 'loss_count' : parseInt(records[i].data["loss_term"])});
				}
			}
			chartView.axes.items[0].title = T('label.loss_term');
			chartView.series.items[0].title = [T('label.loss_term')];
		}

		chartView.store.loadRawData(chartDataList);
	},
	
	onItemClick : function(grid, record, item, index, e, eOpts) {
		var selection = grid.getSelectionModel().getSelection();
		HF.popup('Prod.view.line_stop_top10.LineStopDetailPopup', selection[0].data);
	},
	
	onLineStopDetailPopupParamsChange : function(view, params) {
		var grid = view.child('grid');
		var store = grid.getStore();
		var searchForm = this.getSearchForm();
		var formParams = searchForm.getValues();
		view.child(' #machine').setValue(params['machine']);
		view.child(' #mc_desc').setValue(params['machine_desc']);
		store.getProxy().extraParams = {
			'work_date-gte' : formParams['work_date-gte'],
			'work_date-lte' : formParams['work_date-lte'],
			'operation.name-eq' : params['operation'],
			'machine.name-eq' : params['machine']
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
		return this.getLineStopTop10();
	}
});