import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./mello.css";
import './mellocal.css'
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, set, get } from 'firebase/database';

const BGColor = "#004052"

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
        dp.clearSelection();
        if (!modal.result) { return; }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
        const db = getDatabase();
        const dbEventsRef = ref(db, 'users/userID/events');
        const dbObjectivesRef = ref(db, 'users/userID/valuesNeeded');
        get(dbObjectivesRef).then((snapshot) => {
          if(snapshot.exists()) {
            let valuesNeeded = snapshot.val();
            valuesNeeded[1] += 1;
            set(dbObjectivesRef, valuesNeeded);
          }
        });
        set(dbEventsRef, dp.events.list);
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) { return; }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
        const db = getDatabase();
        const dbEventsRef = ref(db, 'users/userID/events');
        set(dbEventsRef, dp.events.list);
      },
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  
  componentDidMount() {
    const db = getDatabase();
    const dbEventsRef = ref(db, 'users/userID/events');
    get(dbEventsRef).then((snapshot) => {
      console.log('HELLO');
      if(snapshot.exists()){
        console.log(snapshot.val())
        this.calendar.update(snapshot.val());
      }
      else{
        console.log('HELLO');
      }
  });
  }
    

  render() {
    
    
    return (
<LinearGradient
        // Background Linear Gradient
        colors={[ BGColor, 'white']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            theme={"mello"}
            selectMode={"week"}
            showMonths={3.5}
            skipMonths={3}
            onTimeRangeSelected={ args => {
              this.calendar.update({
                startDate: args.day
              });
            }}
          />
        </div>
        <div style={styles.main} className="Event">
          <DayPilotCalendar
          theme={"mellocal"}
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
      </div>
    </LinearGradient>);
  }
}

export default Calendar;
