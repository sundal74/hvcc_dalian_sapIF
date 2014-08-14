Ext.define('Prod.view.loss_template.LossTemplateSearch', {
	
	extend : 'Base.abstract.entity.ListSearchView',
	
	xtype : 'prod_loss_template_search',
		
	items : [ { 
		fieldLabel : T('label.week_day'), 
		name : 'week_day-eq', 
		xtype : 'codecombo', 
		blankDisplay : 'ALL', 
		commonCode : 'DAY_OF_WEEK', 
		displayField : 'description' 
	} ]
	
});