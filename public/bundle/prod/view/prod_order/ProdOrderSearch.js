Ext.define('Prod.view.prod_order.ProdOrderSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_prod_order_search',
		
	items : [
		{ name : 'order_date-eq', fieldLabel : T('label.work_date'), xtype : 'datefield', format : T('format.date'), submitFormat : T('format.submitDate') },
		{ fieldLabel : T('label.shift'), name : 'shift-eq', xtype : 'codecombo', commonCode : 'SHIFT', displayField : 'description' },
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
		}
		// Order에서는 main_op_flag가 true인 겻 만 표시된다.
		/*{ 
			fieldLabel : T('label.machine'), 
			name : 'machine.name-eq', 
			xtype : 'entityfield', 
			valueField : 'name', 
			storeClass : 'Prod.store.Machine', 
			associationField : [{
				name : 'operation.name-eq',
				value : 'operation.name-eq',
			}, {
				name : 'main_op_flag-eq',
				value : function() {
					return true;
				}
			}]
		}*/
	]
	
});