import {LogedNav} from '../LogedPage/LogedNav'
import step1 from '../assets/step1.png'
import './step1.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export function Step1() {

    const navigate = useNavigate();

    const [book1, setBook1] = useState('plan-card');
    const [book2, setBook2] = useState('plan-card');
    const [book3, setBook3] = useState('plan-card');

    const nextStep = () => {
        if(book1 == 'plan-card selected' || book2 == 'plan-card selected' || book3 == 'plan-card selected'){
            navigate('/logedPage/step2');
        }
    }

  return (
    <div className='step1'>
        <LogedNav/>
                <div className='form-container'>
                <div className='step-form'>
                    <img className='process' src={step1} alt=""/>
                    <div className='step-container'>
                    <h1>Chose a Book Plan</h1>
                    <div className='step-flex'>
                            <div className={book1} onClick={() => {setBook1('plan-card selected'); setBook2('plan-card'); setBook3('plan-card')}}>
                                <h2>Basic</h2>
                                <h2 className='plan-price'><span>$</span>19</h2>
                                <div className='info'>
                                    <p>100 pages</p>
                                    <p>low qualiity AI images</p>
                                    <p>no editing</p>
                                </div>
                                <div className='down-part'>
                                {book1 == 'plan-card selected' ? 
                                <div className="checked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                                </div>
                                    : null}
                                </div>

                            </div>
                            <div className={book2} onClick={() => {setBook1('plan-card'); setBook2('plan-card selected'); setBook3('plan-card')}}>
                                <h2>Premium</h2>
                                <h2 className='plan-price'><span>$</span>29</h2>
                                <div className='info'>
                                    <p>100 pages</p>
                                    <p>low qualiity AI images</p>
                                    <p>no editing</p>
                                </div>
                                <div className='down-part'>
                                {book2 == 'plan-card selected' ? 
                                <div className="checked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                                </div>
                                    : null}
                                </div>

                            </div>
                            <div className={book3} onClick={() => {setBook1('plan-card'); setBook2('plan-card'); setBook3('plan-card selected')}}>
                                <h2>Dostoevsky</h2>
                                <h2 className='plan-price'><span>$</span>49</h2>
                                <div className='info'>
                                    <p>100 pages</p>
                                    <p>low qualiity AI images</p>
                                    <p>no editing</p>
                                </div>
                                <div className='down-part'>
                                {book3 == 'plan-card selected' ? 
                                <div className="checked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                                </div>
                                    : null}
                                </div>
                            </div>
                        </div>
                        <button className='next-btn' onClick={() => nextStep()}>Next</button>
                    </div>
                    </div>
                    </div>
    </div>
  );
}