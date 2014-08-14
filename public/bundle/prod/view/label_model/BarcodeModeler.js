Ext.define('Prod.view.barcode_label.BarcodeModeler', {
	
	extend : 'Ext.Panel',
	
	xtype : 'prod_barcode_modeler',
	
	title : T('title.barcode_modeler'),
	
	autoScroll : true,
	
	modelerUrl : '/domains/' + login.current_domain_id + '/&readOnly=false&hasFlowMeta=false',
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'back', 'modeler', 'save']
	} ],
	
	refreshModeler : function(record) {
		this.removeAll();
		this.add({
			xtype : 'flash',
			url : 'bundle/sample/resources/swf/LabelModeler.swf',
			flashParams : { 
				quality : 'high',
				wmode : 'window',
				bgcolor : '#869ca7',
				allowScriptAccess : 'sameDomain',
				allowFullScreen : true,
				flashvars : "serverUrl=" + this.modelerUrl + "&modelId=" + record.data.id
			}
		});
	}
});