import Event from "@/models/Event";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { getUserData } from "@/app/api/user/route";

export const GET = async () => {
    try{
        await dbConnect();
        const events = await Event.find().populate('createdBy','username').populate({
            path:     'attendees',			
            populate: { path:  'username'}
          });
        return new NextResponse(JSON.stringify(events), {status: 200})
    } catch (error) {
        return new NextResponse("Error :" + error.message, {status:500})
    }
}

export const POST = async (request) => {
    try{
        const userId = await getUserData(request);
        if(userId){
            const body = await request.json();
            await dbConnect();
            const newEvent = new Event({
                ...body,
                createdBy: userId
            });
            await newEvent.save();
            return new NextResponse(JSON.stringify(newEvent), {status:200});
        }
        return new NextResponse( "User not logged in!", {status:200});
    }catch (error){

        return new NextResponse("Error :" + error.message, {status:500});
    }
}

