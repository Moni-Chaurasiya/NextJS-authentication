"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
export default function LoginPage() {

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
     
    })

    const [buttonDisabled, setButtonDisables] = useState(false)
    const [loading, setloading] = useState(false)
    const onLogin = async () => {
        try {
            setloading(true)
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data);
            router.push('/profile')
        } catch (error: any) {
            console.log("Login  fail")
            toast.error(error.message);

        }finally{
            setloading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 ) {
            setButtonDisables(false)
        } else {
            setButtonDisables(true)
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <br />
 
             <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder='email'
                    type="text"
                />
                 <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder='password'
                type="text"
            />
          <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={onLogin}>{buttonDisabled ? "No login" : "Login"}</button>
          <p>Do not have an account ?<span className="text-red-500">  <Link href="/signup">Visit signup page</Link></span></p> 
        </div>
    )
}