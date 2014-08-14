Ext.define('Prod.view.machine_chk_plan.MachineChkEventDetails', {

    extend : 'Base.view.common.calendar.AbstractEventDetails',

    xtype : 'prod_machine_chk_event_details',
    
    requires: [
        'Extensible.form.field.DateRange',
        'Extensible.calendar.form.field.ReminderCombo',
        'Extensible.calendar.data.EventMappings',
        'Extensible.calendar.form.field.CalendarCombo',
        'Extensible.form.recurrence.Fieldset',
        'Ext.layout.container.Column',
        'Extensible.form.recurrence.RangeEditWindow',
        'Base.view.common.calendar.CustomDateRange',
        'Ext.form.field.Date',
        'Prod.view.machine_chk_plan.MachineChkPlanForm'
    ],
    
    initComponent: function() {
    	var originalShow = Extensible.calendar.form.EventWindow.prototype.show;
    	var store = Ext.create("Prod.store.MachineChkPlan");
		var main = this;
		
		Extensible.calendar.form.EventWindow.override({
			width : 800,
			height : 512,
			modal: true,
			resizable: true,
			
			getFormItemConfigs: function() {
		        var items = [{
		            xtype: 'textfield',
		            itemId: this.id + '-title',
		            name: Extensible.calendar.data.EventMappings.Title.name,
		            fieldLabel: this.titleLabelText,
		            flex:1,
		            hidden:true
		        },{
		            xtype: 'hatio_custom_daterange',
		            itemId: this.id + '-dates',
		            name: 'dates',
		            flex:1,
		            singleLine: true,
		            fieldLabel: this.datesLabelText,
		            hidden:true,
		            displayId: this.id + '-dates'
		        },{
		            xtype: 'datefield',
		            itemId: this.id + '-dueDate',
		            fieldLabel: Extensible.calendar.data.EventMappings.DueDate.name,
		            name: Extensible.calendar.data.EventMappings.DueDate.name,
		            flex:1,
		            singleLine: true,
		            hidden:true
		        },{
		            xtype: 'extensible.calendarcombo',
		            itemId: this.id + '-Machine',
		            fieldLabel: Extensible.calendar.data.EventMappings.Machine.name,
		            name: Extensible.calendar.data.EventMappings.Machine.name,
		            flex:1,
		            store: this.calendarStore,
		            hidden:true
		        },{
		            xtype: 'textarea',
		            itemId: this.id + '-description',
		            fieldLabel: Extensible.calendar.data.EventMappings.Description.name,
		            name: Extensible.calendar.data.EventMappings.Description.name,
		            flex:1,
		            singleLine: true,
		            hidden:true
		        },{
		        	xtype: 'grid',
		        	itemId: 'contentGrid',
		        	store: store,
		        	autoScroll: true,
		        	height : 380,
		        	flex:1,
		        	columns : [
						{ header : T('label.id'), dataIndex : 'id', hidden : true },
						{ 
							header: T('label.status'),
							dataIndex : 'status',
						  	xtype: 'actioncolumn',
						  	width : 50,
						  	align : 'left',
						  	renderer: function(value, metaData, record, row, col, store, gridView) {
								if(record.get("status") == 'W') {
									return "<img src=\"theme/image/statusGreen.png\"/>";
								} else if(record.get("status") == 'T') {
									return "<img src=\"theme/image/statusGray.png\"/>";
								}
							}
						},
						{ header : T('label.machine'), dataIndex : 'machine', xtype : 'entitycolumn' },
						{ header : T('label.machine_desc'), dataIndex : 'machine', width : 170, renderer : function(val) { return val.desc; } },
						{ xtype : 'codecolumn', header : T('label.pm_type'), dataIndex : 'pm_type', tpl : '{description}', commonCode : 'PM_TYPE' },
						{ xtype : 'codecolumn', header : T('label.pm_part'), dataIndex : 'pm_part', tpl : '{description}', commonCode : 'PM_PART' },
						{ header : T('label.plan_date'), dataIndex : 'plan_date', xtype : 'datecolumn', format : T('format.date') },
						{ header : T('label.due_date'), dataIndex : 'due_date', xtype : 'datecolumn', format : T('format.date') },
						{ header : T('label.check_date'), dataIndex : 'check_date', xtype : 'datecolumn', format : T('format.date') },
						{ header : T('label.inspector'), dataIndex : 'inspector', xtype : 'entitycolumn', width : 90 },
						{ header : T('label.start_time'), dataIndex : 'start_time', width : 120, editor : { xtype : 'datefield', format : T('format.datetime') } },
						{ header : T('label.end_time'), dataIndex : 'end_time', width : 120, editor : { xtype : 'datefield', format : T('format.datetime') } },
						{ header : T('label.check_point'), dataIndex : 'description', width : 120 },
						{ header : T('label.chk_comment'), dataIndex : 'chk_comment', width : 250 }
					]
		        },{
		        	xtype: 'prod_machine_chk_plan_form',
		        	itemId: 'planDetail',
		        	store:store,
		        	height : 0,
		        	flex:1,
		        	dockedItems: [ {
						xtype: 'controlbar',
						items: ['->', 'save', 'close']
					} ]
		        }];
		        
//		        if(this.calendarStore) {
//		            items.push({
//		                xtype: 'extensible.calendarcombo',
//		                itemId: this.id + '-calendar',
//		                name: Extensible.calendar.data.EventMappings.CalendarId.name,
//		                flex:1,
//		                fieldLabel: this.calendarLabelText,
//		                store: this.calendarStore
//		            });
//		        }
		
		        return items;
		    },
		
		    getFooterBarConfig: function() {
		        var cfg = ['->', {
		                text: this.saveButtonText,
		                itemId: this.id + '-save-btn',
		                disabled: true,
		                handler: this.onSave,
		                scope: this,
						hidden : true
		            },{
		                text: this.deleteButtonText,
		                itemId: this.id + '-delete-btn',
		                disabled: true,
		                handler: this.onDelete,
		                scope: this,
						//hideMode: 'offsets' // IE requires this
						hidden : true
		            },{
		                text: this.cancelButtonText,
		                itemId: this.id + '-cancel-btn',
		                disabled: false,
		                handler: this.onCancel,
		                scope: this
		            }];
		        
		        if(this.enableEditDetails !== false){
		            cfg.unshift({
		                xtype: 'tbtext',
		                itemId: this.id + '-details-btn'
		                //text: '<a href="#" class="' + this.editDetailsLinkClass + '">' + this.detailsLinkText + '</a>'
		            });
		        }
		        return cfg;
		    },
		
		    show: function(o, animateTarget) {
		    	var self = this;
		    	originalShow.apply(this, arguments);
		    	
				try {
		    		if(this.down('#' + this.id + '-sysdate')) {
		    			this.setTitle(this.down('#' + this.id + '-sysdate').value);	
		    		}
		    	} catch(e) {
				}
		    	
		    	try {
			    	if(!this.activeRecord.data.Title) {
			    		this.hide();
			    		return;
			    	}
			
			    	var paramObj = {};
			    	if(this.activeRecord.data.status) {
			    		if(this.activeRecord.data.Machine && this.activeRecord.data.Machine.length > 0) {
			    			if(this.down('#planDetail')) {
			    				this.down('#planDetail').setHeight(350);
			    				
								this.down('#planDetail').down('#close').on('click', function() {
									self.onCancel();
								}, this);
								
			    				this.down('#planDetail').down('#save').on('click', function() {
			    					var form = this.down('#planDetail');
									if (!form.isValid()) {
										HF.msg.notice(T('text.Invalid data'));
										return;
									}
									
									if(!main.validateLogic(form)) {
										return;
									}
									
									HF.msg.confirm({
										msg : T('text.Sure to Save'),
										fn : function(btn) {
											if(btn != 'yes')
												return;
											
											var values = form.getValues();
											var entity = Ext.create("Prod.model.MachineChkPlan", values);
											var errors = entity.validate();
											
											if(errors.isValid()) {
												entity.save({
													success : function(record, operation) {
														self.onCancel();
														//self.onMultiWeekNavClick();
													}
												});
											} else {
												var errorText = "Total " + errors.length + " error " + (errors.length > 1 ? "s" : "") + "occurred!\n";
												for(var i = 0 ; i < errors.length; i++) {
													var error = errors.getAt(i);
													errorText += "[" + T('label.' + error.field) + "] field " + error.message + "\n";
												}
												HF.error(errorText);
											}
										},
										scope: this
									});
			    					
			    				}, this);
			    			}
			
			    			if(this.down('#contentGrid')) {
			    				this.down('#contentGrid').setHeight(0);
			    			}
			
			    			var machineChkPlanModel = Ext.ClassManager.get("Prod.model.MachineChkPlan");
							machineChkPlanModel.load(this.activeRecord.data.Id, {
								scope : this,
								success : function(record, operation) {
									var chkForm = this.down('#planDetail');
									chkForm.loadRecord(record);
									chkForm.down('entityfield[name=machine]').setReadOnly(true);
									chkForm.down('codecombo[name=pm_type]').setReadOnly(true);
									chkForm.down('codecombo[name=pm_part]').setReadOnly(true);
									chkForm.down('datefield[name=plan_date]').setReadOnly(true);
									chkForm.down('datefield[name=due_date]').setReadOnly(true);
									chkForm.down('textfield[name=description]').setReadOnly(true);
								}
							});
							this.down('#' + this.id + '-cancel-btn').hide();
							
			    		} else {
			    			if(this.down('#planDetail')) {
								this.setTitle(T('title.add_pm_actual'));
			    				this.down('#planDetail').setHeight(0);
			    			}
			
			    			if(this.down('#contentGrid')) {
								this.setTitle(T('menu.MachineChkPlan'));
								paramObj['_q[pm_type-eq]'] = this.activeRecord.data.PmType;
				    			paramObj['_q[status-eq]'] = this.activeRecord.data.status;
				    			paramObj['_q[plan_date-eq]'] = this.activeRecord.data.PlanDate;
				    			this.down('#contentGrid').store.getProxy().extraParams = paramObj;
				    			this.down('#contentGrid').store.load();
			    			}
			    		}
			    	}	
		    	} catch(e) { 
				}
				
		    	this.down('#' + this.id + '-delete-btn').hide();
		    }
		});
		
    	this.callParent(arguments);
    },

	validateLogic : function(form) {
		var startTime = form.getValues().start_time;
		var endTime = form.getValues().end_time;
		var checkDate = form.getValues().check_date;
	
		if(checkDate > startTime) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X less than Y', {x : T('label.start_time'), y : T('label.check_date')})});
			return false;
		}

		if(startTime && endTime && (startTime > endTime)) {
			HF.msg.notice({title : T('text.Invalid Time'), msg : T('text.X greater than Y', {x : T('label.start_time'), y : T('label.end_time')})});
			return false;
		}
	
		return true;
	},
},

function() {
	Extensible.calendar.data.EventMappings.PlanDate = {
     	name: 'PlanDate',
        mapping: 'plan_date',
        type: 'string'
	};
	Extensible.calendar.data.EventMappings.DueDate = {
     	name: 'DueDate',
        mapping: 'dueDate',
        type: 'string'
	};
	Extensible.calendar.data.EventMappings.Machine = {
     	name: 'Machine',
        mapping: 'machine_code',
        type: 'string'
	};
	Extensible.calendar.data.EventMappings.Description = {
     	name: 'Description',
        mapping: 'description',
        type: 'string'
	};
	Extensible.calendar.data.EventMappings.Status = {
     	name: 'status',
        mapping: 'status',
        type: 'string'
	};
	Extensible.calendar.data.EventMappings.PmType = {
     	name: 'PmType',
        mapping: 'pm_type',
        type: 'string'
	};
	// Extensible.calendar.data.EventMappings.MachineId = {
	//      	name: 'MachineId',
	//         mapping: 'machine_id',
	//         type: 'string'
	// };
	Extensible.calendar.data.EventMappings.Id = {
     	name: 'Id',
        mapping: 'id',
        type: 'string'
	};
	
	Extensible.calendar.data.EventModel.reconfigure();
}

);