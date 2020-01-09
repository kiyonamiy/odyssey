import React, { Fragment } from 'react'
import { HashRouter, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'

const HomeComponent = loadable(() => import('./views/home'))
const AboutComponent = loadable(() => import('./views/about'))

export default function App() {
    return (
        <Fragment>
            <HashRouter>
                <ul>
                    <li><Link to="/">To Home</Link></li>
                    <li><Link to="/about">To About</Link></li>
                </ul>
                <Route exact path="/" component={HomeComponent}></Route>
                <Route exact path="/about" component={AboutComponent}></Route>
            </HashRouter>
            <p>test???!!!</p>
        </Fragment>
    )
}