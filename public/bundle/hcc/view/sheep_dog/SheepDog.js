Ext.define('Hcc.view.sheep_dog.SheepDog', {
	
	extend: 'Base.abstract.PivotReport',
	
 	requires : [ 
		'Hcc.view.sheep_dog.SheepDogSearch'
	],
	
	xtype : 'hcc_sheep_dog',
	
	title : T('title.sheep_dog'),
	
	searchView : 'hcc_sheep_dog_search',
	
	store : 'Hcc.store.SheepDog',
	
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
	        dataIndex:  'store',
	        header:     T('title.store')
	    }]
	}

});