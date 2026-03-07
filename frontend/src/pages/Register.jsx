import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    await registerUser(username,password);

    navigate("/login");
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        placeholder="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button>Register</button>
    </form>
  );
}

export default Register;