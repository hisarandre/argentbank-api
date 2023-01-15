import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, editUser } from "../../features/user/userSlice";

const EditUser = () => {
  const dispatch = useDispatch();
  const { firstname, lastname, token } = useSelector(userSelector);
  const [newFirstname, setNewFirstname] = useState(firstname);
  const [newLastname, setNewLastname] = useState(lastname);
  const [editFields, setEditFields] = useState(false);

  const handleEditUser = () => {
    if (!newFirstname && !newLastname) return;
    if (!newFirstname) setNewFirstname(firstname);
    if (!newLastname) setNewLastname(lastname);

    dispatch(editUser({ token: token, firstname: newFirstname, lastname: newLastname }));
  };

  return (
    <>
      {editFields ? (
        <>
          <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper">
              <label htmlFor="firstname">firstname</label>
              <input type="text" id="firstname" required value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">lastname</label>
              <input type="text" id="lastname" required value={newLastname} onChange={(e) => setNewLastname(e.target.value)} />
            </div>
          </form>
          <div className="button-wrapper">
            <button className="edit-button" onClick={handleEditUser}>
              Save
            </button>
            <button className="edit-button" onClick={() => setEditFields(!editFields)}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button className="edit-button" onClick={() => setEditFields(!editFields)}>
          Edit Name
        </button>
      )}
    </>
  );
};

export default EditUser;
