import Product from '@/app/apis/lib/Product';
import {NextResponse, NextRequest} from 'next/server';
import {v2 as cloud} from 'cloudinary';

cloud.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_SECRET_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

function removeImageFromCloud(publicId: String) {
    cloud.uploader.destroy(publicId.toString());
}

export async function DELETE(req: NextRequest) {
    try {
        const _productId = await req.json();
        const res = await Product.findById(_productId);
        const _res = res["productThumbnail"].split("?");
        const _del = await Product.findByIdAndDelete(_productId);
        removeImageFromCloud(_res[0].split("w_1200/")[1]);
        if (_del) {
            return NextResponse.json({message: "success"}, {status: 200});
        }else {
            return NextResponse.json({message: "not deleted"}, {status: 201});
        }
    }catch (err) {
        return NextResponse.json({message: "Internal Error Occurred"}, {status: 500});
    }
}
