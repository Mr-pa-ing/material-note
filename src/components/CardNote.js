import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DeleteOutline } from '@material-ui/icons';
import { green, pink, red, yellow } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    background: (note) => {
      if(note.category == 'work') {
        return red[400];
      }
      if(note.category == 'todos') {
        return yellow[800];
      }
      if(note.category == 'reminders') {
        return green[600];
      }
      if(note.category == 'money') {
        return pink[700];
      }
    }
  }
})

const CardNote = ({note, handleDelete}) => {
  const classes = useStyles(note);

  return (
    <Card elevation={2} className={classes.test}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {note.category[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton onClick={() => {handleDelete(note.id)}}>
            <DeleteOutline />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary'>{note.details}</Typography>
      </CardContent>
    </Card>
  )
}

export default CardNote;
