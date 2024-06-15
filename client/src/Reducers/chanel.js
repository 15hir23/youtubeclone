import { MdPendingActions } from "react-icons/md";

const chanelReducers =(states=[],action)=>{
    switch (action.type){
        case 'UPDATE_DATA':
    
            return action.payload;
        default:
            return states;
    }
}
export default chanelReducers;