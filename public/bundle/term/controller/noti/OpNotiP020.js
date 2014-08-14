Ext.define('Term.controller.noti.OpNotiP020', {
	
	extend : 'Base.abstract.PopupController',
	
	views : ['Term.view.noti.OpNotiP020'],
	
	init : function() {
		this.control({
			'term_noti_opnotip020' : {
				paramschange : this.onParamsChange,
				click_confirm : this.onConfirm
			}
		});
	},
	
	onParamsChange : function(view, params) {
		view.down('#operation').setValue(params.operation ? params.operation : 'ALL');
		view.down('#work_date').setValue(Ext.util.Format.date(params.created_at, T('format.date')));
		view.down('#created_at').setValue(Ext.util.Format.date(params.created_at, T('format.time')));
		view.down('#msg').setValue(params.msg);
	},
	
	onConfirm : function(popup) {
		var params = popup.getParams();
		
		Ext.Ajax.request({
		    url: '/domains/' + login.current_domain_id + '/diy_services/CreateNoticeCfms/shoot.json',
		    method : 'POST',
		    params : {
				notice_id : popup.getParams().id,
				operation_id : HF.setting.get('option-operation') ? HF.setting.get('option-operation').id : ''
			},
		    success: function(response, opts) {
				popup.close();
			}
		});
	}
});