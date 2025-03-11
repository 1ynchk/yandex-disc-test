import { useDispatch, useSelector } from 'react-redux';
import '../static/css/header.css'

import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";

import { fetchLogout } from './../store/requests/logout';

const Header = (props) => {

    const dispatch = useDispatch()

    const {
        setPopupActive,
        isPopupActive
    } = props

    const isLogin = useSelector(state => state.users.isLogin)

    const handleBtn = () => {
        setPopupActive(!isPopupActive)
    }

    return (
        <header className="header">
            <div className='header__container'>
                <div className='header__logo'>
                    mycego
                </div>
                <div className='header__underline'>
                </div>
            </div>

            <div className='header__container'>

                {
                    !isLogin && (
                        <div
                            onClick={() => handleBtn()}
                            className='header__btn'>
                            <CgProfile className='header__icon' />
                            <button className='header__p'>Войти</button>
                        </div>
                    )
                }

                {
                    isLogin && (
                        <div
                            onClick={() => dispatch(fetchLogout())}
                            className='header__btn'>
                            <ImExit className='header__icon' />
                            <button className='header__p'>Выйти</button>
                        </div>
                    )
                }
            </div>

        </header>
    )
}

export default Header