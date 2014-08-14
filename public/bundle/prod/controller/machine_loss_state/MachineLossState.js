Ext.define('Prod.controller.machine_loss_state.MachineLossState', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : ['Prod.view.machine_loss_state.MachineLossState'],
	
	models : [],
			
	stores: ['Prod.store.MachineLossState'],
	
	views : ['Prod.view.machine_loss_state.MachineLossState'],
	
	refs: [ { ref : 'MachineLossState', selector : 'prod_machine_loss_state' },
			{ ref : 'MachineLossStateList', selector : 'prod_machine_loss_state_list' },
			{ ref : 'MachineLossStateSearch', selector : 'prod_machine_loss_state_search' }
	 ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_machine_loss_state' : {
				paramschange : this.onParamsChange
			},
			'prod_machine_loss_state_list grid' : {
				after_grid_loaded : this.afterGridLoaded
			},
			'prod_machine_loss_state_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
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
		if(!params['plan_year-eq']) {
			params['plan_year-eq'] = Ext.Date.format(new Date(), 'Y');
		}
		if(!params['comparison_year-eq']) {
			params['comparison_year-eq'] = Ext.Date.format(new Date(), 'Y') - 1;
		}
		if(!params['loss_type']) {
			params['loss_type'] = 'loss_count';
		}
		return params;
	},
	
	afterGridLoaded : function(records, operation) {
		var chartView = this.getMachineLossStateList().down('chart');
		var searchView = this.getMachineLossStateSearch().child(' radiofield');

		var chartDataList = [];
		for(var i = 1 ; i <= 12 ; i++) {
			var this_year = records[0].data["data_" + i];
			var last_year = records[1].data["data_" + i];
			if(i <= 9) {
				chartDataList.push({'name' : '0' + i, 'this_year' : parseInt(this_year), 'last_year' : parseInt(last_year)});
			}else {
				chartDataList.push({'name' : i, 'this_year' : parseInt(this_year), 'last_year' : parseInt(last_year)});
			}
		}
		
		if(searchView.getValue()) {
			chartView.axes.items[0].title = T('label.loss_count');
		}else{
			chartView.axes.items[0].title = T('label.loss_term');
		}
		
		chartView.series.items[0].title = [records[0].data["year"] + T('label.year'),records[1].data["year"] + T('label.year')];
		chartView.store.loadRawData(chartDataList);
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getMachineLossState();
	}
});