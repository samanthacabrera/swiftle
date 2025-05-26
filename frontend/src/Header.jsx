import React, { useState } from "react";

const Header = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="flex items-center w-screen h-[10vh] border-b border-black font-bold relative">
                <h1 className="text-4xl ml-4">Swiftle</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="absolute right-4 border-2 border-black rounded-full px-2"
                    aria-label="How to Play"
                >
                    ?
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white shadow-lg p-6 max-w-md w-full relative tracking-wide">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-4 text-2xl"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <h2 className="text-4xl font-bold mb-4">How to Play</h2>
                        <p className="mb-2">Find groups of four songs that appear on the same Taylor Swift album.</p>
                        <ul className="list-disc ml-6">
                            <li>Select four songs and tap <strong>'Submit'</strong> to check if your guess is correct.</li>
                            <li>If correct, the group will lock in and disappear from the board.</li>
                            <li>You have up to 4 incorrect guesses before the game ends.</li>
                        </ul>
                        <h3 className="font-bold my-2">Examples</h3>
                        <ul className="list-disc ml-6">
                            <li>LOVER: Paper Rings, Cruel Summer, Afterglow, Death By A Thousand Cuts</li>
                            <li>RED: All Too Well, We Are Never Getting Back Together, 22, Holy Ground </li>
                        </ul>
                        <p className="mt-6">Each puzzle has exactly one solution.</p>
                        <p className="mt-2">All songs are from Taylor’s Version of each album (or her latest official release if no TV exists).</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
