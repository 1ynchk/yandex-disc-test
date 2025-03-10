import './static/css/index.css'

import Header from './components/Header';
import Popup from './components/Popup';
import LoadingScreen from './components/LoadingScreen';
import Welcome from './components/Welcome';
import Disc from './components/Disc';
import { fetchCheckLogin } from './store/requests/check-login';

import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isPopupActive, setPopupActive] = useState(false)
  const loading = useSelector(state => state.users.loading)
  const isLogin = useSelector(state => state.users.isLogin)

  // console.log(document.cookie)

  // useEffect(() => {
  //   dispatch(fetchCheckLogin())
  // }, [isLogin])

  // useEffect(() => {
  //   if (isLogin) {
  //     navigate('/disc')
  //   }
  // }, [isLogin])

  return (
    <div className="App">
      <div className="container">
        <Header
          setPopupActive={setPopupActive}
          isPopupActive={isPopupActive} />
        {/* <Popup
          setPopupActive={setPopupActive}
          isPopupActive={isPopupActive}
        /> */}
        <Routes>
          
          <Route exact path='/' element={<Disc />} />
        </Routes>
      </div>

      {
        loading && <LoadingScreen />
      }
    </div>
  )
}

export default App;
