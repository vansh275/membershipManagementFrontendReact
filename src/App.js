// import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateMember from './UpdateMember';
import Welcome from './Welcome';

function App() {
  return (
    <div className='App bg-dark'>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path='/welcome' element={<Welcome/>}></Route>
        <Route path='/:id' element={<Student />}></Route>
        <Route path='/create/:id' element={<CreateStudent/>}></Route>
        <Route path='/update/:ownerId/:memberId' element={<UpdateMember/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;