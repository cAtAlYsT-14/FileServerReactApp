import React, { useState, useEffect } from "react";
import { serverInitialState } from "../../../utils/constants";

const Form = (props) => {
  const initialData = serverInitialState
  const [server, setServer] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;
    setServer({ ...server, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    props.currentUser && setServer(props.currentUser);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.action === "Update" ? props.updateUser(server.id, server) : props.createUser(server);
      }}
    >
      <div className="form-group">
        <label>Server Name*</label>
        <input
          type="text"
          name="name"
          value={server.name}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>IP Address*</label>
        <input
          type="text"
          name="ipAddress"
          value={server.ipAddress}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Operating System*</label>
        <select 
          value={server.operatingSystem} 
          name="operatingSystem"
          onChange={onInputChange}
          required
        >
          <option value={0}>Windows</option>
          <option value={1}>Linux</option>
        </select>
      </div>

      <div className="form-group">
        <label>Software Version*</label>
        <input
          type="text"
          name="softwareVersion"
          value={server.softwareVersion}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">{props.action}</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
