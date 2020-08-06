import React, {Component} from 'react'
import ScheduleSearch from './ScheduleSearch'
import ScheduleTable from './ScheduleTable'
import ScheduleCal from './ScheduleCal'
import { connect } from 'react-redux'


class HomeSchedule extends Component {
    render() {
        const { courses } = this.props;

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m5 offset-m1">
                        <ScheduleSearch />
                    </div>
                    <div className="col s12 m6">
                        <ScheduleTable courses={courses}/>
                    </div>
                </div>
                <div className="row">
                    <ScheduleCal />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.course.courses
    }
}

export default connect(mapStateToProps)(HomeSchedule)
