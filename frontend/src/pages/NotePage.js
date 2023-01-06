import React, {useState , useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router-dom'
const NotePage = () => {

    const navigate = useNavigate();
    const params = useParams();
    let noteId = params.id
    let [note, setNote] = useState(null)

    useEffect(() => {
        getNote()
        updateNote()
    },[noteId])

    let getNote = async () => {
        if(noteId==="new") return
        let responce =await fetch(`/api/notes/${noteId}/`)
        let data = await responce.json()
        setNote(data)
    }

    let updateNote = async () => {
        if(noteId==="new") return
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let createNote = async () => {
        console.log("reached")
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        
    }

    let deleteNote = async () => {
        
        fetch(`/api/notes/${noteId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
           
        })
        navigate(-1)
    }

    let handleSubmit = () => {
        // console.log('NOTE:', note)
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        }
         else if (noteId === 'new' && note.body !== null) {
            createNote()
        }
        else if(noteId === 'new'){
            navigate(-1)   
        }
        // updateNote()
        navigate(-1)
    }

    let handleChange = (value) => {
        // console.log(value)
        setNote(note => ({ ...note, 'body': value }))
        // console.log('Handle Change:', note)
        

    }
    
  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
            {/* <Link to='/'> */}
            <ArrowLeft onClick={handleSubmit} />
            </h3>
            {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
            {/* </Link> */}

        </div>
      <textarea onChange={(e) => { handleChange(e.target.value)}} value={note?.body}>
        
      </textarea>
    </div>
  )
}

export default NotePage
