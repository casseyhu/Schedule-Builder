import React from 'react';

const ScheduleSearch = () => {
    return (
        <div className='s-search-component'>
            <h5> Search Course </h5>
            <p> Search by Subject </p>
            <select id='subject-drop' className="browser-default" onFocus={populateSubj}>
                <option disabled defaultValue="selected">Choose Subject</option>
            </select>
            <select id='number-drop' className="browser-default">
                <option disabled defaultValue="selected">Choose Course Number</option>
            </select>
            <div id="course-description" className='row'>
                <div className="col s3 push-s9">
                <button id='add-button' className="btn red waves-effect lighten-1 z-depth-0"> Add </button>
                </div>
                <div className="col s9 pull-s3">
                    Description blah blah blah blah blah blah blah 
                    blah blah blah blah blah blah blah blah blah blah 
                    blah blah blah blah
                </div>
            </div>
        </div>
    )
}


function populateSubj() {
    var select = document.getElementById("subject-drop");
    var subjOptions = ['AAS', 'ACC', 'ACH', 'ADV', 'AFH', 'AFS', 'AIM', 'AMR', 'AMS', 'ANP', 'ANT', 'ARB', 
    'ARH', 'ARS', 'ASC', 'AST', 'ATM', 'BCP', 'BIO', 'BME', 'BUS', 'CAR', 'CCS', 'CDT', 'CEF', 'CHE', 'CHI', 
    'CIV', 'CLL', 'CLS', 'CLT', 'CME', 'CSE', 'CWL', 'DAN', 'DIA', 'EAS', 'EBH', 'ECO', 'EDP', 'EEL', 'EEO', 
    'EGL', 'ENS', 'ENV', 'ESE', 'ESG', 'ESL', 'ESM', 'EST', 'EUR', 'EXT', 'FLA', 'FLM', 'FRN', 'GEO', 'GER', 
    'GLI', 'GLS', 'GRK', 'GSS', 'HAD', 'HAL', 'HAN', 'HAT', 'HBA', 'HBH', 'HBM', 'HBP', 'HBW', 'HBY', 'HDG', 
    'HDO', 'HDP', 'HDV', 'HIN', 'HIS', 'HNI', 'HON', 'HUE', 'HUF', 'HUG', 'HUI', 'HUL', 'HUR', 'HUS', 'HWC', 
    'IAE', 'IAP', 'INT', 'ISE', 'ITL', 'ITS', 'JDH', 'JDS', 'JPN', 'JRN', 'KOR', 'LAC', 'LAN', 'LAT', 'LCR', 
    'LDR', 'LDS', 'LHD', 'LHW', 'LIA', 'LIN', 'LSE', 'MAE', 'MAP', 'MAR', 'MAT', 'MDA', 'MEC', 'MSL', 'MUS', 
    'MVL', 'OAE', 'PER', 'PHI', 'PHY', 'POL', 'POR', 'PSY', 'RLS', 'RUS', 'SBU', 'SCH', 'SCI', 'SKT', 'SLN', 
    'SOC', 'SPN', 'SSE', 'SSO', 'SUS', 'SWA', 'THR', 'TRK', 'UKR', 'VIP', 'WAE', 'WRT', 'WSE', 'WST'];
    for(var i = 0; i < subjOptions.length; i++) {
        var opt = subjOptions[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

export default ScheduleSearch