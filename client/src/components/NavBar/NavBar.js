import React from 'react';
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = (props) => {
	return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
                Fashion House
            </Link>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav">

                </div>
                <div className="navbar-nav ml-auto">
                    <Link to="/manager" className="nav-item nav-link">Manage</Link>
                    <Link to="/wish-list" className="nav-item nav-link">Wish List <span className="badge badge-secondary">1</span></Link>
                    <Link to="/cart" className="nav-item nav-link">Cart <span className="badge badge-secondary">1</span></Link>
                    <Link to="/authenticator" className="nav-item nav-link">Login</Link>
                </div>
            </div>
        </nav>
	);
};

export default NavBar;