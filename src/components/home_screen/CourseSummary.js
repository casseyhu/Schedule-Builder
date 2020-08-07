import React from 'react'

const CourseSummary = ({course}) => {
    return (
        <tbody>
            <tr>
            <td>{course.abr}{course.val}</td>
            <td>Professor</td>
            <td>{course.time}</td>
            </tr>
        </tbody>
      
    )
}

export default CourseSummary