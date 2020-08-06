import React from 'react'

const CourseSummary = ({course}) => {
    return (
        <div className="card z-depth-0 course-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">{course.abr}{course.val}</span>
            </div>
        </div>
    )
}

export default CourseSummary