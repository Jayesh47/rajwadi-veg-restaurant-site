import api from '@/app/api';

export default async function FetchReservation() {
    const token = sessionStorage.getItem("userToken");
    const res = await api.post("/view-reservations", {}, {headers: {'Authorization': token}});
    return res.data;
}