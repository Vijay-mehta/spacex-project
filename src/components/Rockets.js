import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/slices/rocketsSlice';
import RocketDetailModal from './RocketDetailModal';
import SideBar from './SideBar';

const Rockets = () => {
    const dispatch = useDispatch();
    const rockets = useSelector(state => state.rockets.rockets);
    const [selectedRocket, setSelectedRocket] = useState(null);

    useEffect(() => {
        dispatch(fetchRockets());
    }, [dispatch]);

    const openModal = (rocket) => {
        setSelectedRocket(rocket);
    };

    const closeModal = () => {
        setSelectedRocket(null);
    };

    return (
        <div className="flex" style={{ backgroundImage: 'url("https://live.staticflickr.com/7706/26751237322_5a52540ea3_h.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <SideBar />

            <div className="flex-1 p-6 bg-black bg-opacity-50">
                <h1 className="text-3xl font-bold mb-6 text-white">Rockets</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {rockets.map(rocket => (
                        <div
                            key={rocket.id}
                            onClick={() => openModal(rocket)}
                            className="relative cursor-pointer bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={rocket.flickr_images[0]}
                                alt={rocket.name}
                                className="w-full h-96 object-cover" // Increased height
                            />
                            <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-center text-white p-4">
                                <h3 className="text-xl font-semibold">{rocket.name}</h3>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-4 text-center text-white">
                                <p>{rocket.active ? 'Active' : 'In Development'}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedRocket && (
                    <RocketDetailModal
                        rocket={selectedRocket}
                        onClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default Rockets;
