/**
 * BarSheepDog controller
 */
Ext.define('Hcc.controller.bar_sheep_dog.BarSheepDog', {
	
	extend: 'Base.abstract.PivotReportController',
	
	requires : ['Hcc.view.bar_sheep_dog.BarSheepDog'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_bar_sheep_dog' : {
				paramschange : this.onParamsChange
			},
			'hcc_bar_sheep_dog_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	}
});