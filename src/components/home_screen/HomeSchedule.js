import React, {Component} from 'react'
import ScheduleSearch from './ScheduleSearch'
import ScheduleTable from './ScheduleTable'
import ScheduleCal from './ScheduleCal'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { updateUsersHandler } from '../../store/database/asyncHandler'


class HomeSchedule extends Component {
    render() {
        const { courses } = this.props;

        return (
            <div className="dash">
                <div className="row">
                    <div className="col s12 m4 offset-m1">
                        <ScheduleSearch />
                    </div>
                    <div className="col s12 m6">
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
        courses: state.firestore.ordered.courses,
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
        { collection: 'users' }
    ])
)(HomeSchedule);
