import connectMongoDB from "@/libs/mongodb";
import Vacation from "@/models/vacation";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { startDate, endDate, message, employeeId, managerId, approved } = await request.json();
    await connectMongoDB();
    await Vacation.create({ startDate, endDate, message, employeeId, managerId, approved });
    return NextResponse.json({ message: "Vacation Request Registered" }, { status: 201 });
}

export async function GET() {
    await connectMongoDB();
    const vacations = await Vacation.find().populate('employeeId');
    return NextResponse.json({vacations});
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Vacation.findByIdAndDelete(id);
    return NextResponse.json({message: "Vacation Request deleted"}, {status: 200});
}

export async function PUT(request) {
    const id = request.nextUrl.searchParams.get("id");
    console.log(id);
    await connectMongoDB();
    await Vacation.findByIdAndUpdate(id, { approved: true });
    return NextResponse.json({message: "Vacation Request approved"}, {status: 200});
}