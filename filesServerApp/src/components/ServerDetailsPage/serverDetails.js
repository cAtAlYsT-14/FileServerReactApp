import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Header from "../Common/Header/index"
import Footer from "../Common/Footer/index"
import { OPERATING_SYSTEM_MAPPING } from "../../utils/constants"
import { getDeletedUser, getJobDetails, getServerData } from "../../app/api"
import MySwal from "../../utils/swal"
import { useDispatch } from "react-redux"
import Modal from "../Common/Modal/index"
import DeleteUser from "../DeleteUser/index"
import { getFormattedDate, getFormattedTimeTaken } from "../../utils/common"
import './serverDetails.scss'

const ServerDetailComponent = (props) => {
    const servers = useSelector(state => state.users);
    const jobDetails = useSelector(state => state.jobDetails);
    const [activeModal, setActiveModal] = useState({ name: "", active: false });
    const serverId = props.match.params.id
    const [serverData, setServerData] = useState(servers.filter(server => (server.id == serverId))?.[0])
    const dispatch = useDispatch()
    const completedJobs = jobDetails.filter((job) => (job.status === "Completed"))

    const setModal = modal => {
        setActiveModal({ name: modal, active: true });
    };

    const deleteUser = async id => {
        setActiveModal(false);
    
        try {
          await getDeletedUser(id).then(() => {
            MySwal.fire({
              icon: "success",
              title: "User deleted successfully."
            }).then(() => {
              dispatch({
                type: "DELETE_SERVERS",
                data: servers.filter(user => user.id !== id)
              });
            }).then(props.history.push("/"))
          });
        } 
        catch (err) {
          MySwal.fire({
            icon: "error",
            title: "Failed to delete user."
          });
        }
    };

    const getAverageTimeTaken = () => {
        if(completedJobs.length){
            let totalTime = completedJobs.reduce((acc, curr) => {
                acc += (curr.endTime - curr.startTime)
                return acc
            }, 0)
            return getFormattedTimeTaken(totalTime/completedJobs.length)
        }
        return '-'
    }

    const dateComparison = (x,y) => {
        var date1 = new Date(x.endTime * 1000),
            date2 = new Date(y.endTime * 1000);
        
        if (date1 > date2) return -1;
        if (date1 < date2) return 1;
        return 0;
    }

    const getLastBackUpTime = () => getFormattedDate(completedJobs.sort(dateComparison)[0].startTime)

    const fetchData = async () => {
        try {
            await getJobDetails(serverId).then(({ data }) => { 
              dispatch({ type: "SET_JOB_DETAILS", data: data });
            });
            !servers.length && await getServerData(serverId).then(data => setServerData(data.data?.[0]))
        } 
        catch (err) {
          MySwal.fire({
            icon: "error",
            title: "Failed to fetch Job Details!"
          });
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <div>
            <Header />
            <main className="content">
                <div className="container">
                    <div className="content-wrapper">
                        <div className="table-wrapper">
                            <div className="table-heading">
                                Server Details
                                <hr/>
                            </div>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <span className="column-sort">
                                                Server Name
                                            </span>
                                        </th>
                                        <th>
                                            <span className="column-sort">
                                                IP Address
                                            </span>
                                        </th>
                                        <th>
                                            <span className="column-sort">
                                                Operating System
                                            </span>
                                        </th>

                                        <th>
                                            <span className="column-sort">
                                                Software Version
                                            </span>
                                        </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {
                                        serverData ? 
                                        <tr>
                                            <td>
                                            <span className="column-sort">
                                            {serverData.name}
                                            </span>
                                            </td>
                                            <td>
                                            <span className="column-sort">
                                                {serverData.ipAddress}
                                            </span>
                                            </td>
                                            <td>
                                            <span className="column-sort">
                                                {OPERATING_SYSTEM_MAPPING[serverData.operatingSystem]}
                                            </span>
                                            </td>

                                            <td>
                                            <span className="column-sort">
                                                {serverData.softwareVersion}
                                            </span>
                                            </td>
                                            <td className="field-actions">
                                                <button
                                                    className="field-actions__delete"
                                                    onClick={() => setModal("Delete User")}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr> :
                                        <tr>
                                            <td colSpan="5">
                                            <div className="no-record-message">No Record!</div>
                                            </td>
                                        </tr>
                                    }
                                    
                                </tbody>
                                
                            </table>

                            <div className="table-heading">
                                Job Details
                                <hr/>
                            </div>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <span className="column-sort">
                                                Job ID
                                            </span>
                                        </th>
                                        <th>
                                            <span className="column-sort">
                                                Status
                                            </span>
                                        </th>
                                        <th>
                                            <span className="column-sort">
                                                Start time 
                                            </span>
                                        </th>

                                        <th>
                                            <span className="column-sort">
                                                End time
                                            </span>
                                        </th>
                                        <th>
                                            <span className="column-sort">
                                                Time taken
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {
                                        (jobDetails.length > 0) ? (
                                            <>
                                                {
                                                    jobDetails.map((job) => {
                                                        return (
                                                            <tr key={job.id}>
                                                                <td>
                                                                    <span className="column-sort">
                                                                    {job.id}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="column-sort">
                                                                        {job.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="column-sort">
                                                                        {getFormattedDate(job.startTime)}
                                                                    </span>
                                                                </td>

                                                                <td>
                                                                    <span className="column-sort">
                                                                        {getFormattedDate(job.endTime)}
                                                                    </span>
                                                                </td>
                                                                <td className="field-actions">
                                                                    <span className="column-sort">
                                                                        {(job.startTime && job.endTime) ? getFormattedTimeTaken((job.endTime - job.startTime)) : '-'}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </>)
                                            :
                                            <tr>
                                                <td colSpan="5">
                                                <div className="no-record-message">No Record!</div>
                                                </td>
                                            </tr>
                                    }
                                    
                                </tbody>
                                
                            </table>

                            <div className="table-heading">
                                Backup Details
                                <hr/>
                            </div>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>
                                            <span className="column-sort">
                                                Is Protected
                                            </span>
                                        </th>
                                        <th>
                                            <span className="column-sort">
                                                Last Backup Time
                                            </span>
                                        </th>
                                        <th>
                                            <span className="column-sort">
                                                Average Time Taken
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {
                                        (jobDetails.length > 0) ? (
                                            <>
                                                <tr>
                                                    <td>
                                                        <span className="column-sort">
                                                            {jobDetails.filter((job) => (job.status === "Completed")).length > 0 ? "Yes" : "No"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="column-sort">
                                                            {
                                                                getLastBackUpTime()
                                                            }
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="column-sort">
                                                            {
                                                                getAverageTimeTaken(jobDetails)
                                                            }
                                                        </span>
                                                    </td>
                                                </tr>
                                            </>)
                                            :
                                            <tr>
                                                <td colSpan="5">
                                                <div className="no-record-message">No Record!</div>
                                                </td>
                                            </tr>
                                    }
                                    
                                </tbody>
                                
                            </table>
                            </div>
                        </div>
                </div>
            </main>
            {activeModal.active && (
                <Modal activeModal={activeModal}>
                    <DeleteUser
                        currentUser={serverData}
                        deleteUser={deleteUser}
                        setActiveModal={setActiveModal}
                    />
                </Modal>
            )}
            <Footer />
        </div>
    )
}

export default ServerDetailComponent;