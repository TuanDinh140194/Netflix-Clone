import router from "next/router";
import React from "react";

interface NavbarItemProps {
    label: string;
    onClick:string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({label, onClick}) => {
    return (
        <div onClick={() => router.push(`/${onClick}`)} className="text-white hover:text-gray-300 transition cursor-pointer" >
            {label}
        </div>
    )
}

export default NavbarItem