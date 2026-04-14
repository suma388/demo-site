import React from "react";

const Notification = () => {
  return (
    <div className="my-5 p-3">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <div className="space-y-2 mt-5">
        <div className="p-3 bg-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            💰 Payment received
          </p>
          <p className="text-lg">
            Your payment was processed successfully. Subscription renewed for
            another month. Your plan has been upgraded to Pro.
          </p>
          <span className="text-gray-500">2 min ago</span>
        </div>

        <div className="p-3 bg-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            📩 New message from client
          </p>
          <p className="text-lg">
            System maintenance scheduled for tonight. Bug fixes and performance
            improvements released. Your data has been synced successfully.
          </p>
          <span className=" text-gray-500">10 min ago</span>
        </div>
        <div className="p-3 bg-white rounded hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer">
          <p className="text-xl font-bold text-gray-800 dark:text-white">
            🚀 New Update is here!
          </p>
          <p className="text-lg">
            Your profile has been updated successfully. New login detected from
            a new device. Password changed successfully.
          </p>
          <span className=" text-gray-500">1 hour ago</span>
        </div>
      </div>
    </div>
  );
};

export default Notification;
