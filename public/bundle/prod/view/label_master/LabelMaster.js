Ext.define('Prod.view.label_master.LabelMaster', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.label_master.LabelMasterSearch',
		'Prod.view.label_master.LabelMasterList'
	],
	
	xtype : 'prod_label_master',
	
	title : T('title.label_master'),
	
	searchView : 'prod_label_master_search',
	
	gridView : 'prod_label_master_list'
	
});