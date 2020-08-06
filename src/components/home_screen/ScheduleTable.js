import React from 'react'
import CourseSummary from './CourseSummary'

const ScheduleTable = ({courses}) => {
    return (
        <div className="course-list">
            {courses && courses.map(course => {
                return (
                    <CourseSummary course={course} key={course.id} />
                )
            })}
        </div>
    )
}

export default ScheduleTable