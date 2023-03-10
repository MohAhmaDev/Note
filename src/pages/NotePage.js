import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import notes from '../assets/data'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'


const NotePage = (props) => {

  let navigate = useNavigate()
  const noteId = useParams().id
  const [note, setNote] = useState([])

  const isEmpty = (obj) => Object.keys(obj).length === 0;


  useEffect(() => {
    getNotes()
  }, [noteId])


  const getNotes = async () => {
    if (!isNaN(noteId)) {
      const response = await fetch(`/api/notes/${noteId}`)
      const responseData = await response.json()
      setNote(responseData)      
    }
  }

  const updateNote = async function () {
    await fetch(`/api/notes/${noteId}/update/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...note, 'updated': new Date()})

    })
  }

  const createNote = async () => {
    await fetch(`/api/notes/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
  }

  const deleteNote = async () => {
    await fetch(`/api/notes/${noteId}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note)

    })
    navigate('/')
  }

  let handleChange = (value) => {
    setNote({...note, 'body': value})
  }

  const handleSubmit = function (e) {
    if (noteId !== "new" && !note.body){
      deleteNote()
    }
    else if(noteId !== "new") {
      updateNote()
    }
    else if(noteId === 'new' && !isEmpty(note)) {
      createNote()
    } 
    navigate('/')
  }
  // let note = notes.find(note => note.id === Number(noteId))
  console.log(note)
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to='/'>
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>
        {noteId !== 'new' ? (<button onClick={deleteNote}> Delete </button>)
        : (<button onClick={handleSubmit}> Done </button>) }
        
      </div>
      <textarea onChange={(e) => handleChange(e.target.value)} value={note?.body}> 
      
      </textarea>     
    </div>
  )
}

export default NotePage