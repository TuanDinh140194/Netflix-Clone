import BillBoard from "@/components/billBoard";
import InfoModal from "@/components/infoModal";
import MovieListModal from "@/components/movieListModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/navbar";
import useFavorites from "@/hooks/usefavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMoviesList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useListModal from "@/hooks/useListModal";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const {isOpen, closeModal} = useInfoModal();
  const {isOpenList, closeListModal} = useListModal();
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <MovieListModal visible={isOpenList} onClose={closeListModal}/>
      <Navbar />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
