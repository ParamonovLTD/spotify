import React, { memo, useState } from 'react';
import { IComment, ITrack } from '../../types/track';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';
import { comment } from 'postcss';

interface TrackPageProps {
  serverTrack: ITrack;
}

const TrackPage: React.FC<TrackPageProps> = ({serverTrack}) => {
  const [track, setTrack] = useState<ITrack>(serverTrack)
  const router = useRouter()
  const username = useInput('')
  const text = useInput('')

  const addComment = async () => {
    try {
      const res = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      })
      setTrack({...track, comments: [...track.comments, res.data]})

    } catch (e) {
      console.log(e);
    }

  }

  return (
    <MainLayout title={'Spotify - ' + track.name + ' - ' + track.artist}>
      <Button
        variant='outlined'
        style={{fontSize: '32px'}}
        onClick={() => router.push('/tracks')}
      >
        К списку
      </Button>
      <Grid container style={{margin: '20px 0'}}>
        <img src={'http://localhost:5000/' + track.picture} width={200} height={200} alt='Track picture' />
        <div style={{margin: '0 30px'}}>
          <h1>Название - {track.name}</h1>
          <h1>Исполнитель - {track.artist}</h1>
          <h1>Количество прослушиваний - {track.listens}</h1>
        </div>
      </Grid>

      <h1>Слова песни</h1>
      <p>{track.text}</p>

      <h1>Комментарии</h1>
      <Grid container>
        <TextField
          {...username}
          label='Ваше имя'
          fullWidth
        />
        <TextField
          {...text}
          label='Комментарий'
          fullWidth
          multiline
          rows={4}
        />
        <Button onClick={addComment}>Отправить</Button>
      </Grid>

      <div>
        {track.comments.map(comment => (
          <div style={{ marginBottom: 20 }} key={comment._id}>
            <div>Автор - {comment.username}</div>
            <div>Комментарий - {comment.text}</div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default memo(TrackPage);


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const res = await axios.get('http://localhost:5000/tracks/' + params.id)

  return {
    props: {
      serverTrack: res.data
    }
  }
}