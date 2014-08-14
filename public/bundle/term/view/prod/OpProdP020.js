/**
 * Add Plan
 */
Ext.define('Term.view.prod.OpProdP020', {
	
	extend : 'Base.abstract.Popup',

	xtype : 'term_prod_opprodp020',
	
	title : T('title.add_plan'),
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'save', 'close']
	} ],
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	height : 340,
	
	initComponent : function() {
		this.items = [ 
			this.createInfoPart(this),
			this.createFormPart(this) 
		];
		
		this.callParent();
	},
	
	createInfoPart: function(view) {
		return {
			xtype : 'panel',
			layout : 'column',
			cls : 'infoFields2Column marginB20',
			defaultType : 'displayfield',
			items : [ {
				fieldLabel : T('label.date'),
				name : 'date',
				itemId : 'date',
				value : HF.setting.get('option-work_date_disp')
			}, {
				fieldLabel : T('label.shift'),
				name : 'shift',
				itemId : 'shift',
				value : HF.setting.get('option-shift_name')
			}, {
				fieldLabel : T('label.operation'),
				name : 'operation',
				itemId : 'operation',
				value : HF.setting.get('option-operation').name
			}, {
				fieldLabel : T('label.machine'),
				name : 'machine',
				itemId : 'machine',
				value : HF.setting.get('option-machine').name
			} ]
		}
	},
	
	createFormPart: function(view) {
		return {
			xtype : 'form',
			flex : 1,
			cls : 'marginT10',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [{
				fieldLabel : T('label.product'),
				name : 'product',
				xtype : 'entitycombo',
				itemId : 'product',
				customSelectionUrl : '/domains/' + login.current_domain_id + '/diy_services/ListAddPlanProducts/query.json?operation_id=' + HF.setting.get('option-operation').id + '&machine_id=' + HF.setting.get('option-machine').id,
				allowBlank : false
			}]
		}
	}
});