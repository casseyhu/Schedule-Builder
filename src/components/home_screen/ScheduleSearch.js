import React from 'react'

const ScheduleSearch = () => {
    return (
        <div className='s-search-component'>
            <h5> Search Course </h5>
            <p> Search by Subject </p>
            <select class="browser-default">
                <option value="" disabled selected>Choose Subject</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
            <select class="browser-default">
                <option value="" disabled selected>Choose Course Number</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
            </select>
            <div className="course-description">
                <div> Description blah blah </div>
                <button id='add-button' className="btn pink lighten-1 z-depth-0"> Add </button>
            </div>
        </div>
    )
}


export default ScheduleSearch