Ext.define('Hcc.view.bar_sheep_dog.BarSheepDog', {
	
	extend: 'Base.abstract.PivotReport',
	
 	requires : [ 
		'Hcc.store.BarSheepDog',
		'Hcc.view.bar_sheep_dog.BarSheepDogSearch'
	],
	
	xtype : 'hcc_bar_sheep_dog',
	
	title : T('title.bar_sheep_dog'),
	
	searchView : 'hcc_bar_sheep_dog_search',
	
	store : 'Hcc.store.BarSheepDog',
	
	grid : {
		xtype : 'mzpivotgrid',
		
		enableLocking:  true,
	
		enableRowSummary: true,
		
		viewConfig: {
			trackOver:      true,
			stripeRows:     false
		},
	    
		aggregate: [ {
			measure : 'lot_rqty',
			header : T('label.qty'),
			width : 80,
			aggregator : 'sum',
			align : 'right',
			renderer : Ext.util.Format.numberRenderer('0,000')
		} ],
	
		leftAxisTitle:  '',
	
		leftAxis: [ {
			width : 120,
			dataIndex : 'item_cd',
			header : T('label.item_cd')
		} ],
	    
		topAxis: [ {
			dataIndex : 'loc_cd',
			header : T('label.loc_cd')
		} ]
	}
});