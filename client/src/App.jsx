
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; 
const App = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}users`);
            console.log("Fetched users:", res.data); // Debug log
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const addUser = async () => {
        try {
            if (!name || !email || !mobile || !address) {
                alert("All fields are required.");
                return;
            }

            setLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("mobile", mobile);
            formData.append("address", address);
            if (image) formData.append("image", image);

            const url = selectedUserId
                ? `${import.meta.env.VITE_BACKEND_URL}users/${selectedUserId}`
                : `${import.meta.env.VITE_BACKEND_URL}users`;

            const response = await axios({
                method: selectedUserId ? "PUT" : "POST",
                url,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Server response:", response.data); 
            resetForm();
            fetchUsers();
        } catch (error) {
            console.error("Error adding/updating user:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setImage(null);
        setSelectedUserId(null);
        document.getElementById("fileInput").value = "";
    };

    return (
        <div className="container">
            <h1 className="header">List</h1>

            <div className="layout">
                <div className="form-section">
                    <h2>Form</h2>
                    <div className="form">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Mobile"
                        />
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address"
                        />
                        <input
                            id="fileInput"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button
                            onClick={addUser}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : selectedUserId ? "Update" : "Add"} User
                        </button>
                    </div>
                </div>

                <div className="user-list-section">
                    <h2>ALL List</h2>
                    <div className="user-grid">
                        {users.map((user) => (
                            <div key={user.id} className="user-card">
                                <div className="user-info">
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                    <p>{user.mobile}</p>
                                    <p>{user.address}</p>
                                </div>
                                <div className="user-image">
                                    {user.profile_images?.[0]?.image_url ? (
                                        <img
                                            src={user.profile_images[0].image_url}
                                            alt={`${user.name}'s profile`}
                                            onError={(e) => {
                                                console.log("Failed to load image:", user.profile_images[0].image_url);
                                                const newUrl = `${user.profile_images[0].image_url}?t=${new Date().getTime()}`;
                                                if (e.target.src !== newUrl) {
                                                    e.target.src = newUrl;
                                                } else {
                                                    e.target.src =
                                                        "https://zshljjepeuxlnxuchwee.supabase.co/storage/v1/object/public/user_images/public/user_14.jpeg";
                                                }
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src="https://zshljjepeuxlnxuchwee.supabase.co/storage/v1/object/public/user_images/public/user_14.jpeg"
                                            alt="Default profile"
                                        />
                                    )}
                                </div>
                                <div className="user-actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => {
                                            setName(user.name);
                                            setEmail(user.email);
                                            setMobile(user.mobile);
                                            setAddress(user.address);
                                            setSelectedUserId(user.id);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={async () => {
                                            if (window.confirm("Are you sure you want to delete this user?")) {
                                                try {
                                                    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}users/${user.id}`);
                                                    fetchUsers(); 
                                                } catch (error) {
                                                    console.error("Error deleting user:", error);
                                                }
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;