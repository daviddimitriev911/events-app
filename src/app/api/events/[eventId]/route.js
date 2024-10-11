import Event from "@/models/Event";
import dbConnect from "@/utils/mongodb";
import axios from "axios";
import { jwtDecrypt, SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getUserData } from "@/app/api/user/route";

export const DELETE = async (request, { params }) => {
    try{
        const userId = await getUserData(request);
        if(userId){
            await dbConnect();
            await Event.deleteOne({_id : params.eventId, createdBy: userId});
            return new NextResponse("User registered for the event", {status:200});
        }
        return new NextResponse( "User not logged in!", {status:200});
    }catch (error){
        return new NextResponse("Error :" + error.message, {status:500});
    }
}

export const GET = async (request, { params }) => {
    try{
        await dbConnect();

        const filter = { _id: params.eventId }
        const events = await Event.findOne().where(filter).populate('createdBy','username').populate({
            path:     'attendees',			
            populate: { path:  'username'}
        });
        return new NextResponse(JSON.stringify(events), {status: 200})
    } catch (error) {
        return new NextResponse("Error :" + error.message, {status:500})
    }
}

export const PUT = async (request) => {
    try{
        
        const userId = await getUserData(request);
        if(userId){
            const body = await request.json();
            await dbConnect();

            await Event.updateOne({_id : body._id, createdBy: userId}, body)

            return new NextResponse("event updated", {status:200});
        }
        return new NextResponse( "User not logged in!", {status:200});
    }catch (error){
        return new NextResponse("Error :" + error.message, {status:500});
    }
}

