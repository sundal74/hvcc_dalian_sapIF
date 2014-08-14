Ext.define('Term.controller.noti.OpNotiM010', {
	
	extend : 'Base.abstract.PanelController',
	
	views : ['Term.view.noti.OpNotiM010'],
	
	init : function() {
		this.control({
			'term_noti_opnotim010' : {
				paramschange : this.onParamsChange
			},
			'term_noti_opnotim010 #noti_report' : {
				click : this.onNoticeView
			}
		});
	},
	
	onParamsChange : function(view, params) {
		if(!HF.setting.get('option-operation')) {
			var field = Ext.getCmp('optionbar').down('field[name=option-operation]');
			HF.msg.tip(T('text.Select Operation First'), field);
			return;
		}
		
		var grid = view.down('grid');
		var store = grid.getStore();

		store.getProxy().extraParams = {
			operation_id : HF.setting.get('option-operation') ? HF.setting.get('option-operation').id : '',
			machine_id : HF.setting.get('option-machine') ? HF.setting.get('option-machine').id : '',
			work_date : HF.setting.get('option-work_date'),
			shift : HF.setting.get('option-shift')
		};
		store.load();
	},
	
	onNoticeView : function(grid, item, rowIndex, colIndex, e, record) {
		record.data.mode = 'list';
		HF.popup('Term.view.noti.OpNotiP020', record.data, null);
	}
});