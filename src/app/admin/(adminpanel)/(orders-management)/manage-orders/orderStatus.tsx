import api from '@/app/api';
import {toast} from 'react-hot-toast';

interface OrderbtnProps {_customerId: string}

export default function OrderBtn({_customerId}:OrderbtnProps) {
    const handleOrderComplete = () => {
        api.put("/order-completed", {custId: _customerId}).then((res) => {
            const _res = res.data;
            if (_res["message"] === "success") {
                toast.success("Order status changed to completed.");
            }
        }).catch((err) => console.log(err));
    }
    return (
        <button onClick={handleOrderComplete} className="text-green-500 hover:underline">Complete Order</button>
    )
}