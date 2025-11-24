import { motion } from "motion/react";

export default function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <motion.button
            whileHover={{ scale: value === "?" ? 1.05 : 1 }}
            whileTap={{ scale: value === "?" ? 0.95 : 1 }}
            onClick={onSquareClick}
            className={`square ${isWinningSquare ? 'winning' : ''} ${value !== "?" ? 'filled' : ''}`}
        >
            {value === "1" && (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="player-1"
                >
                    1
                </motion.div>
            )}
            {value === "2" && (
                <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="player-2"
                >
                    2
                </motion.div>
            )}
        </motion.button>
    );
} 