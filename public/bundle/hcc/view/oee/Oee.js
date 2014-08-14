Ext.define('Hcc.view.oee.Oee', {
	
	extend: 'Base.abstract.PivotReport',
	
 	requires : [ 
		'Hcc.view.oee.OeeSearch'
	],
	
	xtype : 'hcc_oee',
	
	title : T('title.oee'),
	
	searchView : 'hcc_oee_search',
	
	store : 'Hcc.store.Oee',
	
	grid : {
		xtype : 'mzpivotgrid',
		
	    enableLocking:  true,
		enableRowSummary: true,
	    viewConfig: {
	        trackOver:      true,
	        stripeRows:     false
	    },
		
	    aggregate: [ {
	        measure:    'availability',
	        header:    	T('label.availability'),
			width : 80,
	        aggregator: 'avg',
	        align:      'right',
	        renderer:   Ext.util.Format.numberRenderer('0.00')
	    }, {
	        measure:    'perf_eff',
	        header:     T('label.performance'),
			width : 80,
	        aggregator: 'avg',
	        align:      'right',
	        renderer:   Ext.util.Format.numberRenderer('0.00')
	    }, {
		    measure:    'quality',
			header:     T('label.quality'),
			width : 80,
	        aggregator: 'avg',
			align:      'right',
			renderer:   Ext.util.Format.numberRenderer('0.00')
		}, {
			measure:    'oee_value',
			header:     T('label.oee'),
			width : 80,
	        aggregator: 'avg',
			align:      'right',
			renderer:function(value, metaData, record, rowIndex, colIndex, store) { 
				metaData.tdCls = 'pivot-value';
				return Ext.util.Format.number(value, '0.00');
			}
		} ],
		
	    leftAxisTitle:  T('title.oee'),
		
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