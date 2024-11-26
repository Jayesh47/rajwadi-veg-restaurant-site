import api from '@/app/api';
import {toast} from 'react-hot-toast';

interface empId { employeeId?: string }
export default function RemoveBtn({ employeeId }: empId) {
    const handleRemove = () => {
        const isConfirm = window.confirm("are you sure you want to remove this employee.");
        if (isConfirm) {
            api.delete("/remove-employee-details", {headers: {'Authorization': employeeId}}).then((res) => {
                const _res = res.data;
                if (_res["message"] === "success") {
                    toast.success("Employee details successfully removed");
                }
            });
        }
    }
    return (
        <>
            <button onClick={handleRemove} className="text-red-600 hover:underline">Remove</button>
        </>
    )
}