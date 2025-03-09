import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { IoCloseOutline } from "react-icons/io5"
import { setPopupActive } from '../store/slices/YandexSlice'
import { useDispatch, useSelector } from 'react-redux'
import LoadingContainer from './LoadingContainer';

const PopupLoadingFile = (props) => {

    const dispatch = useDispatch()

    const loadingFile = useSelector(state => state.yandex.loadingFile)
    const isPopupActive = useSelector(state => state.yandex.isPopupActive)
    const file_link = useSelector(state => state.yandex.file_link)
    const name = useSelector(state => state.yandex.file_name)

    const handleCopy = () => {
        navigator.clipboard.writeText(file_link)
    }

    return (
        <AnimatePresence>
            {
                isPopupActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => dispatch(setPopupActive(!isPopupActive))}
                        className="popup">
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ delay: 0.2, ease: 'easeInOut' }}
                            className="popup__container">
                            <IoCloseOutline
                                onClick={() => dispatch(setPopupActive(false))}
                                className='popup__close' />
                            <div>
                                <div className='popup__title'>mycego</div>
                                <div className='header__underline'>
                                </div>
                            </div>

                            {
                                !loadingFile && (
                                    <>
                                        <div className='popup__title'>
                                            {name}
                                            <br />
                                            <br />
                                            <div className='popup__p download_file'>
                                                Ваша ссылка на скачивание готова!
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleCopy()}
                                            className='popup__submit popup_download_link'>
                                            Скопировать ссылку
                                        </button>
                                    </>
                                )
                            }
                            {
                                loadingFile && (
                                    <div className='loading_file_container'>
                                        <LoadingContainer />
                                    </div>
                                )
                            }

                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default PopupLoadingFile