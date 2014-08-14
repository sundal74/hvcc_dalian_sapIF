Ext.define('Prod.view.department.Department', {
	
	extend: 'Base.abstract.entity.ListMainView',
	
 	requires : [ 
		'Prod.view.department.DepartmentSearch',
		'Prod.view.department.DepartmentList'
	],
	
	xtype : 'prod_department',
	
	title : T('title.department'),
	
	searchView : 'prod_department_search',
	
	gridView : 'prod_department_list'
	
});