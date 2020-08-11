import React, {Component} from 'react'

class ScheduleCal extends Component {
    render() {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const hour = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var am = 0;
        return (
            <div className='cal-component'>
                <h5> Schedule </h5>
                <div style={{overflow:'hidden', borderRadius:'16px', width:'100%'}}>
                    <table style={{float:'left', width:'5%'}}>
                        <thead>
                            <tr>
                                <th> <br></br> </th>
                            </tr>
                        </thead>
                        <tbody>
                            { hour.map(hr => {
                                am += 1;
                                return( getHourtd(hr, am) )
                            }) }
                        </tbody>
                    </table>
                    <table class="cal-table" style={{float:'left', width:'95%'}}>
                        <thead>
                            <tr>
                                { days.map(day => { return(<th>{day}</th>) }) }
                            </tr>
                        </thead>
                        <tbody>
                            { hour.map(hr => {
                                return( fillCal(hour.length) )
                            }) }
                        </tbody>
                        
                    </table>
                </div>
            </div>
        )
    }
}

function getHourtd(hr, am) {
    const min = [":00", ":15", ":30", ":45"];
    var ampm = am <= 5 ? "am" : "pm";
    return(
        min.map(m => {
            if (m === ":00") {
                return( <tr>
                    <td className="hr-title" style={{fontWeight:'bold'}}>{hr}{m}{ampm}</td>
                </tr> )
            } else {
                return( <tr>
                    <td className="hr-title">{hr}{m}</td>
                </tr> )
            }
        })        
    )
}

function fillCal(s) {
    const min = [":00", ":15", ":30", ":45"];
    return(
        min.map(m => {
            return( <tr>
                <td colSpan="5"> -- </td>
            </tr> )
        })
    )
}

export default ScheduleCal