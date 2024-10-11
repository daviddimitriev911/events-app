import Event from "@/models/Event";
import dbConnect from "@/utils/mongodb";
import axios from "axios";
import { jwtDecrypt, SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getUserData } from "@/app/api/user/route";

export const POST = async (request, { params }) => {
    try{
        const userId = await getUserData(request);
        if(userId){
           
            await dbConnect();

            const filter = { _id: params.eventId }
            const events = await Event.findOne().where(filter).populate('createdBy','username').populate({
                path:     'attendees',			
                populate: { path:  'username'}
            });

            if(!events.attendees.find( item => item._id.toString() === userId)){
                await Event.updateOne(
                    {_id : params.eventId}, 
                    { $push: { attendees: userId }}
                );
            }

           
            return new NextResponse("User registered for the event", {status:200});
        }
        return new NextResponse( "User not logged in!", {status:200});
    }catch (error){
        return new NextResponse("Error :" + error.message, {status:500});
    }
}

export const DELETE = async (request, { params }) => {
    try{
        const userId = await getUserData(request);
        if(userId){
           
            await dbConnect();
            await Event.updateOne(
                {_id : params.eventId}, 
                { $pull: { attendees: userId }}
            );
            return new NextResponse("User registered for the event", {status:200});
        }
        return new NextResponse( "User not logged in!", {status:200});
    }catch (error){
        return new NextResponse("Error :" + error.message, {status:500});
    }
}

