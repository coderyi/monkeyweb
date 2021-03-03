import React from 'react'
import {IRepository} from '../models/Interfaces'

type RepositoryListProps = {
    items: IRepository[]
    onSelect: (item: IRepository) => void
}

const RepositoryList: React.FC<RepositoryListProps> = ({items, onSelect}) => {
    const selectHandler = (event: React.MouseEvent, id: IRepository) => {
        event.preventDefault()
        onSelect(id)
    }

    if (items.length === 0) {
        return <p className='center'>Empty</p>
    }

    return (
        <ul>
            {items.map(item => (
                <li
                    className={`cell`}
                >
                    <label>
                        <span>{item.index}</span>
                        <img className='cell-img' src={item.avatarUrl}>
                        </img>
                        <span className='repository-span'>{item.title}</span>
                        <span className='repository-span'>{`star:${item.stargazers_count}`}</span>
                        <span className='repository-span'>{`fork:${item.forks_count}`}</span>
                    </label>
                    <label>
                        <span className='repository-desc' onClick={e => selectHandler(e, item)}>{item.description}</span>
                    </label>
                </li>
            ))}
        </ul>
    )
}

export default RepositoryList
