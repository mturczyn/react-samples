import './App.css'
import { Link, Outlet } from '@tanstack/react-router'

function App() {
  return (
    <div>
      <nav>
        <Link to="/" preload="intent">Home</Link> |{' '}
        <Link to="/about" preload="intent">About</Link> |{' '}
        <Link to="/contact" preload="intent">Contact</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  
  )
}

export default App
