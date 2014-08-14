Ext.define('Prod.view.machine_loss_state.MachineLossStateSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	requires : ['Base.store.Year'],
	
	xtype : 'prod_machine_loss_state_search',
	
	items : [
		{ 
			fieldLabel : T('label.year'), 
			name : 'plan_year-eq', 
			xtype : 'combo', 
			queryMode: 'local', 
			store : Ext.create('Base.store.Year'),
			displayField : 'name', 
			valueFiled : 'value' 
		},
		{ 
			fieldLabel : T('label.compare_year'),
			name : 'comparison_year-eq', 
			xtype : 'combo', 
			queryMode: 'local', 
			store : Ext.create('Base.store.Year'),
			displayField : 'name', 
			valueFiled : 'value' 
		},
		{ 
			fieldLabel : T('label.wc'), 
			name : 'workcenter.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Workcenter'
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
			fieldLabel : T('label.machine'), 
			name : 'machine.name-eq', 
			xtype : 'entitysearchcombo', 
			valueField : 'name', 
			storeClass : 'Prod.store.Machine',
			associationField:['operation.name-eq']
		},
		{
			xtype      : 'fieldcontainer',
		    fieldLabel : T('label.type'),
		    defaultType: 'radiofield',
		    defaults: {
		    	flex: 1
			},
			layout: 'hbox',
			items: [{
				boxLabel  : T('label.loss_count'),
				name      : 'loss_type',
				inputValue: 'loss_count'
			}, {
				boxLabel  : T('label.loss_term'),
		        name      : 'loss_type',
		        inputValue: 'loss_term'
			}]
		}
	]
	
});