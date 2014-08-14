Ext.define('Base.view.common.calendar.CustomEventDetails', {

    extend : 'Base.view.common.calendar.AbstractEventDetails',

    xtype : 'hatio_custom_event_details',
    
    initComponent: function(){
		Extensible.calendar.form.EventWindow.override({
			getFormItemConfigs: function() {
		        var items = [{
		            xtype: 'textfield',
		            itemId: this.id + '-title',
		            name: Extensible.calendar.data.EventMappings.Title.name,
		            fieldLabel: this.titleLabelText,
		            anchor: '100%'
		        },{
		            xtype: 'extensible.daterangefield',
		            itemId: this.id + '-dates',
		            name: 'dates',
		            anchor: '95%',
		            singleLine: true,
		            fieldLabel: this.datesLabelText
		        },{
		            xtype: 'textfield',
		            fieldLabel: 'Custom1',
		            name: Extensible.calendar.data.EventMappings.Custom1.name,
		            anchor: '95%',
		            singleLine: true
		        },{
		            xtype: 'textfield',
		            fieldLabel: 'Custom3',
		            name: Extensible.calendar.data.EventMappings.Custom3.name,
		            anchor: '95%',
		            singleLine: true
		        },{
		            xtype: 'textfield',
		            fieldLabel: 'Custom4',
		            name: Extensible.calendar.data.EventMappings.Custom4.name,
		            anchor: '95%',
		            singleLine: true
		        },{
		            xtype: 'textarea',
		            fieldLabel: 'Custom5',
		            name: Extensible.calendar.data.EventMappings.Custom5.name,
		            anchor: '95%',
		            singleLine: true
		        }];
		        
		        if(this.calendarStore){
		            items.push({
		                xtype: 'extensible.calendarcombo',
		                itemId: this.id + '-calendar',
		                name: Extensible.calendar.data.EventMappings.CalendarId.name,
		                anchor: '100%',
		                fieldLabel: this.calendarLabelText,
		                store: this.calendarStore
		            });
		        }
		        return items;
		    },
		    getFooterBarConfig: function() {
		        var cfg = ['->', {
		                text: this.saveButtonText,
		                itemId: this.id + '-save-btn',
		                disabled: false,
		                handler: this.onSave,
		                scope: this
		            },{
		                text: this.deleteButtonText,
		                itemId: this.id + '-delete-btn',
		                disabled: false,
		                handler: this.onDelete,
		                scope: this,
		                hideMode: 'offsets' // IE requires this
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
		    }
		});
		
    	this.titleField = Ext.create('Ext.form.TextField', {
            fieldLabel: this.titleLabelText,
            name: Extensible.calendar.data.EventMappings.Title.name,
            anchor: '70%'
        });
        this.dateRangeField = Ext.create('Extensible.form.field.DateRange', {
            fieldLabel: this.datesLabelText,
            singleLine: false,
            anchor: '70%',
            listeners: {
                'change': Ext.bind(this.onDateChange, this)
            }
        });
        this.reminderField = Ext.create('Extensible.calendar.form.field.ReminderCombo', {
            name: Extensible.calendar.data.EventMappings.Reminder.name,
            fieldLabel: this.reminderLabelText,
            anchor: '70%'
        });
        this.notesField = Ext.create('Ext.form.TextArea', {
            fieldLabel: this.notesLabelText,
            name: Extensible.calendar.data.EventMappings.Notes.name,
            grow: true,
            growMax: 150,
            anchor: '70%'
        });
        this.locationField = Ext.create('Ext.form.TextField', {
            fieldLabel: this.locationLabelText,
            name: Extensible.calendar.data.EventMappings.Location.name,
            anchor: '70%'
        });
        this.urlField = Ext.create('Ext.form.TextField', {
            fieldLabel: this.webLinkLabelText,
            name: Extensible.calendar.data.EventMappings.Url.name,
            anchor: '70%'
        });
        
        this.customField1 = new Ext.form.Text({
            fieldLabel: 'Custom1',
            name: Extensible.calendar.data.EventMappings.Custom1.name,
            anchor: '70%'
        });
        
        // var leftFields = [this.titleField, this.dateRangeField, this.reminderField],
            // rightFields = [this.notesField, this.locationField, this.urlField];
            
        var rightFields = [],
            leftFields  = [this.titleField, this.dateRangeField, this.reminderField,
                           this.notesField, this.locationField, this.urlField, this.customField1];
            
        if(this.recurrence){
            this.recurrenceField = Ext.create('Extensible.form.recurrence.Fieldset', {
                recurrenceOptions: this.recurrence,
                name: Extensible.calendar.data.EventMappings.RRule.name,
                fieldLabel: this.repeatsLabelText,
                anchor: '70%'
            });
            leftFields.splice(2, 0, this.recurrenceField);
        }
        
        if(this.calendarStore){
            this.calendarField = Ext.create('Extensible.calendar.form.field.CalendarCombo', {
                store: this.calendarStore,
                fieldLabel: this.calendarLabelText,
                name: Extensible.calendar.data.EventMappings.CalendarId.name,
                anchor: '70%'
            });
            leftFields.splice(2, 0, this.calendarField);
        }
        
        var labelWidth = Math.max(this.labelWidthRightCol, this.labelWidth);
        
        this.items = [{
            id: this.id+'-left-col',
            columnWidth: this.colWidthLeft,
            layout: 'anchor',
            fieldDefaults: {
                labelWidth: labelWidth
            },
            border: false,
            items: leftFields
        },{
            id: this.id+'-right-col',
            columnWidth: this.colWidthRight,
            layout: 'anchor',
            fieldDefaults: {
                labelWidth: labelWidth
            },
            border: false,
            items: rightFields
        }];
        
        this.fbar = [{
            text:this.saveButtonText, scope: this, handler: this.onSave
        },{
            itemId:this.id+'-del-btn', text:this.deleteButtonText, scope:this, handler:this.onDelete
        },{
            text:this.cancelButtonText, scope: this, handler: this.onCancel
        }];
        
    	this.callParent(arguments);
    }
},

function (){
	Extensible.calendar.data.EventMappings.Custom1 = {
     	name: 'Custom1',
        mapping: 'custom1',
        type: 'string'
	};
	Extensible.calendar.data.EventMappings.Custom3 = {
     	name: 'Custom3',
        mapping: 'custom3',
        type: 'string'
	};
	Extensible.calendar.data.EventMappings.Custom4 = {
     	name: 'Custom4',
        mapping: 'custom4',
        type: 'string'
	};
	Extensible.calendar.data.EventMappings.Custom5 = {
     	name: 'Custom5',
        mapping: 'custom5',
        type: 'string'
	};
	Extensible.calendar.data.EventModel.reconfigure();
}

);