Ext.define('Prod.view.bom.BomList', {
	
	extend : 'Ext.tree.Panel',
	
	xtype : 'prod_bom_list',
	
	requires : ['Base.view.grid.BomTreeColumn'],
	
	rootVisible: false,
	
	prodStore : Ext.create('Prod.store.Product'),

	store : Ext.create('Ext.data.TreeStore', {
		fields : [
			// BOM Popup에서 추가, 수정, 삭제를 하므로 트리에서는 별도 액션은 하지 않는다. 
			//{name: 'checked', type: 'boolean'},
			{name: 'qty', type: 'float'},
			{name: 'bom_type', type: 'string'},
			{name: 'unit', type: 'string'},
			{name: 'name', type: 'string'},
			{name: 'description', type: 'string'},
			{name: 'id', type: 'string'},
			{name: 'text', type: 'string'},
			{name: 'leaf', type: 'boolean'},
			{name: 'expanded', type: 'boolean'},
			{name: 'init', type: 'init'},
			{name: 'parentProduct', type: 'parentProduct'}
		],
	}),
	
	columns : [{
		xtype: 'bomTreeColumn',
		text: T('label.product'),
		flex: 1.5,
		sortable: false,
		dataIndex: 'name'
	},{
		text: T('label.description'),
		flex: 2,
		dataIndex: 'description'
	},{	
		text: T('label.usage'),
		flex: 1,
		sortable: false,
		dataIndex: 'qty',
		align : 'right'
	}, {
		text: T('label.unit'),
		flex: 1,
		sortable: false,
		dataIndex: 'unit',
		align : 'center'
	}/*, {
		xtype : 'codecolumn',
		tpl : '{description}',
		commonCode : 'BOM_TYPE',
		text: T('label.bom_type'),
		flex: 1,
		sortable: true,
		dataIndex: 'bom_type',
		align : 'center'
	}*/],
	
	bbar: {
		xtype : 'pagingtoolbar',
		cls : 'pagingToolbar',
        displayInfo: true,
        displayMsg: 'Items {0} - {1} of {2}',
        emptyMsg: "No items to display",
		hidden : true
    },

	initComponent : function() {
		var self = this;
		this.callParent();
		
		var pagingtoolbar = this.down('pagingtoolbar');
		pagingtoolbar.bindStore(this.prodStore);
		this.prodStore.on('load', function(store) {
			
			var results = [];
			store.each(function(record) {
				results.push(record.data);
			});
			
			var treeItem = self.getTreeRoot(results);
			var root = {
				name: 'root', description : '', qty : '', leaf : false, expanded : false, init : false, children: []
			};
			self.store.setRootNode(root);
			var rootNode = self.store.getRootNode();
			
			for(var i = 0; i < treeItem.length; i++) {
				rootNode.appendChild(treeItem[i])
			}
						
			if(store.getTotalCount() > store.getCount()) {
				pagingtoolbar.show();
			} else {
				pagingtoolbar.hide();
			}
		});
	},
	
	getTreeRoot : function(records) {
		var self = this;
		children = [];
		Ext.each(records, function(record) {
			dirElement = { 
				id : record.id, 
				qty : '',
				bom_type : '', 
				unit : '',
				name : record.name,
				description : record.description,
				text : record.name,
				leaf : false,
				expanded : false,
				init:false, 
				children: [ {name : '', leaf : true} ],
				//checked:false,
				parentProduct:true
			};
			children.push(dirElement);
		});

		return children;
	},
	
	getTreeChildren : function(records,checked, parentId) {
		var self = this;
		children = [];
		Ext.each(records, function(record) {
			console.log(record);
			dirElement = { 
				id : record.id, 
				qty : record.qty,
				bom_type : record.bom_type, 
				unit : record.unit,
				name : record.name,
				description : record.child_product_desc,
				text : record.name,
				leaf : true,
				expanded : true,
				//checked:checked,
				parentProduct:false,
				parent_product_id:parentId
			};
			children.push(dirElement);
		});

		return children;
	}
});