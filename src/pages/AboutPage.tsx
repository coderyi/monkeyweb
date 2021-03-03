import React from 'react'
import {useHistory} from 'react-router-dom'

const AboutPage: React.FC = () => {
    const history = useHistory()
    return (
        <>
            <h2>Monkey</h2>
            <p>
                the rank of coders and repositories.
            </p>
            <button className='btn mt2 blue' onClick={() => history.push('/monkeyweb')}>
                Go back
            </button>
        </>
    )
}

export default AboutPage
