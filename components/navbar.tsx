import NavbarItem from "./navBarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./mobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./accountMenu";
import Notification from "./notification";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollingDown, setScrollingDown] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleSearchInput = useCallback(() => {
    setShowSearchInput((current) => !current);
  }, []);

  const toggleNotification = useCallback(() => {
    setShowNotification((current) => !current);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Perform your search action using the searchQuery
      console.log("Searching for:", searchQuery);
    } else {
      toggleSearchInput();
    }
  };

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setScrollingDown(currentScrollPos > prevScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="w-full fixed z-40 ">
      <div
        className={`
                px-4
                md:px-16
                py-6
                flex
                flex-row
                items-center
                transition
                duration-500
                bg-zinc-900
                ${scrollingDown ? "bg-opacity-100" : "bg-opacity-20"}
                
            `}
      >
        <img className="h-4 md:h-7" src="/images/logo.png" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div
            onClick={toggleSearchInput}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
          >
            <BsSearch />
          </div>
          {showSearchInput && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-2 py-1 pr-8 rounded-md bg-gray-800 text-gray-200 border-gray-600 border focus:border-gray-400 focus:outline-none absolute right-0 top-1/2 transform -translate-y-1/2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="text-gray-200 absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <BsSearch />
              </button>
            </div>
          )}
          <div
            onClick={toggleNotification}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
          >
            <BsBell />
            <Notification visible={showNotification} />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
