Ext.define('Base.view.common.calendar.HatioCalendarPanel', {
	
    extend: 'Ext.panel.Panel',
    
	xtype : 'hatio_calendar_panel',
    
    requires: [
        'Ext.layout.container.Card',
        'Extensible.calendar.view.Day',
        'Extensible.calendar.view.Week',
        'Extensible.calendar.view.Month',
        'Extensible.calendar.view.MultiDay',
        'Extensible.calendar.view.MultiWeek'
    ],
    
    recurrence: false,
    showDayView: true,
    showMultiDayView: false,
    showWeekView: true,
    showMultiWeekView: true,
    showMonthView: true,
    showNavBar: true,
    todayText: 'Today',
    showTodayText: true,
    showTime: true,
    readOnly: false,
    showNavToday: true,
    showNavJump: true,
    showNavNextPrev: true,
    jumpToText: 'Jump to:',
    goText: 'Go',
    dayText: 'Day',
    multiDayText: '{0} Days',
    weekText: 'Week',
    multiWeekText: '{0} Weeks',
    monthText: 'Month',
    editModal: false,
    enableEditDetails: true,
    currentStatus:'', //달력이 월인지, 2주인지, 1주인이지, 일별인지를 관리하는변수
    
    // private
    layout: {
        type: 'card',
        deferredRender: true
    },
    
    // private property
    startDate: new Date(),
    
    // private
    initComponent : function(){
    	Extensible.calendar.view.AbstractCalendar.override({
    		enableDD:false //달력이 드래그안되게 수정함. true로 하면 드래그됨.
    	});
    	
        this.tbar = {
            cls: 'ext-cal-toolbar',
            border: true,
            items: []
        };
        
        this.viewCount = 0;
        
        var text,
            multiDayViewCount = (this.multiDayViewCfg && this.multiDayViewCfg.dayCount) || 3,
            multiWeekViewCount = (this.multiWeekViewCfg && this.multiWeekViewCfg.weekCount) || 2;
        
        if(this.showNavToday){
            this.tbar.items.push({
                id: this.id+'-tb-today', text: this.todayText, handler: this.onTodayClick, scope: this
            });
        }
        if(this.showNavNextPrev){
            this.tbar.items.push({id: this.id+'-tb-prev', handler: this.onPrevClick, scope: this, iconCls: 'x-tbar-page-prev'});
            this.tbar.items.push({id: this.id+'-tb-next', handler: this.onNextClick, scope: this, iconCls: 'x-tbar-page-next'});
        }
        if(this.showNavJump){
            this.tbar.items.push(this.jumpToText);
            this.tbar.items.push({id: this.id+'-tb-jump-dt', xtype: 'datefield', width: 120, showToday: false});
            this.tbar.items.push({id: this.id+'-tb-jump', text: this.goText, handler: this.onJumpClick, scope: this});
        }
        
        this.tbar.items.push('->');
        
        if(this.showDayView){
            this.tbar.items.push({
                id: this.id+'-tb-day', text: this.dayText, handler: this.onDayNavClick, scope: this, toggleGroup: this.id+'-tb-views', hidden:true
            });
            this.viewCount++;
        }
        if(this.showMultiDayView){
            text = Ext.String.format(this.getMultiDayText(multiDayViewCount), multiDayViewCount);
            this.tbar.items.push({
                id: this.id+'-tb-multiday', text: text, handler: this.onMultiDayNavClick, scope: this, toggleGroup: this.id+'-tb-views', hidden:true
            });
            this.viewCount++;
        }
        if(this.showWeekView){
            this.tbar.items.push({
                id: this.id+'-tb-week', text: this.weekText, handler: this.onWeekNavClick, scope: this, toggleGroup: this.id+'-tb-views', hidden:true
            });
            this.viewCount++;
        }
        if(this.showMultiWeekView){
            text = Ext.String.format(this.getMultiWeekText(multiWeekViewCount), multiWeekViewCount);
            this.tbar.items.push({
                id: this.id+'-tb-multiweek', text: text, handler: this.onMultiWeekNavClick, scope: this, toggleGroup: this.id+'-tb-views', hidden:false
            });
            this.viewCount++;
        }
        if(this.showMonthView || this.viewCount === 0){
            this.tbar.items.push({
                id: this.id+'-tb-month', text: this.monthText, handler: this.onMonthNavClick, scope: this, toggleGroup: this.id+'-tb-views', hidden:false
            });
            this.viewCount++;
            this.showMonthView = true;
        }
        
        var idx = this.viewCount-1;
        this.activeItem = (this.activeItem === undefined ? idx : (this.activeItem > idx ? idx : this.activeItem));
        
        if(this.showNavBar === false){
            delete this.tbar;
            this.addCls('x-calendar-nonav');
        }
        
        this.callParent(arguments);
        
        this.addEvents({
            eventadd: true,            
            eventupdate: true,           
            beforeeventdelete: true,           
            eventdelete: true,            
            eventcancel: true,            
            viewchange: true,            
            editdetails: true
        });
        
        this.addCls('x-cal-panel');
        
        if(this.eventStore){
            this.store = this.eventStore;
            delete this.eventStore;
        }
        this.setStore(this.store);
        
        var sharedViewCfg = {
            showToday: this.showToday,
            todayText: this.todayText,
            showTodayText: this.showTodayText,
            showTime: this.showTime,
            readOnly: this.readOnly,
            recurrence: this.recurrence,
            store: this.store,
            calendarStore: this.calendarStore,
            editModal: this.editModal,
            enableEditDetails: this.enableEditDetails,
            ownerCalendarPanel: this
        };
        
        if(!this.week2EventStore){
            this.week2EventStore = this.store;
        }
        //2주보이는 달력은 store를 week2EventStore로 바인딩해준다.
        var sharedMultiWeekViewCfg = {
            showToday: this.showToday,
            todayText: this.todayText,
            showTodayText: this.showTodayText,
            showTime: this.showTime,
            readOnly: this.readOnly,
            recurrence: this.recurrence,
            store: this.week2EventStore,
            calendarStore: this.calendarStore,
            editModal: this.editModal,
            enableEditDetails: this.enableEditDetails,
            ownerCalendarPanel: this
        };
        
        if(this.showDayView){
            var day = Ext.apply({
                xtype: 'extensible.dayview',
                title: this.dayText
            }, sharedViewCfg);
            
            day = Ext.apply(Ext.apply(day, this.viewConfig), this.dayViewCfg);
            day.id = this.id+'-day';
            this.initEventRelay(day);
            this.add(day);
        }
        if(this.showMultiDayView){
            var mday = Ext.apply({
                xtype: 'extensible.multidayview',
                title: this.getMultiDayText(multiDayViewCount)
            }, sharedViewCfg);
            
            mday = Ext.apply(Ext.apply(mday, this.viewConfig), this.multiDayViewCfg);
            mday.id = this.id+'-multiday';
            this.initEventRelay(mday);
            this.add(mday);
        }
        if(this.showWeekView){
            var wk = Ext.applyIf({
                xtype: 'extensible.weekview',
                title: this.weekText
            }, sharedViewCfg);
            
            wk = Ext.apply(Ext.apply(wk, this.viewConfig), this.weekViewCfg);
            wk.id = this.id+'-week';
            this.initEventRelay(wk);
            this.add(wk);
        }
        if(this.showMultiWeekView){
            var mwk = Ext.applyIf({
                xtype: 'extensible.multiweekview',
                title: this.getMultiWeekText(multiWeekViewCount)
            }, sharedMultiWeekViewCfg); //2주달력만 config를 다른것으로함.
            
            mwk = Ext.apply(Ext.apply(mwk, this.viewConfig), this.multiWeekViewCfg);
            mwk.id = this.id+'-multiweek';
            this.initEventRelay(mwk);
            this.add(mwk);
        }
        if(this.showMonthView){
            var month = Ext.applyIf({
                xtype: 'extensible.monthview',
                title: this.monthText,
                listeners: {
                    'weekclick': {
                        fn: function(vw, dt){
                            this.showWeek(dt);
                        },
                        scope: this
                    }
                }
            }, sharedViewCfg);
            
            month = Ext.apply(Ext.apply(month, this.viewConfig), this.monthViewCfg);
            month.id = this.id+'-month';
            this.initEventRelay(month);
            this.add(month);
        }

        this.add(Ext.applyIf({
            xtype: this.detailsXtype,
            id: this.id+'-edit',
            detailAble : this.detailAble,
            calendarStore: this.calendarStore,
            recurrence: this.recurrence,
            listeners: {
                'eventadd':    { scope: this, fn: this.onEventAdd },
                'eventupdate': { scope: this, fn: this.onEventUpdate },
                'eventdelete': { scope: this, fn: this.onEventDelete },
                'eventcancel': { scope: this, fn: this.onEventCancel }
            }
        }, this.editViewCfg));
        
//        this.details.id = this.id+'-edit';
//        this.details.calendarStore = this.calendarStore;
//        this.details.recurrence = this.recurrence;
//        
//        this.add(Ext.applyIf(this.details, this.editViewCfg));
    },
    
    // private
    initEventRelay: function(cfg){
        cfg.listeners = cfg.listeners || {};
        cfg.listeners.afterrender = {
            fn: function(c){
                // Relay view events so that app code only has to handle them in one place.
                // These events require no special handling by the calendar panel.
                this.relayEvents(c, ['eventsrendered', 'eventclick', 'dayclick', 'eventover', 'eventout',
                    'beforedatechange', 'datechange', 'rangeselect', 'beforeeventcopy', 'eventcopy',
                    'beforeeventmove', 'eventmove', 'initdrag', 'dayover', 'dayout', 'beforeeventresize',
                    'eventresize', 'eventadd', 'eventupdate', 'beforeeventdelete', 'eventdelete',
                    'eventcancel', 'eventexception']);
                
                c.on('editdetails', this.onEditDetails, this);
                c.on('eventover', this.onEventover, this);
            },
            scope: this,
            single: true
        };
    },
    
    /**
     *  달력 셀에 마우스 오버시 액션 구현
     */
    onEventover: function(){
    	// TODO
    },
    
    // private
    afterRender: function(){
        this.callParent(arguments);
        
        this.body.addCls('x-cal-body');
        this.updateNavState();
        this.setActiveView();
    },
    
    /**
     * Returns the text to use for the 'X Days' nav bar button (defaults to "{0} Days" where {0} is automatically replaced by the
     * value of the {@link #multDayViewCfg}'s dayCount value if available, otherwise it uses the view default of 3).
     */
    getMultiDayText: function(numDays){
        return this.multiDayText;
    },
    
    /**
     * Returns the text to use for the 'X Weeks' nav bar button (defaults to "{0} Weeks" where {0} is automatically replaced by the
     * value of the {@link #multiWeekViewCfg}'s weekCount value if available, otherwise it uses the view default of 2).
     */
    getMultiWeekText: function(numWeeks){
        return this.multiWeekText;
    },
    
    /**
     * Sets the event store used by the calendar to display {@link Extensible.calendar.data.EventModel events}.
     * @param {Ext.data.Store} store
     */
    setStore : function(store, initial){
        var currStore = this.store;
        
        if(!initial && currStore){
            currStore.un("write", this.onWrite, this);
        }
        if(store){
            store.on("write", this.onWrite, this);
        }
        this.store = store;
    },
    
    // private
    onStoreAdd : function(ds, recs, index){
        this.hideEditForm();
    },
    
    // private
    onStoreUpdate : function(ds, rec, operation){
        if(operation === Ext.data.Record.COMMIT){
            this.hideEditForm();
        }
    },

    // private
    onStoreRemove : function(ds, rec){
        this.hideEditForm();
    },
    
    // private
    onWrite: function(store, operation){
        var rec = operation.records[0];
        
        switch(operation.action){
            case 'create':
                this.onStoreAdd(store, rec);
                break;
            case 'update':
                this.onStoreUpdate(store, rec, Ext.data.Record.COMMIT);
                break;
            case 'destroy':
                this.onStoreRemove(store, rec);
                break;
        }
    },
    
    // private
    onEditDetails: function(vw, rec, el){
        if(this.fireEvent('editdetails', this, vw, rec, el) !== false){
            this.showEditForm(rec);
        }
    },
    
    // private
    save: function(){
        // If the store is configured as autoSync:true the record's endEdit
        // method will have already internally caused a save to execute on
        // the store. We only need to save manually when autoSync is false,
        // otherwise we'll create duplicate transactions.
        if(!this.store.autoSync){
            this.store.sync();
        }
    },
        
    // private
    onEventAdd: function(form, rec){
        if(!rec.store){
            this.store.add(rec);
            this.save();
        }
        this.fireEvent('eventadd', this, rec);
    },
    
    // private
    onEventUpdate: function(form, rec){
        this.save();
        this.fireEvent('eventupdate', this, rec);
    },
    
    // private
    onEventDelete: function(form, rec){
        this.store.remove(rec);
        this.save();
        this.fireEvent('eventdelete', this, rec);
    },
    
    // private
    onEventCancel: function(form, rec){
        this.hideEditForm();
        this.fireEvent('eventcancel', this, rec);
    },
    
    /**
     * Shows the built-in event edit form for the passed in event record.  This method automatically
     * hides the calendar views and navigation toolbar.  To return to the calendar, call {@link #hideEditForm}.
     * @param {Extensible.calendar.data.EventModel} record The event record to edit
     * @return {Extensible.calendar.CalendarPanel} this
     */
    showEditForm: function(rec){
        this.preEditView = this.layout.getActiveItem().id;
        this.setActiveView(this.id+'-edit');
        this.layout.getActiveItem().loadRecord(rec);
        return this;
    },
    
    /**
     * Hides the built-in event edit form and returns to the previous calendar view. If the edit form is
     * not currently visible this method has no effect.
     * @return {Extensible.calendar.CalendarPanel} this
     */
    hideEditForm: function(){
        if(this.preEditView){
            this.setActiveView(this.preEditView);
            delete this.preEditView;
        }
        return this;
    },
    
    /**
     * Set the active view, optionally specifying a new start date.
     * @param {String/Number} id The id of the view to activate (or the 0-based index of the view within
     *        the CalendarPanel's internal card layout).
     * @param {Date} startDate (optional) The new view start date (defaults to the current start date)
     */
    setActiveView: function(id, startDate){
    	this.currentStatus = id;
        var me = this,
            layout = me.layout,
            editViewId = me.id + '-edit',
            toolbar;
        
        if (startDate) {
            me.startDate = startDate;
        }
        
        // Make sure we're actually changing views
        if (id !== layout.getActiveItem().id) {
            // Show/hide the toolbar first so that the layout will calculate the correct item size
            toolbar = me.getDockedItems('toolbar')[0];
            if (toolbar) {
                toolbar[id === editViewId ? 'hide' : 'show']();
            }
            
            // Activate the new view and refresh the layout
            layout.setActiveItem(id || me.activeItem);
            me.doComponentLayout();
            me.activeView = layout.getActiveItem();
            
            if (id !== editViewId) {
                if (id && id !== me.preEditView) {
                    // We're changing to a different view, so the view dates are likely different.
                    // Re-set the start date so that the view range will be updated if needed.
                    // If id is undefined, it means this is the initial pass after render so we can
                    // skip this (as we don't want to cause a duplicate forced reload).
                    layout.activeItem.setStartDate(me.startDate, true);
                }
                // Switching to a view that's not the edit view (i.e., the nav bar will be visible)
                // so update the nav bar's selected view button
                me.updateNavState();
            }
            // Notify any listeners that the view changed
            me.fireViewChange();
        }
    },
    
    // private
    fireViewChange: function() {
        if (this.layout && this.layout.getActiveItem) {
            var view = this.layout.getActiveItem(),
                cloneDt = Ext.Date.clone;
                
            if (view) {
                var info;
                
                // some views do not have these properties, e.g. the detailed edit form
                if (view.getViewBounds) {
                    var vb = view.getViewBounds();
                    info = {
                        viewStart: cloneDt(vb.start),
                        viewEnd: cloneDt(vb.end),
                        activeDate: cloneDt(view.getStartDate())
                    };
                }
                if (view.dismissEventEditor){
                    view.dismissEventEditor();
                }
                this.fireEvent('viewchange', this, view, info);
            }
        }
    },
    
    // private
    updateNavState: function(){
        var me = this,
            activeItem = me.layout.activeItem;
        
        if (activeItem && me.showNavBar !== false) {
            var suffix = activeItem.id.split(me.id + '-')[1],
                btn = Ext.getCmp(me.id + '-tb-' + suffix);
            
            if (me.showNavToday) {
                Ext.getCmp(me.id + '-tb-today').setDisabled(activeItem.isToday());
            }
            btn.toggle(true);
        }
    },

    /**
     * Sets the start date for the currently-active calendar view.
     * @param {Date} dt The new start date
     * @return {Extensible.calendar.CalendarPanel} this
     */
    setStartDate: function(dt){
        Extensible.log('setStartDate (CalendarPanel');
        this.startDate = dt;
        this.layout.activeItem.setStartDate(dt, true);
        this.updateNavState();
        this.fireViewChange();
        return this;
    },
        
    // private
    showWeek: function(dt){
        this.setActiveView(this.id+'-week', dt);
    },
    
    // private
    onTodayClick: function(){
        this.startDate = this.layout.activeItem.moveToday(true);
        this.updateNavState();
        this.fireViewChange();
    },
    
    // private
    onJumpClick: function(){
        var dt = Ext.getCmp(this.id+'-tb-jump-dt').getValue();
        if(dt !== ''){
            this.startDate = this.layout.activeItem.moveTo(dt, true);
            this.updateNavState();
            // TODO: check that view actually changed:
            this.fireViewChange();
        }
    },
    
    // private
    onPrevClick: function(){
        this.startDate = this.layout.activeItem.movePrev(true);
        this.updateNavState();
        this.fireViewChange();
    },
    
    // private
    onNextClick: function(){
        this.startDate = this.layout.activeItem.moveNext(true);
        this.updateNavState();
        this.fireViewChange();
    },
    
    // private
    onDayNavClick: function(){
        this.setActiveView(this.id+'-day');
    },
    
    // private
    onMultiDayNavClick: function(){
        this.setActiveView(this.id+'-multiday');
    },
    
    // private
    onWeekNavClick: function(){
        this.setActiveView(this.id+'-week');
    },
    
    // private
    onMultiWeekNavClick: function(){
        this.setActiveView(this.id+'-multiweek');
    },
    
    // private
    onMonthNavClick: function(){
        this.setActiveView(this.id+'-month');
    },
    
    /**
     * Return the calendar view that is currently active, which will be a subclass of
     * {@link Extensible.calendar.view.AbstractCalendar AbstractCalendar}.
     * @return {Extensible.calendar.view.AbstractCalendar} The active view
     */
    getActiveView: function(){
        return this.layout.activeItem;
    },
    
    getCurrentStatus:function(){
    	if(!this.currentStatus){
    		this.currentStatus = 'machine_chk_calendar-month';
    	}
    	return this.currentStatus;
    }
});