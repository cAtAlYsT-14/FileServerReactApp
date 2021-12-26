import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  getCreatedUser,
  getUpdatedUser,
} from "../../app/api";

// Styles
import "./landingPage.scss";

// Components
import Header from "../Common/Header/index";
import Footer from "../Common/Footer/index";
import DataTable from "../DataTable/index";
import CreateUser from "../Common/Form/form";
import UpdateUser from "../Common/Form/form";
import Modal from "../Common/Modal/index";
// import Search from "../Search/index";
import Pagination from "../Pagination/index";
import Loader from "../Loader/index";
import MySwal from "../../utils/swal";
import { serverInitialState } from "../../utils/constants";

function LandingPage() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  const [loading, setLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(serverInitialState);
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [sorted, setSorted] = useState(false);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

  // Setting up Modal
  const setModal = modal => {
    // search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };

  // Create User
  const createUser = async user => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedUser(user).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "User created successfully."
        }).then(() => {
          dispatch({ type: "ADD_SERVERS", data: result });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update User
  const updateRow = server => {
    setModal("Update Server");

    setCurrentUser({
      id: server.id,
      name: server.name,
      ipAddress: server.ipAddress,
      operatingSystem: server.operatingSystem,
      softwareVersion: server.softwareVersion
    });
  };

  const updateUser = async (id, updatedUser) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedUser(id, updatedUser).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "User updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_SERVERS",
            data: users.map(user =>
              user.id === id ? Object.assign(user, result) : user
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      await getUsers().then(({ data }) => { 
        dispatch({ type: "SET_SERVERS", data: data });
      });
    } 
    catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch server data!"
      });
    } 
    finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                {/* <Search /> */}
                <button
                  className="primary-btn"
                  onClick={() => setModal("Add Server")}
                >
                  Add New Server
                </button>
              </div>
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                // deleteRow={deleteRow}
                // onSortChange={sorting}
              />
              <Pagination
                totalResults={users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Add Server" && (
            <CreateUser
              createUser={createUser}
              setActiveModal={setActiveModal}
              action="Add"
            />
          )}
          {activeModal.name === "Update Server" && (
            <UpdateUser
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveModal={setActiveModal}
              action="Update"
            />
          )}
          {/* {activeModal.name === "Delete User" && (
            <DeleteUser
              currentUser={currentUser}
              deleteUser={deleteUser}
              setActiveModal={setActiveModal}
            />
          )} */}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default LandingPage;
