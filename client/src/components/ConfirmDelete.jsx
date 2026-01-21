const ConfirmDelete = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
            <div
                className="relative bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Are you sure?
                </h3>

                <p className="text-sm text-gray-600 mb-6">
                    This action cannot be undone.
                </p>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;
