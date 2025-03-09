import '../static/css/disc.css'

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { motion } from 'framer-motion';
import { CiSearch } from "react-icons/ci";
import { FaExclamation } from "react-icons/fa";
import { CiFileOn } from "react-icons/ci";
import { MdOndemandVideo } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineSettingsApplications } from "react-icons/md";
import { GoFileDirectory } from "react-icons/go";
import { MdDownload } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import PopupLoadingFile from './PopupLoadingFile';
import { setClearState } from '../store/slices/YandexSlice';


import { fetchGetFiles } from '../store/requests/get-files';
import { fetchGetDownloadLink } from '../store/requests/download-file';
import LoadingContainer from './LoadingContainer';

const Disc = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isLogin = useSelector(state => state.users.isLogin)
    const isLoaded = useSelector(state => state.users.isLoaded)
    const firstName = useSelector(state => state.users.firstName)

    const loading = useSelector(state => state.yandex.loading)
    const error = useSelector(state => state.yandex.error)
    const _type = useSelector(state => state.yandex._type)
    const file = useSelector(state => state.yandex.file)
    const dir = useSelector(state => state.yandex.dir)

    const [search, setSearch] = useState(null)

    useEffect(() => {
        if (!isLogin && isLoaded) {
            navigate('/')
        }
    }, [isLogin, isLoaded])

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(setClearState())
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

            <div className='disc__filters'>
                <div className='disc__subtitle filter_container'>Фильтры:</div>
                <div className='disc__filter'>
                    <div className='disc__filter_title'>Отсортировать по типу:</div>
                </div>
                <div className='disc__filters_container'>
                    <div className='disc__filter_el'>
                        <div className='disc__filter_subtitle'>Видео</div>
                        <input type='radio' />
                    </div>
                    <div className='disc__filter_el'>
                        <div className='disc__filter_subtitle'>Фотография</div>
                        <input type='radio' />
                    </div>
                    <div className='disc__filter_el'>
                        <div className='disc__filter_subtitle'>Файл</div>
                        <input type='radio' />
                    </div>
                    <div className='disc__filter_el'>
                        <div className='disc__filter_subtitle'>Файл приложения</div>
                        <input type='radio' />
                    </div>
                </div>
            </div>

            <div className='disc__subtitle'>Файлы:</div>

            {
                error.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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

            {
                _type == 'dir' && (
                    <div className='disc__files_section'>
                        {
                            dir.map((el, index) => {
                                return <File
                                    key={index}
                                    name={el.name}
                                    path={el.path}
                                    type={el.mime_type}
                                    public_key={el.public_key}
                                />
                            })
                        }
                    </div>
                )
            }

            {
                _type == 'file' && (
                    <div className='disc__files_section'>
                        <File
                            name={file.name}
                            path={file.path}
                            type={file.mime_type}
                            public_key={file.public_key} />
                    </div>
                )
            }

            {
                loading && (
                    <div className='disc__files_section'>
                        <LoadingContainer />
                    </div>
                )
            }
            <PopupLoadingFile />
        </div>
    )
}

const File = (props) => {

    const dispatch = useDispatch()

    const {
        name,
        type,
        path,
        public_key,
    } = props

    const [_type, setType] = useState(type)
    const loadingFile = useSelector(state => state.yandex.loadingFile)
    let icon = null

    useEffect(() => {
        if (_type != undefined) {
            const index = _type.indexOf('/')
            const result = index !== -1 ? _type.slice(0, index) : _type
            setType(result)
        } else {
            setType('dir')
        }

    }, [])

    const handleDownload = () => {
        dispatch(fetchGetDownloadLink({ public_key: public_key, path: path }))
    }

    switch (true) {
        case _type == 'image':
            icon = <CiImageOn className='file__icon' />
            break
        case _type == 'application':
            icon = <MdOutlineSettingsApplications className='file__icon' />
            break
        case _type == 'video':
            icon = <MdOndemandVideo className='file__icon' />
            break
        case _type == 'file':
            icon = <CiFileOn className='file__icon' />
            break
        case _type == 'dir':
            icon = <GoFileDirectory className='file__icon' />
    }

    return (
        <div className='file'>

            {icon}
            <div className='file__name'>{name.length > 10 ? name.slice(0, 10) + "..." : name}</div>
            {
                _type != 'dir' && (
                    <MdDownload
                        onClick={() => { handleDownload() }}
                        className='file__download' />
                )
            }
            {
                _type == 'dir' && (
                    <RxCross1 className='file__download inactive' />
                )
            }
        </div>
    )

}

export default Disc