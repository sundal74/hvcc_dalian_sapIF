Ext.define('Prod.view.line_stop_top10.LineStopTop10', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.line_stop_top10.LineStopTop10Search',
		'Prod.view.line_stop_top10.LineStopTop10List'
	],
	
	xtype : 'prod_line_stop_top10',
	
	title : T('title.x_top10', {'x' : T('title.machine_loss')}),
	
	searchView : 'prod_line_stop_top10_search',
	
	gridView : 'prod_line_stop_top10_list'

});