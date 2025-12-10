import { motion } from "motion/react";

export default function HistoryButton({ moveNumber, onClick, isActive }) {
    return (
        <motion.button
            className={`history-button ${isActive ? "active" : ""}`}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <span className="history-text">{moveNumber}</span>
        </motion.button>
    );
}
