import dayjs from 'dayjs';
import { useGetAllData } from 'hooks';
import React, { } from 'react';
import { FaCommentDots, FaEnvelope, FaLayerGroup } from 'react-icons/fa6';

const AdminDashboard: React.FC = (): JSX.Element => {


  const { data } = useGetAllData({
    queryKey: ['messages'],
    url: 'messages?limit=5&sort=-_id',
  })

  return (
    <div className="">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="card rounded-xl h-36 flex items-center gap-6 px-6">
          <div className="rounded-2xl p-3 bg-blue-600/30">
            <FaLayerGroup className="text-4xl" />
          </div>
          <div className="">
            <h6 className='text-xl font-medium text-gray-600 mb-1' >Xizmatlar</h6>
            <h1 className='text-4xl font-bold '>4 ta</h1>
          </div>
        </div>

        <div className="card rounded-xl h-36 flex items-center gap-6 px-6">
          <div className="rounded-2xl p-3 bg-green-600/20 text-green-700">
            <FaEnvelope className="text-4xl" />
          </div>
          <div className="">
            <h6 className='text-xl font-medium text-gray-600 mb-1' >Xabarlar</h6>
            <h1 className='text-4xl font-bold '>142 ta</h1>
          </div>
        </div>

        <div className="card rounded-xl h-36 flex items-center gap-6 px-6">
          <div className="rounded-2xl p-3 bg-orange-500/30 text-orange-600">
            <FaCommentDots className="text-4xl" />
          </div>
          <div className="">
            <h6 className='text-xl font-medium text-gray-600 mb-1' >Mijozlar fikri</h6>
            <h1 className='text-4xl font-bold '>32 ta</h1>
          </div>
        </div>

        {/* <div className="card rounded-xl h-36 flex items-center gap-6 px-6"></div> */}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 card rounded-xl h-96">
          <h1 className='text-xl font-medium text-gray-600 ' >So'ngi kelgan xabarlar</h1>
          <div className="flex flex-col gap-1 divide-y mt-3">
            {
              data?.messages?.map((item: any) => (
                <div className="grid grid-cols-[2fr_1fr_4fr] gap-3" key={item.id}>
                  <div className="">
                    <h1 className='text-base font-medium ' >{item?.fullName}</h1>
                    <p className='text-sm ' >{item?.phone}</p>
                  </div>
                  <div className="text-info">
                    {dayjs(item?.createdAt).format("DD.MM.YYYY HH:mm")}
                  </div>
                  <div className="line-clamp-2">
                    {item?.text}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="card rounded-xl h-96"></div>
      </div>

      {/* <div className="card rounded-xl h-72 mt-6"></div> */}

    </div>
  );
};

export default AdminDashboard;