import api from "./api";

export const ACTION_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  FETCH_ALL: "FETCH_ALL",
};
const formatData = data =>({
  ...data
  // age:parseInt(data.age?data.age:0)
})

export const fetchAll = () => (dispatch) => {
  api
    .UserActions()
    .fetchAll()
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.FETCH_ALL,
        payload: response.data,
      });
    })
    .catch((err) => console.log(err));
};

export const create = (data,onSuccess) => (dispatch) => {
  api
    .UserActions()
    .create(data)
    .then((response) => {
      console.log(response);
      dispatch({
        type: ACTION_TYPES.CREATE,
        payload: response.data,
      });
      onSuccess();
    })
    .catch((err) => console.log(err));
};

export const update = (id,data,onSuccess)=>dispatch=>{
  data=formatData(data)
  api.UserActions().update(id,data).then(res=>{
    console.log(res);
    dispatch({
      type:ACTION_TYPES.UPDATE,
      payload:{id,...data}
    })
    onSuccess()
  })
  .catch(err=>console.log(err))
}

export const Delete = (id, onSuccess) => dispatch=>{
  api.UserActions().delete(id).then(res=>{
    console.log(res);
    dispatch({
      type:ACTION_TYPES.DELETE,
      payload:id,
    })
    onSuccess()
  })
  .catch(err=>console.log(err))
}