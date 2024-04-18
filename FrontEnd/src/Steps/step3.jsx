import {LogedNav} from '../LogedPage/LogedNav'
import step3 from '../assets/step3.png';
import './step3.css';
import { useNavigate,useLocation } from 'react-router-dom';

export function Step3() {

    const location = useLocation();
    const navigate = useNavigate();

    const plan = location.state.plan;
    const bookName = location.state.bookName;
    const bookDesc = location.state.bookDesc;
    const bookAuthor = location.state.bookAuthor;
    const bookLang = location.state.bookLang;
    const page = location.state.page;

    
    return (
        <div className='step1'>
        <LogedNav/>
                <div className='form-container'>
                <div className='step-form'>
                    <img className='process' src={step3} alt=""/>
                    <div className='step-container'>
                    <h1>Finish up</h1>
                    <div className='step-flex'>
                            <p>{plan}</p>
                            <p>{bookName}</p>
                            <p>{bookDesc}</p>
                            <p>{bookAuthor}</p>
                            <p>{bookLang}</p>
                            <p>{page}</p>
                            
                            

                        </div>
                        <a href="#" className="next-btn" >Next</a>
                    </div>
                    </div>
                    </div>
    </div>
    )
}