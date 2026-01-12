import React from 'react'

const DropDown = () => {
    const [status, setStatus] = React.useState('');
    const statusOptions = ["pending", "progress", "completed"];
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative mb-4">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border border-gray-300 rounded-md p-2 text-left flex justify-between items-center"
            >
                {status || "Select Status"}
                <span>🔽</span>
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 p-2 space-y-2">
                    {statusOptions.map((option) => (
                        <label
                            key={option}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
                        >
                            <input
                                type="radio"
                                name="status"
                                value={option}
                                checked={status === option}
                                onChange={() => {
                                    setStatus(option);
                                    setIsOpen(false);
                                }}
                            />
                            <span className="capitalize">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>

    )
}

export default DropDown