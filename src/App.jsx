
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'
import Portfolio from './components/Portfolio/Portfolio'
import Gear from './components/Gear/Gear'
import Contact from './components/Contact/Contact'
import {Routes, Route} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/gear' element={<Gear />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
