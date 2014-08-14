Ext.define('Hcc.view.bts.Bts', {
	
	extend: 'Base.abstract.PivotReport',
	
 	requires : [ 
		'Hcc.view.bts.BtsSearch',
	],
	
	xtype : 'hcc_bts',
	
	title : T('title.bts'),
	
	searchView : 'hcc_bts_search',
	
	store : 'Hcc.store.Bts',
	
	grid : {
		xtype : 'mzpivotgrid',
		
	    enableLocking:  true,
	
		enableRowSummary: true,
		
	    viewConfig: {
	        trackOver:      true,
	        stripeRows:     false
	    },
	    
	    aggregate: [ {
			measure : 'plan_qty',
			header : 'Plan',
			width : 80,
			aggregator : 'sum',
			align : 'right'
		}, {
			measure : 'actual_qty',
			header : 'Actual',
			width : 80,
			aggregator : 'sum',
			align : 'right'
		}, {
			measure : 'plan_act_lower_qty',
			header : 'Lower Actual',
			width : 90,
			aggregator : 'sum',
			align : 'right',
			disabled : true
		}, {
			measure : 'plan_achv_qty',
			header : 'Plan Achv',
			width : 80,
			aggregator : 'sum',
			align : 'right',
			disabled : true
		}, {
	        measure:    'vol_perf',
	        header:    	T('label.vol_perf'),
			width : 80,
	        aggregator: 'avg',
	        align:      'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store) {
				var volPerf = 0;
				if(colIndex % 8 == 4) {
					var planSeq = colIndex - 4;
					var actualSeq = colIndex - 3;
					planQty = record.get('c' + planSeq);
					actualQty = record.get('c' + actualSeq);
					if(planQty > 0) {
						volPerf = actualQty / planQty;
					}
				}
				
				record.data['c' + colIndex] = volPerf;
				return Ext.util.Format.number(volPerf, '0.000');
			}
	    }, {
	        measure:    'mix_perf',
	        header:     T('label.mix_perf'),
			width : 80,
	        aggregator: 'avg',
	        align:      'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store) {
				var mixPerf = 0;
				if(colIndex % 8 == 5) {
					var planSeq = colIndex - 5;
					var actualSeq = colIndex - 4;
					var lowerPlanSeq = colIndex - 3;
					var planQty = record.get('c' + planSeq);
					var actualQty = record.get('c' + actualSeq);
					var lowerPlanQty = record.get('c' + lowerPlanSeq);
					
					if(planQty > 0 && actualQty > 0) {
						var mixPerfParent = (planQty > actualQty) ? actualQty : planQty;
						mixPerf = lowerPlanQty / mixPerfParent;
					}
				}
				
				record.data['c' + colIndex] = mixPerf;
				return Ext.util.Format.number(mixPerf, '0.000');
			}
	    }, {
		    measure:    'seq_perf',
			header:     T('label.seq_perf'),
			width : 80,
			aggregator: 'avg',
			align:      'right',
			renderer : function(value, metaData, record, rowIndex, colIndex, store) {
				var seqPerf = 0;
				
				if(colIndex % 8 == 6) {
					var achvSeq = colIndex - 3;
					var lowerPlanSeq = colIndex - 4;
					var achvQty = record.get('c' + achvSeq);
					var lowerPlanQty = record.get('c' + lowerPlanSeq);
					
					if(lowerPlanQty > 0) {
						seqPerf = achvQty / lowerPlanQty;
					}
				}
				
				record.data['c' + colIndex] = seqPerf;
				return Ext.util.Format.number(seqPerf, '0.000');
			}
		}, {
			measure:    'bts_value',
			header:     T('label.bts'),
			width : 80,
			aggregator: 'avg',
			align:      'right',
			renderer:function(value, metaData, record, rowIndex, colIndex, store) { 
				metaData.tdCls = 'pivot-value';
				
				if(colIndex % 8 == 7) {
					var volPerfSeq = colIndex - 3;
					var mixPerfSeq = colIndex - 2;
					var seqPerfSeq = colIndex - 1;
					value = record.get('c' + volPerfSeq) * record.get('c' + mixPerfSeq) * record.get('c' + seqPerfSeq);
				}
				
				return Ext.util.Format.number(value, '0.000');
			}
		} ],
	

		leftAxisTitle:  T('title.bts'),
	
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
		}, {
			width:      100,
		    dataIndex:  'product',
		    header:     T('label.product')
		}],
	    
	    topAxis: [ /*{
	        dataIndex:  'date',
	        header:     'date'
	    }, */{
			dataIndex:  'shift',
	        header:     'shift'
		}]
	}

});