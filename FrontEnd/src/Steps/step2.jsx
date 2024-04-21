import {LogedNav} from '../LogedPage/LogedNav'
import step2 from '../assets/step2.png'
import './step2.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Step2(){

    const navigate = useNavigate();
    const location = useLocation();
    const plan = location.state.plan;
    const email = location.state.email;
    console.log(email)

    const [aiChecked, setAiChecked] = useState(true);
    const [customChecked, setCustomChecked] = useState(false);

    const [bookName, setBookName] = useState('');
    const [bookDesc, setBookDesc] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookLang, setBookLang] = useState('english');

    const [nextBtn, setNextBtn] = useState('next-btn');
    const [showAdvanced, setShowAdvanced] = useState(false);

    const [chapterNum, setChapterNum] = useState(5);
    const [chapterDescriptions, setChapterDescriptions] = useState([]);
const [chapterLengths, setChapterLengths] = useState([]);
const [chapterNames, setChapterNames] = useState([]);


    const [tempChapterNum, setTempChapterNum] = useState(chapterNum);
    const [clickedChapter, setClickedChapter] = useState(null);



    useEffect(() => {
        if(bookName !== '' && bookDesc !== '' && bookAuthor !== '') {
            setNextBtn('next-btn able')
        }
          
    }, [bookName, bookDesc, bookAuthor]);



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
        navigate('/logedPage/step1', {state: {email: email}});
    }

    const nextPage = () => {
        if(bookName !== '' && bookDesc !== '' && bookAuthor !== ''){
            navigate('/logedPage/step3', {state: {plan: plan, bookName: bookName, bookDesc: bookDesc, bookAuthor: bookAuthor, bookLang: bookLang, page: page,email: email, chapterNum: chapterNum, chapterDescriptions: chapterDescriptions, chapterLengths: chapterLengths,chapterNames: chapterNames}});
        }
    }

    const showAdvancedFuncrion = (e) => {
        if(e.target.value === 'custom'){
            setShowAdvanced(true);
        } else {
            setShowAdvanced(false);
        }
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
                                    <input type="text" name='book-name' onChange={(e) => setBookName(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="book-desc">Book Description</label>
                                    <textarea name="book-desc" onChange={(e) => setBookDesc(e.target.value)}></textarea>
                                </div>
                                <div>
                                    <label htmlFor="book-author">Author</label>
                                    <input type="text" name='book-author' onChange={(e) => setBookAuthor(e.target.value)} />
                                </div>
                               {/* give me option picker for languages, make it english, russian,spanish, portugese and french */}
                               <div>
    <label htmlFor="book-lang">Language</label>
    <select name='book-lang' >
        <option value="english">English</option>
        <option value="russian">Russian</option>
        <option value="spanish">Spanish</option>
        <option value="portuguese">Portuguese</option>
        <option value="french">French</option>
    </select>
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
                                    <label htmlFor="book-pages">Pages</label>
                                    <input className='page-slider' type='range' name='book-pages' min={1} max={maxRange} value={page} onChange={(e) => setPage(e.target.value)} />
                                    <p>{page}</p>
                                </div>
                                <div>
                                    {/* 2 radio buttons for ai cover or not */}

                                    <div className='radio-btns'>
                                        <div>
                                        <label htmlFor="ai">AI Cover</label>
                                            <input type="radio" name='cover' value='ai' required checked={aiChecked} onClick={() => {setAiChecked(true); setCustomChecked(false)}}/>
                                        </div>
                                        <div>
                                        <label htmlFor="custom">Custom Cover</label>
                                            <input type="radio" name='cover' value='custom' required onClick={() => {setAiChecked(false); setCustomChecked(true)}}/>
                                        </div>
                                    </div>
                                    {customChecked ?
                                              <input type="file" name='book-cover' required/>
                                              : null
                                    }
                          
                                </div>
                                <div>
                                   <label htmlFor="font">Font</label>
                                   <select name='font' required>
    <option value="Arial" style={{ fontFamily: 'Arial' }}>Arial</option>
    <option value="Times New Roman" style={{ fontFamily: 'Times New Roman' }}>Times New Roman</option>
    <option value="Verdana" style={{ fontFamily: 'Verdana' }}>Verdana</option>
    <option value="Georgia" style={{ fontFamily: 'Georgia' }}>Georgia</option>
    <option value="Courier New" style={{ fontFamily: 'Courier New' }}>Courier New</option>
</select>
                           
                                </div>
                                </div>
                            </div>
                            <div className='top-inputs n-first'>
    <div className='text-part'>
        <h2>Advanced</h2>
        <p>Here you can add some advanced options.</p>
    </div>
    <div className='input-part'>
        <div>
            <label htmlFor="advanced">Customization</label>
            <select name="advanced" onChange={(e) => showAdvancedFuncrion(e) }>
                <option value="none" >None</option>
                <option value="custom" >Custom</option>
            </select>
        </div>
        {showAdvanced ?
            <div>
<label htmlFor="chapters">Chapters</label>
<input type="number" name='chapters' className='chapter-num' value={tempChapterNum} step="1" onChange={(e) => {
    setTempChapterNum(e.target.value);
}} onBlur={(e) => {
    const newChapterNum = e.target.value;
    setChapterNum(newChapterNum);
    if (newChapterNum > chapterNames.length) {
        setChapterNames(oldChapterNames => [...oldChapterNames, ...new Array(newChapterNum - oldChapterNames.length).fill('')]);
    } else {
        setChapterNames(oldChapterNames => oldChapterNames.slice(0, newChapterNum));
    }
}} />

{(() => {
    const elements = [];
    for (let i = 0; i < chapterNum; i++) {
        elements.push(


            <div key={i} className='chapter-show' onClick={() => setClickedChapter(clickedChapter === i ? null : i)}>
                {clickedChapter === i ?
                <svg className='arrow-up' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-up</title><path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" /></svg>
                 : 
                 <svg className='arrow-down' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>chevron-down</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg> 
                }
            <p>Chapter {i}</p>
            <div className={`under-chapter ${clickedChapter === i ? 'clicked' : ''}`}>
                <label htmlFor={`chapter-${i+1}`}>Chapter Name</label>
                <input type="text" className='chapter-name' name={`chapter-${i+1}`} value={chapterNames[i] || ''}  onClick={(e) => e.stopPropagation()} onChange={(e) => {
                    const newChapterNames = [...chapterNames];
                    newChapterNames[i] = e.target.value;
                    setChapterNames(newChapterNames);
                }} />
        
                <label htmlFor={`description-${i+1}`}>Chapter Description</label>
                <textarea className='chapter-description' name={`description-${i+1}`} value={chapterDescriptions[i] || ''}  onClick={(e) => e.stopPropagation()} onChange={(e) => {
                    const newChapterDescriptions = [...chapterDescriptions];
                    newChapterDescriptions[i] = e.target.value;
                    setChapterDescriptions(newChapterDescriptions);
                }} />
        
                <label htmlFor={`length-${i+1}`}>Chapter Length</label>
                <input type="range" className='page-slider' name={`length-${i+1}`} value={chapterLengths[i] || 0} min={1} max={page - chapterLengths.filter((_, index) => index !== i).reduce((a, b) => a + b, 0)} onClick={(e) => e.stopPropagation()} onChange={(e) => {
                    const newChapterLengths = [...chapterLengths];
                    newChapterLengths[i] = parseInt(e.target.value, 10);
                    setChapterLengths(newChapterLengths);
                }} />
                <p>{chapterLengths[i] || 0}</p>
            </div>
        </div>
        );
    }
    return elements;
})()}
</div>
        : null}
    </div>
</div>
                    </div>


                        <a className={nextBtn}  onClick={() => nextPage()}>Next</a>
                    </div>
                    </div>
                    </div>
    </div>
    )
}