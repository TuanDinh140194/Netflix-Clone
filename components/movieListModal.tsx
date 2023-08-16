import useListModal from "@/hooks/useListModal";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { isEmpty } from "lodash";
import MovieCard from "./movieCard";

interface ListModalProps {
  visible?: boolean;
  onClose: any;
}

const MovieListModal: React.FC<ListModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { data, title } = useListModal();

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div
      className="
      z-40
      transition
      duration-300
      bg-black
      bg-opacity-80
      flex
      justify-center
      items-center
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0"
    >
      <div
        className="
          relative
          w-auto
          mx-auto
          h-auto
          max-w-screen-2xl
          my-auto
          max-h-screen-2xl
          rounded-md
          overflow-hidden"
      >
        <div
          className={`
            ${isVisible ? "scale-100" : "scale-0"}
            transform
            duration-300
            relative
            flex-auto
            bg-zinc-900
            drop-shadow-md
       
            `}
        >
          <div className="relative">
            <h1 className="text-white text-4xl text-center py-20 font-bold">{title}</h1>
            <div
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>
            <div className="grid xs:pt-0 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 py-20 mx-20">
              {data?.map((movie) => (
                <div key={movie.id} className="xs:pb-10 xs:mb-10">
                  <MovieCard data={movie} index={1000} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieListModal;
