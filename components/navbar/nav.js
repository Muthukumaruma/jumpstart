import React, { Component } from 'react'
import '../../sass/components/_navbar.scss'
const Navbar = (props)=>{
    const logo = "SPECIMAN"
    const user = "Muthu"
    return(
        <>
            <section className="navbar">
                <div className="row-container flexbox">
                    <div className="navbar__logo">{logo}</div>
                    <div className="navbar__user">Welcome back {user}</div>
                </div>
            </section>
        </>
    )
}
export default Navbar