Ext.define('Hcc.store.BarInActualInf2', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'work_date', type : 'string' },
		{ name : 'product', type : 'string' },
		{ name : 'mes', type : 'string' },
		{ name : 'barcode', type : 'string' },
		{ name : 'ifc', type : 'string' },
		{ name : 'erp', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	pageSize : 100,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/BarInActualInf2/query.json',
		format : 'json',
		reader : {
			type : 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
		}
	}
});