import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar: React.FC = () => (
    <nav>
        <div className='nav-wrapper blue darken-2 ph1'>
            <NavLink to='/monkeyweb'>
                Monkey for GitHub
            </NavLink>
            <ul id='nav-mobile' className='right hide-on-med-and-down'>
                <li>
                    <NavLink to='/monkeyweb'>User Rank</NavLink>
                </li>
                <li>
                    <NavLink to='/monkeyweb/repository'>Repository Rank</NavLink>
                </li>
                <li>
                    <NavLink to='/monkeyweb/about'>About</NavLink>
                </li>
            </ul>
        </div>
    </nav>
)

export default Navbar
