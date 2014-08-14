Ext.define('Hcc.view.ftt.Ftt3List', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_ftt3_list',
	
	useCheckBox : false,
	
	requires : ['Ext.ux.CheckColumn', 'Base.view.grid.HatioGroupSummary'],
		
	store : 'Hcc.store.Ftt3',

	features: [{
		ftype: 'groupingsummary',
		groupHeaderTpl: Ext.create('Ext.XTemplate',
				'<tpl if="name == \'Total\'">',
					'{name}',
				'<tpl else>',
					'WORKCENTER : {name}',
				'</tpl>'
		)
	}],
	
	columns : [
		{ header : T('label.operation'), dataIndex : 'operation', flex : 0.7 },
		{ header : T('label.operation_desc'), dataIndex : 'operation_desc', flex : 1.5 },
		{ header : T('label.machine'), dataIndex : 'machine', flex : 0.8 },
		{ header : T('label.machine_desc'), dataIndex : 'machine_desc', flex : 1.5 },
		{ header : T('label.product'), dataIndex : 'product', flex : 0.9 },
		{ header : T('label.product_desc'), dataIndex : 'product_desc', flex : 1.5 },
		{
			header : T('label.actual_qty'),
			flex : 0.6,
			dataIndex : 'actual_qty',
			summaryType: 'sum',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
			summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.defect'),
			flex : 0.6,
			dataIndex : 'defect_qty',
			summaryType: 'sum',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
			summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.rework_qty'),
			flex : 0.6,
			dataIndex : 'rework_qty',
			summaryType: 'sum',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
			summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.ftt'),
			flex : 0.6,
			dataIndex : 'ftt',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.precision')),
		}
	]
});