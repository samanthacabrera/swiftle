import React from "react";

const Header = () => {
    return (
        <div className="flex justify-center items-center w-screen h-[10vh] border-b border-black">
            <h1 className="text-2xl">Swiftle</h1>
            <button className="absolute right-4 border border-black rounded-full px-2">?</button>
        </div>
    )
}

export default Header;