import { Link } from "react-router-dom";

function UserList({ state, dispatcher }) {
  return (
    <>
      <h2>Home</h2>
      <ol>
        {state.users.map((user, index) => (
          <li key={index}>
            {user} | <Link to={`/edit/${index}`}>Edit</Link> |{" "}
            <button>Delete</button>
          </li>
        ))}
      </ol>
    </>
  );
}

export default UserList;
