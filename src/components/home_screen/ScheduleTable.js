import React, {Component} from 'react'
import CourseSummary from './CourseSummary'
import { getFirestore } from 'redux-firestore'

class ScheduleTable extends Component {
    deleteCourse = (course) => {
        const fireStore = getFirestore();
        fireStore.collection('users').doc(this.props.auth).update({
            userCourses: this.props.courses.filter((c) => c !== course)
        });
    }

    render() {
        return (
            <div className="course-list">
                <div className="schedule-scroll">
                    <table className="highlight">
                    <thead>
                        <tr>
                        <th style={{fontSize:'16pt'}}>Select</th>
                        <th style={{fontSize:'16pt'}}>Course</th>
                        <th style={{fontSize:'16pt'}}>Instructor</th>
                        <th style={{fontSize:'16pt'}}>Ratings</th>
                        <th style={{fontSize:'16pt'}}>Meeting Time</th>
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
            </div>
        )
    }
}

export default ScheduleTable