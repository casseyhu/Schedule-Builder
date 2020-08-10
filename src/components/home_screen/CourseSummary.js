import React, {Component} from 'react'
import { getFirestore } from 'redux-firestore'
import Rating  from 'react-rating';
class CourseSummary extends Component {
    state = {
        val: "",
        sec: "",
        prof: "",
        lec_day: "",
        time: "",
        descr: "",
        rating: "N/A",
        done: false
    }
    
    render() {
        const course = this.props.course;
        if (!this.state.done) {
            const firestore = getFirestore();
            firestore.collection('courses').doc(course.substring(0,3)).collection('courseNum').doc(course.substring(3,6)).collection('section').doc(course.substring(7)).get().then((doc) => {
                if (doc.exists) {
                    firestore.collection('profratings').doc(doc.data().instructor).get().then((dcmt) => {
                        if (dcmt.exists)
                            this.setState({rating: dcmt.data().rating});
                    });
                    this.setState(
                        {abr: course.substring(0,3), 
                        val: course.substring(3,6), 
                        sec: course.substring(7),
                        prof: doc.data().instructor, 
                        lec_day: doc.data().course_day,
                        time: doc.data().course_start + "-" + doc.data().course_end, 
                        descr: doc.data().description, 
                        done: true}
                    );
                }
            });
        }
        return (
            <tbody>
                <tr>
                <td style = {{backgroundColor: 'white'}}><label><input type="checkbox" /><span></span></label></td>
                <td style={{fontSize: "15px", backgroundColor: 'white'}}><b>{this.state.abr}{this.state.val}-{this.state.sec}</b></td>
                <td style={{fontSize: "15px",backgroundColor: 'white'}}><b>{this.state.prof}</b></td>
                <td style={{fontSize: "15px", backgroundColor: 'white'}}><Rating emptySymbol={<img src="/images/star-grey.png" className="icon" />}
                placeholderSymbol={<img src="/images/star-yellow.png" className="icon" />}placeholderRating={parseFloat(this.state.rating)} readonly={true}/><b>  {this.state.rating}</b></td>
                <td style={{fontSize: "15px", backgroundColor: 'white'}}><b>{this.state.time.localeCompare('null-null') == 0 ? this.state.lec_day + " ONLINE" : this.state.lec_day + " " + this.state.time}</b></td>
                <td style={{fontSize: "15px", backgroundColor: 'white'}}><a class="btn-floating btn-small waves-effect waves-light red" onClick={()=>this.props.deleteCourse(course)}><i class="material-icons">delete</i></a></td>
                </tr>
            </tbody>
        );
    }
}

export default CourseSummary