import React from 'react';

const NotificationPopup = ({ message, isVisible, closePopup }) => {
  return (
    <div className={`notification-popup ${isVisible ? 'show' : ''}`}>
      <button
        onClick={closePopup}
        className="close-btn"
        aria-label="Close notification"
      >
        &#x2715; {/* Cross icon */}
      </button>
      <h2 className="pt-10">Notification</h2>
      <p>{message}</p>
    </div>
  );
};

export default NotificationPopup;
