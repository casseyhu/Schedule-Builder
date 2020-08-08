import React from 'react'
import { Checkbox } from 'react-materialize';

const CourseSummary = ({course}) => {
    return (
        <tbody>
            <tr>
            <td><label><input type="checkbox" /><span></span></label></td>
            <td>{course.abr}{course.val}</td>
            <td>Professor</td>
            <td>{course.time}</td>
            <td>X</td>
            </tr>
        </tbody>
      
    )
}

export default CourseSummary