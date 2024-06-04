import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function CreateStudent() {
    const [name,setName]=useState('')
    const [contact,setContact]=useState('')
    const [expireDate,setExpireDate]=useState('')
    const [monthsError,setMonthsError]=useState('')
    const navigate = useNavigate();
    const {id}=useParams();


    const handleMonthsChange = (e) => {
        const months = e.target.value;
        setExpireDate(months);
        if (months > 1000) {
          setMonthsError('Number of months should not exceed 1000');
        } else {
          setMonthsError('');
        }
      };

    function HandleSubmit(event){
        event.preventDefault();
        console.log(event);
        axios.post(`${process.env.REACT_APP_BASE_URL}/create/`+id,{name,contact,expireDate})
        .then(res=>{
            console.log(res);
            navigate('/'+id);
        }).catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>   
        <div className='w-50 bg-success rounded p-3'>
            <form onSubmit={HandleSubmit}>
                <h2  style={{color:'white'}}>Add Member</h2>
                <div className='mb-2 '>
                    <div className="row align-items-start">
                        <label htmlFor='' className='col-12 form-label' style={{ color: 'white' }}>Name</label>
                        <div className='col-6 mx-auto'>
                            <input type='text' placeholder='Enter name' className='form-control' 
                            onChange={e => setName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-2 '>
                    <div className="row align-items-start">
                        <label htmlFor='' className='col-12 form-label' style={{ color: 'white' }}>Contact</label>
                        <div className='col-6 mx-auto'>
                            <input type='tel' placeholder='Enter contact number' pattern="[0-9]{10}" required className='form-control'
                                onChange={e=> setContact(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='mb-2 '>
                    <div className="row align-items-start">
                        <label htmlFor='' className='col-12 form-label' style={{ color: 'white' }}>Number of Months</label>
                        <div className='col-6 mx-auto'>
                            <input type='number' placeholder='Enter months' className='form-control'
                                onChange={handleMonthsChange}
                            />
                            {monthsError && <p className="text-light">{monthsError}</p>}
                        </div>
                    </div>
                </div>                
                <button className='btn btn-warning'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent