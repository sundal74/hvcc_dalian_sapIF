/**
 * SheepDog controller
 */
Ext.define('Hcc.controller.sheep_dog.SheepDog', {
	
	extend: 'Base.abstract.PivotReportController',
	
	requires : ['Hcc.view.sheep_dog.SheepDog'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'hcc_sheep_dog' : {
				paramschange : this.onParamsChange
			},
			'hcc_sheep_dog_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	}
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/
});