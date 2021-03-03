import React, {useEffect, useState} from 'react'
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom'
import './PageHeader.css';

interface PageHeaderProps {
    showRegion: Boolean
    onSelectRegion: (title: string) => void
}

var selectedRegion: string = 'world'

const PageHeader: React.FC<PageHeaderProps> = ({showRegion, onSelectRegion}) => {
    const [title, setTitle] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [city, setCity] = useState<string>('')

    useEffect(() => {
        let savedCoutry = localStorage.getItem('country') || ''
        setCountry(savedCoutry)
        let savedCity = localStorage.getItem('city') || ''
        setCity(savedCity)
    }, [])

    const selectRegionHandler = (event: React.MouseEvent, id: string) => {
        event.preventDefault()
        localStorage.setItem('region', id)
        selectedRegion = id
        onSelectRegion(id)
    }

    return (
        <div className='input-field mt2'>
            <div>
                <NavLink to='/monkeyweb/language'> Language </NavLink>
                <NavLink to='/monkeyweb/country'> Country </NavLink>
            </div>
            {showRegion ?
                <div>
                    <label className={selectedRegion == 'world' ? 'region-label-highlight' : 'region-label'} onClick={e => selectRegionHandler(e, 'world')}>
                        World
                    </label>
                    <label className={selectedRegion == 'country' ? 'region-label-highlight' : 'region-label'} onClick={e => selectRegionHandler(e, 'country')}>
                        {country}
                    </label>
                    <label className={selectedRegion == 'city' ? 'region-label-highlight' : 'region-label'} onClick={e => selectRegionHandler(e, 'city')}>
                        {city}
                    </label>
                </div>
                : <div></div>}
        </div>
    )
}

export default PageHeader
