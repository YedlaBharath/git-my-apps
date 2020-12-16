// import {ACTIONITEM_TYPES} from '../actions/ItemActions'

// const initialvalue = {
//     list:[]
// }
// export const ItemReducer = (state=initialvalue,action)=>{
//     switch(action.type)
//     {
//         case ACTIONITEM_TYPES.FETCH_ALLITEM:
//             return {
//                 ...state,
//                 list:[...action.payload]
//             }
//         case ACTIONITEM_TYPES.CREATEITEM:
//             return {
//                 ...state,
//                 list:[...state.list,action.payload]
//             }
//             default:
//                 return{
//                     state
//                 }
//     }
// }