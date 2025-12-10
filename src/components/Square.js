import { motion } from "motion/react";

export default function Square({ value, onSquareClick, isWinningSquare }) {
    return (
        <motion.button
            className={`square ${isWinningSquare ? "winning" : ""} ${
                value !== "?" ? "filled" : ""
            }`}
            onClick={onSquareClick}
            whileHover={{ scale: value === "?" ? 1.05 : 1 }}
            whileTap={{ scale: value === "?" ? 0.95 : 1 }}
        >
            {value === "A" && (
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="player-mark player-A"
                >
                    A
                </motion.div>
            )}
            {value === "B" && (
                <motion.div
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="player-mark player-B"
                >
                    B
                </motion.div>
            )}
        </motion.button>
    );
}
