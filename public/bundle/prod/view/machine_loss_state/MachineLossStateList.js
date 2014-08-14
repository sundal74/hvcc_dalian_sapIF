Ext.define('Prod.view.machine_loss_state.MachineLossStateList', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'prod_machine_loss_state_list',
		
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	thisYear : '',
	lastYear : '',

	items : [{
		xtype : 'chart',
        animate: true,
        shadow: true,
		legend: { position: 'top' },
        store: Ext.create('Ext.data.Store', {
			fields: [{
				name: 'name'
			}, {
				name: 'this_year'
			}, {
				name: 'last_year'
			}],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}),
		
		flex : 1,
        axes: [
			{
            	type: 'Numeric',
            	minimum: 0,
            	position: 'left',
            	fields: ['this_year', 'last_year'],
            	title: '',
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['name'],
            	title: T('label.month')
        	}
		],
        series: [
			{
            	type: 'column',
				itemId : 'test',
            	highlight: {
                	size: 7,
                	radius: 7
            	},
				smooth: true,
            	axis: 'left',
            	xField: 'name',
            	yField: ['this_year', 'last_year'],
				title: [],
				showInLegend: true,
				tips : {
					trackMouse : true,
					width : 90,
					height : 25,
					style: {
						background : '#ffff99'
					},
					renderer : function(storeItem, item) {
						var this_year = (storeItem.get('this_year') ? storeItem.get('this_year') : '0');
						var last_year = (storeItem.get('last_year') ? storeItem.get('last_year') : '0');
						if(item.yField == 'this_year') {
							this.setTitle(this_year);
						}else {
							this.setTitle(last_year);
						}
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['this_year', 'last_year'],
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
		title : T('title.machine_loss_state'),
        store: 'Prod.store.MachineLossState',
		//flex : 1,
	    enableLocking:  false,
		columns: [
			{ header : T('label.year'), dataIndex : 'year', align : 'center', flex : 1 },
			{ header : T('label.total'), dataIndex : 'total', align : 'center', flex : 1 },
			{ header : "1", dataIndex : 'data_1', align : 'center', flex : 1 },
			{ header : "2", dataIndex : 'data_2', align : 'center', flex : 1 },
			{ header : "3", dataIndex : 'data_3', align : 'center', flex : 1 },
			{ header : "4", dataIndex : 'data_4', align : 'center', flex : 1 },
			{ header : "5", dataIndex : 'data_5', align : 'center', flex : 1 },
			{ header : "6", dataIndex : 'data_6', align : 'center', flex : 1 },
			{ header : "7", dataIndex : 'data_7', align : 'center', flex : 1 },
			{ header : "8", dataIndex : 'data_8', align : 'center', flex : 1 },
			{ header : "9", dataIndex : 'data_9', align : 'center', flex : 1 },
			{ header : "10", dataIndex : 'data_10', align : 'center', flex : 1 },
			{ header : "11", dataIndex : 'data_11', align : 'center', flex : 1 },
			{ header : "12", dataIndex : 'data_12', align : 'center', flex : 1 }
		]
	}]

});