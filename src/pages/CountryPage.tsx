import React, {useEffect, useState} from 'react'
import PlainLineList from '../components/PlainLineList'
import {useHistory} from 'react-router-dom'

const LanguagePage: React.FC = () => {
    const [items, setItems] = useState<string[]>([])
    const history = useHistory()

    useEffect(() => {
        let list = setupHandler()
        setItems(list)

    }, [])

    const setupHandler = () => {
        return ['USA', 'UK', 'Germany', 'China', 'Canada', 'India', 'France', 'Australia', 'Other']

    }

    const selectHandler = (id: string) => {
        localStorage.setItem('country', id)
        history.push('/monkeyweb/city')
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
