import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../components/AuthContext";
import { toast } from "react-hot-toast";

function CreateUserRole() {
  const { token } = useAuth();
  const {signup} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default selected

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("All fields are required.");
      return;
    }

    const endpoint = role === "admin" ? "/create-admin" : "/create-moderator";

    try {
      const res = await axiosInstance.post(
        "/users"+endpoint,
        { email, password }
      );

      toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} created successfully!`);
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error("Failed to create user.");
    }
    // await signup(email, password, role);
    // toast.success("Sign up successful!");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Create Admin/Moderator</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-transform duration-150 active:scale-95"
        >
          Create {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </form>
    </div>
  );
}

export default CreateUserRole;
