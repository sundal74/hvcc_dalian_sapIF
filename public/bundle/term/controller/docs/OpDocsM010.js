Ext.define('Term.controller.docs.OpDocsM010', {
	
	extend : 'Base.abstract.PanelController',
	
	views : ['Term.view.docs.OpDocsM010'],
	
	models : ['Base.model.FileGroupWithAttachments'],
	
	stores : ['Prod.store.StdWorkDoc'],
	
	init : function() {
		this.control({
			'term_docs_opdocsm010' : {
				paramschange : this.onParamsChange
			},
			'term_docs_opdocsm010 #docs_report' : {
				click : this.onDocsView
			}
		});
	},
	
	onParamsChange : function(view, params) {
		if(!HF.setting.get('option-operation')) {
			var field = Ext.getCmp('optionbar').down('field[name=option-operation]');
			HF.msg.tip(T('text.Select Operation First'), field);
			return;
		}
		
		var grid = view.child('grid');
		var store = grid.getStore();
		
		store.getProxy().extraParams = {
			'_q[operation_id-eq]' : HF.setting.get('option-operation') ? HF.setting.get('option-operation').id : '',
			// '_q[machine_id-eq]' : HF.setting.get('option-machine') ? HF.setting.get('option-machine').id : ''
		};
		store.load();
	},
	
	onDocsView : function(grid, item, rowIndex, colIndex, e, record) {
		Ext.ModelManager.getModel('Base.model.FileGroupWithAttachments').load(record.get('file_group_id'), {
		    success: function(file_group) {
				HF.slideshow(file_group.data.attachments);
		    }
		});
	}
});