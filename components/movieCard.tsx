import React, { useCallback, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import FavoriteButton from "./favoriteButton";
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";
interface MovieCardProps {
  data: Record<string, any>;
  index: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, index }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  const handleCardClick = () => {
    if (window.innerWidth <= 820) {
      openModal(data?.id);
    }
  };

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        onClick={handleCardClick}
        className="
                cursor-pointer
                object-cover
                transition
                duration
                shadow-2xl
                rounded-md
                group-hover: opacity-90
                sm: group-hover:opacity-0
                xs:h-[30vw]
                delay-300
                w-full
                h-[10vw]
                "
        src={data?.thumbnailUrl}
        alt="Thumbnail"
      />
      <div
        className={`
                opacity-0 
                absolute
                top-0
                transition
                duration-200
                z-30
                invisible
                sm:visible
                delay-300
                lg:w-[300px]
                xl:w-[400px]
                scale-0
                group-hover:shadow-2xl
                ${
                  index == 1000
                    ? "group-hover:scale-90"
                    : "group-hover:scale-110"
                }
                lg:
                group-hover:-translate-y-[6vw]
                ${
                  index == 0
                    ? "group-hover:-translate-x-[-2vw]"
                    : index == 11
                    ? "group-hover:-translate-x-[7vw]"
                    : "group-hover:-translate-x-[2vw]"
                }
                group-hover:opacity-100
               
                `}
      >
        <img
          className="
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-2xl
                    rounded-t-md
                    w-full
                    h-[10vw]
                    "
          src={data?.thumbnailUrl}
          alt="Thumbnail"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <BiChevronDown
                onClick={() => openModal(data?.id)}
                size={30}
                className="text-white group-hover/item:text-neutral-300"
              />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            {data.year == "2023" && <span className="mr-1"> New</span>}
            <span className="text-white">{data.year}</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
