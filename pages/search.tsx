import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieCard from "@/components/movieCard";
import InfoModal from "@/components/infoModal";
import useInfoModal from "@/hooks/useInfoModal";

const SearchPage = () => {
  const router = useRouter();
  const q = router.query.q as string; // Access the query parameter "q"
  const [response, setResponse] = useState([]); // State to store the response
  const [loading, setLoading] = useState(true); // State to track loading
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    // Define an async function and call it immediately
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/search", { params: { q } });
        setResponse(result.data);
      } catch (error) {
        // Handle error here
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchData(); // Call the async function
  }, [q]);

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal} />
      <div className="absolute">
        <Navbar searchVisible={true} searchValue={q} />

        <div className="my-20 pt-20">
          <div className="text-white flex flex-row lg:text-2xl mx-20 xs:text-xs sm:text-sm md:text-lg">
            <h1 className="opacity-50 mr-2">Explore title related to: </h1>
            <h1 className="opacity-100">{q}</h1>
          </div>

          <div className="grid xs:pt-0 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 py-10 mx-20">
            {loading ? (
              // Show loading spinner while fetching
              <div className="text-white">Loading...</div>
            ) : response.length > 0 ? (
              // Render movie cards if response is not empty
              response.map((movie: any) => (
                <div key={movie.id} className="xs:pb-10 xs:mb-10 my-5">
                  <MovieCard data={movie} index={1000} />
                </div>
              ))
            ) : (
              // Show "No result found" message
              <h1 className="text-white xs:text-xs sm:text-sm md:text-lg lg:text-2xl">
                No result found
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
