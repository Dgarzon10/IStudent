import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { toast } from "react-hot-toast";

function NewForum() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [instituteId, setInstituteId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !type || !topic) {
      toast.error("All fields are required.");
      return;
    }

    if (type === "institutional" && !instituteId) {
      toast.error("Institute ID is required for institutional forums.");
      return;
    }

    const forumData = {
      name,
      description,
      type,
      topic,
    };

    if (type === "institutional") {
      forumData.instituteId = parseInt(instituteId);
    }

    try {
      await axiosInstance.post("/forums", forumData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Forum created!");
      navigate("/forums");
    } catch (err) {
      toast.error("Failed to create forum.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">Create New Forum</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Forum Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="institutional">Institutional</option>
        </select>

        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {type === "institutional" && (
          <input
            type="number"
            placeholder="Institute ID"
            value={instituteId}
            onChange={(e) => setInstituteId(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-transform duration-150 active:scale-95"
        >
          Create Forum
        </button>
      </form>
    </div>
  );
}

export default NewForum;
