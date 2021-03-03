import React, {useEffect, useState} from 'react'
import PageHeader from '../components/PageHeader'
import UserList from '../components/UserList'
import {IUser} from '../models/Interfaces'

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
        let url = 'https://api.github.com/search/users?q=location:'+location+'+language:'+language+'&sort=followers&order=desc&page='+page
        if (selectedRegion == 'world') {
            url = 'https://api.github.com/search/users?q=language:'+language+'&sort=followers&order=desc&page='+page
        }
        currentLocation = location
        currentLanguage = language
        const response = await fetch(url)
        const myJson = await response.json();
        let i:number;
        for (i = 0; i < myJson.items.length; i++) {
            var item = myJson.items[i]
            let newItem: IUser = {
                title: item.login,
                avatarUrl: item.avatar_url,
                index: i + start
            }
            list[i] = newItem
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
