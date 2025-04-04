import React, { useEffect, useState } from "react";

export const ErrorMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide the error after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Check if the message is an object and stringify it
  const displayMessage =
    typeof message === "object" ? JSON.stringify(message, null, 2) : message;

  return (
    isVisible && (
      <div
        className="fixed bottom-4 right-4 bg-red-700 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs w-full text-sm break-words"
        style={{
          zIndex: 9999,
          maxWidth: "300px", // Max width set to 300px
        }}
      >
        <div className="whitespace-normal">{displayMessage}</div>
      </div>
    )
  );
};
