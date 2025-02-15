"use client";
import Script from "next/script";

// This is for testing purposes only

const NotifyScript = () => {
  // scriptElement.src = 'https://noti-widget.vercel.app/assets/index.js'
  // scriptElement.src = 'http://localhost:5173/src/main.ts';

  return (
    <Script id="flexnote">
      {`(function() {
          const scriptElement = document.createElement('script');
          scriptElement.src = 'https://noti-widget.vercel.app/assets/index.js'
          scriptElement.setAttribute('websiteId', 'clvl7c7rk0001xihxoq6j5k18');
          scriptElement.type = 'module'
          document.body.appendChild(scriptElement);
      })();`}
    </Script>
  );
};

export default NotifyScript;
