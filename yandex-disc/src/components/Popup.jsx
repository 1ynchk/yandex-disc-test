import { useEffect, useRef, useState } from 'react'
import '../static/css/popup.css'

import LoadingContainer from './LoadingContainer'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { IoCloseOutline } from "react-icons/io5"
import { FaRegEye } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'

import { fetchLogin } from './../store/requests/login';
import { fetchRegister } from '../store/requests/register'
import { setAuth } from '../store/slices/UsersSlice'

const Popup = (props) => {
    const {
        isPopupActive,
        setPopupActive
    } = props

    const dispatch = useDispatch()
    const loading_container = useSelector(state => state.users.loading_container)
    const isAuth = useSelector(state => state.users.isAuth)

    // inputs state
    const [isLoginEmail, setLoginEmail] = useState(null)
    const [isLoginPassword, setLoginPassword] = useState(null)
    const [isAuthPasswordFirst, setAuthPasswordFirst] = useState(null)
    const [isAuthPasswordSecond, setAuthPasswordSecond] = useState(null)
    const [isAuthEmail, setAuthEmail] = useState(null)
    const [isName, setName] = useState(null)
    const [isSurname, setSurname] = useState(null)

    const [isLogin, setLogin] = useState(true)
    const [isActive, setActive] = useState(false)

    useEffect(() => {
        if (isLogin) {
            if (
                isLoginEmail == null
                || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(isLoginEmail))
                || isLoginPassword == null || isLoginPassword.length < 8
            ) { setActive(false) }
            else {
                setActive(true)
            }
        } else {
            if (
                isAuthEmail == null
                || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(isAuthEmail))
                || isName == null || isName.length < 2 || isSurname == null || isSurname.length < 2
                || isAuthPasswordFirst == null || isAuthPasswordFirst.length < 8
                || isAuthPasswordSecond == null || isAuthPasswordSecond.length < 8
                || isAuthPasswordFirst != isAuthPasswordSecond
            ) {
                setActive(false)
            } else {
                setActive(true)
            }
        }
    }, [isLoginEmail, isLoginPassword, isAuthEmail, isName, isAuthPasswordFirst, isAuthPasswordSecond, isSurname])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
            dispatch(fetchLogin({ email: isLoginEmail, password: isLoginPassword }))
        }

        if (!isLogin) {
            dispatch(fetchRegister({
                email: isAuthEmail,
                password: isAuthPasswordFirst,
                name: isName,
                surname: isSurname
            }))
        }
    }

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
                            {
                                !loading_container && isAuth == null && (
                                    <>
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

                                        <form className="popup__form" onSubmit={(e) => handleSubmit(e)}>

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

                                                        <EmailInput
                                                            placeholder='Введите почту'
                                                            setter={setLoginEmail}
                                                            value={isLoginEmail} />
                                                        <InputText
                                                            label='Пароль'
                                                            value={isLoginPassword}
                                                            setter={setLoginPassword}
                                                            min_length={8}
                                                            placeholder='Введите пароль'
                                                            _type='password'
                                                        />
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
                                                        <InputText
                                                            label={'Фамилия'}
                                                            placeholder='Введите фамилия'
                                                            value={isSurname}
                                                            setter={setSurname}
                                                            min_length={2}
                                                        />
                                                        <InputText
                                                            label={'Имя'}
                                                            placeholder='Введите имя'
                                                            value={isName}
                                                            setter={setName}
                                                            min_length={2}
                                                        />
                                                        <EmailInput
                                                            value={isAuthEmail}
                                                            setter={setAuthEmail}
                                                            placeholder='Введите почту'
                                                        />
                                                        <InputText
                                                            label='Пароль'
                                                            value={isAuthPasswordFirst}
                                                            setter={setAuthPasswordFirst}
                                                            min_length={8}
                                                            placeholder='Введите пароль'
                                                            _type='password'
                                                            rule={
                                                                {
                                                                    'first_password': isAuthPasswordFirst,
                                                                    'second_password': isAuthPasswordSecond
                                                                }
                                                            }
                                                        />
                                                        <InputText
                                                            label='Повторите пароль'
                                                            value={isAuthPasswordSecond}
                                                            setter={setAuthPasswordSecond}
                                                            min_length={8}
                                                            placeholder='Повторите пароль'
                                                            _type='password'
                                                            rule={
                                                                {
                                                                    'first_password': isAuthPasswordFirst,
                                                                    'second_password': isAuthPasswordSecond
                                                                }
                                                            }
                                                        />

                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <button
                                                disabled={!isActive}
                                                className="popup__submit" type="submit">
                                                Отправить
                                            </button>
                                        </form>
                                    </>
                                )
                            }
                            {
                                loading_container && <LoadingContainer />
                            }

                            {
                                !loading_container && isAuth == true && (
                                    <div className='popup__subcontainer'>
                                        <div className='welcome__p'>
                                            Вы успешно зарегистрировались!
                                        </div>
                                        <button
                                            onClick={() => {
                                                dispatch(setAuth())
                                                setLogin(true)
                                                setAuthEmail(null)
                                                setAuthPasswordFirst(null)
                                                setAuthPasswordSecond(null)
                                                setName(null)
                                                setSurname(null)
                                            }}
                                            className='popup__submit'>
                                            Войти
                                        </button>
                                    </div>
                                )
                            }
                            {
                                !loading_container && isAuth == false && (
                                    <div className='popup__subcontainer'>
                                        <div className='welcome__p'>
                                            Пользователь с такой почтой уже существует 
                                        </div>
                                        <button
                                            onClick={() => {
                                                dispatch(setAuth())
                                            }}
                                            className='popup__submit'>
                                                К регистрации
                                        </button>
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

export const InputText = (props) => {
    let { label, value, setter, min_length, placeholder, _type, rule } = props

    const [type, setType] = useState(_type)
    const passwordRef = useRef(null)

    useEffect(() => {
        setType(_type)
    }, [_type])

    const handleClickConcealPassword = () => {
        if (passwordRef.current) {
            const newType = passwordRef.current.type === "password" ? "text" : "password"
            passwordRef.current.type = newType
            setType(newType)
        }
    }

    return (
        <div className="input__container">
            <div className="popup__p">{label}</div>
            <input
                ref={passwordRef}
                type={type}
                placeholder={placeholder}
                value={value ?? ""}
                onChange={(e) => setter(e.target.value)}
                className="common_input"
            />
            {_type === "password" && (
                <FaRegEye onClick={handleClickConcealPassword} className="conceal_password" />
            )}
            {value == null || (value.length < min_length && (
                <InputWarning text={`Это поле не должно быть короче ${min_length} символов`} />
            ))}
            {
                rule != undefined && rule.first_password != rule.second_password && (

                    <InputWarning text={`Пароли должны совпадать`} />
                )
            }
        </div>
    )
}

const EmailInput = (props) => {
    const { value, setter, placeholder } = props

    return (
        <div className='input__container'>
            <div className="popup__p">Почта</div>
            <input
                placeholder={placeholder}
                value={value == null ? '' : value}
                onChange={(e) => setter(e.target.value)}
                className="common_input" />
            {
                value == null || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) && (
                    <InputWarning text='Не валидная почта' />
                )
            }
        </div>
    )
}

export const InputWarning = ({ text }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={{ overflow: 'hidden' }}
                className='input__warn'>
                {text}
            </motion.div>
        </AnimatePresence>

    )
}

export default Popup