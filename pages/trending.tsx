import Navbar from "@/components/navbar";
import MovieCard from "@/components/movieCard";
import InfoModal from "@/components/infoModal";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMoviesList";

const NewPage = () => {
  const { isOpen, closeModal } = useInfoModal();
  const { data: trending = [] } = useMovieList();

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <div className="absolute">
        <Navbar searchVisible={false} searchValue="" />

        <div className="my-20 pt-20">
          <div className="text-white flex flex-row lg:text-2xl mx-20 xs:text-xs sm:text-sm md:text-lg xl:text-3xl">
            <h1 className="mr-2 font-semibold">New & Popular </h1>
          </div>

          <div className="grid xs:pt-0 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 py-10 mx-20">
            {trending?.map((movie: any) => (
              <div key={movie.id} className="xs:pb-10 xs:mb-10">
                <MovieCard data={movie} index={1000} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPage;
