    import React, { useEffect, useState } from 'react'
    import axios from 'axios';
    import {Link, useParams} from 'react-router-dom';

    function Student() {
        const {id}=useParams();
        const today=new Date();


        today.setHours(0,0,0,0);
        const [student,setStudent]=useState([])
        // const [searchVisible, setSearchVisible] = useState(false);
        // const [searchValue, setSearchValue] = useState('');
        
        // const handleSearchClick = () => {
        //     setSearchVisible(!searchVisible);
        // }
    
        // const handleInputChange = (e) => {
        //     setSearchValue(e.target.value);
        // }

        useEffect(()=>{
            axios.get(`${process.env.REACT_APP_BASE_URL}/`+id)
            .then(res=>setStudent(res.data))
            .catch(err=>console.log(err));
        },[id]);

        const HandleDelete = async(ownerId,memberId)=>{
        try{
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete/`+ownerId+'/'+memberId)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

    const HandleShowFullId = async (id)=>{
        alert(id);
    }

    return (
        <div className='d-flex vh-100 bg-dark justify-content-center' >
            <div className='w-100 rounded p-3' >
                <Link to={`/create/${id}`} className='btn btn-success'>Add +</Link>
                {/* <button className='btn btn-warning' >Search</button> */}
                {/* {searchVisible && (
                    <div className='mt-2'>
                        <input 
                            type='text' 
                            placeholder='Enter search query' 
                            className='form-control'
                            onChange={handleInputChange} 
                        />
                    </div>
                )} */}
                <div className='table-responsive table-striped' style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                <table className='table table-dark' >
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone no.</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        student.map((data,i)=>{
                            const lastDate=new Date(data.expireDate);
                            lastDate.setHours(0,0,0,0);

                            const status=lastDate>=today?"Valid":"Expired";
                            
                            return(
                            <tr key={i}>
                                <td>{data._id.substring(6,10)}</td>
                                <td>{data.name}</td>
                                <td>{data.contact}</td>
                                <td>{status}</td>
                                <td>
                                    <Link className='btn btn-primary m-2' to={`/update/${id}/${data._id}`} >Update</Link>
                                    <Link className='btn btn-danger' onClick={e=>HandleDelete(id,data._id)} >Delete</Link>
                                    <button className='btn btn-secondary m-2' onClick={e=>HandleShowFullId(data._id)}>Show full ID</button>
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
    }

    export default Student