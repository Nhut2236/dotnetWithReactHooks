import React, { useState } from 'react';
import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap';
import styles from '../../assets/css/sideBarMenu.css'

const SideBar = props => {
    return (
        <div id="sidebar-menu" className={styles.sideBarMenuContainer}>
            <Navbar fluid className={styles.sidebar} inverse >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">User Name</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Navbar.Text className={styles.userMenu}>
                        <Navbar.Link href="#"><i className="fa fa-home" aria-hidden="true"></i></Navbar.Link>
                        <Navbar.Link href="#"><i className="fa fa-cogs" aria-hidden="true"></i></Navbar.Link>
                    </Navbar.Text>
                    <Nav>
                        <NavDropdown eventKey={1} title="Item 1">
                            <MenuItem eventKey={1.1} href="#">Item 1.1</MenuItem>
                        </NavDropdown>
                        <NavItem eventKey={2}>Item 2</NavItem>
                        <NavItem eventKey={3}>Item 3</NavItem>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        </div>
    )
}

export default SideBar ;