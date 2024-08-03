import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaunches } from '../redux/slices/launchesSlice';
import SideBar from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Tooltip } from 'react-tooltip'; // Update import

const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  // Extracting date and time components
  const options = {
    month: 'short', // Nov
    day: '2-digit', // 01
  };
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  // Extracting time components
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
  return `${formattedDate}, ${formattedTime}`;
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const upcoming = useSelector((state) => state.launches.upcoming);
  const previous = useSelector((state) => state.launches.previous);

  useEffect(() => {
    dispatch(fetchLaunches());
  }, [dispatch]);

  const backgroundStyle = {
    backgroundImage: 'url("https://live.staticflickr.com/7706/26751237322_5a52540ea3_h.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };

  // Placeholder image URL
  const placeholderImage = 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <div style={backgroundStyle} className="flex">
      <SideBar />

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Upcoming Launches Section */}
          {upcoming.length > 0 && (
            <div className="p-6 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Upcoming Launches</h2>
              <div>
                {upcoming.map((launch) => (
                  <div key={launch.id} className="mb-4">
                    <div className="flex flex-col md:flex-row items-center bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                      <div className="p-4 flex flex-col justify-between">
                        <h5 className="text-xl font-medium text-gray-400 mb-2">Mission Name</h5>
                        <p className="text-lg mb-3">{launch.name}</p>

                        <h5 className="text-xl font-medium text-gray-400 mb-2">Flight Number</h5>
                        <p className="text-lg mb-3">{launch.flight_number}</p>

                        <h5 className="text-xl font-medium text-gray-400 mb-2">Time (UTC)</h5>
                        <p className="text-lg">{formatDate(launch.date_utc)}</p>

                        {/* Links Section */}
                        <h5 className="text-xl font-medium text-gray-400 mb-2">Links</h5>
                        {launch.links.webcast && (
                          <a
                            href={launch.links.webcast}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 flex items-center"
                            data-tooltip-id={`tooltip-${launch.id}`} // Unique ID for tooltip
                          >
                            <FontAwesomeIcon icon={faYoutube} className="mr-2" />
                            Webcast
                          </a>
                        )}
                        <Tooltip id={`tooltip-${launch.id}`} place="top" type="dark" effect="solid">
                          Watch on YouTube
                        </Tooltip>
                      </div>
                      <img
                        className="object-cover w-full h-60 md:h-40 md:w-48 rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                        src={launch.links.patch.small || placeholderImage}
                        alt="Launch"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Launch Facilities Section */}
          <div className="p-6 bg-gray-800 bg-opacity-75 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Launch Facilities</h2>
            <p className="mb-2">Location: Cape Canaveral, FL</p>
            <p>Details: Used for launching Falcon 9 and Falcon Heavy rockets.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previous Launches Section */}
          {previous.length > 0 && (
            <div className="p-6 bg-gray-900 bg-opacity-75 text-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Previous Launches</h2>
              <div>
                {previous.map((launch) => (
                  <div key={launch.id} className="mb-4">
                    <div className="flex flex-col md:flex-row items-center bg-gray-800 border border-gray-700 rounded-lg shadow-md">
                      <div className="p-4 flex flex-col justify-between">
                        <h5 className="text-xl font-medium text-gray-400 mb-2">Mission Name</h5>
                        <p className="text-lg mb-3">{launch.name}</p>

                        <h5 className="text-xl font-medium text-gray-400 mb-2">Flight Number</h5>
                        <p className="text-lg mb-3">{launch.flight_number}</p>

                        <h5 className="text-xl font-medium text-gray-400 mb-2">Time (UTC)</h5>
                        <p className="text-lg">{formatDate(launch.date_utc)}</p>

                        {/* Links Section */}
                        <h5 className="text-xl font-medium text-gray-400 mb-2">Links</h5>
                        {launch.links.webcast && (
                          <a
                            href={launch.links.webcast}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 flex items-center"
                            data-tooltip-id={`tooltip-${launch.id}`} // Unique ID for tooltip
                          >
                            <FontAwesomeIcon icon={faYoutube} className="mr-2" />
                            Webcast
                          </a>
                        )}
                        <Tooltip id={`tooltip-${launch.id}`} place="top" type="dark" effect="solid">
                          Watch on YouTube
                        </Tooltip>
                      </div>
                      <img
                        className="object-cover w-full h-60 md:h-40 md:w-48 rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                        src={launch.links.patch.small || placeholderImage}
                        alt="Launch"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Starlink Section */}
          <div className="p-6 bg-gray-800 bg-opacity-75 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Starlink</h2>
            <p className="mb-2">Number of Satellites: 1000+</p>
            <p>Goal: Provide global internet coverage.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
