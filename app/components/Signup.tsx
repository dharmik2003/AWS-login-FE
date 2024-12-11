"use client";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

// Define types for the form data and users
interface User {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  // State to hold form data
  const route = useRouter();
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [isClient, setIsClient] = useState(false); // To track if we're on the client side

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
      const response = await fetch("http:/13.60.168.46:5001/signup", {
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
        route.push("/dashboard");
        // Reset the form
        setFormData({
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          email: "",
          password: "",
        });
      } else {
        const error = await response.json();
        console.log("Error signing up:", error);
      }
    } catch (err) {
      console.log("Network error:", err);
    }
  };
  

  if (!isClient) {
    // Return null or a loading spinner until the client-side JavaScript is ready
    return null;
  }



  return (
    <div className="h-full flex justify-center items-center">
      <div className="max-w-[500px] w-full mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
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

          <p className="text-[#667085] mt-2 text-center">
            Already have an account?
            <span
              className="underline text-[#6A67AF] cursor-pointer"
              onClick={() => {
                route.push("/login");
              }}
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
