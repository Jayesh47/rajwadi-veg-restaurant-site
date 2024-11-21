import { NextRequest, NextResponse } from 'next/server';
import {v2 as cloud} from 'cloudinary';
import Product from '../../lib/Product';

cloud.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_SECRET_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function PUT(req: NextRequest) {
    try {
        const data = await req.formData();
        const productImg = data.get("productImg") as File | null;
        if (!productImg || productImg === null) {
            return NextResponse.json({message: "product image required"}, {status: 201});
        }
        const _buffer = await productImg.arrayBuffer();
        const base64Img = Buffer.from(_buffer).toString("base64");
        const base64ImageString = `data:${productImg.type};base64,${base64Img}`;
        const results = await cloud.uploader.upload(base64ImageString);
        const url = cloud.url(results.public_id, {
            transformation: [
                {
                    quality: 'auto',
                    fetch_format: 'auto'
                },
                {
                    width: 1200,
                    height: 1200
                }
            ]
        });

        const _data = {
            productThumbnail: url,
            ProductName: data.get("productName")?.toString(),
            productPrice: data.get("productPrice")?.toString(),
            productDescription: data.get("description")?.toString(),
            productDiscount: data.get('discount')?.toString(),
            productCategory: data.get("category")?.toString()
        }
        const addProduct = new Product(_data);
        addProduct.save();
        return NextResponse.json({message: "success"}, {status: 200});
    } catch (err) {
        return NextResponse.json({message: "Internal Server Error!"}, {status: 500});
    }
}