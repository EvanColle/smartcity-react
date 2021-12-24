import './App.css';
import MyRoutes from "./routes/MyRoutes";
import {UserStore} from "./Utils/Store/User";
import {useEffect} from "react";


function App (){

        const user = UserStore.useState(s => s)
        useEffect(() => {document.title = "OnBoard"});
        return (
            <div className="App">
                <MyRoutes connectionState={user.auth}/>
            </div>
        );



}

export default App;
