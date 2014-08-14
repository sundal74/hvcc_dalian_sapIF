/**
 * OperationsWorkers controller
 */
Ext.define('Prod.controller.operations_workers.OperationsWorkers', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [ 
		'Prod.view.operations_workers.OperationsWorkers', 
		'Prod.view.operations_workers.WorkerUpdatePopup' 
	],
	
	models : [],
			
	stores: ['Prod.store.Operation'],
	
	views : [ 'Prod.view.operations_workers.OperationsWorkers' ],
	
	refs: [ 
		{ ref : 'OperationsWorkers', selector : 'prod_operations_workers' },
		{ ref : 'OperationsWorkersList', selector : 'prod_operations_workers_list' },
		{ ref : 'OperationsWorkersSubList', selector : 'prod_operations_workers_sub_list' },
		{ ref : 'WorkerUpdatePopup', selector : 'prod_workers_popup' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_operations_workers' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_operations_workers_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_operations_workers_list' : {
				itemclick : this.onOperationClick,
				after_grid_updated : this.afterGridUpdated
			},
			'prod_operations_workers_sub_list' : {
				click_import : this.onImport,
				click_add : this.onGridAdd,
				click_save : this.onClickSave,
				click_update : this.onClickUpdate
			},
			'prod_workers_popup' : {
				paramschange : this.onPopupParamsChange,
				click_save : this.onPopupSave,
				click_close : this.onPopupClose
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	/**
	 * 공정 선택시 
	 */
	onOperationClick : function(grid, record, item, index, e, eOpts) {
		this.selectedRecord = record;
		if(this.selectedRecord.get('id')) {
			var workersGrid = this.getOperationsWorkersSubList();
			workersStore = workersGrid.getStore();
			workersStore.getProxy().extraParams = { operation_id : this.selectedRecord.get('id') };
			
			workersGrid.on('beforeedit', function(editor, e, eOpts) {
				var recordId = e.record.get('id');
				if(recordId == '') {
					return true;
				} else {
					return false;
				}
			});

			workersStore.load();
		}
	},
	
	/**
	 * import button click시 
	 */
	onImport : function() {
		HF.popup('Base.view.field.ImportPopup', null, {
			owner : this.getMainView(), 
			url : 'domains/' + login.current_domain_id + '/operations/op_workers_import.json'
		});
	},
	
	/**
	 * after import success
	 */
	onImportSuccess : function(response) {
		var gridView = this.getGridView();
		gridView.store.load();
	},
	
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 					**
	 ****************************************************************/

	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getOperationsWorkers();
	},
	
	/****************************************************************
	 ** 				여기는 edit popup  					       **
	 ****************************************************************/
	/**
	 * Save 버튼 클릭시 
	 */
	onClickSave : function(view) {
		var gridStore = view.getStore();
		var modifiedRecords = gridStore.getModifiedRecords();
		var removedRecords = gridStore.getRemovedRecords();
		var modified_users = [];
		var removed_users = [];
		
		if(!this.selectedRecord) {
			HF.msg.notice(T('text.Nothing selected'));
			return;
		}
		
		if(!this.checkEmpty(modifiedRecords)) {
			return;
		}
		
		for (var i = 0 ; i < modifiedRecords.length ; i++) {
			var modData = modifiedRecords[i].data;
			if(modData.user) {
				modified_users.push({'user_id' : modData.user.id, 'manager_flag' : modData.manager_flag});
			}
		}
			
		for (var j = 0 ; j < removedRecords.length ; j++) {
			var remData = removedRecords[j].data;
			if(remData.user) {
				removed_users.push({'user_id' : remData.user.id,'manager_flag' : remData.manager_flag});
			}
		}
			
		Ext.Ajax.request({
		    //url : '/domains/' + login.current_domain_id + '/diy_selections/UpdateOperationsUsers/shoot.json',
			url : '/domains/' + login.current_domain_id + '/operations/save_operators.json',
		    method : 'POST',
		    params : {
				modified_users : Ext.JSON.encode(modified_users),
				removed_users : Ext.JSON.encode(removed_users),
				operation_id : this.selectedRecord.get('id')
			},
		    success: function(response, opts) {
				HF.msg.success(T('text.Success to Process'));
				gridStore.load();
			}
		});
	},
	
	/**
	 * 빈 값이 있는지 체크 
	 */
	checkEmpty : function(records) {
		valid = true;
		Ext.Array.each(records, function(record) {
			user = record.get('user');
			if(!user) {
				valid = false;
				HF.msg.notice({title : T('text.Invalid data'), msg : T('text.Empty data exist')});
				return;
			}
		});
		return valid;
	},
	
	/**
	 * Add 버튼 클릭시 
	 */
	onGridAdd : function(btn) {
		if(this.selectedRecord) {
			var workersGrid = this.getOperationsWorkersSubList();
			var workersStore = workersGrid.getStore();
			workersStore.insert(0, {"user" : "", "id" : ""});
		} else {
			HF.msg.notice(T('text.Select x First', {x : T('label.operation')}));
		}
	},
	
	/**
	 * Update 버튼 클릭시 
	 */
	onClickUpdate : function() {
		var workersGrid = this.getOperationsWorkersSubList();
		var selection = workersGrid.getSelectionModel().getSelection();
		
		if(selection.length == 0) {
			HF.msg.notice(T('text.Select x First', {x : T('label.operator')}));
		} else {
			HF.popup('Prod.view.operations_workers.WorkerUpdatePopup', selection[0].data, {});
		}
	},
	
	/**
	 * 실적 수정 팝업 Params Change
	 */
	onPopupParamsChange : function(view, params) {
		view.child(' #operation').setValue(this.selectedRecord.data.name);
		view.child(' #operation_desc').setValue(this.selectedRecord.data.description);
	},
	
	/**
	 * Popup의 close 버튼 클릭시 
	 */
	onPopupClose : function() {
		this.getWorkerUpdatePopup().close();
	},
	
	/**
	 * Popup의 save 버튼 클릭시 
	 */
	onPopupSave : function() {
		var popup = this.getWorkerUpdatePopup();
		var popupParams = popup.getParams();
		var popupForm = popup.down(' form');
		var formValues = popupForm.getValues();
		var operatorId = popupParams.user.id;
		var sourceOpId = this.selectedRecord.get('id');
		
		var targetOpName = formValues['operation.name-eq'];
		if(!targetOpName || targetOpName == '') {
			HF.msg.notice(T('text.Select x First', {x : T('label.operation')}));
			return;
		}
		
		var targetOpId = login.current_domain_id + '-' + targetOpName;
		var self = this;
		
		Ext.Ajax.request({
			url : '/domains/' + login.current_domain_id + '/operations/move_operator.json',
			method : 'POST',
			params : {
				from_operation_id : sourceOpId,
				to_operation_id : targetOpId,
			    user_id : operatorId
			},
			success: function(response, opts) {
				popup.close();
				var obj = Ext.decode(response.responseText);
				var title = obj.success ? T('title.success') : T('title.failure');
				var msg = obj.success ? T('text.Success to Process') : obj.message;
				HF.msg.alert({title : title, msg : msg});
				if(obj.success) {
					self.getOperationsWorkersSubList().getStore().load();
				}
			}
		});
	}
});