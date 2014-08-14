/**
 * OperationsDefects controller
 */
Ext.define('Prod.controller.operations_defects.OperationsDefects', {
	
	extend: 'Base.abstract.entity.ReportMainController',
	
	requires : [ 'Prod.view.operations_defects.OperationsDefects' ],
	
	models : [],
			
	stores: ['Prod.store.Operation'],
	
	views : [ 'Prod.view.operations_defects.OperationsDefects' ],
	
	refs: [ 
		{ ref : 'OperationsDefects', selector : 'prod_operations_defects' },
		{ ref : 'OperationsDefectsList', selector : 'prod_operations_defects_list' },
		{ ref : 'OperationsDefectsSubList', selector : 'prod_operations_defects_sub_list' }
	],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_operations_defects' : {
				paramschange : this.onParamsChange,
				after_import : this.onImportSuccess
			},
			'prod_operations_defects_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			},
			'prod_operations_defects_list' : {
				itemclick : this.onOperationClick,
				after_grid_updated : this.afterGridUpdated
			},
			'prod_operations_defects_sub_list' : {
				click_import : this.onImport,
				click_add : this.onGridAdd,
				click_save : this.onClickSave
			}
		});
	},
	
	/****************************************************************
	 ** 				여기는 customizing area 					   **
	 ****************************************************************/
	
	onOperationClick : function(grid, record, item, index, e, eOpts) {
		this.selectedRecord = record;
		if(this.selectedRecord.get('id')) {
			var defectsGrid = this.getOperationsDefectsSubList();
			defectsStore = defectsGrid.getStore();
			defectsStore.getProxy().extraParams = { operation_id : this.selectedRecord.get('id') };
			
			defectsGrid.on('beforeedit', function(editor, e, eOpts) {
				var recordId = e.record.get('id');
			
				if(recordId == '') {
					return true;
				} else {
					return false;
				}
			});

			defectsStore.load();
		}
	},
	
	/**
	 * import button click시 
	 */
	onImport : function() {
		HF.popup('Base.view.field.ImportPopup', null, {
			owner : this.getMainView(), 
			url : 'domains/' + login.current_domain_id + '/defect_codes/op_defect_import.json'
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
		return this.getOperationsDefects();
	},
	
	/****************************************************************
	 ** 				여기는 edit popup  					       **
	 ****************************************************************/

	onClickSave : function(view) {
		var modifiedRecords = view.getStore().getModifiedRecords();
		var removedRecords = view.getStore().getRemovedRecords();
		var modified_defects = [];
		var removed_defects = [];
		
		if(!this.selectedRecord) {
			HF.msg.notice(T('text.X is empty', {x : T('title.defect_code')}));
			return;
		}
		
		if(!this.checkEmpty(modifiedRecords)) {
			return;
		}
		
		for (var i = 0 ; i < modifiedRecords.length ; i++) {
			if(modifiedRecords[i].get('defect_code')) {
				modified_defects.push({'defect_code_id' : modifiedRecords[i].get('defect_code').id});
			}
		}
			
		for (var j = 0 ; j < removedRecords.length ; j++) {
			removed_defects.push({'defect_code_id' : removedRecords[j].get('defect_code').id});
		}
			
		Ext.Ajax.request({
			url: '/domains/' + login.current_domain_id + '/defect_codes/add_by_operation.json',
		    method : 'POST',
		    params : {
				modified_defects : Ext.JSON.encode(modified_defects),
				removed_defects : Ext.JSON.encode(removed_defects),
				operation_id : this.selectedRecord.get('id')
			},
		    success: function(response, opts) {
				HF.msg.success(T('text.Success to Process'));
				view.getStore().load();
			}
		});
	},
	
	checkEmpty : function(records) {
		valid = true;
		Ext.Array.each(records, function(record) {
			defectCode = record.get('defect_code');
			if(!defectCode) {
				valid = false;
				HF.msg.notice(T('text.X is empty', {x : T('title.defect_code')}));
				return;
			}
		});
		return valid;
	},
	
	onGridAdd : function(btn) {
		if(this.selectedRecord) {
			var defectsGrid = this.getOperationsDefectsSubList();
			var defectsStore = defectsGrid.getStore();
			defectsStore.insert(0, {"defect_code" : "", "id" : ""});
		} else {
			HF.msg.notice(T('text.X is empty', {x : T('label.operation')}));
		}
	}
});