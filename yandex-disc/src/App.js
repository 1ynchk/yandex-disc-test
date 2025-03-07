import './static/css/index.css'

import Header from './components/Header';
import Popup from './components/Popup';
import { useState } from 'react';

function App() {
  const [isPopupActive, setPopupActive] = useState(false)

  return (
    <div className="App">
      <div className="container">
        <Header
          setPopupActive={setPopupActive}
          isPopupActive={isPopupActive} />
        <Popup
          setPopupActive={setPopupActive}
          isPopupActive={isPopupActive}
        />
      </div>
    </div>
  )
}

export default App;
