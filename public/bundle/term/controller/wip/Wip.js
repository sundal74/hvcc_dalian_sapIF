Ext.define('Term.controller.wip.Wip', {
	
	extend: 'Base.abstract.PivotReportController',
	
	requires : ['Term.view.wip.Wip'],
	
	stores : ['Term.store.Wip'],
	
	init : function() {
		this.callParent(arguments);
		
		this.control({
			'term_wip' : {
				paramschange : this.onParamsChange
			}
		});
	},
	
	beforeParamsChange : function(view, params) {
		if(!params) {
			params = {};
		}
		if(!params['operation_id']) {
			params['operation_id'] = HF.setting.get('option-operation') ? HF.setting.get('option-operation').id : '';
		}

		return params;
	},
	
	onParamsChange : function(view, params) {
		params = this.beforeParamsChange(view, params);
		this.reload(view, params);
	}
});