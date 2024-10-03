import { ChangeEvent } from "react";
import { BiX } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";
import FileDownloadIcon from "assets/images/FileDownloadIcon.svg";
import FileResultIcon from "assets/images/FileResultIcon.svg";
import React from "react";


type PropsTypeCustomFileUpload = {
    title?: string | React.ReactNode,
    formats?: string,
    size?: number,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    accept?: string
}

export function CustomFileUpload({ title, formats, size = 5, onChange, accept }: PropsTypeCustomFileUpload) {
    return (
        <label className="block rounded-md w-full py-2 px-3 border-[2px] border-dashed border-gray-200 font-sans cursor-pointer">
            <div className="flex space-x-3">
                <div className="bg-gray-100 rounded-md w-16 h-12 flex items-center justify-center">
                    <img src={FileDownloadIcon} alt="" className="text-blue-500" />
                </div>
                <div className="text-sm">
                    <div className="text-black">{title ?? 'Faylni tanlang'}</div>
                    <div className="space-x-4 mt-2">
                        <span>
                            <span className="text-gray-500">Format:</span> {formats ?? <>jpg,jpeg,png,webp</>}
                        </span>
                        <span>
                            <span className="text-gray-500">Hajmi:</span> {size ? <>{size} Mb gacha</> : <>Cheklanmagan</>}
                        </span>
                    </div>
                </div>
            </div>
            <input type="file" accept={accept ?? "*"} onChange={onChange} style={{ display: "none" }} className="hidden" />
        </label>
    )
}


type PropsTypeCustomFileResult = {
    file: FileList,
    remove?: () => void
}

export function CustomFileResult({ file, remove }: PropsTypeCustomFileResult) {

    return (
        <div className="rounded-md w-full py-2 px-3 border-[2px] border-dashed border-blue-500 font-sans cursor-pointer">
            <div className="flex space-x-3">
                <div className="bg-gray-100 rounded-md w-16 h-12 flex items-center justify-center">
                    <img src={FileResultIcon} alt="" className="text-blue-500" />
                </div>
                <div className="text-sm w-full flex justify-between items-center">
                    <div>
                        <div className="text-black">{file[0]?.name}</div>
                        <div className="space-x-4 mt-2">
                            <span>
                                <span className="text-gray-500">Format:</span> {file[0]?.name?.slice(file[0]?.name?.lastIndexOf('.') + 1)}
                            </span>
                            <span>
                                <span className="text-gray-500">Hajmi:</span> {(Number(file[0]?.size) / 1024)?.toFixed(2)} kb
                            </span>
                        </div>
                    </div>
                    <button onClick={remove} className="bd-btn-red pb-1 px-1">
                        <BiX size={20} />
                    </button>
                </div>
            </div>
            <input type="file" className="hidden" />
        </div>
    )
}

type PropsTypeCustomFileDownload = {
    title?: string,
    onClick?: () => void
}

export function CustomDownloadAsFile({ title, onClick }: PropsTypeCustomFileDownload) {

    return (
        <button onClick={onClick} className="hover:bg-gray-50 bg-[#fff] active:bg-gray-50 rounded-md w-full py-2 px-3 border-[2px] border-dashed border-blue-500 font-sans cursor-pointer flex space-x-3"
        >
            <div className="bg-gray-100 rounded-md w-16 h-12 flex items-center justify-center">
                <FaDownload className="text-gray-500" size={18} />
            </div>
            <div className="text-sm">
                <div className="text-black text-md">{title ?? "Faylni yuklab olish"}</div>
            </div>
        </button>
    )
}