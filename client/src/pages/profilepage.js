import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({ username: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`  // Fetch the token from local storage
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Username: {userDetails.username}</p>
            <p>Email: {userDetails.email}</p>
        </div>
    );
};

export default ProfilePage;
