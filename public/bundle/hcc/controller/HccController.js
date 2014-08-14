Ext.define('Hcc.controller.HccController', {
	extend: 'Ext.app.Controller',

	requires: [],

	stores: [],
	
	models: [],

	views: [],

	controllers: [],

	init: function() {
		var self = this;

		Ext.each(this.controllers, function(ctl) {
			self.getController('Hcc.controller.' + ctl);
		});

		this.control({
		});
	}
});
