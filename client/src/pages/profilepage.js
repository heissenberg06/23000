import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './profilepage.css'; // Import CSS for styling

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({ username: '', email: '' });
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch profile data');
                }
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handlePasswordChange = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/user/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    currentPassword: currentPassword,
                    newPassword: newPassword
                })
            });

            if (!response.ok) {
                throw new Error('Password update failed');
            }
            alert('Password updated successfully');
            setShowPasswordChange(false);
        } catch (err) {
            setError(err.message);
        }
    };

    // Handle navigation to the management page
    const handleNavigateToManagement = () => {
        navigate('/manage-cars'); // Use the correct path for your management page
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="profile-container">
            <h1>Profile Page</h1>
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
            {!showPasswordChange ? (
                <button onClick={() => setShowPasswordChange(true)}>Hesap Şifremi Değiştir</button>
            ) : (
                <form onSubmit={handlePasswordChange}>
                    <label>
                        Current Password:
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Update Password</button>
                </form>
            )}
            <button onClick={handleNavigateToManagement}>İlanlarım</button>
        </div>
    );
};

export default ProfilePage;
