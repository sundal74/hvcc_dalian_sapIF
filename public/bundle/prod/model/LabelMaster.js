Ext.define('Prod.model.LabelMaster', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'product_id', type : 'string' },
		{ name : 'product', type : 'auto' },
		{ name : 'label_model_id', type : 'string' },
		{ name : 'label_model', type : 'auto' },
		{ name : 'customer', type : 'auto' },
		{ name : 'customer_id', type : 'string' },
		{ name : 'part_no', type : 'string' },
		{ name : 'part_name', type : 'string' },
		{ name : 'car_type', type : 'string' },
		{ name : 'car_name', type : 'string' },
		{ name : 'pallet_qty', type : 'integer' },
		{ name : 'cut_qty', type : 'integer' },
		{ name : 'ship_loc', type : 'string' },
		{ name : 'area', type : 'string' },
		{ name : 'customer_plant', type : 'string' },
		{ name : 'box_no', type : 'string' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/label_masters',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});