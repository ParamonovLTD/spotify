import React from 'react';
import { getTrackCurrentTime } from '../utils/getTrackTime';

interface TrackProgressProps {
  left: number;
  right: number;
  onChange: (e) => void
  isTime?: boolean
  onMouseDown?: (e) => void
  onMouseUp?: (e) => void
}

const TrackProgress: React.FC<TrackProgressProps> =
  ({
    left, right, onChange, isTime, onMouseDown, onMouseUp
   }) => {

  return (
    <div style={{display: 'flex'}}>
      <input
        type='range'
        min={0}
        max={right}
        value={left}
        onChange={onChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
      <div style={{width: 80, marginRight: '20px', textAlign: 'right'}}>
        {isTime
          ? `${getTrackCurrentTime(left)} / ${Math.floor(right / 60)}:${right % 60}`
          : `${left} / ${right}`
        }
      </div>
    </div>
  );
};

export default TrackProgress;