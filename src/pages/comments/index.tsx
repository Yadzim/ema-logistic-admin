import { Divider, Empty, Spin } from 'antd';
import Actions from 'components/Actions';
import { CreateBtn } from 'components/Common/CustomButton';
import PageHeader from 'components/PageHeader';
import { useGetAllData } from 'hooks';
import React, { useState } from 'react';
import UpdateData from './crud/update';
import VieWData from './crud/view';
import { FaCircleUser, FaPlay, FaQuoteRight } from 'react-icons/fa6';
import { FILE_URL } from 'config/utils';

const Comments: React.FC = (): JSX.Element => {

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const { data, isLoading, refetch } = useGetAllData({
    queryKey: ['services'],
    url: 'services',
  })

  return (
    <div className="card ">
      <PageHeader title='Xizmatlar'
        btn={<CreateBtn onClick={() => setOpen(true)} />}
      />

      <Spin spinning={isLoading} >

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">

          {
            data ? data?.map((item) => {

              return <div key={item.id} className="card p-0 flex flex-col gap-2 border bg-gray-50" >
                <div className="">
                  <figure className="w-full h-[320px] flex-center overflow-hidden img-box rounded-md relative">
                    <img src={FILE_URL + item?.poster} alt='' width={285} height={320} className='min-w-full min-h-full bg-gray-100 object-cover rounded' />
                    <div className="absolute shadow-xl rounded-full bg-white w-16 h-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-center">
                      <FaPlay className="fas fa-play text-4xl text-black/70 ms-1" />
                    </div>
                  </figure>
                  <div className="flex-between gap-4 mt-4 p-2">
                    <div className="d-f gap-3">
                      <FaCircleUser className="fa fa-user-circle text-5xl opacity-30" />
                      <div>
                        <h6 className="text-lg font-semibold">{item?.client ?? "John Doe"}</h6>
                        <span className="text-info text-sm">{item?.job ?? "Web Developer"}</span>
                      </div>
                    </div>
                    <FaQuoteRight className="fas fa-quote-right text-4xl md:text-5xl opacity-10" />
                  </div>
                </div>
                <Divider className='my-0' />
                <div className="pb-2">
                  <Actions
                    id={item?.id}
                    url='services'
                    refetch={refetch}
                    deleteRoles={"*"}
                    editRoles={"*"}
                    viewRoles={"*"}
                    onEdit={() => { setOpen(true); setSelectedItem(item) }}
                    onView={() => { setViewOpen(true); setSelectedItem(item) }}
                    block
                  />
                </div>
              </div>

            })

              : <div className="col-span-4 flex-center py-12"><Empty description="Xizmatlar topilmadi" /></div>

          }



        </div>

      </Spin>

      <UpdateData open={open} refetch={() => { }} setOpen={setOpen} selectedItem={selectedItem} setselectedItem={setSelectedItem} />
      <VieWData open={viewOpen} setOpen={setViewOpen} selectedItem={selectedItem} setselectedItem={setSelectedItem} />
    </div>
  );
};

export default Comments;