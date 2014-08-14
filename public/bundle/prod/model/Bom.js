Ext.define('Prod.model.Bom', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product_name', type : 'string' },
		{ name : 'product_desc', type : 'string' },
		{ name : 'child_product_id', type : 'string' },
		{ name : 'child_product_name', type : 'string' },
		{ name : 'child_product_desc', type : 'string' },
		{ name : 'bom_type', type : 'string' },
		{ name : 'unit', type : 'string' },
		{ name : 'qty', type : 'float' },
		{ name : '_cud_flag_', type : 'string' }
	],

  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/boms',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});