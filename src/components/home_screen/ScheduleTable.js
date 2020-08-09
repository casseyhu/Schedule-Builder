import React, {Component} from 'react'
import CourseSummary from './CourseSummary'

class ScheduleTable extends Component {
    render() {
        return (
            <div className="course-list">
                <div className="schedule-scroll">
                    <table className="highlight">
                    <thead>
                        <tr>
                        <th>Checkmark</th>
                        <th>Course</th>
                        <th>Instructor</th>
                        <th>Meeting Time</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    {this.props.courses && this.props.courses.map(course => {
                        return (
                            <CourseSummary course={course} />
                        )
                    })}
                    </table>
                </div>
            </div>
        )
    }
    
}

export default ScheduleTable