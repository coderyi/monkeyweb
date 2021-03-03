import React from 'react'

type PlainLineListProps = {
    items: string[]
    onSelect: (item: string) => void
}

const PlainLineList: React.FC<PlainLineListProps> = ({items, onSelect}) => {
    const selectHandler = (event: React.MouseEvent, id: string) => {
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
                    key={item}
                >
                    <label>
                        <span onClick={e => selectHandler(e, item)}>{item}</span>
                    </label>
                </li>
            ))}
        </ul>
    )
}

export default PlainLineList
