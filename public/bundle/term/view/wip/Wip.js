Ext.define('Term.view.wip.Wip', {
	
	extend: 'Base.abstract.PivotReport',
	
	xtype : 'term_wip',
	
	title : T('title.sheep_dog'),

	store: 'Term.store.Wip',
	
	grid : {
		xtype : 'mzpivotgrid',
		
	    enableLocking:  true,
		enableRowSummary: true,
	    viewConfig: {
	        trackOver:      true,
	        stripeRows:     false
	    },
	    
	    aggregate: [ {
	        measure:    'qty',
	        header:    	T('label.qty'),
			width : 80,
	        aggregator: 'sum',
	        align:      'right',
	        renderer:   Ext.util.Format.numberRenderer('0,000')
	    } ],
	
	    leftAxisTitle:  '',
	
	    leftAxis: [{
			width:      100,
		    dataIndex:  'product',
		    header:     T('label.product')
		}],
	    
	    topAxis: [ {
	        dataIndex:  'machine',
	        header:     T('label.machine')
	    }]
	}

});