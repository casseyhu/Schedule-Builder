import React, {Component} from 'react'
import { getFirestore } from 'redux-firestore'

class CourseSummary extends Component {
    state = {
        val: "",
        sec: "",
        prof: "",
        time: "",
        descr: "",
        done: false
    }

    deleteCourse(){
        var fullCourse = this.props.course;
        const fireStore = getFirestore();
        var updatedCourses = [];
        for(let i = 0; i < this.props.courses.length; i++){
            if(fullCourse.localeCompare(this.props.courses[i]) != 0){
                updatedCourses.push(this.props.courses[i]);
            }
        }
        fireStore.collection('users').doc(this.props.auth).update({
            userCourses: updatedCourses,
        });
    }
    
    render() {
        const course = this.props.course;
        const firestore = getFirestore();
        firestore.collection('courses').doc(course.substring(0,3)).collection('courseNum').doc(course.substring(3,6)).collection('section').doc(course.substring(7)).get().then((doc) => {
            if (doc.exists && !this.state.done) {
                this.setState(
                    {abr: course.substring(0,3), 
                    val: course.substring(3,6), 
                    sec: course.substring(7),
                    prof: doc.data().instructor, 
                    time: doc.data().course_day + " " + doc.data().course_start + "-" + doc.data().course_end, 
                    descr: doc.data().description, 
                    done: true}
                );
            }
        });
        return (
            <tbody>
                <tr>
                <td><label><input type="checkbox" /><span></span></label></td>
                <td style={{}}>{this.state.abr}{this.state.val}-{this.state.sec}</td>
                <td>{this.state.prof}</td>
                <td>{this.state.time}</td>
                <td><a class="btn-floating btn-medium waves-effect waves-light red" onClick={this.deleteCourse.bind(this)}><i class="material-icons">delete</i></a></td>
                </tr>
            </tbody>
        );
    }
}

export default CourseSummary