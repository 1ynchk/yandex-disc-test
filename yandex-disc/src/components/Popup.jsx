import { useEffect, useState } from 'react'
import '../static/css/popup.css'

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { IoCloseOutline } from "react-icons/io5";

const Popup = (props) => {
    const {
        isPopupActive,
        setPopupActive
    } = props

    // inputs state
    const [isLoginEmail, setLoginEmail] = useState(null)
    const [isLoginPassword, setLoginPassword] = useState(null)

    const [isLogin, setLogin] = useState(true)
    const [isActive, setActive] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <AnimatePresence>
            {
                isPopupActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setPopupActive(!isPopupActive)}
                        className="popup">
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ delay: 0.2, ease: 'easeInOut' }}
                            className="popup__container">
                            <IoCloseOutline     
                                onClick={() => setPopupActive(false)}
                                className='popup__close' />
                            <div>
                                <div className='popup__title'>mycego</div>
                                <div className='header__underline'>
                                </div>
                            </div>
                            <LayoutGroup>
                                <div className="button-container">
                                    <motion.div
                                        layoutId="activeBackground"
                                        className="button-bg"
                                        animate={{ left: isLogin ? "0%" : "50%" }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    />
                                    <motion.button
                                        onClick={() => setLogin(true)}
                                        className={`popup__change_btn ${isLogin ? "active" : ""}`}
                                    >
                                        Войти
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setLogin(false)}
                                        className={`popup__change_btn ${!isLogin ? "active" : ""}`}
                                    >
                                        Регистрация
                                    </motion.button>
                                </div>
                            </LayoutGroup>
                            <form className="popup__form" onSubmit={() => console.log("hello")}>

                                <AnimatePresence mode="wait">
                                    {isLogin ? (
                                        <motion.div
                                            key="login"
                                            className="popup__form-content"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="input__container">
                                                <div className="popup__p">Почта</div>
                                                <input
                                                    type='text'
                                                    placeholder='Введите почту'
                                                    className="common_input" />
                                            </div>
                                            <div className="input__container">
                                                <div className="popup__p">Пароль</div>
                                                <input
                                                    type='password'
                                                    placeholder='Введите пароль'
                                                    className="common_input" />
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="register"
                                            className="popup__form-content"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className='input__subcontainer'>
                                                <div className="input__container">
                                                    <div className="popup__p">Имя</div>
                                                    <input className="common_input" />
                                                </div>
                                                <div className="input__container">
                                                    <div className="popup__p">Фамилия</div>
                                                    <input className="common_input" />
                                                </div>
                                            </div>
                                            <div className="input__container">
                                                <div className="popup__p">Почта</div>
                                                <input className="common_input" />
                                            </div>
                                            <div className='input__subcontainer'>
                                                <div className="input__container">
                                                    <div className="popup__p">Пароль</div>
                                                    <input className="common_input" />
                                                </div>
                                                <div className="input__container">
                                                    <div className="popup__p">Повторите пароль</div>
                                                    <input className="common_input" />
                                                </div>
                                            </div>


                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    className="popup__submit" type="submit">
                                    Отправить
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )
            }
        </AnimatePresence>

    )
}

const Input = (props) => {

    const {
        _type, 
        label, 
        rule
    } = props

    return (
        <div className="input__container">
            <div className="popup__p">Повторите пароль</div>
            <input className="common_input" />
        </div>
    )
}

export default Popup