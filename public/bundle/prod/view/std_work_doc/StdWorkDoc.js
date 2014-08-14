Ext.define('Prod.view.std_work_doc.StdWorkDoc', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.std_work_doc.StdWorkDocSearch',
		'Prod.view.std_work_doc.StdWorkDocList'
	],
	
	xtype : 'prod_std_work_doc',
	
	title : T('title.std_work_doc'),
	
	searchView : 'prod_std_work_doc_search',
	
	gridView : 'prod_std_work_doc_list'
	
});