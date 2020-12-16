import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  withStyles,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/UserActions";
import UserForm from "./UserForm";
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {useToasts} from 'react-toast-notifications'

const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    paddding: theme.spacing(2),
    height: "20rem",
  },
});

const HillsUserContainer = ({ classes, ...props }) => {
  const {addToast} = useToasts()
   const [currentId,setCurrentId] = useState(0)
  useEffect(() => {
    props.fetchAllUsers();
  }, []);
 
  const onDelete = (id)=>{
    if(window.confirm('Are you sure to Delete this record?'))
    {
      props.deleteUser(id,()=>addToast("Deleted SuccessFully",{appearance:'info'}))
    }
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <UserForm {...({currentId,setCurrentId})}></UserForm>
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>UserName</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Password</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.userReducerlist.map((record) => {
                  return (
                    <TableRow key={record.id} hover>
                      <TableCell>{record.userName}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>{record.password}</TableCell>
                      <TableCell>
                        <ButtonGroup variant='text'>
                          <Button><EditIcon color="primary" onClick={()=>{setCurrentId(record.id)}}/></Button>
                          <Button><DeleteIcon color="secondary"onClick={()=>{onDelete(record.id)}}/></Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  userReducerlist: state.userReducer.list,
});

const mapActionToProps = {
  fetchAllUsers: actions.fetchAll,
  deleteUser: actions.Delete
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(HillsUserContainer));
