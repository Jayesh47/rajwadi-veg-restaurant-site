import { NextRequest, NextResponse } from "next/server";
import Home from '@/app/apis/lib/homepage';
import { promises as fs } from 'fs';
import ModelConnection from "@/app/apis/lib/connection";

export async function PUT(req: NextRequest) {
    await ModelConnection();
    try {
        const data = await req.formData();
        const _ban1 = data.get('banner1') as File | null;
        const _ban2 = data.get('banner2') as File | null;
        const _ban3 = data.get('banner3') as File | null;
        const _ban4 = data.get('banner4') as File | null;

        if (!_ban1 && !_ban2 && !_ban3 && !_ban4) {
            return NextResponse.json({ message: 'Empty Form' }, { status: 200 });
        }

        const home = await Home.findOne({ flag: 'Banner' });

        if (!home) {
            return NextResponse.json({ message: 'Homepage not found' }, { status: 404 });
        }

        let banners = home.banners || [];

        if (_ban1) {
            const banner1 = await _ban1.arrayBuffer();
            const filename1 = `${Date.now()}_${_ban1.name}`;
            await fs.writeFile(`./public/uploads/${filename1}`, Buffer.from(banner1));
            banners[0] = filename1;
        }

        if (_ban2) {
            const banner2 = await _ban2.arrayBuffer();
            const filename2 = `${Date.now()}_${_ban2.name}`;
            await fs.writeFile(`./public/uploads/${filename2}`, Buffer.from(banner2));
            banners[1] = filename2; 
        }

        if (_ban3) {
            const banner3 = await _ban3.arrayBuffer();
            const filename3 = `${Date.now()}_${_ban3.name}`;
            await fs.writeFile(`./public/uploads/${filename3}`, Buffer.from(banner3));
            banners[2] = filename3;
        }
        if (_ban4) {
            const banner4 = await _ban4.arrayBuffer();
            const filename4 = `${Date.now()}_${_ban4.name}`;
            await fs.writeFile(`./public/uploads/${filename4}`, Buffer.from(banner4));
            banners[3] = filename4;
        }

        const res = await Home.findOneAndUpdate({flag: 'Banner'}, {banners: banners});
        await res.save();

        return NextResponse.json({ message: 'Banners updated successfully', banners }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Internal error occurred, try to pay more to developer!' }, { status: 500 });
    }
}