import { motion } from "framer-motion";

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <motion.div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
    </div>
  );
};

export default LoadingComponent;
