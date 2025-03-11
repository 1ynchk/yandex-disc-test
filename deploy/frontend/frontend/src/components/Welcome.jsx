import '../static/css/welcome.css'

const Welcome = (props) => {

    const {
        setPopupActive,
        isPopupActive
    } = props

    return (
        <div className="welcome">
            <div className="welcome__container">
                <h1 className="welcome__title">
                    Облачный диск для всего самого важного!
                </h1>
                <p className='welcome__p'>
                    На Диске ваши файлы в безопасности — используйте их в любое время на любом устройстве.
                </p>
                <div className='welcome__btn_container'>
                    <button
                        onClick={() => setPopupActive(!isPopupActive)}
                        className='popup__submit welcome_btn'>
                        Начать использовать!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Welcome