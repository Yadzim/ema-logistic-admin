import { useState } from 'react';
import { message } from 'antd';
import instance from 'config/axios.config';


export type TypeUseDeleteOne = {
    refetch: boolean,
    loading: boolean,
    fetch: (url: string, data?: any) => Promise<void>
}

const useDeleteOne = (): TypeUseDeleteOne => {


    const [refetch, setReFetch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetch = async (url: string, data: any) => {
        try {
            setLoading(true);
            const response = await instance({ url, method: "DELETE", data });
            setReFetch(p => !p)
            // if (response.data?.status) {
            //     // asyncN('success', 'delete', response.data?.message).then(() => setReFetch(!refetch));
            // } else {
            //     // asyncN('error', 'delete', response.data?.message);
            // }
            // setLoading(false);

        } catch (error) {
            message.error("Something went wrong !", 1);
        } finally {
            setLoading(false);
        }
    }

    return { refetch, loading, fetch }

}

export default useDeleteOne;