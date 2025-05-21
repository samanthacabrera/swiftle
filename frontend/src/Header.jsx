import React from "react";

const Header = () => {
    return (
        <div className="flex items-center w-screen h-[10vh] border-b border-black font-bold">
            <h1 className="text-4xl ml-4">Swiftle</h1>
            <button className="absolute right-4 border-2 border-black rounded-full px-2">?</button>
        </div>
    )
}

export default Header;