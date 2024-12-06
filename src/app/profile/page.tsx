"use client"

import React,{useState} from "react"
import Link from "next/link"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation"
export default function page(){
    const router= useRouter();
    const [data,setData] =useState("Nothing");

    const getUserDetails= async ()=>{
        const res = await axios.post("api/users/me")
        console.log(res.data.data._id);
        setData(res.data.data._id)

    }

    const logout= async ()=>{
        try {
            await axios.get("api/users/logout")
            toast.success("logout success")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <hr/>
            <h2>{data==="nothing"?"Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button className="p-2 border bg-blue-500 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={logout}>logout</button>
            <button className="p-2 border bg-red-500 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={getUserDetails}>getUser</button>
        </div>
    )
}