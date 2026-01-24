import React from 'react'

const ShowError = ({ data }) => {
    return (
        <div className="w-full flex justify-center px-4">
            <div className="flex items-start gap-3 max-w-md w-full bg-red-500/10 border border-red-500/30 text-red-600 px-4 py-3 rounded-xl shadow-sm animate-shake">
                {/* Icon */}
                <span className="flex-shrink-0 text-red-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mt-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-4a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1zm0 8a1 1 0 100-2 1 1 0 000 2z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>

                {/* Message */}
                <p className="text-sm font-medium leading-snug">
                    {data}
                </p>
            </div>
        </div>
    )
}

export default ShowError
