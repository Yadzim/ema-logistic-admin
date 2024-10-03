import { Dispatch, useEffect } from 'react'
import { Drawer } from "antd";
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
            <Drawer key={3} title={"Elektron kitobni ko'rish"} placement="right" width={500} onClose={onClose} open={open}>
                <div className="flex flex-col gap-3">
                    <div className="text-center my-4">
                        <img src={FILE_URL + selectedItem?.image} className='rounded-lg max-w-2/3 max-h-[280px]' alt="" />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold" >{selectedItem?.title}</p>
                        <p className="text-lg " >{selectedItem?.author}</p>
                        <p className="text-lg " >{selectedItem?.year}</p>
                    </div>
                    <div className="mb-2">
                        <p className='italic' >{selectedItem?.description}</p>
                    </div>
                    {/* <div className="flex justify-between flex-wrap rounded p-2 gap-1 bg-gray-100">
                        <b>Batafsil ma'lumot:</b>
                        <p>{selectedItem?.description}</p>
                    </div> */}
                    <div className="h-72">
                        <iframe src={FILE_URL + selectedItem?.file} className='w-full h-full' ></iframe>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
export default VieWData;