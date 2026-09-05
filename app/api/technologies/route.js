import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Technology from "@/models/Technology";
import { getServerSession } from "next-auth/next";

export async function POST(request) {
  try {
    const session = await getServerSession();
    // Assuming simple protection
    
    const body = await request.json();
    const { name, icon, color, order, isPublished } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await dbConnect();
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const existing = await Technology.findOne({ slug });
    if (existing) {
      return NextResponse.json({ error: "A technology with this name already exists" }, { status: 400 });
    }

    const tech = await Technology.create({
      name, slug, icon, color, order, isPublished
    });

    return NextResponse.json({ data: tech }, { status: 201 });
  } catch (error) {
    console.error("Create technology error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
