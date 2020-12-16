import {
  Grid,
  TextField,
  withStyles,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";
import React, { useState , useEffect} from "react";
import UserFormOperations from "./UserFormOperations";
import { connect } from "react-redux";
import * as actions from "../actions/UserActions";
import {useToasts} from 'react-toast-notifications'

const initialvalues = {
  userName: "",
  email: "",
  password: "",
};

const formstyle = (theme) => ({
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  textfield: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});

function UserForm({ classes, ...props }) {
  const {addToast} = useToasts()
  const validate = (fieldValues = values) => {
    let temp = {...errors};
    if ("userName" in fieldValues) {
      temp.userName = fieldValues.userName ? "" : "This Field is Required";
    }
    if ("email" in fieldValues) {
      temp.email = /^$|.*@.*..*/.test(fieldValues.email)
        ? ""
        : "Email is not valid";
    }
    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "This Field is Required";
    }
    setErrors({
      ...temp,
    });
    if (fieldValues == values) {
      return Object.values(temp).every((x) => x === "");
    }
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = UserFormOperations(initialvalues, validate,props.setCurrentId);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = ()=>{
        resetForm()
        addToast("Submitted succesfully",{appearance:'success'})
      }
      if(props.currentId===0){
         props.createUser(values,onSuccess)
      }
      else{
        props.updateUser(props.currentId,values,onSuccess)
      }
      
    }
  };
  useEffect(()=>{
    if(props.currentId!==0)
    {
      setValues({
      ...props.userReducerlist.find(x=>x.id === props.currentId)
      })
      setErrors({})
    }
    

  },[props.currentId])

  return (
    <div>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} className={classes.paper}>
            <TextField
              className={classes.textfield}
              name="userName"
              label="UserName"
              variant="outlined"
              value={values.userName}
              onChange={handleInputChange}
              {...(errors.userName && {
                error: true,
                helperText: errors.userName,
              })}
            ></TextField>
            <TextField
              className={classes.textfield}
              name="email"
              label="Email"
              variant="outlined"
              value={values.email}
              onChange={handleInputChange}
              {...(errors.email && { error: true, helperText: errors.email })}
            ></TextField>
            <TextField
              className={classes.textfield}
              name="password"
              label="Password"
              variant="outlined"
              value={values.password}
              onChange={handleInputChange}
              {...(errors.password && {
                error: true,
                helperText: errors.password,
              })}
            ></TextField>
            <div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.smMargin}
              >
                Submit
              </Button>
              <Button variant="contained" className={classes.smMargin} onClick={resetForm}>
                Reset
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
      <FormControl variant="outlined">
        <InputLabel>State</InputLabel>
        <Select name="State"></Select>
      </FormControl>
    </div>
  );
}

const mapStateToProps = state =>({
    userReducerlist: state.userReducer.list,
})
const mapActionToProps ={
  createUser: actions.create,
  updateUser: actions.update,
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(formstyle)(UserForm));
