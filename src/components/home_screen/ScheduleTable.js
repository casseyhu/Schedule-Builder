import React from 'react'
import CourseSummary from './CourseSummary'
import { Checkbox } from 'react-materialize';

const ScheduleTable = ({courses}) => {
    return (
        <div className="course-list">
            <table className="highlight">
            <thead>
                <tr>
                <center><th>Checkmark</th></center>
                <th>Course</th>
                <th>Professor</th>
                <th>Meeting Time</th>
                <th></th>
                </tr>
            </thead>
            {courses && courses.map(course => {
                return (
                    <CourseSummary course={course} key={course.id} />
                )
            })}
            </table>
        </div>
    )
}

export default ScheduleTable