import React, { useState, useEffect } from 'react';
import { getProfile } from '../../services/api';
import './StylesDashboard/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getProfile();
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load user profile');
      setLoading(false);
    }
  };

  if (loading) return <div className="user-profile loading">Loading profile...</div>;
  if (error) return <div className="user-profile error">{error}</div>;

  return (
    <div className="user-profile">
      <h3>Welcome, {user.nickname || user.username}!</h3>
    </div>
  );
};

export default UserProfile;