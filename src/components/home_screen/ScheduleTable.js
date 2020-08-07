import React from 'react'
import CourseSummary from './CourseSummary'

const ScheduleTable = ({courses}) => {
    return (
        <div className="course-list">
            <table class="highlight">
            <thead>
                <tr>
                <th>Course</th>
                <th>Professor</th>
                <th>Meeting Time</th>
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