import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { userActor } from "./Actors/UserActor";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currTime, setCurrTime] = useState("00:00");
    const [duration, setDuration] = useState("00:00");
    const [progress, setProgress] = useState(0);
    const [songIdx, setSongIdx] = useState(0);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState([]);
    const dispatch = useDispatch();
    const resetEverything = () => {
        setProgress(0);
        setCurrTime("00:00");
        setDuration("00:00");
        //setSongIdx((prevstate) => prevstate + 1);
    };

    const getUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch("http://localhost:5000/api/user/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                token,
            },
            });

            const data = await res.json();

            if (data.success) {
                dispatch(userActor(data.user));
            } else {
                toast.warn(data.message || "Session expired. Please login again.");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }catch (err) {
                console.error("Error fetching user:", err);
                toast.error("An unexpected error occurred");
            }
        };
    return (
        <AppContext.Provider
            value={{
                currTime,
                setCurrTime,
                duration,
                setDuration,
                progress,
                setProgress,
                resetEverything,
                songIdx,
                setSongIdx,
                getUser,
                filteredSongs,
                setFilteredSongs,
                currentPlaylist,
                setCurrentPlaylist,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};
