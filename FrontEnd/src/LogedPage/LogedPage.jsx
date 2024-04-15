import { useLocation } from 'react-router-dom';
import './LogedPage.css';
import { LogedNav } from './LogedNav';
import { useState } from 'react';
import step1 from '../assets/step1.png';


export function LogedPage() {


    const location = useLocation();

    const [formOpen, setFormOpen] = useState(false);
    const [formPhase, setFormPhase] = useState(1);



    let email;
    if(location.state == null){
        window.location.href = '/login';  
    } else{
        email = location.state.email;
    }

    const openForm = () => {
        setFormOpen(true);
    }



    return (

<div className="LogedPage">
    <LogedNav/>
    {formOpen ? 
        <div className='form-container'>
            {formPhase == 1 ?
                <div className='step-form'>
                    <img className='process' src={step1} alt=""/>
                    <div className='step-container'>
                    <h1>Chose a Book Plan</h1>
                        <div className='step-flex'>
                            <div className='plan-card'>
                                <h2>Basic</h2>
                                <p>Get the fully written book in only a few minutes, with no effort.</p>
                            </div>
                            <div className='plan-card'>
                                <h2>Premium</h2>
                                <p>Get the fully written book in only a few minutes, with no effort.</p>

                            </div>
                            <div className='plan-card'>
                                <h2>Dostoevsky</h2>
                                <p>Get the fully written book in only a few minutes, with no effort.</p>
                            </div>
                        </div>
                        <button className='create-btn' onClick={openForm}>Next</button>
                    </div>


                    </div>
           
                : formPhase == 2 ?
                <div className='create-first'>
                    <h1>Create your first e-book</h1>
                    <p>Phase 2: Customize your book.</p>
                    <button className='create-btn' onClick={openForm}>Customize E-Book</button>
                </div> 
                :
                <div className='create-first'>
                    <h1>Create your first e-book</h1>
                    <p>Phase 3: Review and publish your book.</p>
                    <button className='create-btn' onClick={openForm}>Review and Publish</button>
                </div>
            }
        </div> 
        :
        <div className='create-first'>
            <h1>Create your first e-book</h1>
            <p>Get the fully written book in only a few minutes, with no effort.</p>
            <button className='create-btn' onClick={openForm}>Create E-Book</button>
        </div>
    }
</div>



    );
}