import React, {Component} from 'react'
import CourseSummary from './CourseSummary'
import { getFirestore } from 'redux-firestore'
import ReactDOM from 'react-dom'

class ScheduleTable extends Component {
    deleteCourse = (course) => {
        while(document.getElementById(course)){
            ReactDOM.unmountComponentAtNode(document.getElementById(course).parentElement)
        }
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth).update({
            userCourses: this.props.courses.filter((c) => c !== course)
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
                        <CourseSummary key={course} deleteCourse={this.deleteCourse} course={course} />
                    )
                })}
                </table>
            </div>
        )
    }
}

export default ScheduleTable