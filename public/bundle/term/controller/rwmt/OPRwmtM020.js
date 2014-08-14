Ext.define('Term.controller.rwmt.OpRwmtM020', {
	
	extend : 'Term.abstract.TerminalController',
	
	views : ['Term.view.rwmt.OpRwmtM020'],
	
	refs: [ 
		{ ref : 'MainView', selector : 'term_rwmt_oprwmtm020' }
	],
	
	init : function() {
		this.control({
			'term_rwmt_oprwmtm020' : {
				paramschange : this.onParamsChange
			},
			'term_rwmt_oprwmtm020 #btn_rwmt_m_confirm' : {
				click : this.onRwmtMAcutalConfirm
			},
			'term_rwmt_oprwmtm020 #btn_rwmt_m_cancel' : {
				click : this.onRwmtMCancel
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.child(' #operation').setValue(HF.setting.get('option-operation') ? HF.setting.get('option-operation').name : "");
	},
	
	onBackClick : function() {
		HF.history.back();
	},
	
	onClickClose : function(view) {
		view.close();
	},
	
	onRwmtMAcutalConfirm : function(btn, e) {
		var view = this.getMainView();
		var self = this;
		
		// Ext.Ajax.request({
		// 	url : '/domains/' + login.current_domain_id + '/diy_services/CreateRwLot/shoot.json',
		// 	method : 'POST',
		// 	params : {
		// 		label_no : view.child(' #label_no').getValue(),
		// 		operation_id : HF.setting.get('option-operation').id,
		// 		qty : view.child(' #qty').getValue(),
		// 		reason : view.child(' #memo').getValue()
		// 	},
		// 	success : function(response, opts) {
		// 		var obj = Ext.decode(response.responseText);
		// 		HF.msg.alert({title : obj.message, msg : T('text.Success to Process')});
		// 		view.child(' image').show();
		// 		view.child('#rwmt_info').hide();
		// 		view.child(' #qty').reset();
		// 		view.child(' #memo').reset();
		// 		Ext.getCmp('label').reset();
		// 		Ext.getCmp('label').focus(false, 20);
		// 	}
		// });
		HF.msg.alert('test');
	},
	
	onRwmtMCancel : function(btn, e) {
		var view = this.getMainView();
		view.getForm().reset();
		view.child(' #workcenter').setValue(HF.setting.get('option-workcenter') ? HF.setting.get('option-workcenter').name : "");
		view.child(' #operation').setValue(HF.setting.get('option-operation') ? HF.setting.get('option-operation').name : "");
	}
});