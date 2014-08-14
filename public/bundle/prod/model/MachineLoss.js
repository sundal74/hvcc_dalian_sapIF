Ext.define('Prod.model.MachineLoss', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'domain_id', type : 'string' },
		{ name : 'work_date', type : 'date', dateWriteFormat : T('format.submitDate') },
		{ name : 'shift', type : 'string' },
		{ name : 'prod_order_id', type : 'string' },
		{ name : 'workcenter_id', type : 'string' },
		{ name : 'workcenter', type : 'auto' },
		{ name : 'operation_id', type : 'string' },
		{ name : 'operation', type : 'auto' },
		{ name : 'machine_id', type : 'string' },
		{ name : 'machine', type : 'auto' },
		{ name : 'status', type : 'string' },
		{ name : 'reporter_id', type : 'string' },
		{ name : 'reporter', type : 'auto' },
		{ name : 'maintainer_id', type : 'string' },
		{ name : 'maintainer', type : 'auto' },
		{ name : 'breakdown_code', type : 'string' },
		{ name : 'event_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'maint_start_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'maint_end_time', type : 'date', dateWriteFormat : T('format.submitDatetime') },
		{ name : 'loss_term', type : 'integer' },
		{ name : 'maint_term', type : 'integer' },
		{ name : 'reporter_comment', type : 'string' },
		{ name : 'maint_comment', type : 'string' },
		{ name : 'line_stop_flag', type : 'boolean' },
		{ name : 'maintainer_count', type : 'integer' },
		{ name : 'creator_id', type : 'string' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater_id', type : 'string' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' },
		{ name : 'updated_at', type : 'date' },
		{ name : 'elapsed_time', type : 'integer' },
		{ name : '_cud_flag_', type : 'string' }
	],
	
  	proxy: {
		type: 'rest',
		url : '/domains/' + login.current_domain_id + '/machine_losses',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json'
        }
	}
});