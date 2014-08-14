/**
 * LineStop Main
 */
Ext.define('Term.view.lnst.OpLnstM010', {
	
	extend: 'Base.abstract.Panel',

	xtype: 'term_lnst_oplnstm010',
	
	requires : ['Prod.store.MachineLoss'],
	
	title : T('title.machine_loss'),
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	store : Ext.create('Prod.store.MachineLoss'),
	
	initComponent : function() {
		this.items = [ 
			this.createGridPart(this),
		];
		
		this.callParent();
		var pagingtoolbar = this.down(' pagingtoolbar');
		pagingtoolbar.bindStore(this.store);
		
		this.store.on('load', function(store) {
			if(store.getTotalCount() > store.getCount()) {
				pagingtoolbar.show();
			} else {
				pagingtoolbar.hide();
			}
		});
	},
	
	createGridPart : function(view) {
		return {
			xtype: 'grid',
			flex : 1,
			scroll: true,
			store: this.store,
			columns: [{
				xtype: 'actioncolumn',
				header: T('label.status'),
				itemId: 'line_stop_adjust',
				align : 'center',
				width : 65,
				renderer: function(value, metaData, record, row, col, store, gridView) {
					if(record.get("status") == "1") {
						return "<img src=\"theme/imageOPS/line_status_1.png\"/>";
					} else {
						return "<img src=\"theme/imageOPS/line_status_2.png\"/>";
					}
				}
			}, {
				xtype: 'datecolumn',
				header: T('label.work_date'),
				dataIndex: 'work_date',
				format : T('format.date'),
				align : 'center',
				width : 110
			}, {
				header: T('label.operation'),
				dataIndex: 'operation',
				xtype : 'entitycolumn',
				flex: 0.5
			}, {
				header: T('label.operation_desc'),
				dataIndex: 'operation',
				flex: 1,
				renderer: function(value, metaData, record, row, col, store, gridView) {
					return record.get('operation').desc;
				}
			}, {
				header: T('label.machine'),
				dataIndex: 'machine',
				xtype : 'entitycolumn',
				flex: 0.6
			}, {
				header: T('label.machine_desc'),
				dataIndex: 'machine',
				flex: 1,
				renderer: function(value, metaData, record, row, col, store, gridView) {
					return record.get('machine').desc;
				}
			}, {
				xtype: 'datecolumn',
				header: T('label.event_time'),
				dataIndex: 'event_time',
				format : T('format.time_without_sec'),
				align: 'center',
				flex: 0.6
			}, {
				header: T('label.reporter'),
				dataIndex: 'reporter',
				xtype : 'entitycolumn',
				flex: 0.8,
			}, {
				header: T('label.breakdown_code'),
				dataIndex: 'breakdown_code',
				xtype : 'codecolumn',
				tpl : '{description}', 
				commonCode : 'BREAKDOWN_CODE',
				flex: 0.9
			}, {
				xtype: 'actioncolumn',
				icon: 'theme/imageOPS/btnDetailDeclare.png',
				itemId : 'line_stop_report',
				width : 35,
				align : 'center'
			} ],
			bbar : {
				xtype : 'pagingtoolbar',
				cls : 'pagingToolbar',
		        displayInfo: true,
		        displayMsg: T('text.Paging Toolbar Display Message'),
		        emptyMsg: T('text.Paging Toolbar Empty Message'),
				hidden : true
			},
		}
	}
});
