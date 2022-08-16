import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Home from './Views/Home.jsx';
import Requests from './Views/Requests.jsx';
import Complaints from './Views/Complaints.jsx';
import VerifyEmail from './Views/VerifyEmail.jsx';
import AccountRequests from './Views/AccountRequests.jsx';
import ComplaintDetails from './Views/ComplaintDetails.jsx';
import VehicleDetails from './Views/VehicleDetails.jsx';
import Login from './Views/Login.jsx';
import AccountRequestsDetails from './Views/AccountRequestsDetails.jsx';
import Chat from './Views/Chat.jsx';
import ViewChatScreen from './Views/ViewChatScreen'
import DirectToLoginPage1 from './Views/DirectToLoginPage1.jsx';
import DirectToHomePage1 from './Views/DirectToHomePage1.jsx';
import DirectToHomePage2 from './Views/DirectToHomePage2.jsx';
import './App.css';

var user=localStorage.getItem('admin');

function App() {
console.log(user)
  return (
    <div className="App">
      {
        user == null ? (
        <Routes>
          <Route path='/' element={<DirectToLoginPage1 />} />
          <Route path="/login" element={<Login/>} />
          <Route path='/forget-password' element={<VerifyEmail />} />
        </Routes>
          ) : (

            <Dashboard>
          <Routes>
            <Route path='/' element={<DirectToHomePage1 />} />
            <Route path='/:params' element={<DirectToHomePage2 />} />
            <Route path="/dashboard/:id" element={<Home/>} />
            <Route path="/vehicle-requests" element={<Requests/>} />
            <Route path="/vehicle-details/:id" element={<VehicleDetails/>} />
            <Route path="/complaints" element={<Complaints/>} />
            <Route path="/complaint-details/:id" element={<ComplaintDetails/>} />
            <Route path="/account-requests" element={<AccountRequests/>} />
            <Route path="/account-requests-details/:id" element={<AccountRequestsDetails/>} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="/view-chat/:id" element={<ViewChatScreen />} />
          </Routes>
          </Dashboard>
        )
    }
    </div>
  );
}

export default App;
