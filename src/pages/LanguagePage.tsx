import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import PlainLineList from '../components/PlainLineList'

const LanguagePage: React.FC = () => {
    const [items, setItems] = useState<string[]>([])
    const history = useHistory()

    useEffect(() => {
        let list = setupHandler()
        setItems(list)
    }, [])

    const setupHandler = () => {
        return ['JavaScript', 'Java', 'PHP', 'Ruby', 'Python', 'CSS', 'CPP', 'C', 'Shell', 'HTML', 'TypeScript', 'R', 'Objective-C', 'Go', 'Swift', 'Lua', 'Vue', 'Kotlin', 'Scala', 'Perl', 'Dart', 'Rust']
    }

    const selectHandler = (id: string) => {
        localStorage.setItem('language', id)
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
