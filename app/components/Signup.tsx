"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Loader from "./Loader";

// Define types for the form data and users
interface User {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}

interface UserAPI {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  // State to hold form data
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  // Set isClient to true after the first render to ensure client-specific code is executed
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if all fields are filled to enable/disable the submit button
  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Prepare the payload
    const payload = { ...formData };

    try {
      // Make the API call
      const response = await fetch("https://codedharmik/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User signed up successfully:", data);

        // Update local state
        setUsers([...users, formData]);
        // Reset the form
        setFormData({
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          email: "",
          password: "",
        });

        await fetchUserList();
      } else {
        const error = await response.json();
        console.log("Error signing up:", error);
      }
    } catch (err) {
      console.log("Network error:", err);
    }
  };

  const [data, setData] = useState<User[] | null>([]);
  const fetchUserList = async () => {
    try {
      setIsLoader(true);
      const response = await fetch("https://codedharmik/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("data", responseData);
        setData(responseData.payload);
        setIsLoader(false);
      } else {
        console.log("Failed to fetch data, status:", response.status);
      }
    } catch (error) {
      console.error("error", error);
      setIsLoader(false);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  if (!isClient) {
    // Return null or a loading spinner until the client-side JavaScript is ready
    return null;
  }

  return (
    <div className="h-full flex justify-center items-center overflow-scroll md:overflow-hidden p-6  bg-gray-200">
      <div className="lg:h-[650px] md:w-[1100px] w-full sm:p-4 gap-3 lg:gap-0 flex lg:flex-row flex-col justify-center items-center ">
        <div className="h-full w-full max-w-[500px] flex flex-col p-4 bg-white rounded-sm sm:border-r-2 ">
          <h2 className="text-2xl font-semibold text-center mb-2">
            User Registration Form
          </h2>

          {/* Form for collecting user input */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First Name:
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name:
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone:
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit button is disabled if the form is not valid */}
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md mt-4 ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isFormValid}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="h-full w-full max-w-[500px]  flex-1 sm:p-4 justify-center rounded-sm items-center flex-col bg-white">
          <h2 className="h-[32px] text-2xl font-semibold text-center mb-2 mt-2">
            User List
          </h2>
          <div className="max-h-[482px] overflow-y-auto  ">
            {isLoader ? (
              <div className="w-full flex h-[482px] justify-center items-center">
                <Loader />
              </div>
            ) : (
              <div className="w-full h-full px-5 flex flex-col gap-2">
                {data &&
                  data?.length > 0 &&
                  data
                    .slice()
                    .reverse()
                    .map((user: any, index) => (
                      <div
                        className="w-full p-5 gap-2 bg-[#6a67af] rounded-md flex flex-col border"
                        key={index}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-[150px] text-white">
                            User ID:{" "}
                          </div>
                          <div className="text-white">{user.id}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-[150px] text-white">
                            First Name:{" "}
                          </div>
                          <div className="text-white">{user.firstName}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-[150px] text-white">
                            Last Name:{" "}
                          </div>
                          <div className="text-white">{user.lastName}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-[150px] text-white">
                            Phone Number:{" "}
                          </div>
                          <div className="text-white">{user.phoneNumber}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-[150px] text-white">Email: </div>
                          <div className="text-white">{user.email}</div>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                          <div className="sm:w-[150px] text-white">
                            Address:{" "}
                          </div>
                          <div className="text-white">{user.address}</div>
                        </div>
                      </div>
                    ))}
              </div>
            )}
          </div>
          <div className="w-full justify-center items-center flex">
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md mt-4 ${"bg-[#6a67af] "}`}
              // disabled={!isFormValid}
              onClick={fetchUserList}
            >
              Fetch User List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
