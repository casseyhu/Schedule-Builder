import React, {Component} from 'react'
import Schedule_table from './Schedule_table'
import Schedule_cal from './Schedule_cal'

class HomeSchedule extends Component {
    render() {
        return (
            <div>
                <Schedule_table />
                {/* <Schedule_cal /> */}
            </div>
        )
    }
}

export default HomeSchedule
