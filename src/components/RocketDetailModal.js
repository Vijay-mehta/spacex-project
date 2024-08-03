import React from 'react';
import Modal from 'react-modal';

const RocketDetailModal = ({ rocket, onClose }) => {
    if (!rocket) return null;

    return (
        <Modal
            isOpen={!!rocket}
            onRequestClose={onClose}
            contentLabel="Rocket Details"
            className="fixed inset-0 flex items-center justify-center p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-[#eae9e9] rounded-lg shadow-lg max-w-5xl w-full h-[80vh] relative p-8">
                {/* Cross Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-200 text-gray-700 rounded-full p-2 hover:bg-gray-300 focus:outline-none"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                <div className="flex mb-4">
                    <h2 className="font-bold text-2xl mb-2">{rocket.name}</h2>
                    <h2 className="font-medium text-2xl mb-2 px-12">Overview</h2>
                    <h2 className="text-2xl mb-2">Photos</h2>
                </div>

                <div className="flex">
                    <div className="flex-shrink-0 w-72 h-[450px]">
                        <img
                            src={rocket.flickr_images[0] || 'https://via.placeholder.com/4600x00?text=No+Image'}
                            alt={rocket.name}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 px-6 overflow-y-auto  shadow-2xl m-3">
                        <p className=" text-xl mb-2">Description</p>
                        <p className="text-gray-700 mb-4">{rocket.description}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RocketDetailModal;
