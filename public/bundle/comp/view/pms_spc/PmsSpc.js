Ext.define('Comp.view.pms_spc.PmsSpc', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
 		'Comp.view.pms_spc.PmsSpcSearch',
		'Comp.view.pms_spc.PmsSpcList',
 		'Ext.ux.IFrame'
 	],
 	
 	searchView : 'comp_pms_spc_search',
	
	xtype : 'comp_pms_spc',
	
	title : T('title.spc_chart'),
	
	items : [ {
		xtype : 'uxiframe',
		src : '/spc_chart',
		title : 'SPC Chart',
		height : 550,
		margin : '0 -10 0 0'
	}, {
		xtype : 'comp_pms_spc_list'
	} ],

	dockedItems: [ {
		xtype: 'controlbar',
		items: []
	} ]
});