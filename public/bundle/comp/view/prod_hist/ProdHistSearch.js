Ext.define('Comp.view.prod_hist.ProdHistSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'comp_prod_hist_search',
	
	items : [
		{ xtype: 'daterange', fieldLabel: T('label.work_date'), name: 'work_date' },
		{
			xtype      : 'fieldcontainer',
		    fieldLabel : T('label.type'),
		    defaultType: 'radiofield',
		    defaults: {
		    	flex: 1
			},
			layout: 'hbox',
			items: [{
				boxLabel  : 'Raw Data',
				name      : 'view_type',
				inputValue: 'raw'
			}, {
				boxLabel  : 'History',
		        name      : 'view_type',
		        inputValue: 'history'
			}]
		},
		{ 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Workcenter',
			associationField : [ {
				name : 'dept_type-eq',
				value : function(host) {
					return '2';
				}
			} ]
		},
		{ 
			fieldLabel : T('label.operation'), 
			name : 'operation.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Operation',
			associationField : ['workcenter.name-eq']
		},
		{ 
			name : 'int_no-like', 
			fieldLabel : T('label.int_no') 
		}
	]
	
});