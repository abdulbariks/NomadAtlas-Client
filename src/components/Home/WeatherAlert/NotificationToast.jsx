import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationToast({ notifications, setNotifications }) {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(1)); // remove oldest
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications, setNotifications]);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((note, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow"
          >
            {note}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
