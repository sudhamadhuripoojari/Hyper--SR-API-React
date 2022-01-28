import {useState, useEffect} from 'react';
import Player from './Components/Player';


function App() {

const [currentSongIndex, setCurrentSongIndex]= useState(0);
const [nextSongIndex, setNextSongIndex]= useState(0);
const [channelList, setChannelList]= useState([]);
const [songs, setSongs]= useState([]);

let fetchUrl = "https://api.sr.se/api/v2/channels?format=json&indent=true&pagination=false";

useEffect(()=>{ 
  fetch (fetchUrl)
  .then(res => res.json())
  .then(data => {
    setChannelList(data.channels);  
  })  
  
}, []);

console.log("channelList", channelList)


useEffect(()=>{
  setSongs(()=>{
    let songsList = [];
    channelList.map((channel)=>{
      const songInfo = new Object();
      songInfo.title = channel.liveaudio.id;
      songInfo.src = channel.liveaudio.url;
      songInfo.img_src = channel.image;

      songsList.push(songInfo);

     });
     return songsList;
  });

},[channelList]);

useEffect(()=>{
  setNextSongIndex(()=>{
    if (currentSongIndex+1 >songs.length-1){
      return 0;
    }
    else{
      return currentSongIndex +1;
    }
  });
},[currentSongIndex]);


  return (
    <div className="App">
     { songs.length > 0 ?
      <Player 
      currentSongIndex={currentSongIndex}
      setCurrentSongIndex={setCurrentSongIndex}
      nextSongIndex={nextSongIndex}
      songs={songs} 
     />
     : <p>Loading...</p>
     }
    </div>
  );
}

export default App;
