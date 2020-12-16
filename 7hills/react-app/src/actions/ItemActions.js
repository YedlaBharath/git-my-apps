// import React from 'react'
// import api from './api'

// export const ACTIONITEM_TYPES = {
//     CREATEITEM:"CREATEITEM",
//     UPDATEITEM:"UPDATEITEM",
//     DELETEITEM:"DELETEITEM",
//     FETCH_ALLITEM:"FETCH_ALLITEM",
// }

// export const fetchAllItem =()=>dispatch =>{
//     api.ItemsActions().fetchAllItem().then(res=>{
//         console.log(res);
//         dispatch({
//         type:ACTIONITEM_TYPES.FETCH_ALLITEM,
//         payload:res.data
//     });
// })
//    .catch(err=> console.log(err))
// }
// export const createItem = (data,onItemSuccess)=>dispatch =>{
//     api.ItemsActions().createItem(data).then(res=>{
//         console.log(res);
//         dispatch({
//             type:ACTIONITEM_TYPES.CREATEITEM,
//             payload:res.data
//         });
//         onItemSuccess();
//     })
// }