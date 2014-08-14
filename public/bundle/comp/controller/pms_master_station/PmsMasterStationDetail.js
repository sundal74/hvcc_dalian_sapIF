/**
 * PmsMasterStationDetail controller
 */
Ext.define('Comp.controller.pms_master_station.PmsMasterStationDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Comp.model.PmsMasterStation', 
		'Comp.store.PmsMasterStation', 
		'Comp.view.pms_master_station.PmsMasterStationDetail'
	],
	
	models : ['Comp.model.PmsMasterStation'],
			
	stores: ['Comp.store.PmsMasterStation'],
	
	views : ['Comp.view.pms_master_station.PmsMasterStationDetail'],
	
	refs: [ 
		{ ref : 'PmsMasterStationDetail', selector : 'comp_pms_master_station_detail' } 
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'comp_pms_master_station_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' comp_pms_master_station_form' : {
				click_close : this.onClickClose,
				click_save :  this.onFormSave,
				click_delete : this.onFormDelete,
				after_form_saved : this.afterFormSaved,
				after_form_deleted : this.afterFormDeleted,
				validitychange: this.onFormValidityChange
			}
		});
	},
	
	/****************************************************************
	 ** 					여기는 customizing area 				   **
	 ****************************************************************/
	// Customized code here ...
	
	/****************************************************************
	 ** 					Override 구현 						   **
	 ****************************************************************/
	/**
	 * override
	 */
	afterDetailLoaded : function(record, operation) {
		var mainView = this.getMainView();
		mainView.setRecord(record);
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		this.getMainView().setRecord(newRecord);
		HF.show('Comp.view.pms_master_station.PmsMasterStation', {}, {});
		this.getMainView().close();
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Comp.view.pms_master_station.PmsMasterStation', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getPmsMasterStationDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});