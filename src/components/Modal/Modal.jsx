// components/Modal.js
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white rounded-xl max-h-[90vh] overflow-y-auto w-full max-w-3xl shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <div className="p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
