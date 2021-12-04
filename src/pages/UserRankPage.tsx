import React, {useEffect, useState} from 'react'
import PageHeader from '../components/PageHeader'
import UserList from '../components/UserList'
import {IUser} from '../models/Interfaces'
import { MonkeyGitHubAPI } from '../monkey-github-api/MonkeyGitHubAPI'
var itemArray: Array<IUser> = []
var currentRegion: string = 'world'
var currentLocation: string = ''
var currentLanguage: string = ''
const UserRankPage: React.FC = () => {
    const [items, setItems] = useState<IUser[]>([])

    useEffect(() => {
        fetchDataHandler().then((saved) => {
            setItems(saved)
        })
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', onScrollHandle);
    }, [])

    const fetchDataHandler = async () => {
        const client = new MonkeyGitHubAPI();
        localStorage.setItem('fetchData', 'user')
        var list: IUser[] = [];
        var start = itemArray.length + 1;
        var page = itemArray.length / 30 + 1
        const language = localStorage.getItem('language') || 'Objective-C'
        const country = localStorage.getItem('country') || 'china'
        const city = localStorage.getItem('city') || 'beijing'

        let location =''
        let selectedRegion = localStorage.getItem('region') || 'world'
        if (selectedRegion == 'city') {
            location = city
        } else if (selectedRegion == 'country') {
            location = country
        }
        if (currentLocation != location || currentLanguage != language) {
            start = 1
            page = 1
            itemArray = []
        }
        currentLocation = location
        currentLanguage = language
        list = await client.searchUsers(
            start,
            page,
            location,
            language
        )
        let i:number;
        for (i = 0; i < list.length; i++) {
            var item = list[i]
            item.index = i + start
        } 
        itemArray = itemArray.concat(list);
        return itemArray
    }

    const selectRegionHandler = (title: string) => {
        currentRegion = title
        itemArray = []
        fetchDataHandler().then((saved) => {
            setItems(saved)
        })
    }

    const selectCellHandler = (id: number) => {
    }

    const onScrollHandle = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            fetchDataHandler().then((saved) => {
                setItems(saved)
            })
        }
    }

    return (
        <>
            <PageHeader onSelectRegion={selectRegionHandler}  showRegion={true}/>
            <UserList
                items={items}
                onSelect={selectCellHandler}
            />
        </>
    )
}

export default UserRankPage
