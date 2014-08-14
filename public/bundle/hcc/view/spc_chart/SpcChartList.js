Ext.define('Hcc.view.spc_chart.SpcChartList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_spc_chart_list',
	
	useCheckBox : false,
	
	title : T('title.spc_summary'),
	
	store : Ext.create('Ext.data.Store', {
		fields: [{
			name: 'work_date'
		}, {
			name: 'seq'
		}, {
			name: 'x_val'
		}, {
			name: 'val1'
		}, {
			name: 'val2'
		}, {
			name: 'val3'
		}, {
			name: 'val4'
		}, {
			name: 'val5'
		}, {
			name: 'r_val'
		}, {
			name: 'x_usl'
		}, {
			name: 'x_lsl'
		}, {
			name: 'r_usl'
		}, {
			name: 'r_lsl'
		}],
		proxy: {
			type: 'memory',
			reader: {
				type: 'json'
			}
		}
	}),

	columns : [
		{ header : T('label.work_date'), dataIndex : 'work_date', xtype : 'datecolumn', format : T('format.date'), align : 'center' },
		{ header : T('label.seq'), dataIndex : 'seq', flex : 0.8, align : 'right' },
		{ header : T('label.x_val'), dataIndex : 'x_val', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.raw_val', {x : '1'}), dataIndex : 'val1', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.raw_val', {x : '2'}), dataIndex : 'val2', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.raw_val', {x : '3'}), dataIndex : 'val3', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.raw_val', {x : '4'}), dataIndex : 'val4', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.raw_val', {x : '5'}), dataIndex : 'val5', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.r_val'), dataIndex : 'r_val', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		/*{ header : T('label.x_usl'), dataIndex : 'x_usl', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.x_lsl'), dataIndex : 'x_lsl', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.r_usl'), dataIndex : 'r_usl', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },
		{ header : T('label.r_lsl'), dataIndex : 'r_lsl', renderer: Ext.util.Format.numberRenderer('0.000'), flex : 1, align : 'right' },*/
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->']
	} ]
});