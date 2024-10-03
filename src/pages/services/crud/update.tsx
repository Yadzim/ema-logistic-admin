import { Dispatch, useEffect, useState } from 'react'
import { Alert, Button, Form, Input, message, Modal } from "antd";
import { useMutation } from '@tanstack/react-query';
import { Notification } from 'components/Notifications/notification';
import { AxiosError } from 'axios';
import { sendImage, submitData } from './request';
import { FILE_URL } from 'config/utils';
import { FaUpload } from 'react-icons/fa6';

const UpdateData = ({ open, setOpen, refetch, selectedItem, setselectedItem }: { open: boolean, setOpen: Dispatch<boolean>, refetch: any, selectedItem: any, setselectedItem: Dispatch<any> }) => {

    const [file, setFile] = useState<any>();
    const [fetchedFile, setFetchedFile] = useState<any>();
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                title: selectedItem?.title,
                author: selectedItem?.author,
                description: selectedItem?.description,
                year: selectedItem?.year,

            })
        }
    }, [selectedItem])

    useEffect(() => {
        if (!open) setselectedItem(undefined)
    }, [open])

    const { mutate, isPending } = useMutation({
        mutationFn: (newVals) => submitData(selectedItem?._id, newVals, fetchedFile?.key),
        onSuccess: async (res) => {
            Notification("success", "update", res?.message)
            refetch()
            setselectedItem(undefined)
            setOpen(false)
            setFile(undefined)
            setFetchedFile(undefined)
            form.resetFields()
        },
        onError: (error: AxiosError<any>) => {
            Notification("error", "update", error?.response?.data ? error?.response?.data?.message : "");
        },
        retry: 0,
    });
    const { mutate: _sendImage, isPending: imageLoading } = useMutation({
        mutationFn: ({ id }: { id?: string }) => sendImage(file, id),
        onSuccess: async (res) => {
            Notification("success", "update", res?.message)
            // if (res?._id) {
            setFetchedFile(fetchedFile ? undefined : res)
            setFile(undefined);
            // }
        },
        onError: (error: AxiosError<any>) => {
            Notification("error", "update", error?.response?.data ? error?.response?.data?.message : "");
        },
        retry: 0,
    });

    const removeImage = () => {
        setFetchedFile(undefined)
        setFile(undefined);
    }

    return (
        <div>
            <Modal
                key={3}
                open={open}
                title={"Xizmat" + (selectedItem ? " tahrirlash" : " qo'shish")}
                // placement="right"
                width={600}
                onCancel={() => {
                    // if (fetchedFile) { _sendImage({ id: fetchedFile?._id }) };
                    setFile(undefined);
                    setFetchedFile(undefined);
                    form.resetFields();
                    setOpen(false);
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={mutate}
                    autoComplete="off"
                >
                    <Alert
                        message="Xizmatni qo'shishdan avval uning rasmini yuklang"
                        type="warning"
                        closable
                        className='mb-4'
                    />
                    {selectedItem && !fetchedFile ? <img className='w-1/2 mxc-auto rounded-lg' src={FILE_URL + selectedItem?.image} alt="" /> : null}

                    <div className={`flex items-center justify-between my-2 py-3 px-2 border border-solid ${fetchedFile ? "border-green-400" : "border-gray-600/0 bg-gray-50"} rounded-md`}>
                        {
                            fetchedFile ?
                                <img className='w-2/3 rounded-lg' src={FILE_URL + fetchedFile?.key} alt="product" />
                                : <div>
                                    <label htmlFor="file"><div className="border border-dashed border-gray-300 hover:border-orange-400 rounded-lg flex-center py-1 px-12 w-full"><FaUpload className='text-gray-500' /> &nbsp; Rasmni bu yerga yuklang</div></label>
                                    <input type="file" id='file' className='hidden' style={{ display: 'none' }} onChange={(e) => { e?.target?.files ? setFile(e?.target?.files[0]) : message.warning("Fayl yuklanmadi") }} />
                                    {file ? <p className='text-sm text-gray-500'>{file?.name}</p> : null}
                                </div>
                        }
                        <Button
                            disabled={!(fetchedFile || file)}
                            loading={imageLoading}
                            danger={!!fetchedFile}
                            onClick={() => { fetchedFile ? removeImage() : _sendImage({}) }}
                        >
                            {fetchedFile ? "Faylni o'chirish" : "Faylni saqlash"}
                        </Button>
                    </div>


                    <br />
                    <Form.Item
                        label="Xizmat nomi"
                        name="title"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input placeholder="Nomi" size='large' />
                    </Form.Item>
                    <Form.Item
                        label="Ko'proq ma'lumot"
                        name="description"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <Input.TextArea size='large' placeholder="Tasnif" className='w-full' rows={4} />
                    </Form.Item>
                    <div className='flex justify-end'>
                        <Button size='large' type="primary" htmlType="submit" disabled={!fetchedFile && !selectedItem} loading={isPending} className='px-6' >
                            Saqlash
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}
export default UpdateData;