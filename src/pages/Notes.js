import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper
} from '@material-ui/core';
import CardNote from '../components/CardNote';

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, []);

  const handleDelete = async(id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    });
    const newNote = notes.filter(note => note.id !== id);
    setNotes(newNote);
  }

  return (
    <Container>
      <Grid container spacing={3}>
        {
          notes.map(note => (
            <Grid item key={note.id} xs={12} md={6} lg={4}>
              <Paper>
                <CardNote note={note} handleDelete={handleDelete} />
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </Container>
  )
}

export default Notes;
