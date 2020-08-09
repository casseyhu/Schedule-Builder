import React, {Component} from 'react'
import ScheduleSearch from './ScheduleSearch'
import ScheduleTable from './ScheduleTable'
import ScheduleCal from './ScheduleCal'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { updateUsersHandler } from '../../store/database/asyncHandler'
import { getFirestore } from 'redux-firestore';


var authid = null;
var courses = null;
class HomeSchedule extends Component {
    render() {
        if(!authid && this.props.auth.uid && this.props.data.users){
            authid = this.props.auth.uid;
            courses = this.props.data.users[authid].userCourses;
        }
        return (
            <div className="dashboard">
                <div className="row">
                    <div className="col s12 l4">
                        <ScheduleSearch />
                    </div>
                    <div className="col s12 l8">
                        <ScheduleTable courses={courses}/>
                    </div>
                </div>
                <ScheduleCal />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.firestore.data,
        courses: state.firestore.courses,
        auth: state.firebase.auth
    }
}

// export default connect(mapStateToProps)(HomeSchedule);
const mapDispatchToProps = dispatch => ({
    update: (courses) => dispatch(updateUsersHandler(courses))
});  

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'users' },
    ])
)(HomeSchedule);
