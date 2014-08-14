Ext.define('Term.controller.docs.OpDocsP020', {
	
	extend : 'Base.abstract.FormController',
	
	views : ['Term.view.docs.OpDocsP020'],
	
	init : function() {
		this.control({
			'term_docs_opdocsp020' : {
				paramschange : this.onParamsChange,
				click_ok : this.onClickClose
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.down('#workcenter').setValue(view.getParams().workcenter);
		view.down('#operation').setValue(view.getParams().operation);
		view.down('#title').setValue(view.getParams().title);
		view.down('#reg_date').setValue(view.getParams().reg_date);
	}
});