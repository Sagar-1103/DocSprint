import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Documents from './pages/Documents';
import TextEditor from './components/TextEditor';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path='/'element={<Home />} />
        <Route path='/login'element={<Login />} />
        <Route path='/signup'element={<Signup/>} />
        <Route path='/forgot-password'element={<ForgotPassword/>} />
        <Route path='/documents'element={<Documents/>} />
        <Route path='/documents/:id'element={<TextEditor/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
