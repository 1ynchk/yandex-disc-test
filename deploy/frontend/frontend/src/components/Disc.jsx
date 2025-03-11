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
import Filter from './Filter';

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
    const [filter, setFilter] = useState(null)
    const [filtredArray, setFiltredArray] = useState(null)

    useEffect(() => {
        setFiltredArray(dir)
    }, [dir])

    useEffect(() => {
        let lst = []
        if (filter != null) {
            for (let i in dir) {
                if (dir[i].mime_type != undefined) {
                    const index = dir[i].mime_type.indexOf('/')
                    const result = index !== -1 ? dir[i].mime_type.slice(0, index) : dir[i].mime_type
                    if (result == filter) {
                        lst.push(dir[i])
                    }
                }
                setFiltredArray(lst)
            }
        } else {
            setFiltredArray(dir)
        }
    }, [filter])

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

            <div className='disc__subtitle'>Файлы:</div>

            <div className='disc__section'>
                <div className='disc__files_section'>
                    {
                        loading == false && error == true && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='disc__erorr_container'>
                                <div className='disc__error_title'>
                                    Произошла ошибка при запросе к серверу
                                    <FaExclamation />
                                </div>
                            </motion.div>
                        )
                    }

                    {
                        filtredArray != null && filtredArray.length == 0 && dir.length != 0 && (
                            <div className='disc__p'>
                                К сожалению, ничего не было найдено
                            </div>
                        )
                    }

                    {
                        !error && loading == false && filtredArray != null && dir.length == 0 && filtredArray.length == 0 && (
                            <div className='disc__p'>
                                Директория пуста
                            </div>
                        )
                    }

                    {
                        _type == 'dir' && (
                            filtredArray.map((el, index) => {
                                return <File
                                    key={index}
                                    name={el.name}
                                    path={el.path}
                                    type={el.mime_type}
                                    public_key={el.public_key}
                                />
                            })
                        )
                    }

                    {
                        _type == 'file' && (
                            <File
                                name={file.name}
                                path={file.path}
                                type={file.mime_type}
                                public_key={file.public_key} />
                        )
                    }

                    {
                        loading && (<LoadingContainer />)
                    }
                </div>
                <Filter type={_type} filter={filter} setFilter={setFilter} />
            </div>
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

    const [_type, setType] = useState(null)
    let icon = null

    useEffect(() => {
        if (type != undefined) {
            const index = type.indexOf('/')
            const result = index !== -1 ? type.slice(0, index) : type
            setType(result)
        } else {
            setType('dir')
        }

    }, [type])

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