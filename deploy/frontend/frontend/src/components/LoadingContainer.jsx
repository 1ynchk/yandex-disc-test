import { motion, AnimatePresence } from 'framer-motion';
import '../static/css/loading.css'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const LoadingContainer = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="loading-container">
                <AiOutlineLoading3Quarters className='loading' />
            </motion.div>
        </AnimatePresence>
    )
}

export default LoadingContainer