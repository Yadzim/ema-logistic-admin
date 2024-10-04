import { Divider, Empty, Spin } from 'antd';
import Actions from 'components/Actions';
import { CreateBtn } from 'components/Common/CustomButton';
import PageHeader from 'components/PageHeader';
import { useGetAllData } from 'hooks';
import React, { useState } from 'react';
import UpdateData from './crud/update';
import VieWData from './crud/view';
import { FILE_URL } from 'config/utils';

const Services: React.FC = (): JSX.Element => {

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

        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">

          {
            data?.services?.length ? data?.services?.map((item: any) => {

              return <div key={item.id} className="card p-0 flex flex-between flex-col gap-2 border bg-gray-50" >
                <div className="">
                  <figure className="w-full h-[160px] flex-center overflow-hidden img-box rounded-md">
                    <img src={FILE_URL + item.image} alt='' width={285} height={163} className='min-w-full min-h-full bg-gray-100 object-cover rounded' />
                  </figure>
                  <div className="flex flex-col gap-4 p-3">
                    <h2 className="text-xl font-bold ">{item.name}</h2>
                    <p className='text-info'>{item.description ?? "If a dog chews shoes whose shoes does he choose? Lorem, ipsum dolor sit amet consectetur adipisicing elit."}</p>
                  </div>
                </div>

                <div className="w-full">
                  <Divider className='my-0 w-full' />
                  <div className="py-2">
                    <Actions
                      id={item._id}
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

              </div>

            })

              : <div className="col-span-4 flex-center py-12"><Empty description="Xizmatlar topilmadi" /></div>
          }

        </div>

      </Spin>

      <UpdateData open={open} refetch={refetch} setOpen={setOpen} selectedItem={selectedItem} setselectedItem={setSelectedItem} />
      <VieWData open={viewOpen} setOpen={setViewOpen} selectedItem={selectedItem} setselectedItem={setSelectedItem} />
    </div>
  );
};

export default Services;