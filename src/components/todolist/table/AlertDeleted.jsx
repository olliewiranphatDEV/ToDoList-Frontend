import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function AlertDeleted({ isDeleted }) {
    return (
        <AnimatePresence>
            {isDeleted && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-4 z-50 bg-amber-400 text-white font-semibold text-md px-4 py-2 rounded shadow"
                >
                    Deleted
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default AlertDeleted