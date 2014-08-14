/**
 * StdWorkDoc controller
 */
Ext.define('Prod.controller.std_work_doc.StdWorkDoc', {
	
	extend: 'Base.abstract.entity.ListMainController',
	
	requires : [ 
		'Prod.model.StdWorkDoc', 
		'Prod.store.StdWorkDoc', 
		'Prod.view.std_work_doc.StdWorkDoc' 
	],
	
	models : ['Prod.model.StdWorkDoc', 'Base.model.FileGroupWithAttachments'],
			
	stores: ['Prod.store.StdWorkDoc'],
	
	views : ['Prod.view.std_work_doc.StdWorkDoc'],
	
	refs: [ { ref : 'StdWorkDoc', selector : 'prod_std_work_doc' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'prod_std_work_doc' : {
				paramschange : this.onParamsChange
			},
			'prod_std_work_doc_list' : {
				click_add : this.onPopupNew,
				click_save : this.onGridSave,
				click_delete : this.onGridDelete,
				click_import : this.onImport,
				click_export : this.onExport,
				after_grid_updated : this.afterGridUpdated,
				click_update : this.onInquiryDetail
			},
			'prod_std_work_doc_list #slideshow' : {
				click : this.onSlideShow
			},
			'prod_std_work_doc_search' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},

	/****************************************************************
	 ** 			여기는 customizing area 						   **
	 ****************************************************************/
	onSlideShow : function(grid, item, rowIndex, colIndex, e, record) {
		Ext.ModelManager.getModel('Base.model.FileGroupWithAttachments').load(record.get('file_group_id'), {
		    success: function(file_group) {
				HF.slideshow(file_group.data.attachments);
		    },
			scope : this
		});
	},
			
	/****************************************************************
	 ** 			여기서 부터는 abstract method, 필수 구현 				   **
	 ****************************************************************/
	onPopupNew : function() {
		HF.popup(this.getDetailViewName(), {}, {});
	},

	
	/**
	 * detail view type(popup | view | none)을 리턴
	 */	
	getDetailViewType : function() {
		return 'popup';
	},
	
	/**
	 * main view를 리턴 
	 */
	getMainView : function() {
		return this.getStdWorkDoc();
	}
});