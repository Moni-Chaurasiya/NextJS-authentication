import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password } = reqBody
        console.log(reqBody);

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User doesn't exists" }, { status: 400 })
        }

        console.log("User Exist");


        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({ error: "Wrong Password" }, { status: 400 })
        }

 
       const tokenData= {
        id:user._id,
        username:user.username,
        email:user.email

       }

       const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:'1d'});
       

    
      
        const response = NextResponse.json({
            message: "User login successfully",
            success: true,
            
        })
        response.cookies.set("token",token,{httpOnly:true})

        return response

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}