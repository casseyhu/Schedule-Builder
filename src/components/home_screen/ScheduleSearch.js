import React, { Component } from 'react'
import { getFirestore } from 'redux-firestore'
import Select from "react-select";

class ScheduleSearch extends Component {
    state = {
        subj: "",
        num: "",
        section: "",
        desc: "",
        courses: this.props.courses,
        courseNums: [],
        sections: []
    }

    addCourse() {
        const fireStore = getFirestore();
        var updatedCourses = [];
        if (this.props.courses != null) {
            //copy by value
            if (this.state.subj.length === 3 && this.state.num.length === 3 && this.state.section.length === 2) {
                var Course = this.state.subj + this.state.num + "-" + this.state.section;
                for (let i = 0; i < this.props.courses.length; i++) {
                    if (Course.localeCompare(this.props.courses[i]) === 0) {
                        return;
                    }
                    updatedCourses.push(this.props.courses[i])
                }
                updatedCourses.push({"course": Course, "selected": false});
                fireStore.collection('users').doc(this.props.auth).update({
                    userCourses: updatedCourses
                })
                this.setState({
                    num: "",
                    section: "",
                })
            }
        }
    }

    changeCourse = (e) => {
        if (e) {
            const subj = e.label.substring(0, 3);
            this.setState({ subj });
            const firestore = getFirestore();
            var courseNums = [];
            firestore.collection('courses').doc(subj).collection('courseNum').get().then((doc) => {
                doc.forEach((document) => {
                    courseNums.push({ label: subj + document.id });
                });
            });
            this.setState({ courseNums, num: "", section: "" });
        }
        else
            this.setState({ courseNums: [], num: "", section: "" });
    }

    changeCourseNum = (e) => {
        if (e) {
            const num = e.label.substring(3,6);
            const firestore = getFirestore();
            var sections = [];
            firestore.collection('courses').doc(this.state.subj).collection('courseNum').doc(num).collection('section').get().then((doc) => {
                doc.forEach((document) => {
                    sections.push({ label: this.state.subj + this.state.num + "-" + document.id });
                });
            });
            this.setState({ sections, num, section: "" });
        }
        else
            this.setState({ sections: [], section: "" });
    }

    changeSection = (e) => {
        if (e){
            const section = e.label.substring(7);
            this.setState({ section });
            const firestore = getFirestore();
            firestore.collection('courses').doc(this.state.subj).collection('courseNum').doc(this.state.num).collection('section').doc(section).get().then((doc) => {
                if(doc.exists){
                    this.setState({
                        desc: doc.data().info,
                    })
                }
            })
            console.log(this.state);
        }
        else
            this.setState({ sections: [] })
    }


    clearVal = () => {
        this.setState({ num: "" });
    }

    render() {
        const customStyle = {
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? '#ffa29c' : 'white',
                color: 'black'}),
            control: (base, _state) => ({
                ...base, 
                minHeight: '40px', 
                height: '40px'}),
            valueContainer: (base, _state) => ({
                 ...base, 
                minHeight: '40px', 
                height: '40px',
                padding: '0px'})
        }
        return (
            <div className='s-search-component hoverable z-depth-2'>
                <h5> Search Course </h5>
                <p> Search by Subject </p>
                <Select options={options}
                    onChange={this.changeCourse}
                    styles={customStyle}
                    isSearchable />
                <p> Search by Number </p>
                <Select options={this.state.courseNums}
                    onChange={this.changeCourseNum}
                    value={{ label: this.state.num }}
                    styles={customStyle}
                    isSearchable />
                <p> Search by Section </p>
                <Select options={this.state.sections}
                    onChange={this.changeSection}
                    value={{ label: this.state.section }}
                    styles={customStyle}
                    isSearchable />
                    <p></p>
                <div className="splitscreen">
                     <div id="course-description">{this.state.desc} </div>  
                     <div id="add-button-loc">
                         <button id='add-button' className="btn red waves-effect lighten-1 z-depth-0" style={{zIndex: "0"}} onClick={this.addCourse.bind(this)}> Add </button>
                     </div>
                 </div>
            </div>
        )
    }
}

