import React from "react";

export default function Player0({ userName, playerChoice, choiceImages }) {
    return (
        <div className="flex flex-col items-center w-1/3 h-full">
            <span className="font-semibold mb-2 text-gray-800 text-xl">{userName || "You"}</span>
            <div className="w-100 h-100 flex items-center justify-center">
                {playerChoice ? (
                <img
                    src={choiceImages[playerChoice]}
                    alt={playerChoice}
                    className="w-full h-full "
                    style={{ transform: "scaleX(-1)" }}
                />
                ) : (
                <span className="text-gray-400 text-5xl">?</span>
                )}
            </div>
        </div>
    );
}