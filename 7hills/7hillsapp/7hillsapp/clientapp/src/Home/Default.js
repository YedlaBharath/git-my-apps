import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        return (
            <div style={{position:"relative",top:"10rem"}}>
                <h1>404 Not Found</h1>
                <h3>You Requeted for url: <span style={{color:"red"}}>{this.props.history.location.pathname}</span> does not found</h3>
            </div>
        )
    }
}
