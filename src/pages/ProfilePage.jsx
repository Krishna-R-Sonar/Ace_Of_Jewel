import React from 'react';
import './ProfilePage.css'; // Import CSS for styling and animations
import Profile from '../components/user/Profile.jsx';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

const ProfilePage = ({ user }) => {
  return (
    <div className="profile-page">
      <Header />
      <main>
        <section className="profile-section">
          <Profile user={user} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
