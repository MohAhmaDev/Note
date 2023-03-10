import React, { useEffect, useState } from 'react'
import AddButton from '../components/AddButton'
// import notes from '../assets/data'
import ListItem from '../components/ListItem'


const NotesListPage = () => {


  const [notes, setNotes] = useState([])

  useEffect(() => {
    const fetchNote = async () => {
      const result = await fetch('/api/notes/',)

      if (result.ok) {
        return result.json()  
      }
      throw new Error("sorry Impossible to connect on server")
    }
    fetchNote().then(r => setNotes(r))
  }, [])
  return (
    <div className='notes'>
      <div className='notes-header'> 
        <h2 className='notes-title'> &#9782; Notes </h2>
        <p className='notes-count'> {notes.length} </p>
      </div>
      <div className='notes-list'>
          {notes.map((note, index) => 
            <ListItem key={index} note={note}/>
          )}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPage;