import React from 'react'

const CourseSummary = ({course}) => {
    var name = course.substring(0, 3);
    var number = course.substring(3, 6);
    var section = course.substring(7, course.length);
    var prof = null;
    return (
        <tbody>
            <tr>
            <td><label><input type="checkbox" /><span></span></label></td>
            <td>{course}</td>
            <td>Professor</td>
            <td>{course.time}</td>
            <td>X</td>
            </tr>
        </tbody>
      
    )
}

export default CourseSummary