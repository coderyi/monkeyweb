import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import UserRankPage from './pages/UserRankPage'
import AboutPage from './pages/AboutPage'
import RepositoryRankPage from './pages/RepositoryRankPage'
import LanguagePage from './pages/LanguagePage'
import CountryPage from './pages/CountryPage'
import CityPage from './pages/CityPage'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className='container'>
                <Switch>
                    <Route component={UserRankPage} path='/monkeyweb' exact />
                    <Route component={RepositoryRankPage} path='/monkeyweb/repository' />
                    <Route component={AboutPage} path='/monkeyweb/about' />
                    <Route component={LanguagePage} path='/monkeyweb/language' />
                    <Route component={CountryPage} path='/monkeyweb/country' />
                    <Route component={CityPage} path='/monkeyweb/city' />

                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App
