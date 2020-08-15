import React, {Component} from 'react'
import { getFirestore } from 'redux-firestore'
import ReactDOM from 'react-dom'

class ScheduleCal extends Component {
    createCourse = (course) => { 
        var map = {'M': 'Monday', 'TU': 'Tuesday', 'W': "Wednesday", 'TH': "Thursday", 'F': "Friday"}
        const fireStore = getFirestore();
        var subj = course.course.substring(0, 3);
        var num = course.course.substring(3, 6);
        var section = course.course.substring(7);
        fireStore.collection('courses').doc(subj).collection('courseNum').doc(num).collection('section').doc(section).get().then((doc) => {
            if(doc.exists){
                var day = doc.data().course_day;
                var start = doc.data().course_start;
                var end = doc.data().course_end;
                var days = [];

                for(var key in map){ //this will convert all the shorten day names into full day names into arr 
                    if(day.includes(key)){
                        days.push(map[key]);
                    }
                }
                if(days == [])
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

                if(start_hr.substring(0, 1) == "0")
                    start_hr = start_hr.substring(1);
                if(end_hr.substring(0, 1) == "0")
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
                while(start_hr + ":" + temp_start_min + start_period !=  end_hr + ":" + temp_end_min + end_period){ //append all times in the timeframe into an array
                    timeframe.push(start_hr + ":" + temp_start_min + start_period);
                    var currentHour = parseInt(start_hr)
                    var currentMinute = parseInt(temp_start_min) + 15;
                    if(currentMinute >= 60){
                        currentMinute = 0;
                        currentHour += 1;
                    }
                    currentMinute < 10 ? temp_start_min = "0" + currentMinute : temp_start_min = currentMinute.toString();
                    currentHour < 10 ? start_hr = currentHour.toString() : start_hr = currentHour.toString();
                    currentHour == 12 ? start_period = "pm" : start_period = start_period; //switching from am to pm
                }
                timeframe.push(end_hr + ":" + temp_end_min + end_period)
                start_increment = 0 + (33 * start_increment) + "%"
                end_increment = 0 + (33 * end_increment) + "%"
                var text = [course.course, doc.data().instructor, doc.data().course_start + "-" + doc.data().course_end];
                var shift = 0;

                for(let i = 0 ; i < days.length; i++){
                    if(timeframe.length > 4)
                    ReactDOM.render(<div id = {text[0]} style={{backgroundColor:'#f38684', position: 'absolute', top: start_increment, height: '110%', width: '80%',fontWeight: 'bold', fontSize: '14px', left: '10%', borderRadius: '3px'}}><center></center></div>,document.getElementById(days[i] + "-" + timeframe[0]))
                    else{
                        ReactDOM.render(<div id = {text[0]} style={{backgroundColor:'#f38684', position: 'absolute', top: start_increment, height: '110%', width: '80%',fontWeight: 'bold', fontSize: '14px', left: '10%', borderRadius: '3px'}}><center>{text[0]}</center></div>,document.getElementById(days[i] + "-" + timeframe[0]))
                        shift = 1;
                    }
                    for(let j = 1 ; j < timeframe.length - 1; j++){
                        ReactDOM.render(<div id = {text[0]} style={{backgroundColor:'#f38684', top: '0%', position: 'absolute', height: '115%', width: '80%',fontWeight: 'bold', fontSize: '14px', left: '10%'}}><center>{text[j - 1 + shift]}</center></div>,document.getElementById(days[i] + "-" + timeframe[j]))
                    }
                    ReactDOM.render(<div id = {text[0]} style={{backgroundColor:'#f38684', position: 'absolute', top: "0%", height: end_increment, width: '80%', left: '10%', borderRadius: '3px'}}></div>,document.getElementById(days[i] + "-" + timeframe[timeframe.length - 1]))
                }
            }
        })

    }
    render() {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const hour = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var am = 0;
        if(this.props.courses != null){
            for(let i = 0; i < this.props.courses.length; i++){
                if(this.props.courses[i].selected)
                    this.createCourse(this.props.courses[i])
                else{}
            }
        }
        return (
            <div className='cal-component'>
                <h5> Schedule </h5>
                <div style={{overflow:'auto', borderRadius:'16px', width:'100%'}}>
                    <table style={{float:'left'}}>
                        <thead>
                            <tr>
                                <th style={{width:'5%'}}> <br></br> </th>
                                { days.map(day => { return(<th style={{width:'19%'}}>{day}</th>) }) }
                            </tr>
                        </thead>
                        <tbody>
                            { hour.map(hr => {
                                am += 1;
                                return( getHourtd(hr, am) )
                            }) }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function getHourtd(hr, am) {
    const min = [":00", ":15", ":30", ":45"];
    var ampm = am <= 4 ? "am" : "pm";
    return(
        min.map(m => {
            if (m === ":00") {
                return( <tr>
                    <td className="hr-title" style={{fontWeight:'bold'}}>{hr}{m}{ampm}</td>
                    <td id={"Monday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                    <td id={"Tuesday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                    <td id={"Wednesday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                    <td id={"Thursday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                    <td id={"Friday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                </tr> )
            } else {
                return( <tr>
                    <td className="hr-title">{hr}{m}</td>
                    <td id={"Monday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                    <td id={"Tuesday-" + hr + m + ampm } style={{position: 'relative'}}></td>
                    <td id={"Wednesday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                    <td id={"Thursday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                    <td id={"Friday-" + hr + m + ampm} style={{position: 'relative'}}></td>
                </tr> )
            }
        })        
    )
}


export default ScheduleCal