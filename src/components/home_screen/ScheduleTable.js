import React from 'react'
import CourseSummary from './CourseSummary'
import { Checkbox } from 'react-materialize';

const ScheduleTable = ({courses}) => {
    return (
        <div className="course-list">
            <table className="highlight">
            <thead>
                <tr>
                <th>Checkmark</th>
                <th>Course</th>
                <th>Instructor</th>
                <th>Meeting Time</th>
                <th>Delete</th>
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