import React from 'react'
import {IUser} from '../models/Interfaces'

type UserListProps = {
    items: IUser[]
    onSelect: (item: number) => void
}

const UserList: React.FC<UserListProps> = ({items, onSelect}) => {
    const selectHandler = (event: React.MouseEvent, id: number) => {
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
                    <label className='cell-label'>
                        <span className='cell-index'>{item.index}</span>
                        <img className='cell-img' src={item.avatarUrl}>
                        </img>
                        <span className='cell-name'>{item.title}</span>
                    </label>
                </li>
            ))}
        </ul>
    )
}

export default UserList
