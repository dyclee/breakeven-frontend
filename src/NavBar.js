import React, { useState, useContext } from 'react';
import Context from './Context';

const NavBar = () => {
    const { token } = useContext(Context);

    return (
        <div className="navbar">
            <div className="navbar__inner">
                <div className="container">
                    <a className="brand"></a>
                    <a className="profile-button"></a>
                </div>
            </div>
        </div>
    )
}
