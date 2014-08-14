Ext.define('Prod.view.department.DepartmentSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_department_search',
		
	items : [
		{ fieldLabel : T('label.code'), name : 'name-like' },
		{ fieldLabel : T('label.description'), name : 'description-like' }
	]
	
});