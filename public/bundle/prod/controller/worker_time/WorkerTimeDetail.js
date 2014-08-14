/**
 * WorkerTimeDetail controller
 */
Ext.define('Prod.controller.worker_time.WorkerTimeDetail', {
	
	extend: 'Base.abstract.entity.DetailMainController',
	
	requires : [ 
		'Prod.model.WorkerTime', 
		'Prod.store.WorkerTime', 
		'Prod.view.worker_time.WorkerTimeDetail',
		'Prod.view.worker_time.WorkerTimeSearch',
	],
	
	models : ['Prod.model.WorkerTime'],
			
	stores: ['Prod.store.WorkerTime'],
	
	views : ['Prod.view.worker_time.WorkerTimeDetail'],
	
	refs: [ 
		{ ref : 'WorkerTimeDetail', selector : 'prod_worker_time_detail' },
		{ ref : 'WorkerTimeSearch', selector : 'prod_worker_time_search' } 
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_worker_time_detail' : {
				paramschange : this.onParamsChange,
				after_detail_loaded : this.afterDetailLoaded
			},
			' prod_worker_time_form' : {
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
		// NEW Form에서 기본 값 추가 
		if(!record.data.id) {
			/**
			 * FIXME WorkDate, Shift를 기본값에 추가하려면 Shift 종료시간마다 OPS 처럼 refresh를 해줘야하고 
			 * 그렇게 하지 않으려면 서버의 현재 work_date, shift를 가져온다.
			 */
			record.data.start_time = new Date();
			
			var searchView = this.getWorkerTimeSearch();
			var searchForm = searchView.getForm();
			var searchValues = searchForm.getValues();
			var workDate = searchValues['work_date-eq'];
			var shift = searchValues['shift-eq'];
			var opName = searchValues['operation.name-eq'];
			var mcName = searchValues['machine.name-eq'];
			
			if(workDate) {
				record.data.work_date = workDate;//HF.getCurrentShiftDate();
			}
			
			if(shift) {
				record.data.shift = shift;
			} else {
				record.data.shift = SHIFT;
			}
			
			if(opName) {
				record.data.operation_id = login.current_domain_id + '-' + opName;
				record.data.operation = {id : record.data.operation_id, name : opName};
			}
			
			if(mcName) {
				record.data.machine_id = login.current_domain_id + '-' + mcName;
				record.data.machine = {id : record.data.machine_id, name : mcName};
			}
		}
		
		var mainView = this.getMainView();
		mainView.setRecord(record);
		mainView.down(' #back').hide();
	},
	
	/**
	 * 추가적으로 필요한 validation을 수행 
	 */
	validateLogic : function(form) {
		var startTime = form.getValues().start_time;
		var endTime = form.getValues().end_time;
		
		if(startTime && endTime && (startTime > endTime)) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.start_time'), y : T('label.end_time')})});
			return false;
		}
		
		return true;
	},
	
	/**
	 * override
	 */
	afterFormSaved : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.worker_time.WorkerTime', {}, {});
	},
	
	/**
	 * override
	 */
	afterFormDeleted : function(form, newRecord) {
		this.getMainView().close();
		HF.show('Prod.view.worker_time.WorkerTime', {}, {});
	},
	
	/****************************************************************
	 ** 					abstract method, 필수 구현 				   **
	 ****************************************************************/
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getWorkerTimeDetail();
	},
	
	/**
	 * 팝업 close
	 */
	onClickClose : function(view) {
		view.up().close();
	}
});