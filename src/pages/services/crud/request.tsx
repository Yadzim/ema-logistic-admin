import { message } from "antd";
import instance from "config/axios.config";
import instanceFile from "config/axios.config/file";


export const submitData = async (id: number | string | undefined, values: any, image: any) => {

    const options = id ? { url: `services/${id}`, method: "PUT", data: { ...values, image } }
        : { url: `services`, method: "POST", data: { ...values, image } };

    const response = await instance(options);

    return response.data;
}

export const sendImage = async (file: any, id?: string) => {

    if (!file && !id) {
        message.warning("Faylni yuklang!!!")
        return new Error()
    }


    const data = new FormData();
    data.append("file", file)

    const options = id ? { url: `files/${id}`, method: "DELETE" } : { url: 'files/upload', method: "POST", data };

    const response = await instanceFile(options);

    return response.data?.data;
}