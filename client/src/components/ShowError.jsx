import React from 'react'

const ShowError = ({ data }) => {
    return (
        <div className="w-full flex justify-center px-4 my-5">
            <div className=" border-l-4 border-[#c92e2e] bg-[#2ec946]/10 font-medium text-[#c9452e] flex items-start gap-3 max-w-md w-full px-4 py-3 rounded-xl shadow-sm animate-shake">
                <span className=" text-red-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                    </svg>

                </span>

                <p className="text-sm font-medium leading-snug">
                    {data}
                </p>
            </div>
        </div>
    )
}

export default ShowError
