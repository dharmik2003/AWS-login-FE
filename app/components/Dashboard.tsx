"use client";
import { useState, useEffect } from "react";

// Define the User interface
interface User {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}

export default function Dashboard() {
  const [data, setData] = useState<User[]>([]); // Use the User type here

  const fetchUserList = async () => {
    try {
      const response = await fetch("http://codedharmik/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("data", responseData);
        setData(responseData.payload); // Ensure the API's structure matches
      } else {
        console.log("Failed to fetch data, status:", response.status);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className="h-full w-full bg-green-200 items-center flex flex-col gap-2">
      <div className="w-full sm:w-[600px] p-5 flex flex-col gap-2">
        {data?.length > 0 ? (
          data.map((user: User) => (
            <div
              className="w-full p-5 gap-2 bg-white rounded-md flex flex-col border"
              key={user.id}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-[150px] text-[#23282D]">User ID: </div>
                <div className="text-gray-400">{user.id}</div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-[150px] text-[#23282D]">First Name: </div>
                <div className="text-gray-400">{user.firstName}</div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-[150px] text-[#23282D]">Last Name: </div>
                <div className="text-gray-400">{user.lastName}</div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-[150px] text-[#23282D]">
                  Phone Number:{" "}
                </div>
                <div className="text-gray-400">{user.phoneNumber}</div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-[150px] text-[#23282D]">Email: </div>
                <div className="text-gray-400">{user.email}</div>
              </div>
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-[150px] text-[#23282D]">Address: </div>
                <div className="text-gray-400">{user.address}</div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
