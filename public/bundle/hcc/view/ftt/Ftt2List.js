Ext.define('Hcc.view.ftt.Ftt2List', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'hcc_ftt2_list',
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	requires : ['Ext.ux.CheckColumn', 'Base.view.grid.HatioGroupSummary'],
	
	items : [{
		xtype : 'chart',
        animate: true,
        shadow: true,
        store: Ext.create('Ext.data.Store', {
			fields: [{
				name: 'operation'
			}, {
				name: 'ftt_value'
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
            	fields: ['ftt_value'],
            	title: T('label.ftt'),
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['operation']
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
            	xField: 'operation',
            	yField: ['ftt_value'],
				title: T('label.ftt'),
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 130,
					height : 30,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var ftt = (storeItem.get('ftt_value') ? Ext.util.Format.number(storeItem.get('ftt_value'), '0,000.00') : '0');
						var op = storeItem.get('operation');
						var title = op + ' : ' + ftt + '(%)';
						this.setTitle(title);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['ftt_value'],
					display : 'insideEnd',
					renderer : function(value) {
						if(value != 0) {
							return Ext.util.Format.number(value, '0,000.00');
						} else {
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
		// title : T('title.ftt2'),
		store : 'Hcc.store.Ftt2',
		flex : 5,

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
			{ header : T('label.operation'), dataIndex : 'operation', flex : 1.5 },
			{ header : T('label.operation_desc'), dataIndex : 'operation_desc', flex : 2 },
			{ header : T('label.machine'), dataIndex : 'machine', flex : 1.5 },
			{ header : T('label.machine_desc'), dataIndex : 'machine_desc', flex : 2 },
			{
				header : T('label.input_qty'),
				dataIndex : 'input_qty',
				// summaryType: 'sum',
				align : 'right', 
				flex : 1,
				renderer: Ext.util.Format.numberRenderer(T('format.number'))
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
			},
			{
				header : T('label.defect_qty'),
				dataIndex : 'defect_qty',
				// summaryType: 'sum',
				align : 'right', 
				flex : 1,
				renderer: Ext.util.Format.numberRenderer(T('format.number'))
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
			},
			{
				header : T('label.rework_qty'),
				dataIndex : 'rework_qty',
				// summaryType: 'sum',
				align : 'right', 
				flex : 1,
				renderer: Ext.util.Format.numberRenderer(T('format.number'))
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
			},
			{
				header : T('label.ftt'),
				dataIndex : 'ftt_value',
				// summaryType: 'average',
				align : 'right', 
				flex : 1,
				renderer: function(value) {
					return Ext.util.Format.number(value*100, '0,000.00');
				},
				// summaryRenderer: Ext.util.Format.numberRenderer(T('format.number'))
			}
		]
	}]
});