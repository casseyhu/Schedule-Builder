import React, {Component} from 'react'
import { getFirestore } from 'redux-firestore'
import ReactDOM from 'react-dom'

class ScheduleCal extends Component {

    createCourse = (course) => { 
        const fireStore = getFirestore();
        var subj = course.course.substring(0, 3);
        var num = course.course.substring(3, 6);
        var section = course.course.substring(7);
        fireStore.collection('courses').doc(subj).collection('courseNum').doc(num).collection('section').doc(section).get().then((doc) => {
            if(doc.exists){
                var day = doc.data().course_day;
                var start = doc.data().course_start;
                var end = doc.data().course_end;
                var object = this.props.getTimeFrame(day,start, end);
                var days = object.days;
                var timeframe = object.timeframe;
                var start_increment =object.start_increment;
                var end_increment = object.end_increment;
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