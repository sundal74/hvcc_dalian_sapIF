Ext.define('Hcc.view.actual_per_hour.ActualPerHour', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Hcc.view.actual_per_hour.ActualPerHourSearch',
		'Hcc.view.actual_per_hour.ActualPerHourList'
	],
	
	xtype : 'hcc_actual_per_hour',
	
	title : T('title.actual_per_hour'),
	
	searchView : 'hcc_actual_per_hour_search',
	
	gridView : 'hcc_actual_per_hour_list'

});