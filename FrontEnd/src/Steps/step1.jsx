import {LogedNav} from '../LogedPage/LogedNav'
import step1 from '../assets/step1.png'
import './step1.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


export function Step1() {

    const navigate = useNavigate();
    const location = useLocation();

    const [book1, setBook1] = useState('plan-card');
    const [book2, setBook2] = useState('plan-card');
    const [book3, setBook3] = useState('plan-card');
    const [btnClass, setBtnClass] = useState('next-btn')
    const email = location.state.email;

    const nextStep = (e) => {
        e.preventDefault()
        if(book1 == 'plan-card selected' || book2 == 'plan-card selected' || book3 == 'plan-card selected'){
            let plan;
            if(book1 == 'plan-card selected'){
                plan = 'Basic';
            } else if(book2 == 'plan-card selected'){
                plan = 'Premium';
            } else{
                plan = 'Dostoevsky';
            }
            navigate('/logedPage/step2', {state: {plan: plan,email: email }});
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
                            <div className={book1} onClick={() => {setBook1('plan-card selected'); setBook2('plan-card'); setBook3('plan-card'); setBtnClass('next-btn able')}}>
                                <h2>Basic</h2>
                                <h2 className='plan-price'><span>$</span>19</h2>
                                <div className='info'>
                                    <p>100 pages</p>
                                    <p>low quality AI Cover</p>
                                    <p>no additional images</p>
                                    <p>no book editing</p>
                                </div>
                                <div className='down-part'>
                                {book1 == 'plan-card selected' ? 
                                <div className="checked">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                                </div>
                                    : null}
                                </div>

                            </div>
                            <div className={book2} onClick={() => {setBook1('plan-card'); setBook2('plan-card selected'); setBook3('plan-card'); setBtnClass('next-btn able')}}>
                                <h2>Premium</h2>
                                <h2 className='plan-price'><span>$</span>29</h2>
                                <div className='info'>
                                    <p>300 pages</p>
                                    <p>high quality AI Cover</p>
                                    <p>10 additional mid quality images</p>
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
                            <div className={book3} onClick={() => {setBook1('plan-card'); setBook2('plan-card'); setBook3('plan-card selected'); setBtnClass('next-btn able')}}>
                                <h2>Dostoevsky</h2>
                                <h2 className='plan-price'><span>$</span>49</h2>
                                <div className='info'>
                                    <p>500 pages</p>
                                    <p>highest quality AI Cover</p>
                                    <p>20 additional high quality images</p>
                                    <p>book editing</p>
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
                        <a href="#" className={btnClass} onClick={(e) => nextStep(e)}>Next</a>
                    </div>
                    </div>
                    </div>
    </div>
  );
}