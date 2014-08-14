Ext.define('Prod.view.lot.Lot', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.lot.LotSearch',
		'Prod.view.lot.LotList',
		'Prod.view.lot.LotTrackList'
	],
	
	xtype : 'prod_lot',
	
	title : T('title.lot'),
	
	searchView : 'prod_lot_search',
	
	gridView : 'prod_lot_list',
	
	// subView : 'prod_lot_track_list'
	
});