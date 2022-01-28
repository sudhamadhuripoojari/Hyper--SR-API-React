import React, {useState, useRef, useEffect} from 'react'
import PlayerControls from './PlayerControls';
import PlayerDetails from './PlayerDetails';

function Player(props) {
    const audioEl = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    //console.log(" props.songs ", props.songs);

    useEffect(() => {
        if (isPlaying) {
            audioEl.current.play();
        } else {
            audioEl.current.pause();
        }
    });


    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;

                if (temp > props.songs.length - 1) {
                    temp = 0;
                }

                return temp;
            });
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;

                if (temp < 0) {
                    temp = props.songs.length - 1;
                }

                return temp;
            });
        }
    }

    return (
        <div className="player">
            <audio src={props.songs[props.currentSongIndex].src} ref={audioEl}></audio>
            <h4>Radio Player</h4>
            <PlayerDetails song={props.songs[props.currentSongIndex]} />
            <PlayerControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} SkipSong={SkipSong} />
            <p>Next up: <span>{props.songs[props.nextSongIndex].title}</span></p>
        </div>
    )
}

export default Player;