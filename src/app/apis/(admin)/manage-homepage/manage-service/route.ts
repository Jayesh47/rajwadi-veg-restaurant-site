'use server';
import ModelConnection from '@/app/apis/lib/connection';
import { NextResponse, NextRequest } from 'next/server';
import Home from '@/app/apis/lib/homepage';
import { promises as fs } from 'fs';

export async function PUT(req: NextRequest) {
    await ModelConnection();
    try {
        const formData = await req.formData();
        const coverImg = formData.get("ServiceCoverImg") as File | null;
        const service = formData.get("Service");

        let updateData: { [key: string]: any } = {};

        // Check if service is provided and update accordingly
        if (service && service !== "") {
            updateData.description = service.toString();
        }

        // Check if cover image is provided and handle the file upload
        if (coverImg && coverImg.size > 0) {
            const data = await coverImg.arrayBuffer();
            const filename = `${Date.now()}_${coverImg.name}`;
            await fs.writeFile(`./public/uploads/${filename}`, Buffer.from(data));
            updateData.banners = filename;
        }

        // If neither service nor cover image is provided, return an empty form response
        if (!service && (!coverImg || coverImg.size === 0)) {
            return NextResponse.json({ message: "Empty Form!" }, { status: 201 });
        }

        // Only proceed with the update if there is data to update
        if (Object.keys(updateData).length > 0) {
            // Example database update logic (uncomment when ready to use)
            await Home.findOneAndUpdate({ flag: "services" }, updateData);
            return NextResponse.json({ message: "success" }, { status: 200 });
        }

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "internal error" }, { status: 500 });
    }
}
