import React, {Component} from 'react'
import CourseSummary from './CourseSummary'
import { getFirestore } from 'redux-firestore'

class ScheduleTable extends Component {
    deleteCourse = (course) => {
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth).update({
            userCourses: this.props.courses.filter((c) => c != course)
        });
    }
    
    render() {
        return (
            <div className="course-list">
                <div className="schedule-scroll">
                    <table className="highlight">
                    <thead>
                        <tr>
                        <th>Select</th>
                        <th>Course</th>
                        <th>Instructor</th>
                        <th>Ratings</th>
                        <th>Meeting Time</th>
                        <th></th>
                        </tr>
                    </thead>
                    {this.props.courses && this.props.courses.map(course => {
                        return (
                            <CourseSummary key={course} deleteCourse={this.deleteCourse} courses={this.props.courses} course={course} auth={this.props.auth} />
                        )
                    })}
                    </table>
                </div>
            </div>
        )
    }
}

export default ScheduleTable