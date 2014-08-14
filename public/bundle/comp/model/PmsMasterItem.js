Ext.define('Comp.model.PmsMasterItem', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'routing', type : 'string' },
		{ name : 'st_no', type : 'string' },
		{ name : 'st_seq_no', type : 'integer' },
		{ name : 'item_no', type : 'string' },
		{ name : 'item_name', type : 'string' },
		{ name : 'item_order', type : 'integer' },
		{ name : 'x_usl', type : 'float' },
		{ name : 'x_lsl', type : 'float' },
		{ name : 'r_usl', type : 'float' },
		{ name : 'r_lsl', type : 'float' },
		{ name : 'len', type : 'integer' },
		{ name : 'point_under_len', type : 'integer' },
		{ name : 'monitor_flg', type : 'boolean' },
		{ name : 'sqc_flg', type : 'string' },
		{ name : 'tsfr_flg', type : 'string' },
		{ name : 'unit', type : 'string' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/pms_master_items',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});