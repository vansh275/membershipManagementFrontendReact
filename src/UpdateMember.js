import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateMember() {
    const [name,setName]=useState('')
    const [contact,setContact]=useState('')
    const [expireDate,setExpireDate]=useState('')
    const [monthsError,setMonthsError]=useState('')
    const navigate = useNavigate();
    const {ownerId,memberId}= useParams();

    useEffect(() => {
            // console.log('owner id ' + ownerId + ' memberId ' + memberId);
            axios.get(`${process.env.REACT_APP_BASE_URL}/updateDetail/${ownerId}/${memberId}`)
                .then(res => {
                    console.log(res);
                    setName(res.data.name);
                    setContact(res.data.contact);
                })
                .catch(err => {
                    console.error(err);
                });
                // console.log("i fire once");
    }, [ownerId, memberId]);



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
        console.log('owner id s '+ownerId);
        console.log('member id s '+memberId);
        axios.put(`${process.env.REACT_APP_BASE_URL}/update/`+ownerId+'/'+memberId,{name,contact,expireDate})
        .then(res=>{
            console.log(res);
            navigate('/'+ownerId);
        }).catch(err=>console.log(err));
    }
  return (
    <div className='d-flex vh-100 justify-content-center align-items-center' style={{backgroundColor:'#003285'}}>    
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={HandleSubmit}>
                <h2>Update students</h2>
                <div className='mb-2'>
                    <label htmlFor=''>Name</label>
                    <input type='text' placeholder='Enter name' value={name} className='form-control' 
                        onChange={e=> setName(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>Contact</label>
                    <input type='tel' placeholder='Enter contact number' pattern="[0-9]{10}" required value={contact} className='form-control'
                        onChange={e=> setContact(e.target.value)}
                    />
                </div>
                <div className='mb-2'>
                    <label htmlFor=''>Months</label>
                    <input type='number' placeholder='Enter months of membership' className='form-control'
                        onChange={handleMonthsChange}
                    />
                    {monthsError && <p className="text-dark">{monthsError}</p>}
                </div>
                <button className='btn btn-success'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateMember