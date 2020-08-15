import React, {Component} from 'react'
import CourseSummary from './CourseSummary'
import { getFirestore } from 'redux-firestore'
import ReactDOM from 'react-dom'

class ScheduleTable extends Component {
    deleteCourse = (course) => {
        while(document.getElementById(course.course)){
            ReactDOM.unmountComponentAtNode(document.getElementById(course.course).parentElement)
        }
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth).update({
            userCourses: this.props.courses.filter((c) => c !== course)
        });
    }

    changeSelected = (e, course) => {
        var arr = []
        for(let i = 0; i < this.props.courses.length; i++){
            var element = {"course": this.props.courses[i].course, "selected": this.props.courses[i].selected};
            if(this.props.courses[i] == course){
                element.selected = e.target.checked;
            }
            arr.push(element)
        }

        if(!e.target.checked){ //indicates selected->unselected
            while(document.getElementById(course.course)){
                ReactDOM.unmountComponentAtNode(document.getElementById(course.course).parentElement)
            }
        }


        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth).update({
            userCourses: arr
        });
    }

    render() {
        return (
            <div className="schedule-scroll">
                <table className="highlight">
                <thead>
                    <tr>
                    <th></th>
                    <th>Course</th>
                    <th>Instructor</th>
                    <th>Ratings</th>
                    <th>Meeting Time</th>
                    <th></th>
                    </tr>
                </thead>
                {this.props.courses && this.props.courses.map(course => {
                    return (
                        <CourseSummary key={course.course} changeSelected={this.changeSelected} deleteCourse={this.deleteCourse} course={course} />
                    )
                })}
                </table>
            </div>
        )
    }
}

export default ScheduleTable