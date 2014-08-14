Ext.define('Hcc.view.m_h_actual.MHActualList', {
	
	extend : 'Base.abstract.entity.ReportGridView',
	
	xtype : 'hcc_m_h_actual_list',
	
	useCheckBox : false,
	
	requires : ['Ext.ux.CheckColumn', 'Base.view.grid.HatioGroupSummary'],
		
	store : 'Hcc.store.MHActual',

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
		// { header : T('label.option'), dataIndex : 'customer', flex : 0.6 },
		{
			header : T('label.plan_qty'),
			flex : 0.6,
			dataIndex : 'order_qty',
			summaryType: 'sum',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
			summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
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
			header : T('label.scrap_qty'),
			flex : 0.6,
			dataIndex : 'scrap_qty',
			summaryType: 'sum',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.number')),
			summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
		},
		{
			header : T('label.achievement_rate'),
			flex : 0.8,
			dataIndex : 'achv_rate',
			align : 'right',
			renderer: Ext.util.Format.numberRenderer(T('format.precision')),
		}
	]
});