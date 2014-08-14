Ext.define('Prod.view.operations_defects.OperationsDefectsSubList', {
	
	extend : 'Ext.grid.Panel',
	
	xtype : 'prod_operations_defects_sub_list',
	
	title : T('title.operator'),

	selType : 'cellmodel', 
	
	plugins :  [ Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit : 1
	}) ],
	
	store : Ext.create('Prod.store.OperationsDefects'),
	
	columns : [ {
		text : T('label.defect_code'),
		dataIndex : 'defect_code',
		flex : 1,
		xtype : 'entitycolumn',
		editor : {
			xtype: 'entityfield',
			storeClass: 'Prod.store.DefectCode'
		}
	}, {
		text : T('label.description'),
		dataIndex : 'defect_code',
		flex : 1,
		renderer : function(val) {
			return val.desc;
		}
	}, {
		xtype : 'actioncolumn',
		align : 'center',
		width : 50,
		icon : 'theme/imageOPS/btnDelete.png',
		handler : function(grid, rowIndex, colIndex, item, e, record) {
			grid.getStore().removeAt(rowIndex, 1);
		}
	} ],
	
	listeners : {
        'edit': {
            fn : function(editor, e) {
				if(e.record.get('defect_code')) {
					e.record.set('id', e.record.get('defect_code').id);
				}
            },
            scope : this
        }
    },
	
	dockedItems : [ {
		xtype : 'controlbar',
		items : ['->', 'import', 'add', 'save']
	} ]
});