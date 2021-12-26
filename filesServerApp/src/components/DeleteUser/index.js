import React, { useState, useEffect } from "react";
import MySwal from "../../utils/swal";

const DeleteUser = props => {
  const [user, setUser] = useState(props.currentUser);
  const [secondLevelMsg, setSecondLevelMsg] = useState(false);
  const [server, setServer] = useState({name:''});

  const onInputChange = event => {
    const { name, value } = event.target;
    setServer({ ...server, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if(server.name !== user.name){
          MySwal.fire({
            icon: "error",
            title: "Name not matched."
          })
          return false
        }
        props.deleteUser(user.id);
      }}
    >
      {
          secondLevelMsg ?
          <>
            <div className="form-group">
              Please enter name of the Server to Delete.
            </div>
            <div className="form-group">
            <input
              type="text"
              name="name"
              value={server.name}
              onChange={onInputChange}
            />
            </div>
              <div className="form-group form-group--actions">
                <button className="primary-btn">Delete</button>
                <button className="cancel-btn" onClick={cancel}>
                  Cancel
                </button>
            </div>
          </>:
          <>
          <div className="form-group">
            Are you sure you want to delete Server {user.name}?
          </div>
          <div className="form-group form-group--actions">
            <button className="primary-btn" onClick={() => setSecondLevelMsg(true) }>Yes</button>
            <button className="cancel-btn" onClick={cancel}>
              Cancel
            </button>
          </div> 
        </>
      }
    </form>
  );
};

export default DeleteUser;
