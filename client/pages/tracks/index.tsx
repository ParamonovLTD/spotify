import MainLayout from '../../layouts/MainLayout';
import { Box, Button, Card, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/track';
import TrackList from '../../components/TrackList';
import React, { memo, useState } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/action-creators/track';
import { useDispatch } from 'react-redux';

const Tracks = () => {
  const router = useRouter()
  const dispatch = useDispatch() as NextThunkDispatch

  const { tracks, error } = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const [timer, setTimer] = useState(null)

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value))
      }, 500)
    )

  }

  if (error) {
    return (
      <MainLayout>
        <h1>error</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title='Список треков'>
      <Grid container justifyContent='center'>
        <Card style={{ width: '900px' }}>
          <Box p={3}>
            <Grid container justifyContent='space-between'>
              <h1>Список треков</h1>
              <Button onClick={() => router.push('/tracks/create')}>
                Загрузить
              </Button>
            </Grid>
          </Box>

          <TextField
            fullWidth
            value={query}
            onChange={search}
          />
          <TrackList tracks={tracks}/>
        </Card>
      </Grid>
    </MainLayout>
  );
};

export default memo(Tracks);

export const getServerSideProps = wrapper.getServerSideProps( store => async context => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(await fetchTracks())
  return {
    props: {

    }
  }
})