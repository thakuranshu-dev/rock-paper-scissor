import React from "react";

export default function Player1({ computerChoice, choiceImages }) {
    return (
        <div className="flex flex-col items-center w-1/3 h-full">
            <span className="font-semibold mb-2 text-gray-800 text-xl">Computer</span>
            <div className="w-100 h-100 flex items-center justify-center ">
                {computerChoice ? (
                <img
                    src={choiceImages[computerChoice]}
                    alt={computerChoice}
                    className="w-full h-full"
                />
                ) : (
                <span className="text-gray-400 text-5xl">?</span>
                )}
            </div>
        </div>
    );
}