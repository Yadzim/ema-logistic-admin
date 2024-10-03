import { Menu, Segmented } from 'antd';
import React, { useState } from 'react';
import { FaFileSignature } from 'react-icons/fa';
import { FaCalendarDays, FaUsers } from 'react-icons/fa6';

function findParents(items: any, key: string): string[] {
  const search = (items: any, key: string, parents: string[]): string[] | null => {
    for (let item of items) {
      if (item.key === key) return parents;
      if (item.children) {
        const result = search(item.children, key, [...parents, item.key]);
        if (result) return result;
      }
    }
    return null;
  };

  return search(items, key, []) ?? [];
}

const TeacherDashboard: React.FC = (): JSX.Element => {


  return (
    <div className="">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="">
          <div className="grid grid-cols-3 gap-6">
            <div className="card p-3 py-4 flex-center gap-6 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors">
              <FaUsers size={26} />
              <h6 className="col-span-2 m-0 leading-5 font-semibold">Sinflar</h6>
            </div>
            <div className="card p-3 py-4 flex-center gap-6 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors">
              <FaCalendarDays size={26} />
              <h6 className="col-span-2 m-0 leading-5">Dars jadvali</h6>
            </div>
            <div className="card p-3 py-4 flex-center gap-6 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors">
              <FaFileSignature size={26} />
              <h6 className="col-span-2 m-0 leading-5">Imtihonlar</h6>
            </div>
          </div>
          <div className="card h-72 mt-6"></div>
        </div>
        <div className="card ">
          <Segmented options={["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"]} block />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="card ">
        </div>
        <div className="card col-span-2 h-96"></div>
      </div>
    </div>
  );
};

export default TeacherDashboard;