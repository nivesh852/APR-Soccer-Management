import React from 'react'

function Footer() {
    var footer = {
        color: "#ffffff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "2em",
        flexShrink: 0,
        backgroundColor: "#3f51b5",
        zIndex: 1,
        boxShadow: '0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)'
    };
    return (
        <div style={footer}>
            @copyright message
        </div>
    )
}

export default Footer
