Ext.define('Comp.view.worst_top10.WorstTop10', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Comp.view.worst_top10.WorstTop10Search',
		'Comp.view.worst_top10.WorstTop10List'
	],
	
	xtype : 'comp_worst_top10',
	
	title : T('menu.WorstTop10'),
	
	searchView : 'comp_worst_top10_search',
	
	gridView : 'comp_worst_top10_list'

});