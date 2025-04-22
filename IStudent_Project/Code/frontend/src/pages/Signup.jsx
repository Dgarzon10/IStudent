import { useState } from "react";
import { useAuth } from "../components/AuthContext";

function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, role);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="w-full mb-4 p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="visitor">Visitor</option>
        </select>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
