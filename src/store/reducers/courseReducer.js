const initState = {
    courses: [
        {id:'1', abr:'CSE', val:'320', time:'4:00-5:20pm'},
        {id:'2', abr:'CSE', val:'316', time:'10:00-11:20am'},
        {id:'3', abr:'CSE', val:'373', time:'1:00-2:20pm'}
    ]
};

const courseReducer = (state = initState, action) => {
    return state;
}

export default courseReducer