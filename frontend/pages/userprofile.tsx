import React, { useState, useEffect } from 'react'

function UserProfile() {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('Fetched user profile:', data);
        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.error || 'Failed to fetch user profile');
        } 
      } catch (error) {
        setError('Network error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  } 
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-5 mb-5">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2> 
      {userData ? (
        <div>
          <p className="mb-4"><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : ( 
        <div>No user data available.</div>
      )}
    </div>
  );  

}

export default UserProfile
