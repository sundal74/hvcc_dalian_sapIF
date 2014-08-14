Ext.define('Hcc.view.overall_efficiency.OverallEfficiency2List', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'hcc_overall_efficiency2_list',
	
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
				name: 'prod_eff'
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
            	fields: ['prod_eff'],
            	title: T('label.prod_eff'),
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
            	yField: ['prod_eff'],
				title: T('label.prod_eff'),
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 160,
					height : 50,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var prod_eff = (storeItem.get('prod_eff') ? storeItem.get('prod_eff') : '0');
						var op = storeItem.get('operation');
						var title = T('label.operation') + ':' + op + '<br/>' + T('label.prod_eff') + ' : ' + Ext.util.Format.number(prod_eff, '0,000.00')
						this.setTitle(title);
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['prod_eff'],
					display : 'insideEnd',
					renderer : function(value) {
						if(value != 0) {
							return Ext.util.Format.number(value, '0,000.00');
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
		// title : T('title.overall_efficiency2'),
		store : 'Hcc.store.OverallEfficiency2',
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
				header : T('label.plan_qty'),
				dataIndex : 'order_qty',
				align : 'right',
				flex : 1,
				renderer: Ext.util.Format.numberRenderer('0,000')
			},
			{
				header : T('label.actual_qty'),
				dataIndex : 'actual_qty',
				align : 'right',
				flex : 1,
				renderer: Ext.util.Format.numberRenderer('0,000')
			},
			{
				header : T('label.input_worktime'),
				dataIndex : 'input_worktime',
				align : 'right',
				flex : 1,
				renderer: Ext.util.Format.numberRenderer('0,000')
			},
			{
				header : T('label.net_worktime'),
				dataIndex : 'net_worktime',
				align : 'right',
				flex : 1,
				renderer: Ext.util.Format.numberRenderer('0,000')
			},
			{ 
				header : T('label.machine_cycletime'), 
				dataIndex : 'machine_ct',
				flex : 1.2,
				align : 'right'
			},
			{
				header : T('label.loss_worktime'),
				dataIndex : 'loss_worktime',
				align : 'right',
				flex : 1,
				renderer: Ext.util.Format.numberRenderer('0,000')
			},
			{
				header : T('label.real_worktime'),
				dataIndex : 'real_worktime',
				align : 'right',
				flex : 1,
				renderer: Ext.util.Format.numberRenderer('0,000')
			},
			{
				header : T('label.prod_eff'),
				dataIndex : 'prod_eff',
				align : 'right',
				flex : 1,
				renderer: function(value) {
					return Ext.util.Format.number(value * 100, '0,000.00');
				}
			}
		]
	}]
});