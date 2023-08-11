import React, { useRef } from "react";
import { isEmpty } from "lodash";
import MovieCard from "./movieCard";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md"

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (isEmpty(data)) {
    return null;
  }

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 1800;
      const currentPosition = scrollContainerRef.current.scrollLeft;
      const targetPosition = currentPosition - scrollAmount;
      scrollToPosition(targetPosition);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 1800;
      const currentPosition = scrollContainerRef.current.scrollLeft;
      const targetPosition = currentPosition + scrollAmount;
      scrollToPosition(targetPosition);
    }
  };

  const scrollToPosition = (position: number) => {
    if (scrollContainerRef.current) {
      const scrollOptions: ScrollToOptions = {
        left: position,
        behavior: "smooth",
      };
      scrollContainerRef.current.scrollTo(scrollOptions);
    }
  };

  

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8 lg:-my-20 md:-mt-10 md:mb-10 sm:-mb-10">
      <div className="relative">
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold pt-4 pb-4">
          {title}
        </p>

        <div className="flex items-center lg:-my-10">
          <div className="absolute left-5 z-30">
            <button
              className="text-gray-500 hover:text-gray-700 -my-9"
              onClick={handleScrollLeft}
            >
              <MdArrowBackIos size={40} className="cursor-pointer"/>
            </button>
          </div>

          <div
            className="flex relative w-screen overflow-x-hidden lg:h-[500px] items-center lg:-my-20"
            ref={scrollContainerRef}
          >
           
            {data.map((movie) => (
              <div
                key={movie.id}
                className="flex-none mx-1 sm:mx-1 sm:w-[100px] md:w-[150px] lg:w-[350px]"
              >
                <MovieCard data={movie} />
              </div>
              
            ))}
            
          </div>

          <div className="absolute right-5 z-30">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleScrollRight}
            >
              <MdArrowForwardIos size={40} className="cursor-pointer"/>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieList;
