import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import M from 'materialize-css'


export default function Signup() {

    const [credendtials, setCredendtials] = useState({name:"",email:"",password:"",geolocation:""})
    const navigate = useNavigate()

    const onChange = (event)=>{
        setCredendtials({...credendtials,[event.target.name]:event.target.value})
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();
        const responce = await fetch('http://localhost:5000/api/createuser', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name:credendtials.name,
                email:credendtials.email,
                password:credendtials.password,
                location:credendtials.geolocation
            })
        });
        const json = await responce.json()
        // console.log(json);

        if(!json.success){
            // M.toast({html: 'I am a toast!'})
            alert("Eter valid Details")
        }
        if(json.success){
            navigate('/login');
        }
    }

  return (
    <>
    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name='name' value={credendtials.name} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' value={credendtials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" name='password' value={credendtials.password} onChange={onChange} id="exampleInputPassword1" />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Location</label>
                <input type="text" className="form-control" name='geolocation' value={credendtials.geolocation} onChange={onChange} placeholder='Enter your location'/>
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className='m-3 btn btn-danger'>Already have an account?</Link>
        </form>
    </div>
    </>
  )
}
