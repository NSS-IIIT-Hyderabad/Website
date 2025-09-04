"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.section}>
          <h4>NSS IIIT Hyderabad</h4>
          <p>Building a better society through service and innovation.</p>
        </div>

        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home Page</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">FAQs</a></li>

          </ul>
        </div>

        <div className={styles.section}>
        <p className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 24 24" fill="currentColor" 
             className="w-5 h-5 text-red-500">
          <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7zM12 11.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
        </svg>
        IIT-Hyderabad, Telangana, India
      </p>

      <p className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 24 24" fill="currentColor" 
             className="w-5 h-5 text-blue-500">
          <path d="M12 12.713l11.985-8.713L12 0 .015 4zM12 14.3L.015 5.587 0 5.6V18l12 6 12-6V5.6l-.015-.013z"/>
        </svg>
        office.nss@iith.ac.in
      </p>

      <p className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" 
             viewBox="0 0 24 24" fill="currentColor" 
             className="w-5 h-5 text-green-500">
          <path d="M6.62 10.79a15.093 15.093 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24a11.72 11.72 0 003.68.59c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.21 2.46.59 3.68.12.35.03.74-.24 1.02l-2.23 2.09z"/>
        </svg>
        +91 7013561424
      </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} NSS IIIT Hyderabad. All rights reserved.</p>
      </div>
    </footer>
  );
}
