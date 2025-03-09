import { motion } from "framer-motion"

const Filter = (props) => {

    const {
        filter,
        setFilter,
        type
    } = props

    return (
        <motion.div
            initial={{ backgroundColor: type == 'file' || type == '' ? '#808080' : '#f0f8ff' }}
            animate={{ backgroundColor: type == 'file' || type == '' ? '#808080' : '#f0f8ff' }}
            className='disc__filters'>
            <motion.div
                initial={{ color: type == 'file' || type == '' ? '#ffffff' : '#808080' }}
                animate={{ color: type == 'file' || type == '' ? '#ffffff' : '#808080' }}
                className='disc__subtitle filter_container'>Фильтры:</motion.div>
            <div className='disc__filter'>
                <div className='disc__filter_title'>Отсортировать по типу:</div>
            </div>
            <div className='disc__filters_container'>
                <div className='disc__filter_el'>
                    <div className='disc__filter_subtitle'>Видео</div>
                    <input
                        disabled={type == 'file' || type == '' ? true : false}
                        checked={filter == 'video' ? true : false}
                        name="filter"
                        onChange={() => setFilter('video')}
                        type='radio' />
                </div>
                <div className='disc__filter_el'>
                    <div className='disc__filter_subtitle'>Фотография</div>
                    <input
                        disabled={type == 'file' || type == '' ? true : false}
                        checked={filter == 'image' ? true : false}
                        name="filter"
                        onChange={() => setFilter('image')}
                        type='radio' />
                </div>
                <div className='disc__filter_el'>
                    <div className='disc__filter_subtitle'>Файл</div>
                    <input
                        disabled={type == 'file' || type == '' ? true : false}
                        checked={filter == 'file' ? true : false}
                        name="filter"
                        onChange={() => setFilter('file')}
                        type='radio' />
                </div>
                <div className='disc__filter_el'>
                    <div className='disc__filter_subtitle'>Файл приложения</div>
                    <input
                        disabled={type == 'file' || type == '' ? true : false}
                        checked={filter == 'application' ? true : false}
                        name="filter"
                        onChange={() => setFilter('application')}
                        type='radio' />
                </div>
                {
                    type == 'dir' && (
                        <button
                            disabled={filter != null ? false : true}
                            onClick={() => setFilter(null)}
                            className="popup__submit">
                            Очистить фильтры
                        </button>
                    )
                }

                {
                    type == 'file' || type == '' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="disc__p disc_p_white">
                            Фильтрацию поддерживают только директории
                        </motion.div>
                    )
                }
            </div>
        </motion.div>
    )
}

export default Filter