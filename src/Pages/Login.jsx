import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigat = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);

    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault()
      setLoading(true);
      const data = {
        email,
        password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}api/login`, data)
      .then((response) => {
        console.log(response.data);

        if(response.status === 200){
        setLoading(false);  
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigat('/');
      } else {
        alert("Login Failed");
        setLoading(false);
      }

      })
      .catch((err) => {
        console.error("Login error:", err.response.data);
        alert(err.response.data.message);

        const check = !!err.response.data.message === "Please verify your email before logging in"
        console.log(check);
        if(!check){
          localStorage.setItem('emailForOtp', email);
          navigat('/otp');
        }
        setLoading(false);
        navigat('/login');
      })

    }

    // Function to navigate to the Signup page
    const navigate = () => {
        navigat('/Signup');
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-50 to-blue-50">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <h2 className="text-4xl font-extrabold text-green-700 mb-2 text-center">Login Your Account</h2>
        <p className="text-center text-gray-500 mb-8">Join us and get started in seconds!</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" name='email' className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border"/>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" name='password' className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3 border"/>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span className='text-green-700 font-bold underline hover:text-green-900 cursor-pointer' onClick={navigate}>Sign Up</span>
            </p>
          </div>

          <div>
            {/* <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Login
            </button> */}


            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-dashed rounded-full animate-[spin_4s_linear_infinite]"></div>
                  <span>Loging Inn...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
