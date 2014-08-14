Ext.define('Hcc.view.ftt.Ftt', {
	
	extend: 'Base.abstract.PivotReport',
	
 	requires : [ 
		'Hcc.view.ftt.FttSearch',
	],
	
	xtype : 'hcc_ftt',
	
	title : T('title.ftt'),
	
	searchView : 'hcc_ftt_search',
	
	store : 'Hcc.store.Ftt',
	
	grid : {
		xtype : 'mzpivotgrid',
		
	    enableLocking:  true,
		enableRowSummary: true,
		// enableRowGrandTotals : false,
	    viewConfig: {
	        trackOver:      true,
	        stripeRows:     false
	    },
	    
	    aggregate: [ {
	        measure:    'input_qty',
	        header:    	T('label.actual'),
			width : 80,
	        aggregator: 'sum',
	        align:      'right',
	        renderer:   Ext.util.Format.numberRenderer('0,000')
	    }, {
	        measure:    'defect_qty',
	        header:     T('label.defect'),
			width : 80,
	        aggregator: 'sum',
	        align:      'right',
	        renderer:   Ext.util.Format.numberRenderer('0,000')
	    }, {
		    measure:    'rework_qty',
			header:     T('label.rework'),
			width : 80,
			aggregator: 'sum',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0.00')
		} , {
			measure:    'ftt_value',
			header:     T('label.ftt'),
			width : 80,
			aggregator: 'avg',
			align:      'right',
			renderer:function(value, metaData, record, rowIndex, colIndex, store) { 
				metaData.tdCls = 'pivot-value';
				
				var ftt = 0;
				var totalQty = 0;
				var totalBadQty = 0;
				var defectQty = 0;
				var reworkQty = 0;
				
				if((colIndex + 1) % 4 == 0) {
					var totalSeq = ((colIndex +1) / 4 - 1) * 4;
					var defectSeq = (((colIndex +1) / 4 - 1) * 4) + 1;
					var reworkSeq = (((colIndex +1) / 4 - 1) * 4) + 2;
					totalQty = record.get('c' + totalSeq);
					totalBadQty = record.get('c' + defectSeq) + record.get('c' + reworkSeq);
				} 
				
				if(totalQty > 0) {
					ftt = ((totalQty - totalBadQty) / totalQty) * 100;
				}
				
				return Ext.util.Format.number(ftt, '0.00');
			}
		}],
	
	    leftAxisTitle:  T('title.ftt'),
	
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