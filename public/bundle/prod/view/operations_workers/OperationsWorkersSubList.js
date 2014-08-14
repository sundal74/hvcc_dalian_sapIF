Ext.define('Prod.view.operations_workers.OperationsWorkersSubList', {
	
	extend : 'Ext.grid.Panel',
	
	xtype : 'prod_operations_workers_sub_list',
	
	title : T('title.operator'),

	selType : 'cellmodel', 
	
	selModel : Ext.create('Ext.selection.CheckboxModel', { pruneRemoved : false, mode: 'SINGLE' }),
	
	plugins :  [ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	}) ],
	
	store: Ext.create('Ext.data.Store', {
		fields: [ {
			name: 'prod_dept', type : 'string'
		}, {
			name: 'user', type : 'auto'
		}, {
			name: 'manager_flag', type : 'boolean'
		} ],
		proxy: {
			type : 'ajax',
			//url : '/domains/' + login.current_domain_id + '/diy_selections/ListOperationsUsers/query.json',
			url : '/domains/' + login.current_domain_id + '/operations/list_operator.json',
			format : 'json',
			reader : {
				type : 'json'
			}
		}
	}),
	
	columns : [ {
		text : T('label.x_id', {x : T('label.operator')}),
		dataIndex : 'user',
		flex : 1,
		xtype : 'entitycolumn',
		defaultRenderer : function(v) {
			if(v) {
				return v.id;
			}
		},
		editor : {
			xtype: 'entityfield',
			displayAttribute : 'login',
			storeClass: 'Base.store.User',
			pickerConfig : {
				column_1_data_index : 'login',
				column_1_empty_text : T('label.login'),
				column_2_data_index : 'name',
				column_2_empty_text : T('label.name')
			},
		}
	}, {
		text : T('label.x_name', {x : T('label.operator')}),
		dataIndex : 'user',
		flex : 1.2,
		renderer : function(val) {
			return val ? val.name : '';
		}
	}, {
		text : T('label.department'),
		dataIndex : 'prod_dept',
		flex : 2
	}, {
		text : 'Manager',
		dataIndex : 'manager_flag',
		xtype : 'checkcolumn',
		inputValue : true,
		width : 70
	}, {
		xtype : 'actioncolumn',
		align : 'center',
		width : 50,
		icon: 'theme/imageOPS/btnDelete.png',
		handler: function(grid, rowIndex, colIndex, item, e, record) {
			grid.getStore().removeAt(rowIndex, 1);
		}
	} ],
	
	listeners: {
        'edit': {
            fn: function(editor, e){
				if(e.record.get('user')) {
					e.record.set('id', e.record.get('user').id);
				}
            },
            scope: this
        }
    },
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'import', 'add', 'save', 'update']
	} ]
});