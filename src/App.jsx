import React, { useState, useEffect, useRef } from "react";
import { Button } from "./components/ui/Button";
import { Card, CardContent } from "./components/ui/Card";
import { motion } from "framer-motion";
import gsap from "gsap";
import Player0 from "./components/ui/Player0";
import Player1 from "./components/ui/Player1";
import './App.css';

const choices = ["rock", "paper", "scissors"];
const choiceImages = {
    rock: "/assets/Rock_robo.png",
    paper: "/assets/Paper_robo.png",
    scissors: "/assets/Scissors_robo.png"
};
const versusBG = "/assets/versusBG.png";

const sounds = {
    win: new Audio("/sounds/win.mp3"),
    lose: new Audio("/sounds/lose.mp3"),
    draw: new Audio("/sounds/draw.mp3")
};

const getResult = (player, computer) => {
    if (player === computer) return "draw";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "win";
    }
    return "lose";
};

export default function App() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");
    const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });
    const [userName, setUserName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [inputName, setInputName] = useState("");
    const [resultTrigger, setResultTrigger] = useState(0);

    const resultRef = useRef(null);

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) {
            setUserName(storedName);
        } else {
            setShowModal(true);
        }
    }, []);

    useEffect(() => {
        if (!result) return;
        let color, scale;
        if (result === "win") {
            color = "#00fff7";
            scale = 1.3;
        } else if (result === "lose") {
            color = "#ff0055";
            scale = 1.3;
        } else {
            color = "#ffd600";
            scale = 1.2;
        }
        gsap.set(resultRef.current, { scale: 0.8, color: "#fff" });
        gsap.to(resultRef.current, {
            scale,
            color,
            duration: 0.6,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });
    }, [resultTrigger]);

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (inputName.trim()) {
            setUserName(inputName);
            localStorage.setItem("userName", inputName);
            setShowModal(false);
        }
    };

    const handleChoice = (choice) => {
        const compChoice = choices[Math.floor(Math.random() * 3)];
        const gameResult = getResult(choice, compChoice);

        setPlayerChoice(choice);
        setComputerChoice(compChoice);
        setResult(gameResult);
        setResultTrigger((prev) => prev + 1);

        if (gameResult === "win") {
            setScore((prev) => ({ ...prev, wins: prev.wins + 1 }));
            sounds.win.play();
        } else if (gameResult === "lose") {
            setScore((prev) => ({ ...prev, losses: prev.losses + 1 }));
            sounds.lose.play();
        } else {
			setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
            sounds.draw.play();
        }
    };
	
    return (
		<div className="bg-gradient-to-r from-cyan-400 to-blue-400 min-h-screen flex flex-row items-center justify-center relative rounded-2xl">
			<Player0 userName={userName} playerChoice={playerChoice} choiceImages={choiceImages} />
        <div className="min-h-screen p-4 max-w-1/3 mx-auto text-center flex flex-col justify-center relative bg-transparent bg-opacity-80">
            {/* Modal */}
            {showModal && (
                <div className="bg-gray-900 rounded-xl p-6 shadow-[0_0_24px_4px_rgba(0,255,255,0.3)] w-[400px] border-4 border-cyan-400 text-cyan-200" >
                    <div className="bg-white rounded-xl p-6 shadow-lg w-[350px]">
                        <h2 className="text-xl font-bold mb-4">Welcome!</h2>
                        <form onSubmit={handleNameSubmit}>
                            <input
                                type="text"
                                className="border rounded px-3 py-2 w-full mb-4"
                                placeholder="Enter your name"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                autoFocus
                            />
                            <Button type="submit" className="w-full bg-cyan-700 hover:bg-cyan-500 text-white font-bold border-2 border-cyan-400 rounded shadow-[0_0_8px_2px_rgba(0,255,255,0.5)] tracking-widest">Start</Button>
                        </form>
                    </div>
                </div>
            )}

            <motion.h1
                className="text-3xl font-bold mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Rock Paper Scissors<br/>
                <span className="text-xl text-gray-500">{userName && ` ${userName}`} vs Computer!</span>
            </motion.h1>

            <div className="flex justify-around mb-6">
                {choices.map((choice) => (
                    <motion.div
                        key={choice}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button onClick={() => handleChoice(choice)}>
                            {choice.charAt(0).toUpperCase() + choice.slice(1)}
                        </Button>
                    </motion.div>
                ))}
            </div>

            {/*Versus Image:- */}
            <div className="flex flex-col items-center w-0.9 h-0.9 mb-2 ">
                <img
                    src={versusBG}
                    alt="Versus"
                    className="w-full h-full object-contain mx-auto"
                    style={{ filter: "drop-shadow(0 0 6px #0003)" }}
                />
            </div>

            {playerChoice && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className=" shadow-[0_0_24px_4px_rgba(0,255,255,0.3)]">
                        <CardContent className="mb-2">
                            <p
                                ref={resultRef}
                                className="text-lg font-semibold "
                                style={{ transition: "color 0.2s" }}
                            >
                                {result === "draw"
                                    ? "It's a draw!"
                                    : result === "win"
                                    ? "You win!"
                                    : "You lose!"}
                            </p>
                            <motion.div
                                className="mt-4 flex flex-col items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-lg font-semibold mb-2 text-center">Scoreboard</h2>
                                <ul className="list-disc list-inside text-center">
                                    <li>Wins: {score.wins}</li>
                                    <li>Losses: {score.losses}</li>
                                    <li>Draws: {score.draws}</li>
                                </ul>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </div>
		<Player1 computerChoice={computerChoice} choiceImages={choiceImages} />
		</div>
    );
}
