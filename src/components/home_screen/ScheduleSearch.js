import React from 'react';

const ScheduleSearch = () => {
    return (
        <div className='s-search-component'>
            <h5> Search Course </h5>
            <p> Search by Subject </p>
            {/* onChange not working */}
            <select id='subject-drop' class="browser-default" onChange="onSubjChange();">
                <option value="" disabled selected>Choose Subject</option>
                <option value="1">Create</option>
                <option value="2">Subject</option>
                <option value="3">Array</option>
            </select>
            <select id='number-drop' class="browser-default">
                <option value="" disabled selected>Choose Course Number</option>
                <option value="1">Get</option>
                <option value="2">Dynamically</option>
                <option value="3">Option 3</option>
            </select>
            <div id="course-description" class='row'>
                <div className="col s3 push-s9">
                <button id='add-button' className="btn red waves-effect lighten-1 z-depth-0"> Add </button>
                </div>
                <div className="col s9 pull-s3">
                    Description blah blah blah blah blah blah blah 
                    blah blah blah blah blah blah blah blah blah blah 
                    blah blah blah blah
                </div>
            </div>
        </div>
    )
}


// function onSubjChange() {
//     console.log("NOT  HERE ? getting course subj");
//     var d = document.getElementById('subject-drop');
//     var opt = null;
//     // Get subject list from firestore
//     const snapshot = firebase.firestore().collection('courses').get();
//     var courses = snapshot.docs.map(doc => doc.data());
//     var i = 0;
//     for(i = 0; i < courses.length; i++) { 
//         opt = document.createElement('option');
//         opt.value = courses[i].id;
//         opt.innerHTML = courses[i].name;
//         d.appendChild(opt);
//     }
// }

export default ScheduleSearch