import {LogedNav} from '../LogedPage/LogedNav'
import step3 from '../assets/step3.png';
import './step3.css';
import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Step3() {

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state.email;


    const plan = location.state.plan;
    const bookName = location.state.bookName;
    const bookDesc = location.state.bookDesc;
    const bookAuthor = location.state.bookAuthor;
    const bookLang = location.state.bookLang;
    const page = location.state.page;

    const [productID, setProductID] = useState('');

    useEffect(() => {
        if(plan === 'Basic'){
            setProductID("347098")
        } else if(plan === 'Premium'){
            setProductID("347102")
        } else {
            setProductID("347103")
        }
    }, [plan]);



    const goBack = () => {
        navigate('/logedPage/step2', {state: {plan: plan, bookName: bookName, bookDesc: bookDesc, bookAuthor: bookAuthor, bookLang: bookLang, page: page, email:email}});
    }



    const purchase = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3000/purchaseBook', {
                storeID: productID,
                email: email
            });
    
    
    
            window.open(response.data.checkoutUrl, '_blank')
        }catch(error){
            console.log(error);
        
        }
      }


    return (
        <div className='step1'>
        <LogedNav/>
                <div className='form-container'>
                <div className='step-form'>
                    <img className='process' src={step3} alt=""/>
                    <div className='step-container'>
                    <svg className='back-arrow' onClick={() => goBack()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>arrow-left-thin</title><path d="M10.05 16.94V12.94H18.97L19 10.93H10.05V6.94L5.05 11.94Z" /></svg>
                    <h1>Finish up</h1>
                    <div className='step-flex'>
                            <p>{plan}</p>
                            <p>{bookName}</p>
                            <p>{bookDesc}</p>
                            <p>{bookAuthor}</p>
                            <p>{bookLang}</p>
                            <p>{page}</p>
                        </div>
                        <a href="#" className="next-btn able" onClick={(e) => purchase(e)} >Purchase</a>
                    </div>
                    </div>
                    </div>
    </div>
    )
}