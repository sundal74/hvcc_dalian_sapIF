Ext.define('Prod.controller.ProdController', {
	extend: 'Ext.app.Controller',

	requires: [],

	stores: [],
	models: [],

	views: [],

	controllers: [],

	init: function() {
		var self = this;

		Ext.each(this.controllers, function(ctl) {
			self.getController('Prod.controller.' + ctl);
		});

		this.control({
		});
		
		this.setMixin();
		
		HF.custom.setting({
			xtype : 'container',
			layout : 'hbox',
			items : [ {
				xtype : 'numberfield',
				fieldLabel : T('setting.print_interval'),
				name : 'setting-print_interval',
				value : 6.5
			} ]
		});
	},
	
	setMixin : function() {
		// MESAgent mixin 등록 및 접속/해제 이벤트 처리
		HF.mixin('mixin.WsClient');
		Ext.log('mixin wsclient....');
		/*HF.agent.on('open', function(url) {
			HF.msg('WS-Connected', ' ' + url);
			HF.status.get('btnAgent').addCls('trayAgentOn');
		});
		HF.agent.on('close', function(url, code, reason) {
			HF.msg('WS-Disconnected', url + '(' + code + ':' + reason + ')');
			HF.status.get('btnAgent').removeCls('trayAgentOn');
		});*/
	}
});
