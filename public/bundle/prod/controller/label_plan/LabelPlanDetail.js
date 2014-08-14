/**
 * LabelPlanDetail controller
 */
Ext.define('Prod.controller.label_plan.LabelPlanDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.LabelPlan', 
		'Prod.store.LabelPlan', 
		'Prod.view.label_plan.LabelPlanDetail'
	],
	
	models : ['Prod.model.LabelPlan'],
			
	stores: ['Prod.store.LabelPlan'],
	
	views : ['Prod.view.label_plan.LabelPlanDetail'],
	
	refs: [ { ref : 'LabelPlanDetail', selector : 'prod_label_plan_detail' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_label_plan_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_label_plan_form' : {
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
	reload : function(view, params) {
		if(params && params.id) {
			var modelClass = Ext.ClassManager.get(this.models[0]);
			modelClass.load(params.id, {
				scope : this,
				success : function(record, operation) {
					view.fireEvent('after_detail_loaded', record, operation);
				}
			});			
		} else {
			var defaultData = { 
				id : '', 
				domain_id : login.current_domain_id, 
				order_date : params['order_date-eq'], 
				shift : params['shift-eq'],
				operation : params['operation.name-eq'],
				product : params['product.name-eq']
			};
			view.fireEvent('after_detail_loaded', {data : defaultData}, null);
		}
	},
		
	/**
	 * override
	 */
	afterDetailLoaded : function(record, operation) {
		var mainView = this.getMainView();		
		var labelForm = mainView.down('form');
		if(!record.data.id) {
			labelForm.down('datefield[name=order_date]').setValue(record.data.order_date);
			labelForm.down('codecombo[name=shift]').setValue(record.data.shift);
			record.data.operation = { id : login.current_domain_id + '-' + record.data.operation, name : record.data.operation };
			record.data.product = { id : login.current_domain_id + '-' + record.data.product, name : record.data.product };
			labelForm.down('numberfield[name=lot_qty]').hide();
			labelForm.down('numberfield[name=print_qty]').hide();			
		} else {

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
		HF.show('Prod.view.label_plan.LabelPlan', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.label_plan.LabelPlan', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getLabelPlanDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});