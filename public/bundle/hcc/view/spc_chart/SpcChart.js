Ext.define('Hcc.view.spc_chart.SpcChart', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
 		'Hcc.view.spc_chart.SpcChartSearch',
		'Hcc.view.spc_chart.SpcChartList',
 		'Ext.ux.IFrame'
 	],
 	
 	searchView : 'hcc_spc_chart_search',

	//gridView : 'hcc_spc_chart_list',
	
	xtype : 'hcc_spc_chart',
	
	title : T('title.spc_chart'),
	
	items : [ {
		xtype : 'uxiframe',
		src : '/spc_chart',
		title : 'SPC Chart',
		height : 550,
		margin : '0 -10 0 0'
	}, {
		xtype : 'hcc_spc_chart_list'
	} ],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'import', 'export']
	} ]
});