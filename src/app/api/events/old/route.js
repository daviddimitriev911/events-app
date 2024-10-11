import Event from "@/models/Event";
import dbConnect from "@/utils/mongodb";
import { NextResponse } from "next/server";

const secret = process.env.SECRET;

export const GET = async () => {
    try{
        await dbConnect();
        const filter = {
            date: {
                $lte: new Date()
            }
        }
        const events = await Event.find().where(filter).populate('createdBy','username').populate({
            path:     'attendees',			
            populate: { path:  'username'}
          });
        return new NextResponse(JSON.stringify(events), {status: 200})
    } catch (error) {
        return new NextResponse("Error :" + error.message, {status:500})
    }
}