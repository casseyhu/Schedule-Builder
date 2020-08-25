import React, {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getFirestore } from 'redux-firestore'
import { firestoreConnect } from 'react-redux-firebase'
import { Chart } from "react-google-charts";
import Select from "react-select";

class Search extends Component {

    state = {
        profs: [],  // get from database once when page loads
        grades: [],
        done: false
    }

    componentDidMount(){
        const firestore = getFirestore();
        firestore.collection('Evals Spring 2020').doc("CSE").collection('courseNum').doc('373').collection('section').doc('01').get().then((doc) => {
           if(doc.exists){
                this.setState({
                    grades: doc.data().grades
                })
            }
        });
    }

    render() {
        var data = []
        if(!this.state.done){
            for (var key in this.state.grades) {
                data.push([key, this.state.grades[key]])
            }
            data.sort((a, b) => {
                const order = { '+': -1, '-': 1, undefined: 0, 'C': 0 };
                console.log(a, order[a[0][1]], b, order[b[0][1]])
                console.log(a[0][0].localeCompare(b[0][0]) || order[a[0][1]] - order[b[0][1]]);
                return a[0][0].localeCompare(b[0][0]) || order[a[0][1]] - order[b[0][1]];
            });
        }
        data.unshift(['Grades', "Students"])
        this.state.profs = [{label: 'mcdonnell'}, {label: 'kane'}, {label: 'tripathi'}, {label:'esmaili'}];
        return (
            <div className="search-instr">
                <h5>Search Instructor Rating</h5>
                <Chart chartType="Bar" style={{paddingLeft: '20%'}}width="90%" height="400px" data={data} 
                options={{
                    chart: {
                        title: 'Spring 2020 CSE320',
                    },
                }}/>
                <form>
                    <div className="input-field">
                        <i class="material-icons prefix">search</i>
                        <input id="search" type="text" class="validate"/>
                        <label for="search">Name (Last, First)</label>
                    </div>
                </form>
                <h5> testing </h5>
                {this.testsearchBox()}
                

            </div>

        )
    }

    testsearchBox() {
        const customStyle = {
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? '#ffa29c' : 'white',
                color: 'black'}),
            control: (base, _state) => ({
                ...base, 
                align: 'center',
                width: '250px',
                minHeight: '40px', 
                height: '40px'}),
            valueContainer: (base, _state) => ({
                 ...base, 
                minHeight: '40px', 
                height: '40px',
                padding: '0px'})
        }
        return (<Select options={this.state.profs} styles={customStyle} isSearchable />)
    }

}

export default Search;

