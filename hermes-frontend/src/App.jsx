import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Introduction from './pages/Introduction'
import TargetLanguage from './pages/TargetLanguage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/introduction" element={<Introduction />} />
          <Route path="/target-language" element={<TargetLanguage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
