Ext.define('Prod.model.RawMaterial', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'prod_type', type : 'string' },
		{ name : 'unit', type : 'string' },
		{ name : 'default_qty', type : 'integer' },
		{ name : 'loc_cd', type : 'string' },
		{ name : 'routing', type : 'string' },
		{ name : 'baseloc_cd', type : 'string' },
		{ name : 'qc_fg', type : 'string' },
		{ name : 'use_yn', type : 'string' },
		{ name : 'label_print_fg', type : 'string' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{type : 'presence', field : 'name'}
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/raw_materials',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});