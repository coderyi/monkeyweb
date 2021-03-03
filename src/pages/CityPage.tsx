import React, {useEffect, useState} from 'react'
import PlainLineList from '../components/PlainLineList'
import {useHistory} from 'react-router-dom'
interface Citys {
    country: string
    city: Array<string>
}

const LanguagePage: React.FC = () => {
    const [items, setItems] = useState<string[]>([])
    const history = useHistory()

    useEffect(() => {
        let list = setupHandler()
        setItems(list)
    }, [])

    const setupHandler = () => {
        let citys: Array<Citys> = [
            {
                "country": "USA",
                "city":  ["San Francisco", "New York", "Seattle", "Chicago", "Los Angeles", "Boston", "Washington", "San Diego", "San Jose", "Philadelphia"],
            },
            {
                "country": "UK",
                "city":  ["London", "Cambridge", "Manchester", "Edinburgh", "Bristol", "Birmingham", "Glasgow", "Oxford", "Newcastle", "Leeds"],
            },
            {
                "country": "Germany",
                "city":  ["Berlin", "Munich", "Hamburg", "Cologne", "Stuttgart", "Dresden", "Leipzig"],
            },
            {
                "country": "China",
                "city":  ["Beijing", "Shanghai", "Shenzhen", "Hangzhou", "Guangzhou", "Chengdu", "Nanjing", "Wuhan", "Suzhou", "Xiamen", "Tianjin", "Chongqing", "Changsha"]
            },
            {
                "country": "Canada",
                "city":  ["Toronto", "Vancouver", "Montreal", "ottawa", "Calgary", "Quebec"],
            },
            {
                "country": "India",
                "city":  ["Chennai", "Pune", "Hyderabad", "Mumbai", "New Delhi", "Noida", "Ahmedabad", "Gurgaon", "Kolkata"],
            },
            {
                "country": "France",
                "city":  ["paris", "Lyon", "Toulouse", "Nantes"],
            },
            {
                "country": "Australia",
                "city":  ["sydney", "Melbourne", "Brisbane", "Perth"],
            },
            {
                "country": "Other",
                "city":  ["Tokyo", "Moscow", "Singapore", "Seoul"],
            }
        ]

        let country = localStorage.getItem('country') || 'China'
        for (var i = 0; i < citys.length; i++) {
            if (citys[i].country == country) {
                return citys[i].city
            }
        }
        return ["Beijing", "Shanghai", "Shenzhen", "Hangzhou", "Guangzhou", "Chengdu", "Nanjing", "Wuhan", "Suzhou", "Xiamen", "Tianjin", "Chongqing", "Changsha"]
    }

    const selectHandler = (id: string) => {
        localStorage.setItem('city', id)
        let fetchData: string = localStorage.getItem('fetchData') || 'user'
        if (fetchData == 'user') {
            history.push('/monkeyweb')
        } else {
            history.push('/monkeyweb/repository')
        }
    }

    return (
        <>
            <PlainLineList
                items={items}
                onSelect={selectHandler}
            />
        </>
    )
}

export default LanguagePage
