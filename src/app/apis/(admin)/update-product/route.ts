import { NextResponse, NextRequest } from 'next/server';
import Product from '@/app/apis/lib/Product';
import {v2 as cloud} from 'cloudinary';

cloud.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_SECRET_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: NextRequest) {
    try {
        const data = await req.formData();
        const productimg = data.get("_productimg") as File | null;
        const product = await Product.findById(data.get("productid"));

        if (productimg && productimg !== null) {
            const _buffer = await productimg.arrayBuffer();
            const base64Img = Buffer.from(_buffer).toString("base64");
            const base64ImageString = `data:${productimg.type};base64,${base64Img}`;
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
            if (url) product.productThumbnail = url?.toString();
        }
        if (data.get("_productname")) product.ProductName = data.get("_productname")?.toString();
        if (data.get("_productprice"))  product.productPrice = data.get('_productprice')?.toString();
        if (data.get('_productdiscount')) product.productDiscount = data.get('_productdiscount')?.toString();
        if (data.get("_productcategory")) product.productCategory = data.get("_productcategory")?.toString();
        if (data.get("_productdescription")) product.productDescription = data.get("_productdescription")?.toString() ;
        product.save();
        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}