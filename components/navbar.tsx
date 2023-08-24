import NavbarItem from "./navBarItem";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./mobileMenu";
import { useCallback, useEffect, useRef, useState } from "react";
import AccountMenu from "./accountMenu";
import Notification from "./notification";
import { useRouter } from "next/router";

interface NavBarProps {
  // onSearchVisibleChange: (isVisible: boolean) => void;
  searchVisible: boolean;
  searchValue: string;
}

const Navbar: React.FC<NavBarProps> = ({ searchVisible, searchValue }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(searchVisible);
  const [showNotification, setShowNotification] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [scrollingDown, setScrollingDown] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchButtonRef = useRef<HTMLDivElement | null>(null); // Ref for the container holding search elements
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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
      // Navigate to the search results page with the search query as a query parameter
      router.push({
        pathname: "/search",
        query: { q: searchQuery },
      });
    } else if (router.asPath.includes("/search")) {
      router.push("/browser");
    } else {
      toggleSearchInput();
    }
  };

  // Use useEffect to trigger handleSearch when searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  //Handle NavBar opacity change when scroll down
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

  // Focus the search input when the page loads
  // useEffect(() => {
  //   if (searchInputRef.current && (router.asPath.includes("/search") || router.asPath === "/")){
  //     searchInputRef.current.focus();
  //   }
  // }, [router.asPath]);

  useEffect(() => {
    if (searchInputRef.current && showSearchInput) {
      setShowSearchInput(true);
      searchInputRef.current.focus();
    }
  }, [showSearchInput]);

  // Close the search input when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showSearchInput && searchButtonRef.current) {
        // Check if the click happened outside the search input and button
        if (
          !searchButtonRef.current.contains(event.target as Node) &&
          !searchInputRef.current?.contains(event.target as Node)
        ) {
          setShowSearchInput(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showSearchInput]);

  //Close Notification when click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showNotification && notificationRef.current) {
        if (!notificationRef.current.contains(event.target as Node)) {
          setShowNotification(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showNotification]);

  //Close Account Menu when click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showAccountMenu && accountMenuRef.current) {
        if (!accountMenuRef.current.contains(event.target as Node)) {
          setShowAccountMenu(false);
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showNotification]);

  return (
    <nav className="w-full fixed z-30 ">
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
          <NavbarItem onClick="" label="Home" />
          <NavbarItem onClick="series" label="Series" />
          <NavbarItem onClick="" label="Films" />
          <NavbarItem onClick="trending" label="New & Popular" />
          <NavbarItem onClick="mylist" label="My List" />
          <NavbarItem onClick="" label="Browse by languages" />
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
            ref={searchButtonRef}
            onClick={toggleSearchInput}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
          >
            <BsSearch />
          </div>
          {showSearchInput && (
            <div className="relative">
              <input
                ref={searchInputRef} // Attach the ref to the input element
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
            onClick={() => {
              toggleNotification();
              setShowAccountMenu(false);
            }}
            className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
            ref={notificationRef}
          >
            <BsBell />
            <Notification visible={showNotification} />
          </div>
          <div
            ref={accountMenuRef}
            onClick={() => {
              toggleAccountMenu();
              setShowNotification(false);
            }}
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
