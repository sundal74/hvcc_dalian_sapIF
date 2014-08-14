Ext.define('Term.controller.prod.OpProdP040', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.prod.OpProdP040'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_prod_opprodm010' },
		{ ref : 'DefectView', selector : 'term_prod_opprodp040' },
		{ ref : 'LotModifyView', selector : 'term_prod_opprodm020' }
	],
	
	init : function() {
		this.control({
			'term_prod_opprodp040' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_add : this.onGridAdd,
				click_close : this.onClickClose
			},
			'term_prod_opprodp040 #keypad' : {
				click : this.onKeyPad
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.child(' #date').setValue(HF.setting.get('option-work_date_disp') ? HF.setting.get('option-work_date_disp') : "");
		view.child(' #shift').setValue(HF.setting.get('option-shift_name') ? HF.setting.get('option-shift_name') : "");
		view.child(' #machine').setValue(HF.setting.get('option-machine').name ? HF.setting.get('option-machine').name : "");
		view.child(' #operation').setValue(HF.setting.get('option-operation').name ? HF.setting.get('option-operation').name : "");
		view.child('grid').store.loadRawData(view.getParams());
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onKeyPad : function(btn, e) {
		var view = this.getDefectView();
		var modifyField = view.child(' #modify_qty');
		HF.popup('Term.view.cmm.TouchPadPopup', {owner : modifyField, owner_type : 'simple', data_type : 'number'}, {});		
	},
	
	onGridAdd : function(btn) {
		var view = this.getDefectView().child('#defectGrid');
		var badAddStore = view.getStore();
		badAddStore.add_row();
	},
	
	onClickSave: function(popup, grid) {
		var formView = popup.child('form');
		var modifyQty = popup.child(' #modify_qty').getValue();
		var actualQty = popup.getParams().actual_qty;
		
		if(!modifyQty) {
			HF.msg.notice({title : T('text.Invalid data'), msg : T('text.Empty data exist')});
			return;
		}
		
		if(modifyQty > 10000) {
			HF.msg.alert(T('text.X less than Y', {x : T('label.qty'), y : '10000'}));
			return;
		}

		// 수정 값이 음수일 경우 실적보다 절대값이 커서는 안된다.
		if(modifyQty < 0 && (-1 * modifyQty) > actualQty) {
			HF.msg.notice({title : T('text.Invalid data'), msg : T('text.X greater than Y', {x : T('label.modify_qty'), y : T('label.actual_qty')})});
			return;
		}
		
		var self = this;
		var params = {};
		var operation_op_type = HF.setting.get('option-operation_info').op_type;
		
		if(operation_op_type == 'LOT' || operation_op_type == 'FINAL') {
			params.prod_order_id = popup.getParams().prod_order_id;
			params.op_type = HF.setting.get('option-operation_info').op_type;
			params.lot_id = popup.getParams().id;
		} else if(operation_op_type == 'MANUAL') {
			params.prod_order_id = popup.getParams().id;
			params.op_type = HF.setting.get('option-operation_info').op_type;
		}

		formView.getForm().submit({
			clientValidation : true,
			url : '/domains/' + login.current_domain_id + '/diy_services/UpdateProdOrderModifyActual/shoot.json',
			params : params,
			timeout : 20000,
			success: function(form, action) {
				var result = action.result;
				popup.close();
				HF.msg.alert({title : result.message, msg : T('text.Success to Process')});
				
				if(operation_op_type == 'LOT' || operation_op_type == 'FINAL') {
					var view = self.getLotModifyView();
					var gridStore = view.child('grid').getStore();
					gridStore.load();
				} else if(operation_op_type == 'MANUAL') {
					var view = self.getMainView();
					var gridStore = view.child('grid').getStore();
					gridStore.load();
				}
			}
		});
	}
});