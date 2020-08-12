import React, {Component} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import Select from "react-select";

class Search extends Component {

    state = {
        profs: []  // get from database once when page loads
    }

    render() {
        this.state.profs = [{label: 'mcdonnell'}, {label: 'kane'}, {label: 'tripathi'}, {label:'esmaili'}];
        return (
            <div className="search-instr">
                <h5>Search Instructor Rating</h5>

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

