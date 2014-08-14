Ext.define('Hcc.view.overall_efficiency.OverallEfficiency', {
	
	extend: 'Base.abstract.PivotReport',
	
 	requires : [ 
		'Hcc.view.overall_efficiency.OverallEfficiencySearch',
	],
	
	xtype : 'hcc_overall_efficiency',
	
	title : T('title.overall_efficiency'),
	
	searchView : 'hcc_overall_efficiency_search',
	
	store : 'Hcc.store.OverallEfficiency',
	
	grid : {
		xtype : 'mzpivotgrid',
		
	    enableLocking:  true,
		enableRowSummary: true,
	    viewConfig: {
	        trackOver:      true,
	        stripeRows:     false
	    },
	    
	    aggregate: [ {
			measure:    'order_qty',
			header:     T('label.plan_qty'),
			width : 80,
			aggregator: 'sum',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0,000')
		}, {
		    measure:    'actual_qty',
			header:     T('label.actual_qty'),
			width : 80,
			aggregator: 'sum',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0,000')
		}, {
			measure:    'input_worktime',
			header:     T('label.input_worktime'),
			width : 80,
			aggregator: 'sum',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0,000')
		}, {
			measure:    'net_worktime',
			header:     T('label.net_worktime'),
			width : 80,
			aggregator: 'sum',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0,000')
		}, {
			measure:    'machine_ct',
			header:     T('label.machine_cycletime'),
			width : 90,
			aggregator: 'avg',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0,000')
		}, {
			measure:    'loss_worktime',
			header:     T('label.loss_worktime'),
			width : 80,
			aggregator: 'sum',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0,000')
		}, {
			measure:    'real_worktime',
			header:     T('label.real_worktime'),
			width : 80,
			aggregator: 'sum',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0,000')
		}, {
			measure:    'prod_eff',
			header:     T('label.prod_eff'),
			width : 80,
			aggregator: 'avg',
			align:      'right',
			renderer:function(value, metaData, record, rowIndex, colIndex, store) { 
				metaData.tdCls = 'pivot-value';
				
				var prodEff = 0;
				var netWorktime = 0;
				var inputWorktime = 0;
				
				if((colIndex + 1) % 8 == 0) {
					var netSeq = (((colIndex +1) / 8 - 1) * 8) + 3;
					var inputSeq = (((colIndex +1) / 8 - 1) * 8) + 2;
					netWorktime = record.get('c' + netSeq);
					inputWorktime = record.get('c' + inputSeq);
				} 
				
				if(inputWorktime > 0) {
					prodEff = (netWorktime / inputWorktime) * 100;
				}
				
				return Ext.util.Format.number(prodEff, '0.00');
			}
		} ],
	
	    leftAxisTitle:  T('title.overall_efficiency'),
	
	    leftAxis: [{
			width:      80,
	        dataIndex:  'workcenter',
	        header:     T('label.wc')
		}, {
			width:      80,
	        dataIndex:  'operation',
	        header:     T('label.operation')
		}, {
			width:      80,
		    dataIndex:  'machine',
		    header:     T('label.machine')
		}],
	    
	    topAxis: [ {
	        dataIndex:  'work_date',
	        header:     'date'
	    }]
	}

});