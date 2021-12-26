import axios from "axios";

const apiURL = `http://localhost:3000`;

function getUsers() {
  const response = axios.get(`${apiURL}/fileServers`);
  return response;
}

const getJobDetails = (serverId) => {
  const response = axios.get(`${apiURL}/jobs/?fileServerId=${serverId}`);
  return response;
}

const getServerData = (serverId) => {
  const response = axios.get(`${apiURL}/fileServers/?id=${serverId}`);
  return response;
}

function getCreatedUser({ name, ipAddress, operatingSystem, softwareVersion }) {
  const response = axios.post(`${apiURL}/fileServers/`, {
    name,
    ipAddress,
    operatingSystem,
    softwareVersion
  });

  return response;
}

function getUpdatedUser(id, { name, ipAddress, operatingSystem, softwareVersion }) {
  const response = axios.put(`${apiURL}/fileServers/${id}`, {
    id,
    name,
    ipAddress,
    operatingSystem,
    softwareVersion
  });

  return response;
}

function getDeletedUser(id) {
  const response = axios.delete(`${apiURL}/fileServers/${id}`);

  return response;
}

export { 
  getUsers,
  getCreatedUser,
  getUpdatedUser,
  getDeletedUser,
  getJobDetails,
  getServerData
};
