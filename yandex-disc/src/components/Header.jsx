import '../static/css/header.css'

import { CgProfile } from "react-icons/cg";

const Header = (props) => {

    const {
        setPopupActive,
        isPopupActive
    } = props

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
                <div
                    onClick={() => handleBtn()}
                    className='header__btn'>
                    <CgProfile className='header__icon' />
                    <button className='header__p'>Войти</button>
                </div>
            </div>

        </header>
    )
}

export default Header