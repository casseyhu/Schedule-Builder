import React, {Component} from 'react'
import { getFirestore } from 'redux-firestore'

class CourseSummary extends Component {
    state = {
        val: "",
        sec: "",
        prof: "",
        time: "",
        descr: "",
        rating: "(N/A)",
        done: false
    }
    
    render() {
        const course = this.props.course;
        if (!this.state.done) {
            console.log("rerender");
            
            const firestore = getFirestore();
            firestore.collection('courses').doc(course.substring(0,3)).collection('courseNum').doc(course.substring(3,6)).collection('section').doc(course.substring(7)).get().then((doc) => {
                if (doc.exists) {
                    firestore.collection('profratings').doc(doc.data().instructor).get().then((dcmt) => {
                        if (dcmt.exists)
                            this.setState({rating: " (" + dcmt.data().rating + ")"});
                    });
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
        }
        return (
            <tbody>
                <tr>
                <td><label><input type="checkbox" /><span></span></label></td>
                <td style={{}}>{this.state.abr}{this.state.val}-{this.state.sec}</td>
                <td>{this.state.prof} {this.state.rating}</td>
                <td>{this.state.time}</td>
                <td><a class="btn-floating btn-small waves-effect waves-light red" onClick={()=>this.props.deleteCourse(course)}><i class="material-icons">delete</i></a></td>
                </tr>
            </tbody>
        );
    }
}

export default CourseSummary