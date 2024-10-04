import { Dispatch, useEffect } from 'react'
import { Modal } from "antd";
import { FILE_URL } from 'config/utils';

const VieWData = ({ open, setOpen, selectedItem, setselectedItem }: { open: boolean, setOpen: Dispatch<boolean>, selectedItem: any, setselectedItem: Dispatch<any> }) => {

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!open) setselectedItem(undefined)
    }, [open])

    return (
        <div>
            <Modal key={3} title={"Kitobni ko'rish"} width={500} onCancel={onClose} open={open}>
                <div className="flex flex-col gap-3">
                    <div className="text-center my-4">
                        <img src={FILE_URL + selectedItem?.image} className='rounded-lg max-w-2/3 max-h-[280px] mx-auto' alt="" />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold" >{selectedItem?.name}</p>
                    </div>
                    <div className="mb-2">
                        <p className='italic' >{selectedItem?.description}</p>
                    </div>
                    {/* <div className="flex justify-between flex-wrap rounded p-2 gap-1 bg-gray-100">
                        <b>Batafsil ma'lumot:</b>
                        <p>{selectedItem?.description}</p>
                    </div> */}
                </div>
            </Modal>
        </div>
    )
}
export default VieWData;