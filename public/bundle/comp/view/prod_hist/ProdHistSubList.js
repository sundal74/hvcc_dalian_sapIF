Ext.define('Comp.view.prod_hist.ProdHistSubList', {
	
	extend : 'Ext.grid.Panel',
	
	xtype : 'comp_prod_hist_sub_list',
	
	store: Ext.create('Ext.data.Store', {
		fields: [ {
			name: 'routing',
			type : 'string'			
		}, {
			name: 'int_no',
			type : 'string'
		}, {
			name: 'ser_no',
			type : 'string'
		}, {
			name: 'p_code',
			type : 'string'
		}, {
			name: 'st_no',
			type : 'string'
		}, {
			name: 'updated_at',
			type : 'date'
		} ],
		proxy: {
			type : 'ajax',
			url : '/domains/' + login.current_domain_id + '/diy_selections/PmsHistSubData/query.json',
			format : 'json',
			reader : {
				type : 'json'
			}
		}
	}),
	
	columns : [{
		dataIndex : 'routing',
		hidden : true
	}, {
		dataIndex : 'int_no',
		hidden : true
	}, {
		dataIndex : 'ser_no',
		hidden : true
	}, {
		text : T('label.p_code'),
		dataIndex : 'p_code',
		flex : 1
	}, {
		text : T('label.st_no'),
		dataIndex : 'st_no',
		flex : 1,
	}, {
		text : T('label.updated_at'),
		dataIndex : 'updated_at',
		xtype : 'datecolumn', 
		format : T('format.datetime'), 
		align : 'center',
		flex : 1
	}]
});