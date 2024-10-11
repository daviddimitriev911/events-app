import Event from "@/models/Event";
import { NextResponse } from "next/server";
import { getUserData } from "@/app/api/user/route";

const secret = process.env.SECRET;

export const GET = async (request) => {
    try{
        const userId = await getUserData(request);
        if(userId){
            const filter = {
                createdBy: {
                    _id: userId
                }
            }
            const events = await Event.find().where(filter).populate('createdBy','username').populate({
                path:     'attendees',			
                populate: { path:  'username'}
              });
            return new NextResponse(JSON.stringify(events), {status: 200})
        }
        return new NextResponse( "User not logged in!", {status:200});        
    } catch (error) {
        return new NextResponse("Error :" + error.message, {status:500})
    }
}