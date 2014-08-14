/**
 * TerminologyDetail controller
 */
Ext.define('Base.controller.terminology.TerminologyDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Base.model.Terminology', 
		'Base.store.Terminology', 
		'Base.view.terminology.TerminologyDetail'
	],
	
	models : ['Base.model.Terminology'],
			
	stores: ['Base.store.Terminology'],
	
	views : ['Base.view.terminology.TerminologyDetail'],
	
	refs: [ { ref : 'TerminologyDetail', selector : 'base_terminology_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_terminology_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' base_terminology_form' : {
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
		
		if(record.data.id) {
			var chkForm = mainView.down('form');
			chkForm.down('textfield[name=name]').setReadOnly(true);
		}
		
		mainView.setRecord(record);
		mainView.down(' #back').hide();
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		// this.getMainView().setRecord(newRecord);
		this.getMainView().close();
		HF.show('Base.view.terminology.Terminology', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Base.view.terminology.Terminology', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getTerminologyDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});