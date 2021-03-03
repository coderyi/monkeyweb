import React, {useEffect, useState} from 'react'
import PageHeader from '../components/PageHeader'
import RepositoryList from '../components/RepositoryList'
import {IRepository} from '../models/Interfaces'

var itemArray: Array<IRepository> = []
var currentLanguage: string = ''
const RepositoryPage: React.FC = () => {
    const [items, setItems] = useState<IRepository[]>([])

    useEffect(() => {
        fetchDataHandler().then((saved) => {
            setItems(saved)
        })
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', onScrollHandle);

    }, [])

    const fetchDataHandler = async () => {
        localStorage.setItem('fetchData', 'repository')
        var list: IRepository[] = [];
        var start = itemArray.length + 1;
        var page = itemArray.length / 30 + 1
        const language = localStorage.getItem('language') || 'Objective-C'
        if (currentLanguage != language) {
            start = 1
            page = 1
            itemArray = []
        }
        currentLanguage = language
        const response = await fetch('https://api.github.com/search/repositories?sort=stars&order=desc&page='+page+'&q=language:'+language)
        const myJson = await response.json();
        let i:number;
        for (i = 0; i < myJson.items.length; i++) {
            var item = myJson.items[i]
            let newItem: IRepository = {
                title: item.full_name,
                avatarUrl: item.owner.avatar_url,
                index: i + start,
                description: item.description,
                created_at: item.created_at,
                stargazers_count: item.stargazers_count,
                forks_count: item.forks_count
            }
            list[i] = newItem
          }
        itemArray = itemArray.concat(list);
        return itemArray
    }

    const selectRegionHandler = (title: string) => {
    }

    const selectCellHandler = (id: IRepository) => {
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
            <PageHeader onSelectRegion={selectRegionHandler} showRegion={false}/>
            <RepositoryList
                items={items}
                onSelect={selectCellHandler}
            />
        </>
    )
}

export default RepositoryPage
