import { useLocation,useNavigate } from 'react-router-dom';
import './LogedPage.css';
import { LogedNav } from './LogedNav';
import { useState, useEffect } from 'react';
import step1 from '../assets/step1.png';
import axios from 'axios';


export function LogedPage() {


    const location = useLocation();
    const navigate = useNavigate();

    const [formOpen, setFormOpen] = useState(false);
    const [formPhase, setFormPhase] = useState(1);

    const [books, setBooks] = useState('');






    let email;
    if(location.state == null){
        window.location.href = '/login';  
    } else{
        email = location.state.email;
    }

    const openForm = () => {
        setFormOpen(true);
    }

    const getBookNumber = async () => {
  
        await axios.post('http://localhost:3000/getBooks', {
           email: email

})
.then(res =>{
   console.log(res.data.books)
   setBooks(res.data.books)
})
}

useEffect(() => {
getBookNumber();
}, []); 



    return (

<div className="LogedPage">
    <LogedNav/>
 

        {books.length > 0 ?
        <div className='books-part'>
            <div className='create-book' onClick={() => navigate('/logedPage/step1', {state: {email: email}}) }>
                <p>Create Book</p>
                <p className='plus'>+</p>
            </div>

            <div className="all-books">
                {books.map((book, index) => (
                    <div className='book-card' key={index}>
                        <p className='book-name'>{book.bookName}</p>
                        {book.bookStatus === 'unpaid' ? <p className='unpaid'>Unpaid</p> : <p className='paid'>Download</p>}

                    </div>
                ))}
            </div>


        </div>
        :
        <div className='create-first'>
            <h1>Create your first e-book</h1>
            <p>Get the fully written book in only a few minutes, with no effort.</p>
            <button className='create-btn' onClick={() => navigate('/logedPage/step1', {state: {email: email}}) }>Create E-Book</button>
        </div>
        }

    
</div>



    );
}