import React, { useState, useEffect } from "react";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    Role: "",
    ID: "",
    Name: "",
    Email: "",
    Password: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch all users on component mount
    axios
      .get(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/65424ae9a8d1eae12d31e360"
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update user
      axios
        .put(
          ``,
          formData
        )
        .then((response) => {
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.ID === formData.ID ? formData : user))
          );
          setEditMode(false);
          setFormData({
            Role: "",
            ID: "",
            Name: "",
            Email: "",
            Password: "",
          });
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      // Add new user
      axios
        .post(
          "https://gnte7mjwg9.execute-api.us-east-1.amazonaws.com/newdev/user/",
          formData
        )
        .then((response) => {
          setUsers((prevUsers) => [...prevUsers, formData]);
          setFormData({
            Role: "",
            ID: "",
            Name: "",
            Email: "",
            Password: "",
          });
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `/users/65424ae9a8d1eae12d31e360`
      )
      .then((response) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.ID !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div>
      <h1>User</h1>
      <ul>
        {users.map((user) => (
          <li key={user.ID}>
            {user.Name} ({user.Email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.ID)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          name="Role"
          value={formData.Role}
          onChange={handleInputChange}
          placeholder="Role"
        />
        <input
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          name="Email"
          value={formData.Email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          name="Password"
          type="password"
          value={formData.Password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button type="submit">{editMode ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default User;