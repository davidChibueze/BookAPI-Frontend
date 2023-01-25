import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';


function App() {
  return (
    <div className='w-[90%] mx-auto mt-10 antialiased'>
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
