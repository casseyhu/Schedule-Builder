import React, {Component} from 'react'
import ScheduleSearch from './ScheduleSearch'
import ScheduleTable from './ScheduleTable'
import ScheduleCal from './ScheduleCal'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class HomeSchedule extends Component {
    render() {
        const { auth, users } = this.props;
        var courses = null;
        if (auth.uid && users)
            courses = users.filter(user => user.id == auth.uid)[0].userCourses;
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
        auth: state.firebase.auth,
        users: state.firestore.ordered.users
    }
}

export default compose(
    connect(mapStateToProps, null),
    firestoreConnect([
        { collection: 'users' },
    ])
)(HomeSchedule);

