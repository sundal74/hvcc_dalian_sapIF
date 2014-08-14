Ext.define('Prod.view.line_stop_top10.LineStopTop10Search', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_line_stop_top10_search',
	
	items : [ { 
			xtype: 'daterange', 
			fieldLabel: T('label.work_date'), 
			name: 'work_date' 
		}, {
			xtype      : 'fieldcontainer',
		    fieldLabel : T('label.type'),
		    defaultType: 'radiofield',
		    defaults: {
		    	flex: 1
			},
			layout: 'hbox',
			items: [{
				boxLabel  : T('label.loss_count'),
				name      : 'grid_type',
				inputValue: 'loss_count'
				// checked   : true
			}, {
				boxLabel  : T('label.loss_term'),
		        name      : 'grid_type',
		        inputValue: 'loss_term'
			}]
		}, { 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Workcenter'
		}, { 
			fieldLabel : T('label.operation'), 
			name : 'operation.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Operation',
			associationField : ['workcenter.name-eq']
		}, { 
			fieldLabel : T('label.breakdown_code'), 
			name : 'breakdown_code-eq', 
			xtype : 'codecombo', 
			commonCode : 'BREAKDOWN_CODE', 
			displayField : 'description' 
		} ]
	
});