import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function AlertUpdated({ isUpdated }) {
    return (
        <AnimatePresence>
            {isUpdated && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-[-1] right-12 z-50 bg-amber-400 text-white font-semibold text-md px-4 py-2 rounded shadow"
                >
                    Updated
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AlertUpdated