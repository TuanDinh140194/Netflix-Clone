import React, { useState, useEffect, useRef } from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { TbBoxMultiple } from "react-icons/tb";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [isEpisodeMenuOpen, setIsEpisodeMenuOpen] = useState(false); // State to control the episode menu
  const episodeButtonRef = useRef(null);

  const handleEpisodeSelect = (episodeIndex: number) => {
    setSelectedEpisode(episodeIndex);
    // setIsEpisodeMenuOpen(false); // Close the episode menu
  };

  // Close the episode menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isEpisodeMenuOpen && episodeButtonRef.current) {
        setIsEpisodeMenuOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isEpisodeMenuOpen]);

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
        <p className="text-white text-1xl md:text-3xl font-bold hidden sm:block">
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
      </div>
      {data && data.movieUrl.length > 1 && (
        <div>
          <div className="absolute top-4 right-20 bg-gray-600  text-white p-2 bg-opacity-50 rounded mx-4 z-20 hidden lg:block">
            Episode {selectedEpisode + 1} / {data?.movieUrl.length}
          </div>
          <button
            onMouseEnter={() => setIsEpisodeMenuOpen(true)}
           
            ref={episodeButtonRef}
            className="absolute top-4 right-10 text-white px-4 py-2 rounded z-20 md:px-0"
          >
            <TbBoxMultiple className="hover:scale-125" size={25} />
            <span>
              {isEpisodeMenuOpen && (
                <div className="absolute top-8 right-4 bg-gray-600 bg-opacity-40 mt-4 w-40 rounded z-20">
                  {data?.movieUrl.map((url: string, index: number) => (
                    <div
                      key={index}
                      onClick={() => handleEpisodeSelect(index)}
                      className={`cursor-pointer px-6 py-2 ${
                        selectedEpisode === index ? "font-bold bg-black" : ""
                      } hover:bg-gray-500`}
                    >
                      Episode {index + 1}
                    </div>
                  ))}
                </div>
              )}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Watch;
