Ext.define('Prod.view.prod_closing.ProdClosingList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	requires : ['Base.view.grid.HatioGroupSummary'],
	
	xtype : 'prod_prod_closing_list',
	
	store : 'Prod.store.ProdClosing',
	
	useCheckBox : false,
	
	features: [ {
		ftype : 'groupingsummary',
		groupHeaderTpl : Ext.create('Ext.XTemplate', '<tpl>WORKCENTER : {name}</tpl>')
	} ],
	
	columns : [
		{ 
			header: T('label.status'),
			dataIndex : 'closed_flag',
			xtype : 'actioncolumn',
			width : 60,
			align : 'center',
			renderer : function(value, metaData, record, row, col, store, gridView) {
				if(record.get("closed_flag") == true) {
					this.items[0].icon = 'theme/image/statusGray.png';
					this.items[0].tooltip = 'Completed';
				} else {
					this.items[0].icon = 'theme/image/statusYellow.png';
					this.items[0].tooltip = 'Waiting';
				}
				return '';
			},
			items: [ {
				icon: '',
				tooltip: ''
			} ]
		},
		{ dataIndex : 'id', hidden : true },
		{ dataIndex : 'work_date', hidden : true },
		{ dataIndex : 'operation_id', hidden : true },
		{ header : T('label.operation'), dataIndex : 'operation', flex : 1 },
		{ header : T('label.operation_desc'), dataIndex : 'operation_desc', flex : 2 },
		{ header : T('label.x_id', {x : T('label.manager')}), dataIndex : 'closer_id', flex : 1 },
		{ header : T('label.x_name', {x : T('label.manager')}), dataIndex : 'closer_name', flex : 1.3 },
		{ header : T('label.end_time'), dataIndex : 'closed_at', xtype : 'datecolumn', format : T('format.datetime'), flex : 1.3 },
		{ 
			header: T('button.confirm'),
			itemId : 'confirm',
			dataIndex : 'closable',
			width : 60,
			align : 'center',
			renderer : function(value, metaData, record, row, col, store, gridView) {
				if(value == 'Y' && record.get('closed_flag') != true) {
					return "<img src=theme/image/drop-yes-1.gif>";
				} else {
					return '';
				}
			}
		},
	],
	dockedItems: [ {
		xtype: 'controlbar',
		items: []
	} ]
});