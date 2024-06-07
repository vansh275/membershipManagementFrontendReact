import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [userName, setUserName] = useState('');
  const [userPass,setUserPass]=useState('');
  const [signinName,setSignName] = useState('');
  const [signinPass,setSignPass]=useState('');
  const [className,setClassName]=useState('btn btn-primary');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  //check password

  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (password.length > maxLength) {
      return `Password must be no more than ${maxLength} characters long.`;
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must con tain at least one special character (!@#$%^&*).';
    }
    return '';
  };


  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setUserPass(password);
    const error = validatePassword(password);
    setPasswordError(error);
  };

  //NEw USer

  const handleSubmitNewUser = async(e) => {
    e.preventDefault();
    //alert(`Form 1 Submitted with data: ${formData1}`);
    if(userName===''){
      alert('User name cannot be empty');
    }
    else{
      console.log(process.env.REACT_APP_BASE_URL);
    axios.post(`${process.env.REACT_APP_BASE_URL}/newuser`,{userName,userPass})
        .then(res=>{
            if(res.status===200){
                alert("Registerd Successfully \n Now login");
                setUserName('');
                setUserPass('');
            }
        }).catch(err=>{
            if(err.response.status===400){
                alert('not unique');
            }
        });
    }
    
  };

  //Already USer

  const handleSubmitAlreadyUser = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BASE_URL}/alreadyuser`,{signinName,signinPass})
    .then(async res=>{
        if(res.status===200){
            //alert('ok');
            // await axios.get('/'+userID);
            console.log(res);
             navigate('/'+res.data);
           //alert('ok');
        }
        
    }).catch(err=>{
      if (err.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        if (err.response.status === 400) {
          alert('Invalid');
        }
      }
      else{
        console.log(err);
      }
    });
  };

  const CheckServer = async () => {
    // alert('It can take upto 1 min for (FREE USERS)');
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/check`);
      if (res.status === 200) {
        setClassName('btn btn-success');
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
    <button className={className} onClick={CheckServer}>Check Server</button><span>   if Green means working</span>
    <div className="container vh-100 d-flex align-items-center">
      <div className="row w-100">
        <div className="col-5 d-flex justify-content-center align-items-center">
          <div className="form-container bg-secondary text-white p-3 rounded">
          <h3>Sign Up</h3>
            <form onSubmit={handleSubmitNewUser}>
              <div className="form-group">
                <label htmlFor="input1">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter your username'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="input1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder='Enter your password'
                  value={userPass}
                  onChange={handlePasswordChange}
                />
                {passwordError && <p className="text-warning">{passwordError}</p>}
              </div>
              <button type="submit" className="btn btn-light mt-2">Submit</button>
            </form>
          </div>
        </div>

        <div className="col-2 d-flex justify-content-center align-items-center">
          <div className="separator"></div>
        </div>

        <div className="col-5 d-flex justify-content-center align-items-center">
          <div className="form-container bg-success text-white p-3 rounded">
          <h3>Sign In</h3>
            <form onSubmit={handleSubmitAlreadyUser}>
              <div className="form-group">
                <label htmlFor="input2">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Enter your UserName'
                  onChange={(e) => setSignName(e.target.value)}
                />
                <label htmlFor="input2">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder='Enter your Password'
                  onChange={(e) => setSignPass(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-light mt-2">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
