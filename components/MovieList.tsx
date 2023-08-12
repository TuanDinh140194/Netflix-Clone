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
      const scrollAmount = 1000;
      const currentPosition = scrollContainerRef.current.scrollLeft;
      const targetPosition = currentPosition - scrollAmount;
      scrollToPosition(targetPosition);
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 1000;
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
    <div className="px-4 md:px-12 mt-4 space-y-8 xs:-mt-14 xs:mb-12 md:-my-1 lg:mt-12 lg:-mb-20 xl:-my-20">
      <div className="relative ">
      <div className="flex items-center">
        <p data-te-anima className="text-white text-md md:text-xl lg:text-2xl font-semibold pt-4 pb-4 cursor-pointer z-30 ">
          {title}
        </p>
</div>
        <div className="group/move flex items-center xs:-mt-20 md:-my-12 lg:-my-15 xl:-my-20">
          <div className="absolute left-0 z-30 xs:mt-14 md:-mt-6 lg:-mt-6 xl:-mt-12">
            <button
              className="hidden group-hover/move:block bg-gray-900 bg-opacity-0 xl:bg-opacity-40 lg:h-[125px] xl:h-[200px] xl:mt-4"
              onClick={handleScrollLeft}
            >
              <MdArrowBackIos size={35} color="white" className="cursor-pointer opacity-100 hover:scale-125"/>
            </button>
          </div>

          <div
            className="flex relative w-screen overflow-x-auto touch-pan-x scrollbar-hide xs:h-[200px] sm:h-[100px] md:h-[200px] lg:h-[400px] xl:h-[550px] items-center lg:-my-20"
            ref={scrollContainerRef}
          >
           
            {data.map((movie) => (
              <div
                key={movie.id}
                className="flex-none mx-1 xs:w-[150px] sm:mx-1 sm:w-[100px] md:w-[150px] lg:w-[200px] xl:w-[300px]"
              >
                <MovieCard data={movie} />
              </div>
              
            ))}
            
          </div>

          <div className="absolute right-0 z-30 xs:mt-14 md:-mt-6 lg:-mt-6 xl:-mt-14">
            <button
              className="hidden group-hover/move:block bg-gray-900 bg-opacity-0 xl:bg-opacity-40 lg:h-[125px] xl:h-[200px] xl:mt-4"
              onClick={handleScrollRight}
            >
              <MdArrowForwardIos size={35} color="white" className="cursor-pointer opacity-100 hover:scale-125"/>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieList;
