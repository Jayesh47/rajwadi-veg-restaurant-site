import api from '@/app/api';

export default async function fetchProducts() {
    const res = await api.get("/view-products");
    let data;
    if (res.data) {
        const _prod = res.data;
        data = _prod["product"].map((data:any) => {if (data) return {
            productId: data["_id"],
            thumbnail: data["productThumbnail"],
            _name: data["ProductName"],
            _price: data["productPrice"],
            _description: data["productDescription"],
            _discount: data["productDiscount"]
        }});
    }
    
    return data;
}