import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  field: {
    marginTop: '20px',
    marginBottom: '20px',
    display: 'block'
  }
});

const Create = () => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if(title === '') {
      setTitleError(true);
    }

    if(details === '') {
      setDetailsError(true);
    }

    if(title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({title, details, category})
      }).then(() => history('/'))
    }
  }

  return (
    <Container>
      <Typography variant='h6' component='h2' color='textSecondary' gutterBottom>Create a New Note</Typography>
      <form noValidate autoComplete='false' onSubmit={handleSubmit}>
        <TextField
          onChange={e => setTitle(e.target.value)}
          label='Note Title'
          variant='outlined'
          className={classes.field}
          color='secondary'
          fullWidth
          required
          error={titleError}
        />
        <TextField
          onChange={e => setDetails(e.target.value)}
          label='Details'
          variant='outlined'
          className={classes.field}
          color='secondary'
          fullWidth
          required
          multiline
          minRows={4}
          error={detailsError}
        />
        <FormControl component="fieldset" className={classes.field}>
          <FormLabel color='secondary' component='legend'>Note Category</FormLabel>
          <RadioGroup aria-label='category' name='category' value={category} onChange={e => setCategory(e.target.value)}>
            <FormControlLabel value='money' control={<Radio/>} label='Money' />
            <FormControlLabel value='todos' control={<Radio/>} label='Todos' />
            <FormControlLabel value='reminders' control={<Radio/>} label='Reminders' />
            <FormControlLabel value='work' control={<Radio/>} label='Work' />
          </RadioGroup>
        </FormControl>
        <Button type='submit' variant= 'contained' color='secondary' endIcon={<KeyboardArrowRightIcon/>}>Create</Button>
      </form>
    </Container>
  )
}

export default Create;
