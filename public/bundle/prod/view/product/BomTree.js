Ext.define('Prod.view.product.BomTree', {

	extend : 'Ext.tree.Panel',

	xtype : 'prod_bom_tree',
	
	title : T('title.bom'),
	
	autoScroll : true,

	bodyPadding : 5,

	rootVisible : true,
		
	store : Ext.create('Ext.data.TreeStore', {
		fields : [
			{name: 'qty', type: 'string'},
			{name: 'bom_type', type: 'string'},
			{name: 'unit', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'id', type: 'string'},
			{name: 'text', type: 'string'},
			{name: 'leaf', type: 'boolean'},
			{name: 'expanded', type: 'boolean'}
		]
	}),
		
	columns : [{
		xtype: 'treecolumn',
		text: T('label.product'),
		flex: 1,
		sortable: true,
		dataIndex: 'name'
	}, {	
		text: T('label.usage'),
		flex: 1,
		sortable: true,
		dataIndex: 'qty',
		align : 'left'
	}, {
		text: T('label.unit'),
		flex: 1,
		sortable: true,
		dataIndex: 'unit',
		align : 'center'
	}/*, {
		xtype : 'codecolumn',
		commonCode : 'BOM_TYPE',
		tpl : '{description}',
		text: T('label.bom_type'),
		flex: 1,
		sortable: true,
		dataIndex: 'bom_type'
	}*/],
	
	getTreeChildren : function(records) {
		var self = this;
		children = [];
		Ext.each(records, function(record) {
			dirElement = { 
				id : record.id, 
				qty : record.qty,
				bom_type : record.bom_type, 
				unit : record.unit,
				name : record.name,
				text : record.name,
				leaf : true,
				expanded : true
			};
			children.push(dirElement);
		});
		
		return children;
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'close']
	} ]
});