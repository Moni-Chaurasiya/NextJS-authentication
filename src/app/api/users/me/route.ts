import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connect()

export async function POST(request: NextRequest) {
    try {
        const userId= await getDataFromToken(request);
        console.log('Decoded User ID:', userId);
       const user=await User.findOne({_id:userId}).select("-password")
       console.log('User Data:', user);
       return NextResponse.json({
        message:"User found",
        data:user
    
    })

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}