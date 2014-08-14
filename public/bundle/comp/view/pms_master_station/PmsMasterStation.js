Ext.define('Comp.view.pms_master_station.PmsMasterStation', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.pms_master_station.PmsMasterStationSearch',
		'Comp.view.pms_master_station.PmsMasterStationList'
	],
	
	xtype : 'comp_pms_master_station',
	
	title : T('menu.PmsMasterStation'),
	
	searchView : 'comp_pms_master_station_search',
	
	gridView : 'comp_pms_master_station_list'
	
});