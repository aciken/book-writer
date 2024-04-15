import './LogedNav.css'
import { useState } from 'react'

export function LogedNav(){

    const [listClass1, setListClass1] = useState('active')
    const [listClass2, setListClass2] = useState('')
    const [listClass3, setListClass3] = useState('')

    return(


        <nav className="LogedNav">
            <ul>
                <li>
                    <a href='#' onClick={(e) => {e.preventDefault(); setListClass1('active'); setListClass2('');setListClass3('')}} className={listClass1}>Books</a>
                </li>
                <li>
                    <svg className='locked' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>lock</title><path d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" /></svg>
                    <a className="link-locked" href='#' onClick={(e) => e.preventDefault()}>Translate</a>
                </li>

            </ul>
        </nav>
    )
}