import React, {Component} from 'react'
import ScheduleSearch from './ScheduleSearch'
import ScheduleTable from './ScheduleTable'
import ScheduleCal from './ScheduleCal'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class HomeSchedule extends Component {
    getTimeFrame = (day, start, end) => {
        var days = [];
        var map = {'M': 'Monday', 'TU': 'Tuesday', 'W': "Wednesday", 'TH': "Thursday", 'F': "Friday"}
        for(var key in map){ //this will convert all the shorten day names into full day names into arr 
            if(day.includes(key)){
                days.push(map[key]);
            }
        }
        if(days === [])
            return;
        if(start == null){
            return;
        }

        var arr_start = start.split(":");
        var start_hr = arr_start[0];
        var start_min =  arr_start[1].substring(0, 2);
        var start_period = arr_start[1].substring(2).toLowerCase();
        var arr_end = end.split(":");
        var end_hr = arr_end[0];
        var end_min =  arr_end[1].substring(0, 2);
        var end_period = arr_end[1].substring(2).toLowerCase();

        if(start_hr.substring(0, 1) === "0")
            start_hr = start_hr.substring(1);
        if(end_hr.substring(0, 1) === "0")
            end_hr = end_hr.substring(1);

        var temp_start_min = start_min;
        var start_increment = 0;
        while(document.getElementById(days[0] + "-" + start_hr + ":" + temp_start_min + start_period) == null && start_increment <= 2) { //can be any day 
            var min = parseInt(temp_start_min);
            min -= 5;
            if(min < 10)
                temp_start_min = "0" + min;
            else
                temp_start_min = min;
            start_increment += 1;
        }

        var temp_end_min = end_min;
        var end_increment = 0;
        while(document.getElementById(days[0] + "-" + end_hr + ":" + temp_end_min + end_period) == null && end_increment <= 2) { //can be any day 
            var min = parseInt(temp_end_min);
            min -= 5;
            if(min < 10)
                temp_end_min = "0" + min;
            else
                temp_end_min = min;
            end_increment += 1;
        }
        var timeframe = []
        while(start_hr + ":" + temp_start_min + start_period !== end_hr + ":" + temp_end_min + end_period){ //append all times in the timeframe into an array
            timeframe.push(start_hr + ":" + temp_start_min + start_period);
            var currentHour = parseInt(start_hr)
            var currentMinute = parseInt(temp_start_min) + 15;
            if(currentMinute >= 60){
                currentMinute = 0;
                currentHour += 1;
            }
            currentMinute < 10 ? temp_start_min = "0" + currentMinute : temp_start_min = currentMinute.toString();
            currentHour < 10 ? start_hr = currentHour.toString() : start_hr = currentHour.toString();
            currentHour === 12 ? start_period = "pm" : start_period = start_period; //switching from am to pm
        }
        timeframe.push(end_hr + ":" + temp_end_min + end_period)
        return {"days": days, "timeframe": timeframe, "start_increment": start_increment, "end_increment": end_increment};
    }
    render() {
        const { auth, users } = this.props;
        var courses = null;
        if (auth.uid && users)
            courses = users.filter(user => user.id === auth.uid)[0].userCourses;
        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s4 l4">
                        <ScheduleSearch courses={courses} auth = {auth.uid}/>
                    </div>
                    <div className="col s8 l8">
                        <ScheduleTable courses={courses} getTimeFrame = {this.getTimeFrame} auth = {auth.uid}/>
                    </div>
                </div>
                <div className="cal">
                    {<ScheduleCal courses={courses} getTimeFrame = {this.getTimeFrame}/>}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'users' },
    ])
)(HomeSchedule);

