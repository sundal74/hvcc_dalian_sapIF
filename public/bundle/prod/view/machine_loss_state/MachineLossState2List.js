Ext.define('Prod.view.machine_loss_state.MachineLossState2List', {
	
	extend : 'Base.abstract.Panel',
	
	xtype : 'prod_machine_loss_state2_list',
		
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
				name: 'this_day'
			}, {
				name: 'last_day'
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
            	fields: ['this_day', 'last_day'],
            	title: '',
            	minorTickSteps: 1,
            	grid: true
        	}, 
			{
            	type: 'Category',
            	position: 'bottom',
            	fields: ['name'],
            	title: T('label.day')
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
            	xField: 'name',
            	yField: ['this_day', 'last_day'],
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
						var this_day = (storeItem.get('this_day') ? storeItem.get('this_day') : '0');
						var last_day = (storeItem.get('last_day') ? storeItem.get('last_day') : '0');
						if(item.yField == 'this_day') {
							this.setTitle(this_day);
						}else {
							this.setTitle(last_day);
						}
					}
				},
				highlight : {
					segment : {
						margin : 20
					}
				},
				label : {
					field : ['this_day', 'last_day'],
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
					font : '10px Arial'
				}
        	}
		]
	}, {
		xtype : 'grid',
		title : T('title.machine_loss_state2'),
        store: 'Prod.store.MachineLossState2',
		//flex : 1,
	    enableLocking:  false,
		columns: [
			{ header : T('label.year'), dataIndex : 'year', align : 'center', witdh : 60 },
			{ header : T('label.month'), dataIndex : 'month', align : 'center', width : 60 },
			{ header : T('label.total'), dataIndex : 'total', align : 'center', width : 60 },
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
			{ header : "12", dataIndex : 'data_12', align : 'center', flex : 1 },
			{ header : "13", dataIndex : 'data_13', align : 'center', flex : 1 },
			{ header : "14", dataIndex : 'data_14', align : 'center', flex : 1 },
			{ header : "15", dataIndex : 'data_15', align : 'center', flex : 1 },
			{ header : "16", dataIndex : 'data_16', align : 'center', flex : 1 },
			{ header : "17", dataIndex : 'data_17', align : 'center', flex : 1 },
			{ header : "18", dataIndex : 'data_18', align : 'center', flex : 1 },
			{ header : "19", dataIndex : 'data_19', align : 'center', flex : 1 },
			{ header : "20", dataIndex : 'data_20', align : 'center', flex : 1 },
			{ header : "21", dataIndex : 'data_21', align : 'center', flex : 1 },
			{ header : "22", dataIndex : 'data_22', align : 'center', flex : 1 },
			{ header : "23", dataIndex : 'data_23', align : 'center', flex : 1 },
			{ header : "24", dataIndex : 'data_24', align : 'center', flex : 1 },
			{ header : "25", dataIndex : 'data_25', align : 'center', flex : 1 },
			{ header : "26", dataIndex : 'data_26', align : 'center', flex : 1 },
			{ header : "27", dataIndex : 'data_27', align : 'center', flex : 1 },
			{ header : "28", dataIndex : 'data_28', align : 'center', flex : 1 },
			{ header : "29", dataIndex : 'data_29', align : 'center', flex : 1 },
			{ header : "30", dataIndex : 'data_30', align : 'center', flex : 1 },
			{ header : "31", dataIndex : 'data_31', align : 'center', flex : 1 }
		]
	}]

});