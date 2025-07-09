import Layout from "../../Layout/Layout";
import { FaGreaterThan, FaLessThan, FaUser  } from "react-icons/fa";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import SongBar from "../MasterBar/SongBar";
import { songs_mp } from "../../data/songs_mp";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { userActor } from "../../states/Actors/UserActor";
import Navbar from "../Navbar";
import { useGlobalContext } from "../../states/Context";
import Footer from "../Footer/Footer";




const Home = () => {
  //const { user, isAuthenticated } = useSelector((state) => state.account);
  const { getUser } = useGlobalContext();
  
    useEffect(() => {
      getUser();
    }, []);
    return (
        <Layout>
              <Navbar />
        
              <div className="tertiary-bg ml-2 px-4 py-4 home ">
                <div className="flex justify-between mb-4 pt-4 items-center">
                  <span className="text-xl font-bold hover:underline cursor-pointer">
                    Focus
                  </span>
                  <span>Show All</span>
                </div>
                <div className="grid  gap-6 grid-cols-5">
                  {songs_mp.map((song, i) => {
                    return <Card key={song.id} idx={i} song={song} />;
                  })}
                </div>
                <div className="flex justify-between my-4 items-center">
                  <span className="text-xl font-bold hover:underline cursor-pointer">
                    Spotify List
                  </span>
                  <span>Show All</span>
                </div>
                <div className="grid  gap-6 grid-cols-5">
                  {songs_mp.map((song, i) => {
                    return <Card key={song.id} idx={i} song={song} />;
                  })}
                </div>
              </div>
              <Footer/>
              <SongBar />
            </Layout>
    );
};

export default Home;
