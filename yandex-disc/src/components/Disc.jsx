import '../static/css/disc.css'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { motion } from 'framer-motion';
import { CiSearch } from "react-icons/ci";
import { FaExclamation } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { MdMusicVideo } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineSettingsApplications } from "react-icons/md";

import { fetchGetFiles } from '../store/requests/get-files';

const Disc = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLogin = useSelector(state => state.users.isLogin)
    const isLoaded = useSelector(state => state.users.isLoaded)
    const firstName = useSelector(state => state.users.firstName)

    const loading = useSelector(state => state.yandex.loading)
    const error = useSelector(state => state.yandex.error)

    const [search, setSearch] = useState(null)

    useEffect(() => {
        if (!isLogin && isLoaded) {
            navigate('/')
        }
    }, [isLogin, isLoaded])

    const handleSearch = (e) => {
        e.preventDefault()
        if (search != null && search != '') {
            dispatch(fetchGetFiles(search))
        }
    }

    return (
        <div className="disc">
            <div className='disc__greet'>
                Добро пожаловать, {firstName}!
            </div>

            <div className='disc__url_container'>
                <form onSubmit={(e) => handleSearch(e)} className='disc__url'>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Введите публичную ссылку Yandex диска...'
                        type='text'
                        className='disc__input' />
                    <button
                        className='disc__url_search'
                        disabled={loading}
                        type='submit' >
                        <CiSearch />
                    </button>
                </form>

            </div>

            <div className='disc__subtitle'>Файлы:</div>

            {
                error.length > 0 && (
                    <motion.div 
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className='disc__erorr_container'>
                        <div className='disc__error_title'>
                            Произошла ошибка при запросе к серверу
                            <FaExclamation />
                        </div>
                        <div className='disc__erorr_value'>
                            Содержимое ошибки:
                        </div>
                        <div className='disc__erorr_value'>
                            {error}
                        </div>
                    </motion.div>
                )
            }


            <div className='disc__files_section'>

            </div>

        </div>
    )
}

const File = (props) => {

    const {
        name,
        type,
        link,
    } = props

    const [_type, setType] = useState(type)
    let icon = null

    useEffect(() => {
        const index = _type.indexOf('/')
        const result = index !== -1 ? _type.slice(0, index) : _type
        setType(result)
    }, [])

    switch (true) {
        case _type == 'image':
            icon = <CiImageOn />
            break
        case _type == 'application':
            icon = <MdOutlineSettingsApplications/>
            break
        case _type == 'video': 
            icon = <MdMusicVideo/>
            break
        case _type == 'file': 
            icon = <CiFileOn />
            break 

    }


    return (
        <div className='file'>

        </div>
    )
    
}

export default Disc