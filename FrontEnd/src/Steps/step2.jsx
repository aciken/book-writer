import {LogedNav} from '../LogedPage/LogedNav'
import step2 from '../assets/step2.png'
import './step1.css'

export function Step2(){
    return(
        <div className='step1'>
        <LogedNav/>
                <div className='form-container'>
                <div className='step-form'>
                    <img className='process' src={step2} alt=""/>
                    <div className='step-container'>
                    <h1>Chose a Book Plan</h1>

                        <button className='next-btn' >Next</button>
                    </div>
                    </div>
                    </div>
    </div>
    )
}