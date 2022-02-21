import { Dispatch } from 'react';
import { TrackAction, TrackActionTypes } from '../../types/track';
import axios from 'axios';


export const fetchTracks = () => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const response = await axios.get('http://localhost:5000/tracks')
    dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
  } catch (e) {
    dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: e.message})
  }
}

export const searchTracks = (query: string) => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const response = await axios.get('http://localhost:5000/tracks/search?query=' + query)
    dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
  } catch (e) {
    dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: e.message})
  }
}

export const deleteTrack = (id: string) => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const response = await axios.delete('http://localhost:5000/tracks/' + id)
    console.log('response', response);
    dispatch({type: TrackActionTypes.DELETE_TRACK, payload: response.data})
  } catch (e) {

  }
}