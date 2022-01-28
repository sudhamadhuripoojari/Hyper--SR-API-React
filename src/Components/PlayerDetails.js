const PlayerDetails = (props) => {
    return ( 
        <div className="player-details">
            <div className="details-img">
                <img src={props.song.img_src} alt="album-image" />
            </div>
            <h3 className="details-title"> Channel {props.song.title}</h3>            
        </div>
     );
}
 
export default PlayerDetails;