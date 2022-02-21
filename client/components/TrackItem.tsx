import React from 'react';
import { ITrack } from '../types/track';
import { Card, Grid, IconButton } from '@mui/material';
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';
import { deleteTrack } from '../store/action-creators/track';
import { NextThunkDispatch } from '../store';
import { useDispatch } from 'react-redux';

interface TrackItemProps {
  track: ITrack;
  isActive?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, isActive= false }) => {
  const router = useRouter()
  const dispatch = useDispatch() as NextThunkDispatch
  const { playTrack, pauseTrack, setActiveTrack,  } = useActions()

  const play = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveTrack(track)
    playTrack()
  }

  const deleteTrackHandler = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await dispatch(await deleteTrack(track._id))
  }
  
  return (
    <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={(e: React.MouseEvent) => play(e)}>
        {isActive
          ? <Pause />
          : <PlayArrow />
        }
      </IconButton>
      <img width={70} height={70} src={'http://localhost:5000/' + track.picture} alt='track picture' />
      <Grid container direction='column' style={{width: '200px', margin: '0 20px'}}>
        <div>{track.name}</div>
        <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
      </Grid>
      {isActive && <div>02:42 / 03:22</div>}
      <IconButton onClick={(e: React.MouseEvent) => deleteTrackHandler(e)} style={{marginLeft: 'auto'}}>
        <Delete />
      </IconButton>
    </Card>
  );
};

export default TrackItem;