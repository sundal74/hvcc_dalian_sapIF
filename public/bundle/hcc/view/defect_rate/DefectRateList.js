Ext.define('Hcc.view.defect_rate.DefectRateList', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'hcc_defect_rate_list',
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	items : [{
		xtype : 'chart',
        animate: true,
        shadow: true,
        store: Ext.create('Ext.data.Store', {
			fields: [{
				name: 'workcenter'
			}, {
				name: 'defect_rate'
			}],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		
		flex : 4,
        axes: [
			{
            	type: 'Numeric',
            	minimum: 0,
            	position: 'left',
            	fields: ['defect_rate'],
            	title: T('title.defect_rate') + ' (%)',
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['workcenter']
        	}
		],
        series: [
			{
            	type: 'column',
            	highlight: {
                	size: 7,
                	radius: 7
            	},
				smooth: true,
            	axis: 'left',
            	xField: 'workcenter',
            	yField: ['defect_rate'],
				title: T('title.defect_rate'),
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 120,
					height : 25,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var defect_rate = (storeItem.get('defect_rate') ? storeItem.get('defect_rate') : '0');
						this.setTitle(T('title.defect_rate') + ' : ' + defect_rate);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['defect_rate'],
					display : 'insideEnd',
					renderer : function(value) {
						if(value != 0) {
							return value;
						}else {
							return '';
						}
					},
					contrast : true,
					color: '#333',
					font : '14px Arial'
				}
        	}
		]
	}, {
		xtype : 'grid',
		flex : 5,
		title : T('title.defect_rate'),
		store : 'Hcc.store.DefectRate',

		columns : [
			{ xtype : 'rownumberer' },
			{
				header : T('label.wc'),
				dataIndex : 'workcenter',
				flex : 1
			},
			{
				header : T('label.department'),
				dataIndex : 'dept',
				flex : 2
			},
			{
				header : T('label.operation'),
				dataIndex : 'operation',
				flex : 1
			},
			{
				header : T('label.operation_desc'),
				dataIndex : 'operation_desc',
				flex : 2
			},
			{
				header : T('label.actual_qty'),
				dataIndex : 'sum_actual_qty',
				summaryType: 'sum',
				align : 'right',
				flex : 1,
				renderer: Ext.util.Format.numberRenderer(T('format.number'))
			},
			{
				header : T('label.scrap_qty'),
				dataIndex : 'sum_defect_qty',
				summaryType: 'sum',
				align : 'right',
				flex : 1,
				renderer: Ext.util.Format.numberRenderer(T('format.number'))
			},
			{
				header : T('title.defect_rate') + ' (%)',
				dataIndex : 'defect_rate',
				summaryType: 'average',
				renderer: Ext.util.Format.numberRenderer('0,000.00'),
				align : 'right',
				flex : 1
			}
		]
	}]
	
	/*features: [{
		ftype: 'groupingsummary',
		groupHeaderTpl: Ext.create('Ext.XTemplate',
				'<tpl if="name == \'Total\'">',
					'{name}',
				'<tpl else>',
					'Workcenter : {name}',
				'</tpl>'
		)
	}],
	
	columns : [
		{
			header : T('label.operation'),
			dataIndex : 'operation'
		},
		{
			header : T('label.machine'),
			dataIndex : 'machine'
		},
		{
			header : T('label.actual_qty'),
			dataIndex : 'sum_actual_qty',
			summaryType: 'sum',
			align : 'right'
		},
		{
			header : T('label.scrap_qty'),
			dataIndex : 'sum_defect_qty',
			summaryType: 'sum',
			align : 'right'
		},
		{
			header : T('title.defect_rate'),
			dataIndex : 'defect_rate',
			summaryType: 'average',
			align : 'right'
		}
	]*/
});