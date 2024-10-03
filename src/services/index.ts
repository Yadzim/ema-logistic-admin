// import { Notification } from "../components/Notifications/notification";
import instance from "../config/axios.config";

export const delete_data = async (url: string, id: number | string, data?: any): Promise<any> => {
    // const response = await instance(data ? { url: `${url}`, method: "DELETE", data: data } : { url: `${url}/${id}`, method: "DELETE" });
    const response = await instance({ url: `${url}/${id}`, method: "DELETE" });

    if (response.data?.status) {
        // Notification('success', 'delete', response.data?.message)
    } else {
        // Notification('error', 'delete', response.data?.message)
    }

    return response;
}