import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import Home from '@/app/apis/lib/homepage';
import ModelConnection from '@/app/apis/lib/connection';

export async function PUT(req: NextRequest) {
    await ModelConnection();
    try {
        const _file = await req.formData();
        const coverImg = _file.get("historyCoverImg") as File | null;
        const history = _file.get("history");

        let updateData: { [key: string]: any } = {};

        // Update history description if provided
        if (history && history !== "") {
            updateData.description = history.toString();
        }

        // Handle file upload if cover image is provided
        if (coverImg && coverImg.size > 0) {
            const data = await coverImg.arrayBuffer();
            const filename = `${Date.now()}_${coverImg.name}`;
            await fs.writeFile(`./public/uploads/${filename}`, Buffer.from(data));
            updateData.banners = filename;
        }

        // Return an empty form message if neither history nor image is provided
        if (!history && (!coverImg || coverImg.size === 0)) {
            return NextResponse.json({ message: "Empty Form!" }, { status: 201 });
        }

        // Perform the update if there is data to update
        if (Object.keys(updateData).length > 0) {
            const updatedHistory = await Home.findOneAndUpdate({ flag: "history" }, updateData, { new: true });

            if (updatedHistory) {
                await updatedHistory.save();
                return NextResponse.json({ message: "success" }, { status: 200 });
            }
        }
        console.log("No changes made");
        return NextResponse.json({ message: "No changes made" }, { status: 304 });

    } catch (err) {
        console.error("Internal Error: ", err);
        return NextResponse.json({ message: "Internal error!" }, { status: 500 });
    }
}
