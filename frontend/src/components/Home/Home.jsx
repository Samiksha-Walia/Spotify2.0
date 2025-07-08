import Layout from "../../Layout/Layout";
import { FaGreaterThan, FaLessThan, FaUser  } from "react-icons/fa";
import Card from "../Card/Card";
import { Link } from "react-router-dom";
import SongBar from "../MasterBar/SongBar";
import { songs } from "../../data/songs";
import { useSelector } from "react-redux";




const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.account);
    return (
        <Layout>
            <div className="flex justify-between ml-4  py-4 rounded-[2px] mt-2 px-8 secondary_bg items-center border-b border-b-gray-50">
                <div className="flex gap-2 items-center ">
                    <FaLessThan className="bg-white/10 text-3xl p-1  rounded-[50%] " />
                    <FaGreaterThan className="bg-white/10 text-3xl p-1  rounded-[50%] " />
                </div>
                <div>
                    {!isAuthenticated ? (
                    <div>
                        <Link
                        to={"/signup"}
                        className="rounded-full  mt-4 px-8 text-base  py-2 text-white- font-semibold"
                        >
                        Sign Up
                        </Link>
        
                        <Link
                        to={"/login"}
                        className="rounded-full text-black mt-4 px-8 text-base  py-3 bg-white font-semibold"
                        >
                        Log in
                        </Link>
                    </div>
                    ) : (
                    <FaUser />
                    )}
                </div>
            </div>
            <div className="tertiary-bg mx-4 px-4 py-4 ">
                <div className="flex justify-between my-4 items-center">
                    <span className="text-xl font-bold hover:underline cursor-pointer">
                        Focus
                    </span>
                    <span>Show All</span>
                </div>
                <div className="grid  gap-6 grid-cols-5">
                    {songs.map((song,i) => {
                        return <Card key={song.id} idx={i} song={song} />;
                    })}
                </div>
                <div className="flex justify-between my-4 items-center">
                    <span className="text-xl font-bold hover:underline cursor-pointer">
                        Spotify List
                    </span>
                    <span>Show All</span>
                </div>
                <div className="grid gap-6 grid-cols-5">
                    {songs.map((song) => (
                        <Card key={`spotify-${song.id}`} song={song} />
                    ))}
                </div>
            </div>
            <SongBar />
        </Layout>
    );
};

export default Home;
