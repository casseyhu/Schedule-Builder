import React, {Component} from 'react'
import { getFirestore } from 'redux-firestore'

class CourseSummary extends Component {
    state = {
        abr: "",
        val: "",
        sec: "",
        prof: "",
        time: "",
        descr: "",
        done: false
    }
    
    render() {
        const course = this.props.course;
        const firestore = getFirestore();
        firestore.collection('coursesEX').doc(course.substring(0,3)).collection('courseNums').doc(course.substring(3,6)).collection('section').doc(course.substring(7)).get().then((doc) => {
            if (doc.exists && !this.state.done) {
                this.setState(
                    {abr: course.substring(0,3), 
                    val: course.substring(3,6), 
                    sec: course.substring(7),
                    prof: doc.data().instructor, 
                    time: doc.data().time, 
                    descr: doc.data().description, 
                    done: true}
                );
            }
        });
        return (
            <tbody>
                <tr>
                <td><label><input type="checkbox" /><span></span></label></td>
                <td>{this.state.abr}{this.state.val}</td>
                <td>{this.state.prof}</td>
                <td>{this.state.time}</td>
                <td>X</td>
                </tr>
            </tbody>
        );
    }
}

export default CourseSummary