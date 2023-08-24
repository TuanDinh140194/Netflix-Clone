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
import useActionList from "@/hooks/useActionList";
import useAdventures from "@/hooks/useAdventure";
import useSciFiList from "@/hooks/useSciFiList";
import useHorrorLists from "@/hooks/useHorrorList";
import useRomance from "@/hooks/useRomanceList";
import useComedy from "@/hooks/useComedyList";
import useMartial from "@/hooks/useMartialArt";
import useDrama from "@/hooks/useDramaList";
import useHongKongList from "@/hooks/useHongKongList";
import { useRouter } from "next/router";
import Head from "next/head";

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
  const router = useRouter();
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { data: actions = [] } = useActionList();
  const { data: adventures = [] } = useAdventures();
  const { data: scifi = [] } = useSciFiList();
  const { data: horror = [] } = useHorrorLists();
  const { data: romance = [] } = useRomance();
  const { data: comedy = [] } = useComedy();
  const { data: martialArt = [] } = useMartial();
  const { data: hongkong = [] } = useHongKongList();
  const { data: drama = [] } = useDrama();
  const { isOpen, closeModal } = useInfoModal();
  const { isOpenList, closeListModal } = useListModal();

  return (
    <>
      <Head>
        <title>Home - Netflix</title>
      </Head>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <MovieListModal visible={isOpenList} onClose={closeListModal} />
      <Navbar searchVisible={false} searchValue="" />
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="Action Movie" data={actions} />
        <MovieList title="Adventure Movie" data={adventures} />
        <MovieList title="Sci-Fi Movie" data={scifi} />
        <MovieList title="Horror Movie" data={horror} />
        <MovieList title="Romance Movie" data={romance} />
        <MovieList title="Comedy Movie" data={comedy} />
        <MovieList title="Martial Art Movie" data={martialArt} />
        <MovieList title="Hong Kong Action" data={hongkong} />
        <MovieList title="Drama" data={drama} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}
