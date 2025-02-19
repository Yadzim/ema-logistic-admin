import { Dispatch, useEffect, useState } from 'react'
import { Alert, Button, Form, Input, message, Modal } from "antd";
import { useMutation } from '@tanstack/react-query';
import { Notification } from 'components/Notifications/notification';
import { AxiosError } from 'axios';
import { sendImage, submitData } from './request';
import { FILE_URL } from 'config/utils';
import { FaUpload } from 'react-icons/fa6';
import { CustomFileUpload } from 'components/FileUpload';

const UpdateData = ({ open, setOpen, refetch, selectedItem, setselectedItem }: { open: boolean, setOpen: Dispatch<boolean>, refetch: any, selectedItem: any, setselectedItem: Dispatch<any> }) => {

  const [file, setFile] = useState<any>();
  const [fetchedFile, setFetchedFile] = useState<any>();
  const [poster, setPoster] = useState<any>();
  const [fetchedPoster, setFetchPoster] = useState<any>();
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedItem) {
      form.setFieldsValue({
        client: selectedItem?.client,
        job: selectedItem?.job,

      })
    }
  }, [selectedItem])

  useEffect(() => {
    if (!open) setselectedItem(undefined)
  }, [open])

  const { mutate, isPending } = useMutation({
    mutationFn: (newVals) => submitData(selectedItem?._id, newVals, fetchedFile?.filename, fetchedPoster?.filename),
    onSuccess: async (res) => {
      Notification("success", "update", res?.message)
      refetch()
      setselectedItem(undefined)
      setOpen(false)
      setFile(undefined)
      setFetchedFile(undefined)
    },
    onError: (error: AxiosError<any>) => {
      Notification("error", "update", error?.response?.data ? error?.response?.data?.message : "");
    },
    retry: 0,
  });
  const { mutate: _sendImage, isPending: imageLoading } = useMutation({
    mutationFn: ({ id }: { id?: string }) => sendImage(id ? poster : file),
    onSuccess: async (res) => {
      Notification("success", "update", res?.message)
      if (!poster) {
        setFetchedFile(res)
        setFile(undefined);
      } else {
        setFetchPoster(res);
        setPoster(undefined)
      }
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
            message="Xizmatni qo'shishdan avval uning video va rasmni yuklang"
            type="warning"
            closable
            className='mb-4'
          />
          {
            selectedItem && !fetchedFile ? <video width="480" height="360" controls className="rounded-lg mx-auto max-w-[75%] max-h-96">
              <source src={FILE_URL + selectedItem?.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
              : null
          }
          <div className={`flex items-center- justify-between gap-2 my-2 py-3 px-2 border border-solid ${fetchedFile ? "border-green-400" : "border-gray-600/0 bg-gray-50"} rounded-md`}>
            {
              fetchedFile ? <video width="480" height="360" controls className="rounded-lg mx-auto max-w-[75%] max-h-80">
                <source src={FILE_URL + fetchedFile?.filename} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
                : <div>
                  <label htmlFor="file"><div className="border border-dashed border-gray-300 hover:border-orange-400 rounded-lg flex-center py-1 px-12 w-full"> <FaUpload className='text-gray-500' /> &nbsp; Videoni bu yerga yuklang</div></label>
                  <input type="file" id='file' accept='video/*' className='hidden' style={{ display: 'none' }} onChange={(e) => { e?.target?.files ? setFile(e?.target?.files[0]) : message.warning("Fayl yuklanmadi") }} />
                  {file ? <p className='text-sm text-gray-500'>{file?.name}</p> : null}
                </div>
            }
            <Button disabled={!(fetchedFile || file)} loading={imageLoading} danger={!!fetchedFile} onClick={() => { fetchedFile ? removeImage() : _sendImage({}) }} >{fetchedFile ? "Videoni o'chirish" : "Videoni saqlash"}</Button>
          </div>


          <br />
          <Form.Item
            label="Xizmat nomi"
            name="name"
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
          <Form.Item
            label="Post rasmi (png, jpeg)"
            name="image"
          // rules={[{ required: true, message: 'Please input poster!' }]}
          >
            {selectedItem?.poster ? <img className='w-1/2 mx-auto rounded-lg mb-2' src={FILE_URL + selectedItem?.poster} alt="" /> : null}
            <CustomFileUpload title="rasm yuklang" formats='.png, .jpeg' accept='.png, .jpeg' onChange={(e: any) => { setPoster(e.target.files?.length && e.target.files[0]); _sendImage({ id: "bookfile" }) }} />
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