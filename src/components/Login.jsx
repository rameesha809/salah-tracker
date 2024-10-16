import React from 'react'

export default function Login() {
  return (
    <div>
     
<div className="bg-light">
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{width: "30rem"}}>
            <div className="card-body">
                <h5 className="card-title text-center">Login</h5>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="htmlForm-label">Email address</label>
                        <input type="email" className="htmlForm-control" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="htmlForm-label">Password</label>
                        <input type="password" className="htmlForm-control" id="password" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <div className="text-center mt-3">
                    <a href="#">Forgot Password?</a>
                </div>
                <div className="text-center mt-2">
                    <small>Don't have an account? <a href="#">Sign up</a></small>
                </div>
            </div>
        </div>
    </div>

</div>
    </div>
  )
}
