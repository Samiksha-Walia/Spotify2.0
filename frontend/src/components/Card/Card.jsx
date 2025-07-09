import React from "react";
import "./Card.css";
import { FaPause,FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { pauseSong, playSong } from "../../states/Actors/SongActor";
import { useGlobalContext } from "../../states/Context";
import cardImg from '../../assets/card.png';
import ArijitImage from "../../assets/Arijit.jpeg";



const Card = ({song, idx}) => {
    if (!song) return null;
    const { masterSong, isPlaying } = useSelector((state) => state.mainSong);
    const {resetEverything,setSongIdx} = useGlobalContext();
    const dispatch = useDispatch();

    const handlePlay = (song) => {
        console.log("playing");
        setSongIdx(idx)
        console.log(idx)
        if (isPlaying) {
            masterSong.mp3.currentTime = 0;
            masterSong.mp3.pause();
            resetEverything();
        }
        dispatch(playSong(song));
    };
    const handlePause = () => {
        dispatch(pauseSong());
    };
    return (
        song && (
        <div className="secondary-bg  rounded-lg">
        <div className="card col-span-1 p-4 rounded-lg">
            <div className="relative overflow-hidden rounded-lg">
                <img src={song.img} className="h-40 w-full object-cover rounded-lg" alt="no image" />
                {masterSong.id === song.id && isPlaying ? (
                    <button
                        onClick={handlePause}
                        className="flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3"
                    >
                        <FaPause className="text-black text-xl" />
                    </button>
                ) : (
                    <button
                        onClick={() => handlePlay(song)}
                        className="flex items-center play_btn absolute bottom-0 right-0 rounded-[50%] bg-green-500 justify-center p-3"
                    >
                        <FaPlay className="text-black text-xl" />
                    </button>
                )}
            </div>

            <h3 className="text-sm font-semibold my-2">{song.artist}</h3>
                <p className="text-xs text-gray-400 leading-4">
                    {song.title} - {song.artist}
                </p>
        </div>
        </div>
        )
    );
};

export default Card;
