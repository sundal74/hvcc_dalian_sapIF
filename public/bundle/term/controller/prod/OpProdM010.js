Ext.define('Term.controller.prod.OpProdM010', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.prod.OpProdM010'],
	
	requires : [
		'Term.abstract.TerminalController'
	],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_prod_opprodm010' },
		{ ref : 'AddPlan', selector : 'term_prod_opprodp020' },
		{ ref : 'AddDefect', selector : 'term_prod_opprodp060' },
		{ ref : 'ModifyOperator', selector : 'term_prod_opprodp070' },
		{ ref : 'LineStop', selector : 'term_lnst_oplnstp020' },
		{ ref : 'RequestRm', selector : 'term_prod_opprodp080' }
	],
	
	init : function() {
		this.control({
			'term_prod_opprodm010' : {
				paramschange : this.onParamsChange,
				statusMainView : this.onAfterEvent
			},
			// Production Status
			'term_prod_opprodm010 #status' : {
				click : this.onStatus
			},
			// Modify Actual Button
			'term_prod_opprodm010 #btn_modify_actual' : {
				click : this.onModifyActual
			},
			// Modify Operator Button
			'term_prod_opprodm010 #btn_modify_operator' : {
				click : this.onModifyOperator
			},
			// Add Plan Button
			'term_prod_opprodm010 #btn_add_plan' : {
				click : this.onAddPlan
			},
			// Add Scrap Button
			'term_prod_opprodm010 #btn_defect' : {
				click : this.onDefect
			},
			// LineStop Button
			'term_prod_opprodm010 #btn_line_stop' : {
				click : this.onLineStop
			},
			// Manual Output Button
			'term_prod_opprodm010 #btn_manual_output' : {
				click : this.onManualOutput
			},
			// Manual Multiple Output Button
			'term_prod_opprodm010 #btn_multi_manual_output' : {
				click : this.onMultiManualOutput
			},
			// WIP Input Button
			'term_prod_opprodm010 #btn_wip_input' : {
				click : this.onWipInput
			},
			// Scan Button
			'term_prod_opprodm010 #scan' : {
				click : this.onScan
			}
			/*Prod. Input Button
			'term_prod_opprodm010 #btn_prod_input' : {
				click : this.onProdInput
			},
			Req. Raw Mat. Button
			'term_prod_opprodm010 #btn_request_rm' : {
				click : this.onRequestRm
			},*/
		});
		
		HF.setting.on('option-operation_info', this.onOperationChange, this);
	},
	
	/**
	 * Operation 선택이 변경되었을 경우 공정 속성에 따라 특정 버튼을 숨기거나 활성화 한다.
	 */
	onOperationChange : function() {
		var view = this.getMainView();
		var grid = view.child('grid');
		var opInfo = HF.setting.get('option-operation_info');
		
		/*if(!opInfo.rm_input_flag) {
			view.child(' #btn_prod_input').hide();
		}

		if(opInfo.rm_input_flag || opInfo.inv_flag) {
			view.child(' #btn_manual_output').hide();
		}
		
		if(!opInfo.inv_flag) {
			view.child(' #btn_wip_input').hide();
		}*/ 
	},
	
	/**
	 * 화면 진입시 
	 */
	onParamsChange : function(view, params) {
		if(!HF.setting.get('option-operation')) {
			var field = Ext.getCmp('optionbar').down('field[name=option-operation]');
			HF.msg.tip(T('text.Select Operation First'), field);
			return;
		}
		
		if(!HF.setting.get('option-machine')) {
			var field = Ext.getCmp('optionbar').down('field[name=option-machine]');
			HF.msg.tip(T('text.Select Machine First'), field);
			return;
		}
		
		this.onOperationChange();
		
		var grid = view.child('grid');
		var store = grid.getStore();
		if(params) {
			store.getProxy().extraParams = params;
			grid.getStore().load();
		} else {
			store.getProxy().extraParams = {
				operation_id : HF.setting.get('option-operation') == null ? "" : HF.setting.get('option-operation').id,
				machine_id : HF.setting.get('option-machine') == null ? "" : HF.setting.get('option-machine').id,
				work_date : HF.setting.get('option-work_date'),
				shift : HF.setting.get('option-shift')
			};
			grid.getStore().load();
		}
	},
	
	/**
	 * 상태 버튼 클릭시 
	 */
	onStatus : function(view, rowIndex, colIndex, item, e, record) {
		record.data.popup_mode = 'status';
		var view = this.getMainView();
		var gridStore = view.child('grid').getStore();
		
		if(record.get("status") != 'R') {
			HF.popup('Term.view.prod.OpProdP070', record.data, null);
		} else {
			Ext.Ajax.request({
			    url: '/domains/' + login.current_domain_id + '/diy_services/DoProdOrderStatus/shoot.json',
			    method : 'POST',
			    params : {
					prod_order_id : record.data.id,
					run_prod_order_id : record.data.id
				},
			    success: function(response, opts) {
					var obj = Ext.decode(response.responseText);
					gridStore.load();
				}
			});
		}
	},

	/**
	 * 바코드 스캔 버튼 클릭시 
	 */
	onScan : function(grid, item, rowIndex, colIndex, e, record) {
		var operation_op_type = HF.setting.get('option-operation_info').op_type;
		if(record.get("status") == 'R') {
			if(operation_op_type == 'LOT') {
				HF.popup('Term.view.scan.OpScanP110', record.data, null);
			} else if(operation_op_type == 'FINAL') {
				HF.popup('Term.view.scan.OpScanP110', record.data, null);
			} else if(operation_op_type == 'MANUAL') {
				HF.popup('Term.view.scan.OpScanP100', record.data, null);
			}
		}
	},
	
	/**
	 * 계획 추가 버튼 클릭시 
	 */
	onAddPlan : function() {
		if(HF.setting.get('option-operation')) {
			HF.popup('Term.view.prod.OpProdP020', {}, {});
		}
	},
	
	/**
	 * Prod. Input 버튼 클릭시 
	 */
	onProdInput : function() {
		var view = this.getMainView();
		var selectionModel = view.child('grid').getSelectionModel();
		var model = selectionModel.getSelection();

		if(model.length > 0) {
			HF.popup('Term.view.rwmt.OpRwmtM010', model[0].data, {});
		} else {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select x First', {x : T('label.job')})});
		}
	},
	
	/**
	 * Add Scrap 버튼 클릭시 
	 */
	onDefect : function() {
		var view = this.getMainView();
		var selectionModel = view.child('grid').getSelectionModel();
		var model = selectionModel.getSelection();
		
		if(model.length > 0 ) {
			HF.popup('Term.view.prod.OpProdP060', model[0].data, null);
		} else {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select x First', {x : T('label.job')})});
		}
	},
	
	/**
	 * Modify Actual 버튼 클릭시 
	 */
	onModifyActual : function(grid, item, rowIndex, colIndex, e, record) {
		var view = this.getMainView();
		var selectionModel = view.child('grid').getSelectionModel();
		var model = selectionModel.getSelection();
		var operation_op_type = HF.setting.get('option-operation_info').op_type;
		
		if(model.length > 0) {
			if(operation_op_type == 'LOT' || operation_op_type == 'FINAL') {
				HF.show('Term.view.prod.OpProdM020', model[0].data, null);
			} else if(operation_op_type == 'MANUAL') {
				HF.popup('Term.view.prod.OpProdP040', model[0].data, null);
			}
		} else {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select x First', {x : T('label.job')})});
		}
	},
	
	/**
	 * Modify Operator 버튼 클릭시 
	 */
	onModifyOperator : function(grid, item, rowIndex, colIndex, e, record) {
		var view = this.getMainView();
		var selectionModel = view.child('grid').getSelectionModel();
		var model = selectionModel.getSelection();

		if(model.length > 0) {
			var selectedRecord = model[0].data;
			if(selectedRecord.status == 'W') {
				HF.msg.notice(T('text.Modify Operator Not Allowed'));
			} else {
				selectedRecord.popup_mode = 'manual';
				HF.popup('Term.view.prod.OpProdP070', selectedRecord, null);				
			}
		} else {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select x First', {x : T('label.job')})});
		}
	},
	
	/**
	 * LineStop 버튼 클릭시 
	 */
	onLineStop : function() {
		var view = this.getMainView();
		var selectionModel = view.child('grid').getSelectionModel();
		var model = selectionModel.getSelection();
		
		var gridStore = view.child('grid').getStore();
		var prod_order_ids = null;
		var prod_data = null;
		for(i = 0 ; i < gridStore.data.items.length ; i++) {
			if(gridStore.data.items[i].get("status") == 'R') {
				prod_order_ids = gridStore.data.items[i].get("id");
				prod_data = gridStore.data.items[i].data;
			}
		}

		if(model.length > 0) {
			HF.popup('Term.view.lnst.OpLnstP020', model[0].data, null);
		} else if(prod_order_ids && prod_data) {
			HF.popup('Term.view.lnst.OpLnstP020', prod_data, null);
		} else {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select x First', {x : T('label.job')})});
		}
	},
	
	/**
	 * Req. Raw Mat. 버튼 클릭시 
	 */
	onRequestRm : function() {		
		HF.popup('Term.view.prod.OpProdP080', {}, {});
	},
	
	/**
	 * WIP Input 버튼 클릭시 
	 */
	onWipInput : function(btn) {
		if(HF.setting.get('option-operation')) {
			HF.popup('Term.view.scan.OpScanP200', {}, {});
		}
	},

	/**
	 * Multiple Manual Output 버튼 클릭시 
	 */	
	onMultiManualOutput : function() {
		if(HF.setting.get('option-operation')) {
			var mainGrid = this.getMainView().child('grid');
			var records = [];
			mainGrid.store.each(function(record) {
				records.push(record.data);
			});
			HF.popup('Term.view.prod.OpProdP090', records, {});
		}
	},
	
	/**
	 * Manual Output 버튼 클릭시 
	 */
	onManualOutput : function() {
		var view = this.getMainView();
		var selectionModel = view.child('grid').getSelectionModel();
		var model = selectionModel.getSelection();
		
		if(model.length > 0 ) {
			HF.popup('Term.view.scan.OpScanP100', model[0].data, null);
		} else {
			HF.msg.notice({title : T('text.Nothing selected'), msg : T('text.Select x First', {x : T('label.job')})});
		}
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	getViewModel : function() {
		var selectMainView = this.getMainView();
		var grid = selectMainView.child("grid");
		var selectionModel = grid.getSelectionModel();
		var model = selectionModel.getSelection();
		return model;
	},
	
	onAfterEvent : function(bool, record) {
		if(bool) {
			var view = this.getMainView();
			var gridStore = view.child('grid').getStore();
			prod_order_ids = '';
			for( i = 0 ; i < gridStore.data.items.length ; i++) {
				if(gridStore.data.items[i].get("status") == 'R') {
					prod_order_ids = gridStore.data.items[i].get("id");
				}
			}
            
			Ext.Ajax.request({
			    url: '/domains/' + login.current_domain_id + '/diy_services/DoProdOrderStatus/shoot.json',
			    method : 'POST',
			    params : {
					prod_order_id : record.id,
					run_prod_order_id : prod_order_ids
				},
			    success: function(response, opts) {
					var obj = Ext.decode(response.responseText);
					gridStore.load();
				}
			});
		}
	}
});