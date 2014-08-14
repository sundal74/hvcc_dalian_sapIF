Ext.define('Prod.view.notice.Notice', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.notice.NoticeSearch',
		'Prod.view.notice.NoticeList'
	],
	
	xtype : 'prod_notice',
	
	title : T('title.notice'),
	
	searchView : 'prod_notice_search',
	
	gridView : 'prod_notice_list'
	
});