Ext.define('Hcc.store.BarOutActualInf', {
	
	extend : 'Ext.data.Store',
	
	fields : [
		{ name : 'work_date', type : 'string' },
		{ name : 'product', type : 'string' },
		{ name : 'loc_from', type : 'string' },
		{ name : 'loc_to', type : 'string' },
		{ name : 'barcode', type : 'string' },
		{ name : 'ifc', type : 'string' },
		{ name : 'erp', type : 'string' }
	],
	
	autoLoad : false,
	
	remoteFilter : true,
	
	pageSize : 100,
	
	proxy : {
		type : 'ajax',
		url : '/domains/' + login.current_domain_id + '/diy_selections/BarOutActualInf2/query.json',
		format : 'json',
		timeout : 60000,
		reader : {
			type : 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
		}
	}
});