const options = [
    { label: "AAS - Asian & Asian American Studies" },
    { label: "ACC - Accounting" },
    { label: "ACH - Arts, Culture and Humanities" },
    { label: "ADV - Advising" },
    { label: "AFH - Africana Studies/Humanities" },
    { label: "AFS - Africana Studies/Social and Behavioral Sciences" },
    { label: "AIM - Advancement on Individual Merit" },
    { label: "AMR - American Studies" },
    { label: "AMS - Applied Mathematics and Statistics" },
    { label: "ANP - Biological Anthropology" },
    { label: "ANT - Anthropology, Cultural and Archaeology" },
    { label: "ARB - Arabic" },
    { label: "ARH - Art History" },
    { label: "ARS - Art, Studio" },
    { label: "ASC - Academic Success & Tutoring Center" },
    { label: "AST - Astronomy" },
    { label: "ATM - Atmospheric and Oceanic Studies" },
    { label: "BCP - Pharmacology" },
    { label: "BIO - Biology" },
    { label: "BME - Biomedical Engineering" },
    { label: "BUS - Business Management" },
    { label: "CAR - Career Development" },
    { label: "CCS - Cinema and Cultural Studies" },
    { label: "CDT - Consortium for Digital Arts Culture and Technology" },
    { label: "CEF - School of Professional Development" },
    { label: "CHE - Chemistry" },
    { label: "CHI - Chinese Language" },
    { label: "CIV - Civil Engineering" },
    { label: "CLL - Classics of Literature" },
    { label: "CLS - Classics" },
    { label: "CLT - Comparative Literature" },
    { label: "CME - Chemical and Molecular Engineering" },
    { label: "CSE - Computer Science" },
    { label: "CWL - Creative Writing and Literature" },
    { label: "DAN - Dance" },
    { label: "DIA - Digital Arts" },
    { label: "EAS - Engineering and Applied Science" },
    { label: "EBH - Human Evolutionary Biology" },
    { label: "ECO - Economics" },
    { label: "EDP - Environmental Design, Policy, and Planning" },
    { label: "EEL - Select East European Languages" },
    { label: "EEO - Electrical Engineering Online" },
    { label: "EGL - English" },
    { label: "ENS - Environmental Studies" },
    { label: "ENV - Environmental Science" },
    { label: "ESE - Electrical Engineering" },
    { label: "ESG - Engineering Science" },
    { label: "ESL - English as Second Language" },
    { label: "ESM - Materials Science" },
    { label: "EST - Technology and Society" },
    { label: "EUR - European Studies" },
    { label: "EXT - Externships" },
    { label: "FLA - Foreign Language Teacher Preparation" },
    { label: "FLM - Film" },
    { label: "FRN - French" },
    { label: "GEO - Geosciences" },
    { label: "GER - Germanic Languages and Literature" },
    { label: "GLI - Globalization Studies and International Relations" },
    { label: "GLS - Global Studies" },
    { label: "GRK - Greek" },
    { label: "GSS - Geospatial Science" },
    { label: "HAD - Clinical Laboratory Sciences" },
    { label: "HAL - Athletic Training" },
    { label: "HAN - Health Sciences" },
    { label: "HAT - Respiratory Care" },
    { label: "HBA - Anatomical Sciences" },
    { label: "HBH - Pharmacology" },
    { label: "HBM - Molecular Genetics and Microbiology" },
    { label: "HBP - Pathology" },
    { label: "HBW - Hebrew" },
    { label: "HBY - Physiology and Biophysics" },
    { label: "HDG - General Dentistry" },
    { label: "HDO - Oral Biology and Pathology" },
    { label: "HDP - Periodontics" },
    { label: "HDV - Human Development" },
    { label: "HIN - Hindi" },
    { label: "HIS - History" },
    { label: "HNI - Nursing One and Two Year Baccalaureate Courses" },
    { label: "HON - Honors College" },
    { label: "HUE - European Literature and Culture Courses in English" },
    { label: "HUF - French Literature and Culture Courses in English" },
    { label: "HUG - German Literature and Culture Courses in English" },
    { label: "HUI - Italian Literature and Culture Courses in English" },
    { label: "HUL - Romance Languages" },
    { label: "HUR - Russian Literature and Culture Courses in English" },
    { label: "HUS - Spanish Literature and Culture Courses in English" },
    { label: "HWC - Social Work" },
    { label: "IAE - Digital Intelligence Arts & Engineering" },
    { label: "IAP - International Academic Programs" },
    { label: "INT - International Studies" },
    { label: "ISE - Information Systems" },
    { label: "ITL - Italian" },
    { label: "ITS - Information and Tech Studies" },
    { label: "JDH - Judaic Studies:Humanities" },
    { label: "JDS - Judaic Studies:Social and Behavioral Sciences" },
    { label: "JPN - Japanese Language" },
    { label: "JRN - Journalism" },
    { label: "KOR - Korean" },
    { label: "LAC - Latin American and Caribbean Studies" },
    { label: "LAN - Uncommonly Taught Languages" },
    { label: "LAT - Latin" },
    { label: "LCR - Living/Learning Center: Community Service Learning" },
    { label: "LDR - LLC: Leadership Development" },
    { label: "LDS - Leadership and Service" },
    { label: "LHD - Living/Learning:Human Sexual & Gender Development" },
    { label: "LHW - Living/Learning Center in Health and Wellness" },
    { label: "LIA - Living/Learning Center:Interdisciplinary Arts" },
    { label: "LIN - Linguistics" },
    { label: "LSE - Living/Learning Center:Science and Engineering" },
    { label: "MAE - Mathematics Teacher Preparation" },
    { label: "MAP - Mathematics Proficiency" },
    { label: "MAR - Marine Sciences" },
    { label: "MAT - Mathematics" },
    { label: "MDA - Media Arts" },
    { label: "MEC - Mechanical Engineering" },
    { label: "MSL - Military Service Leadership" },
    { label: "MUS - Music" },
    { label: "MVL - Medieval Studies" },
    { label: "OAE - Oral Academic English" },
    { label: "PER - Persian" },
    { label: "PHI - Philosophy" },
    { label: "PHY - Physics" },
    { label: "POL - Political Science" },
    { label: "POR - Portuguese" },
    { label: "PSY - Psychology" },
    { label: "RLS - Religious Studies" },
    { label: "RUS - Russian Language and Literature" },
    { label: "SBU - Stony Brook University" },
    { label: "SCH - University Scholars Program" },
    { label: "SCI - Science Teacher Preparation" },
    { label: "SKT - Sanskrit" },
    { label: "SLN - Sign Language" },
    { label: "SOC - Sociology" },
    { label: "SPN - Hispanic Languages and Literature" },
    { label: "SSE - Social Studies Education" },
    { label: "SSO - Science and Society" },
    { label: "SUS - Sustainability Studies" },
    { label: "SWA - Swahili" },
    { label: "THR - Theatre Arts" },
    { label: "TRK - Turkish" },
    { label: "UKR - Ukrainian" },
    { label: "VIP - Vertically Integrated Projects" },
    { label: "WAE - Writing Academic English" },
    { label: "WRT - Writing" },
    { label: "WSE - Women in Science & Engineering" },
    { label: "WST - Women's Studies" }
]

export default ScheduleSearch