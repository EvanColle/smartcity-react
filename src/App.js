import './App.css';
import ResponsiveNavbar from './components/ResponsiveNavbar'
import {useEffect} from "react";


function App() {

    useEffect(() => {
        document.title = "Board'L"
    }, [])

  return (
      <div className="App">
        <ResponsiveNavbar/>
    </div>
  );
}

export default App;
