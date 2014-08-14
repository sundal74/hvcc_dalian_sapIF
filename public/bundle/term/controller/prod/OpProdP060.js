Ext.define('Term.controller.prod.OpProdP060', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.prod.OpProdP060'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_prod_opprodm010' },
		{ ref : 'DefectView', selector : 'term_prod_opprodp060' }
	],
	
	init : function() {
		this.control({
			'term_prod_opprodp060' : {
				paramschange : this.onParamsChange,
				click_save : this.onClickSave,
				click_add : this.onGridAdd,
				click_close : this.onClickClose
			},
			'term_prod_opprodp060 #rework_keypad' : {
				click : this.onReworkKeyPad
			},
			'term_prod_opprodp060 #grid_keypad' : {
				click : this.onGridKeyPad
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.child(' #product').setValue(view.getParams().product);
		view.child(' #actual').setValue(view.getParams().actual_qty);
		view.child(' #defect').setValue(view.getParams().defect_qty);
		view.child(' #rework').setValue(view.getParams().rework_qty);
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onReworkKeyPad : function(btn, e) {
		var view = this.getDefectView();
		var reworkField = view.child(' #rework_qty');
		HF.popup('Term.view.cmm.TouchPadPopup', {owner : reworkField, owner_type : 'simple', data_type : 'number'}, {});		
	},
	
	onGridKeyPad : function(gridView, td, rowIndex, colIndex, event, record, tr, grid) {
		var params = {owner : gridView.store, owner_type : 'store', data_type : 'number', row_idx : rowIndex, field : 'defect_qty'};
		HF.popup('Term.view.cmm.TouchPadPopup', params, {});
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onGridAdd : function(btn) {
		var view = this.getDefectView().child('grid');
		var badAddStore = view.getStore();
		badAddStore.add_row();
	},
	
	onClickSave: function(popup, grid) {
		var self = this;
		var view = this.getDefectView();
		var gridStore = view.child('grid').getStore();
		var newRecords = gridStore.getNewRecords();
		var rework_qty = popup.child(' #rework_qty').getValue();
		var defect_info = [];
		
		for (var i = 0 ; i < newRecords.length ; i++) {
			var defectCode = newRecords[i].get('defect_code');
			var defectQty = newRecords[i].get('defect_qty');
			
			if(!defectCode || !defectCode.id || !defectQty || defectQty == '') {
				HF.msg.notice({title : T('text.Invalid data'), msg : T('text.Empty data exist')});
				return;
			}
			
			defect_info.push({'machine_id' : view.getParams().machine_id, 'product_id' : view.getParams().product_id, 'defect_code_id' : defectCode.id, 'defect_qty' : defectQty});
		}
		
		Ext.Ajax.request({
		    url: '/domains/' + login.current_domain_id + '/diy_services/CreateDefect/shoot.json',
		    method : 'POST',
		    params : {
				prod_order_id : view.getParams().id,
				work_date : HF.setting.get('option-work_date') ? HF.setting.get('option-work_date') : "",
				shift : HF.setting.get('option-shift') ? HF.setting.get('option-shift') : "",
				operation_id : HF.setting.get('option-operation') ? HF.setting.get('option-operation').id : "",
				defect_info : Ext.JSON.encode(defect_info),
				rework_qty : rework_qty
			},
		    success: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				popup.close();
				HF.msg.alert({title : obj.message, msg : T('text.Success to Process')});
				gridStore.load();
				
				var mainView = self.getMainView();
				var mainViewStore = mainView.child('grid').getStore();
				mainViewStore.load();
			}
		});
	}
});