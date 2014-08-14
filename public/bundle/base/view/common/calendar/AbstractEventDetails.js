Ext.define('Base.view.common.calendar.AbstractEventDetails', {
	
    extend : 'Ext.form.Panel',
    
	xtype : 'abstract_event_details',
    
    requires: [
        'Extensible.form.field.DateRange',
        'Extensible.calendar.form.field.ReminderCombo',
        'Extensible.calendar.data.EventMappings',
        'Extensible.calendar.form.field.CalendarCombo',
        'Extensible.form.recurrence.Fieldset',
        'Ext.layout.container.Column',
        'Extensible.form.recurrence.RangeEditWindow'
    ],
    
    labelWidth: 65,
    labelWidthRightCol: 65,
    colWidthLeft: '.9',
    colWidthRight: '.1',
    title: 'Event Form',
    titleTextAdd: 'Add Event',
    titleTextEdit: 'Edit Event',
    titleLabelText: 'Title',
    datesLabelText: 'When',
    reminderLabelText: 'Reminder',
    notesLabelText: 'Notes',
    locationLabelText: 'Location',
    webLinkLabelText: 'Web Link',
    calendarLabelText: 'Calendar',
    repeatsLabelText: 'Repeats',
    saveButtonText: 'Save',
    deleteButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    bodyStyle: 'padding:20px 20px 10px;',
    border: false,
    buttonAlign: 'center',
    autoScroll: true,
    
    /**
     * @cfg {Boolean} recurrence
     * @since 1.6.0
     * True to show the recurrence field, false to hide it (default). Note that recurrence requires
     * something on the server-side that can parse the iCal RRULE format in order to generate the
     * instances of recurring events to display on the calendar, so this field should only be enabled
     * if the server supports it.
     */
    recurrence: false,
    
    /**
     * @cfg {Boolean} allowDefaultAdd
     * @since 1.6.0
     * True to allow the user to save the initial default record displayed in the form while in Add mode
     * and the record is not dirty (default). If false, the form save action will be treated as a cancel action
     * if no editing was performed while in Add mode and the record will not be added. Note that this setting
     * does not apply when in Edit mode. The save action will always be treated as cancel in Edit mode if
     * the form is not dirty.
     *
     * When this option is true any blank or default field values should be allowed by the back end
     * system handling the operation. For example, by default if the event title is blank the calendar views
     * will substitute the value of {@link Extensible.calendar.view.AbstractCalendar#defaultEventTitleText
     * defaultEventTitleText} when displaying it. Any custom fields might require similar custom handling.
     */
    allowDefaultAdd: true,
    
    // private properties:
    layout: 'column',
    
    // private
    initComponent: function(){
        this.addEvents({
            /**
             * @event eventadd
             * Fires after a new event is added
             * @param {Extensible.calendar.form.EventDetails} this
             * @param {Extensible.calendar.data.EventModel} rec The new {@link Extensible.calendar.data.EventModel
             * record} that was added
             */
            eventadd: true,
            /**
             * @event eventupdate
             * Fires after an existing event is updated
             * @param {Extensible.calendar.form.EventDetails} this
             * @param {Extensible.calendar.data.EventModel} rec The new {@link Extensible.calendar.data.EventModel
             * record} that was updated
             */
            eventupdate: true,
            /**
             * @event eventdelete
             * Fires after an event is deleted
             * @param {Extensible.calendar.form.EventDetails} this
             * @param {Extensible.calendar.data.EventModel} rec The new {@link Extensible.calendar.data.EventModel
             * record} that was deleted
             */
            eventdelete: true,
            /**
             * @event eventcancel
             * Fires after an event add/edit operation is canceled by the user and no store update took place
             * @param {Extensible.calendar.form.EventDetails} this
             * @param {Extensible.calendar.data.EventModel} rec The new {@link Extensible.calendar.data.EventModel
             * record} that was canceled
             */
            eventcancel: true
        });
                
        this.addCls('ext-evt-edit-form');
        
        Ext.apply(this.initialConfig, {
            trackResetOnLoad: true
        });
        
        this.callParent(arguments);
    },
    
    // private
    onDateChange: function(dateRangeField, val){
        if(this.recurrenceField){
            this.recurrenceField.setStartDate(val[0]);
        }
    },
    
    // inherited docs
    loadRecord: function(rec) {
        var me = this,
            EventMappings = Extensible.calendar.data.EventMappings;
        
        me.form.reset().loadRecord.apply(me.form, arguments);
        me.activeRecord = rec;
        me.dateRangeField.setValue(rec.data);
        
        if (me.recurrenceField) {
            me.recurrenceField.setStartDate(rec.data[EventMappings.StartDate.name]);
            me.recurrenceField.setValue(rec.data[EventMappings.RRule.name]);
            
            if (!rec.data[EventMappings.RInstanceStartDate.name]) {
                // If the record is new we have to set the instance start date explicitly to match the
                // field's default so that it does not show up later as dirty if it is not edited:
                rec.data[EventMappings.RInstanceStartDate.name] = rec.getStartDate();
            }
        }
        
        if (me.calendarField) {
            me.calendarField.setValue(rec.data[EventMappings.CalendarId.name]);
        }
        
        if (rec.phantom) {
            me.setTitle(me.titleTextAdd);
            me.down('#' + me.id + '-del-btn').hide();
        }
        else {
            me.setTitle(me.titleTextEdit);
            me.down('#' + me.id + '-del-btn').show();
        }
        
        // Using setValue() results in dirty fields, so we reset the field state
        // after loading the form so that the current values are the "original" values
        me.form.getFields().each(function(item) {
            item.resetOriginalValue();
        });
        
        me.titleField.focus();
    },
    
    updateRecord: function(record) {
        var fields = record.fields,
            values = this.getForm().getValues(),
            EventMappings = Extensible.calendar.data.EventMappings,
            name,
            obj = {};

        fields.each(function(f) {
            name = f.name;
            if (name in values) {
                obj[name] = values[name];
            }
        });
        
        var dates = this.dateRangeField.getValue(),
            allday = obj[EventMappings.IsAllDay.name] = dates[2],
            // Clear times for all day events so that they are stored consistently
            startDate = allday ? Extensible.Date.clearTime(dates[0]) : dates[0],
            endDate = allday ? Extensible.Date.clearTime(dates[1]) : dates[1],
            singleDayDurationConfig = { days: 1 };
        
        // The full length of a day based on the minimum event time resolution:
        singleDayDurationConfig[Extensible.calendar.data.EventModel.resolution] = -1;
        
        obj[EventMappings.StartDate.name] = startDate;
        
        // If the event is all day, calculate the end date as midnight of the day after the end
        // date minus 1 unit based on the EventModel resolution, e.g. 23:59:00 on the end date
        obj[EventMappings.EndDate.name] = allday ?
            Extensible.Date.add(endDate, singleDayDurationConfig) : endDate;
        
        if (EventMappings.Duration) {
            obj[EventMappings.Duration.name] = Extensible.Date.diff(startDate, obj[EventMappings.EndDate.name],
                Extensible.calendar.data.EventModel.resolution);
        }
        
        record.set(obj);
        
        return record.dirty || (record.phantom && this.allowDefaultAdd);
    },
    
    // private
    onCancel: function(){
        this.cleanup(true);
        this.fireEvent('eventcancel', this, this.activeRecord);
    },
    
    // private
    cleanup: function(hide){
        if (this.activeRecord) {
            this.activeRecord.reject();
        }
        delete this.activeRecord;
        
        if (this.form.isDirty()) {
            this.form.reset();
        }
    },
    
    // private
    onSave: function(){
        var me = this,
            originalHasRecurrence = me.activeRecord.isRecurring();
        
        if (!me.form.isValid() && !me.allowDefaultAdd) {
            return;
        }
        
        if (!me.updateRecord(me.activeRecord)) {
            me.onCancel();
            return;
        }
        
        if (me.activeRecord.phantom) {
            me.fireEvent('eventadd', me, me.activeRecord);
        }
        else {
            if (originalHasRecurrence) {
                // We only need to prompt when editing an existing recurring event. If a normal
                // event is edited to make it recurring just do a standard update.
                me.onRecurrenceUpdate();
            }
            else {
                me.fireEvent('eventupdate', me, me.activeRecord);
            }
        }
    },
    
    // private
    onRecurrenceUpdate: function() {
        Extensible.form.recurrence.RangeEditWindow.prompt({
            callback: this.onRecurrenceEditModeSelected,
            scope: this
        });
    },
    
    // private
    onRecurrenceEditModeSelected: function(editMode) {
        var me = this;
        
        if (editMode) {
            me.activeRecord.data[Extensible.calendar.data.EventMappings.REditMode.name] = editMode;
            me.fireEvent('eventupdate', me, me.activeRecord, me.animateTarget);
        }
    },

    // private
    onDelete: function(){
        this.fireEvent('eventdelete', this, this.activeRecord);
    }
});