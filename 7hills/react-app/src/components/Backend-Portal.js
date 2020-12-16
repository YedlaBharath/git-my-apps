import React from 'react'
import ReactDOM from 'react-dom'

function BackendPortal() {
    return ReactDOM.createPortal(
        <div>
            <a>pgkre</a>
        </div>,
        document.getElementById("Backend-Portal")
    )
}

export default BackendPortal
