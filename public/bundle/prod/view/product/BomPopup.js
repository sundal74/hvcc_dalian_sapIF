Ext.define('Prod.view.product.BomPopup', {

	extend : 'Base.abstract.Popup',

	xtype : 'prod_view_bom_popup',

	title : T('title.bom'),

	initComponent : function() {

		this.callParent(arguments);

		this.add({
			xtype : 'treepanel',

			autoScroll : true,

			//bodyPadding : 5,

			rootVisible : true,

			store : Ext.create('Ext.data.TreeStore', {
				fields : [
					{name: 'qty', type: 'string'},
					{name: 'bom_type', type: 'string'},
					{name: 'unit', type: 'string'},
					{name: 'name', type: 'string'},
					{name: 'id', type: 'string'},
					{name: 'text', type: 'string'},
					{name: 'description', type: 'string'},
					{name: 'leaf', type: 'boolean'},
					{name: 'expanded', type: 'boolean'}
				]
			}),

			columns : [{
				xtype: 'treecolumn',
				text: T('label.product'),
				flex: 1,
				dataIndex: 'name'
			}, {
				text: T('label.description'),
				flex: 2,
				dataIndex: 'description'
			}, {	
				text: T('label.usage'),
				flex: 0.5,
				dataIndex: 'qty',
				align : 'right'
			}, {
				text: T('label.unit'),
				flex: 0.5,
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
			}*/]
		});

	},

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
				description : record.child_product_desc,
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