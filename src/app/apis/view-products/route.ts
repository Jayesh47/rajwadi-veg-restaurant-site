import {NextRequest, NextResponse} from 'next/server';
import Product from '@/app/apis/lib/Product';

export async function GET(req: NextRequest) {
    try {
        const _prodId = await req.nextUrl.searchParams.get("prodId");
        if (_prodId && _prodId !== "all-products" && _prodId !== null) {
            const product = await Product.findById(_prodId.toString());
            return NextResponse.json({product: product}, {status: 200});   
        }
        const products = await Product.find().limit(10);
        if (products.length > 0) {
            return NextResponse.json({product: products}, {status: 200});
        }
        else {
            return NextResponse.json({product: "No Product Found"}, {status: 200});
        }
    }catch (err) {
        console.log(err);
        NextResponse.json({message: "Internal Error Occur"}, {status: 500});
    }
}