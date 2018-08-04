export default (state={
    addPopupVisible:false,
    updatePopupVisible:false,
    employeeList:[],
    checkValue:"",
}, action) => {

    switch (action.type) {
        case 'changeAddStatus':{
            const newState =JSON.parse(JSON.stringify(state));
            newState.addPopupVisible=action.addPopupVisible;
            return newState;
        }
        case 'changeUpdateStatus':{
            const newState =JSON.parse(JSON.stringify(state));
            newState.updatePopupVisible=action.updatePopupVisible;
            return newState;
        }
        case 'getEmployeeList':{
            const newState =JSON.parse(JSON.stringify(state));
            newState.employeeList=action.employeeList;
            return newState;
        }
        case 'getEmployeeList':{
            const newState =JSON.parse(JSON.stringify(state));
            newState.employeeList=action.employeeList;
            return newState;
        }
        case 'getChooseValue':{
            const newState =JSON.parse(JSON.stringify(state));
            newState.chooseValue=action.chooseValue;
            newState.checkValue=action.chooseValue.roles[0].name;
            newState.updatePopupVisible=true;
            return newState;
        }
        case 'setCheckValue':{
            const newState =JSON.parse(JSON.stringify(state));
            newState.checkValue=action.checkValue;
            return newState;
        }
        default:
            return state;
    }
}