Ext.define('Hcc.view.defect_rate.DefectDetailPopup', {
	
	extend : 'Base.abstract.Popup',
	
	xtype : 'hcc_defect_detail_popup',
	
	title : T('title.details'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	width : 800,
	
	height : 450,
	
	autoScroll : true,
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'close']
	} ],

	record : null,
	
	items: [{
		xtype : 'grid',
		
		flex : 1,
		
		id : 'DefectDetailPopupGrid',
		
		store: Ext.create('Ext.data.Store', {
			fields: [ 
				{ name : 'work_date', type : 'date', dateWriteFormat : T('format.submitDate') },
				{ name : 'shift', type : 'string' },
				{ name : 'operation', type : 'string' },
				{ name : 'operation_desc', type : 'string' },
				{ name : 'machine', type : 'string' },
				{ name : 'machine_desc', type : 'string' },
				{ name : 'product', type : 'string' },
				{ name : 'product_desc', type : 'string' },
				{ name : 'child_product', type : 'string' },
				{ name : 'defect_code', type : 'string' },
				{ name : 'defect_code_desc', type : 'string' },
				{ name : 'defect_qty', type : 'integer' },
				{ name : 'description', type : 'string' }
			],
			proxy: {
				type : 'ajax',
				url : '/domains/' + login.current_domain_id + '/diy_selections/DefectRateDetail/query.json',
				format : 'json',
				reader : {
					type : 'json'
				}
			}
		}),

		columns : [
			{ header : T('label.work_date'), xtype : 'datecolumn', format : T('format.date'), dataIndex : 'work_date', align : 'center', width : 80 },
			{ header : T('label.shift'), dataIndex : 'shift', xtype : 'codecolumn', tpl : '{description}', commonCode : 'SHIFT', width : 50 },
			{ header : T('label.operation'), dataIndex : 'operation', width : 65 },
			{ header : T('label.operation_desc'), dataIndex : 'operation_desc', width : 120 },
			{ header : T('label.machine'), dataIndex : 'machine', width : 80 },
			{ header : T('label.machine_desc'), dataIndex : 'machine_desc', width : 120 },
			{ header : T('label.product'), dataIndex : 'product' },
			{ header : T('label.product_desc'), dataIndex : 'product_desc', width : 120 },
			/*{ header : T('label.child_product'), dataIndex : 'child_product', 
				renderer : function(value, meta, record, rowIndex, colIndex, store) {
					return HF.idToName(value);
				} 
			},*/
			{ header : T('label.defect_code'), dataIndex : 'defect_code', width : 80 },
			{ header : T('label.x_desc', {x : T('label.defect')}), dataIndex : 'defect_code_desc' },
			{ header : T('label.defect_qty'), dataIndex : 'defect_qty', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 75 },
			{ header : T('label.comment'), dataIndex : 'description', width : 200 }
		]
	} ]	
});