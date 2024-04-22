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

    const [popup, setPopup] = useState(false);
    const [clickedIndex, setClickedIndex] = useState(0);

    const [removePopup, setRemovePopup] = useState(false);






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

const purchase = async (index,email) => {
    let bookPlan;

    if(books[index].plan === 'Basic'){
        bookPlan = '347098'
    } else if(books[index].plan === 'Premium'){
        bookPlan = '347102'
    }
    else {
        bookPlan = '347103'
    }

    try {

        console.log(email, index, bookPlan)
        const response = await axios.post('http://localhost:3000/api/purchaseTry', {
            email: email,
            number: index,
            productID: bookPlan,
            pageLength: books[index].page,
            description: books[index].bookDesc,
            author: books[index].bookAuthor,
     }) 

     window.open(response.data.checkoutUrl, '_blank')
    } catch (error) {
        console.log(error);
    }


}

const deleteBook = async (e,index) => {
    e.preventDefault();

 
       await axios.put('http://localhost:3000/deleteBook', {
            email: email,
            number: index
 

    })
    .then(res => {
        window.location.reload();
    
    })
    .catch(err => {
        console.log(err)
    })
}

const unpaidClick = (index) => {
    axios.post('http://localhost:3000/getBooks', {
        email: email
    })
    .then(res => {
        if(res.data.books[index].bookStatus === 'unpaid'){
            purchase(index,email)
        } else {
            window.location.reload();
        }

    })
    .catch(err => {
        console.log(err)
    })



}



    return (

<div className="LogedPage">
    <LogedNav/>
 
        {removePopup ? 
        <div className="remove-popup" onClick={() => setRemovePopup(false)}>
        <div className="remove-popup-inner" onClick={(e) => e.stopPropagation()}>
            <a href="#" className='close-popup' onClick={(e) => {e.preventDefault(); setRemovePopup(false)}}>x</a>
            <div className='remove-popup-text'>
                <div className='icon'>
                    <h2>!</h2>
                </div>
                <div className='just-text'>
                    <h3>Delete Book</h3>
                    <p>Are you sure you want to delete this book. You won't be able to access this book. This action is irrevirsable.</p>
                </div>
            </div>
                <div className='btns'>
                <a href="#" className='cancle' onClick={(e) => {e.preventDefault(); setRemovePopup(false)}}>Cancle</a>
                <a href="#" className='delete' onClick={(e) => {deleteBook(e, clickedIndex); setRemovePopup(false)}}>Delete</a>
                </div>

        </div>
    </div>
    :
    null          
        
    }

    {popup ?
 <div className="popup" onClick={() => setPopup(false)}>
        <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
            <a href="#" className='close-popup' onClick={(e) => {e.preventDefault(); setPopup(false)}}>x</a>
            <div className='book-flex'>
                <div className="book-flex-wrapper">
                    <div className='left-flex'>
                        <h1>Book Info</h1>
                        <p>Here is all info about your book</p>
                    </div>
                    <div className='right-flex'>
                        <div>
                            <label htmlFor="book-name">Book Name</label>
                            <input type="text" id='book-name' value={books[clickedIndex].bookName} disabled/>
                        </div>
                        <div>
                            <label htmlFor="book-author">Book Author</label>
                            <input type="text" id='book-author' value={books[clickedIndex].bookAuthor} disabled/>
                            </div>
                        <div>
                            <label htmlFor="book-lang">Book Language</label>
                            <input type="text" id='book-lang' value={books[clickedIndex].bookLang} disabled/>
                            </div>
                        <div>
                            <label htmlFor="book-page">Book Page</label>
                            <input type="text" id='book-page' value={books[clickedIndex].page} disabled/>
                            </div>
                        <div>
                            <label htmlFor="book-plan">Book Plan</label>
                            <input type="text" id='book-plan' value={books[clickedIndex].plan} disabled/>
                            </div>
                        <div>
                            <label htmlFor="book-desc">Book Description</label>
                            <textarea id='book-desc' value={books[clickedIndex].bookDesc} disabled/>
                            </div>
                            



                    </div>
                </div>

            </div>
            <div className='down-bar'>
                {books[clickedIndex].bookStatus === 'unpaid' ? <a href='#' className='purchase-btn' onClick={(e) => {purchase(clickedIndex,email); e.preventDefault()}}>Purchase</a> : <a href='#' onClick={(e) => e.preventDefault()} className='download-btn'>Download</a>
                }
                <a href="#" className='delete-btn' onClick={(e) => {e.preventDefault(); setRemovePopup(true)}}>Delete</a>
            </div>
            
        </div>
    </div>
    : null
}

        {books.length > 0 ?
        <div className='books-part'>
            <div className='create-book' onClick={() => navigate('/logedPage/step1', {state: {email: email}}) }>
                <p>Create Book</p>
                <p className='plus'>+</p>
            </div>

            <div className="all-books">
                {books.map((book, index) => (
                    <div className='book-card' key={index} onClick={(e) => {
                        if (!['unpaid', 'paid'].includes(e.target.className)) {
                            setClickedIndex(index);
                            setPopup(true);
                        }
                    }}>
                        <p className='book-name'>{book.bookName}</p>
                        {book.bookStatus === 'unpaid' ? <p className='unpaid' onClick={() => unpaidClick(index)}>Unpaid</p> : <p className='paid'>Download</p>}
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