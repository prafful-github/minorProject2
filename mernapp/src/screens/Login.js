import React,{ useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [credendtials, setCredendtials] = useState({email:"",password:""})

  const onChange = (event)=>{
      setCredendtials({...credendtials,[event.target.name]:event.target.value})
  }

  const handleSubmit = async(e)=>{
      e.preventDefault();
      const responce = await fetch('http://localhost:5000/api/loginuser', {
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({
              email:credendtials.email,
              password:credendtials.password
          })
      });
      const json = await responce.json()
      console.log(json);

      if(!json.success){
          alert("Eter valid Details")
      }
      if(json.success){
        localStorage.setItem("userEmail", credendtials.email)
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"))
        navigate('/')
      }
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>

          <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credendtials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credendtials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/signup" className='m-3 btn btn-danger'>Create new account</Link>
      </form>
  </div>
  )
}
