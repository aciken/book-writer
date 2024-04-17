import {LogedNav} from '../LogedPage/LogedNav'
import step2 from '../assets/step2.png'
import './step2.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Step2(){

    const navigate = useNavigate();
    const location = useLocation();
    const plan = location.state.plan;



    const [maxRange, setMaxRange] = useState(100);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if(plan === 'Basic'){
            setMaxRange(100);
        } else if(plan === 'Premium'){
            setMaxRange(300);
        } else {
            setMaxRange(500);
        }
    }, [plan]);

    const goBack = () => {
        navigate('/logedPage/step1');
    }

    return(
        <div className='step2'>
        <LogedNav/>
                <div className='form-container'>
                <div className='step-form'>
                    <img className='process' src={step2} alt=""/>
                    <div className='step-container'>
                    <svg className='back-arrow' onClick={() => goBack()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left-thin</title><path d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" /></svg>
                    <h1 className='step2-headline'>Let's create your book</h1>
                    <div className='create-book'>
                        <div className='top-inputs'>
                            <div className='text-part'>
                                <h2>Basic</h2>
                                <p>Here you need to add info about your book so we can make it in the most acurate way.</p>
                            </div>
                            <div className='input-part'>
                                <div>
                                    <label htmlFor="book-name">Book Name</label>
                                    <input type="text" name='book-name' required/>
                                </div>
                                <div>
                                    <label htmlFor="book-desc">Book Description</label>
                                    <textarea name="book-desc"></textarea>
                                </div>
                                <div>
                                    <label htmlFor="book-author">Author</label>
                                    <input type="text" name='book-author' required/>
                                </div>
                                <div>
                                    <label htmlFor="book-lang">Language</label>
                                    <input type="text" name='book-lang' required/>
                                </div>
                            </div>
                        </div>
                        <div className="top-inputs n-first">
                            <div className='text-part'>
                            <h2>Pages</h2>
                            <p>Here you add info about how you want your pages to look.</p>
                            </div>
                            <div className='input-part'>
                                <div>
                                <div>
                                    <label htmlFor="book-pages">Pages</label>
                                    <input className='page-slider' type='range' name='book-pages' min={1} max={maxRange} value={page} onChange={(e) => setPage(e.target.value)} />
                                    <p>{page}</p>
                                </div>
                                <div>
                                    {/* 2 radio buttons for ai cover or not */}
                                    <div className='radio-btns'>
                                        <div>
                                        <label htmlFor="ai">AI Cover</label>
                                            <input type="radio" name='cover' value='ai' required/>
                                        </div>
                                        <div>
                                        <label htmlFor="custom">Custom Cover</label>
                                            <input type="radio" name='cover' value='custom' required/>
                                        </div>
                                    </div>
                        

                                    <input type="text" name='book-font' required/>
                                </div>
                                <div>
                                    <label htmlFor="book-cover">Book Cover</label>
                                    <input type="file" name='book-cover' required/>
                                </div>
                                <div>
                                    <label htmlFor="book-genre">Genre</label>
                                    <input type="text" name='book-genre' required/>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
                        <a className='next-btn' >Next</a>
                    </div>
                    </div>
                    </div>
    </div>
    )
}