import React, {Component} from 'react'

class ScheduleCal extends Component {
    render() {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const hour = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        
        return (
            <div className='cal-component'>
                <h5> Schedule </h5>
                <table class="cal-table">
                    <thead>
                        <tr>
                            <th> </th>
                            { days.map(day => { return(<th>{day}</th>) }) }
                        </tr>
                    </thead>
                    <tbody>
                        {/* { hour.map(hr => {
                            return( <tr>{hr}</tr> )
                        }) } */}
                        { hour.map(hr => {
                            return( getHourDiv(hr) )
                        }) }
                        {/* { hour.map(hr => {
                            return( min.map(m => {return(<tr id="cal-times"> {hr}{m} </tr>)}) )
                        }) } */}
                    </tbody>
                    
                </table>
            </div>
        )
    }
}

function getHourDiv(hr) {
    const min = [":00", ":15", ":30", ":45"];
    return(
        // <div>
        //     <tr>
        //         <td width="20px" className="hr-title"> {hr}:00 </td>
        //         <td colSpan="5">fsdfsdfsdfsdfsddasdwedqewffsdfsdfsdfsdfsddasdwedqewffsdfsdfsdfsdfsddasdwedqewf</td>
        //     </tr>
            min.map(m => {
                if (m === ":00") {
                    return( <tr>
                        <td width="20px" className="main-hr-title">{hr}{m}</td>
                        <td colSpan="5">fsdfsdfsdfsdfsddasdwedqewffsdfsdfsdfsdfsddasdwedqewffsdfsdfsdfsdfsddasdwedqewf</td>
                    </tr> )
                } else {
                    return( <tr>
                        <td width="20px" className="hr-title">{hr}{m}</td>
                        <td colSpan="5">fsdfsdfsdfsdfsddasdwedqewffsdfsdfsdfsdfsddasdwedqewffsdfsdfsdfsdfsddasdwedqewf</td>
                    </tr> )
                }
            })
        // </div>
        
    )
}

export default ScheduleCal