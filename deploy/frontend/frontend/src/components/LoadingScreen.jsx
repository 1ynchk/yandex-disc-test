import { motion, AnimatePresence } from 'framer-motion';
import '../static/css/loading.css'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const LoadingScreen = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="loadingScreen">
                <AiOutlineLoading3Quarters className='loading' />
            </motion.div>
        </AnimatePresence>
    )
}

export default LoadingScreen