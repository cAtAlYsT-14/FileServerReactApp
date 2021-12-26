import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./style.scss";

import { OPERATING_SYSTEM_MAPPING } from "../../utils/constants";

const DataTable = props => {
  return (
    <>
    <div className="table-wrapper">
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
          {props.users.length ? (
            props.users.map(server => (
              <tr key={server.id}>
                <td><Link to={`/serverDetails/${server.id}`}>{server.name}</Link></td>
                <td>{server.ipAddress}</td>
                <td>{OPERATING_SYSTEM_MAPPING[server.operatingSystem]}</td>
                <td>{server.softwareVersion}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(server);
                    }}
                  >
                    Update
                  </button>
                  {/* <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(server)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default DataTable;
