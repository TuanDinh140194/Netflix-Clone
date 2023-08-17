import React, { useState } from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  const [selectedEpisode, setSelectedEpisode] = useState(0);

  const nextEpisode = () => {
    setSelectedEpisode((prevEpisode) => prevEpisode + 1);
  };

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className="
            fixed
            w-full
            p-4
            z-10
            flex
            flex-row
            items-center
            gap-8
            bg-black
            bg-opacity-70"
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light mr-2">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <div className="relative">
        <video
          autoPlay
          controls
          className="h-full w-full"
          src={data?.movieUrl[selectedEpisode]}
        ></video>
        <div className="absolute top-4 right-40 bg-white p-2 bg-opacity-50 rounded mx-4 z-20">
          Episode {selectedEpisode + 1} / {data?.movieUrl.length}
        </div>
      </div>
      {data && selectedEpisode < data.movieUrl.length - 1 && (
        <button
          onClick={nextEpisode}
          className="absolute top-4 right-4 bg-white bg-opacity-50 hover:bg-white px-4 py-2 rounded z-20"
        >
          Next Episode
        </button>
      )}
    </div>
  );
};

export default Watch;
