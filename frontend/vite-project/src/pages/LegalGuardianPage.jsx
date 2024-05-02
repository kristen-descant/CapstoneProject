import React, { useState, useEffect } from "react";
import { api } from "../utilities.jsx";
import pagePic from "../media/legalGuardianPagePhoto.jpg"

const LegalGuardianPage = () => {
  const [legalGuardian, setLegalGuardian] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    fullAddress: "",
    phoneNumber: "",
    email: ""
  });

  useEffect(() => {
    fetchLegalGuardian();
  }, []);

  const fetchLegalGuardian = async () => {
    try {
      const response = await api.get("legalguardian/");
      setLegalGuardian(response.data);
      setFormData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If legal guardian does not exist, set legalGuardian to null
        setLegalGuardian(null);
      } else {
        console.error("Error fetching legal guardian:", error);
      }
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(legalGuardian || {
      fullName: "",
      fullAddress: "",
      phoneNumber: "",
      email: ""
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (legalGuardian) {
        // If legal guardian exists, update it
        const response = await api.put("legalguardian/", formData);
        setLegalGuardian(response.data);
      } else {
        // If legal guardian doesn't exist, create a new one
        const response = await api.post("legalguardian/", formData);
        setLegalGuardian(response.data);
      }
      setEditing(false);
    } catch (error) {
      console.error("Error updating legal guardian:", error);
    }
  };

  return (
    <div
        className="min-h-screen bg-cover bg-center "
        style={{ backgroundImage: `url(${pagePic})` }}>
        <div className="min-h-screen flex justify-center items-center z-[10]">
            <div className="h-[40rem] w-[35rem] bg-white border border-r grid grid-rows-3 p-2 z-[2]">
                <div className="p-5">
                    <h1 className="text-lg font-semibold mb-5">Legal Guardian Information</h1>
                    <div>
                        <div>
                        <div className="flex flex-row">
                            <p className="mb-3">Full Name: </p>       
                            <p className="ml-[3rem]">{legalGuardian && legalGuardian.fullName}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="mb-3">Full Address: </p>
                            <p className="ml-[2.1rem]">{legalGuardian && legalGuardian.fullAddress}</p>
                        </div>
                        
                        <div className="flex flex-row">
                            <p className="mb-3">Phone Number: </p>
                            <p className="ml-3">{legalGuardian && legalGuardian.phoneNumber}</p>
                        </div>
                        
                        <div className="flex flex-row">
                            <p className="mb-3">Email: </p>
                            <p className="ml-[5.1rem]">{legalGuardian && legalGuardian.email}</p>
                        </div>
                        
                        {!editing && (
                            <button onClick={handleEdit} className="bg-green-500 text-white p-1 rounded-md">
                            Edit
                            </button>
                        )}
                        </div>
                        {editing && (
                        <form className="flex flex-col mt-10" onSubmit={handleSubmit}>
                            <label className="mb-3">
                            Full Name:
                            <input
                                className="border border-black ml-[3rem]"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            </label>
                            <label className="mb-3">
                            Full Address:
                            <input
                                className="border border-black ml-[2.1rem]"
                                type="text"
                                name="fullAddress"
                                value={formData.fullAddress}
                                onChange={handleChange}
                            />
                            </label>
                            <label className="mb-3">
                            Phone Number:
                            <input
                                className="border border-black ml-3"
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                            </label>
                            <label className="mb-3">
                            Email:
                            <input
                                className="border border-black ml-[5.1rem]"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            </label>
                            <div className="flex flex-col items-center w-full">
                                <button type="submit" className="bg-blue-500 text-white p-1 rounded-md w-[4rem] mb-3">Save</button>
                                <button type="button" className="bg-red-500 text-white p-1 rounded-md w-[4rem]" onClick={handleCancel}>
                                Cancel
                                </button>
                            </div>
                        </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default LegalGuardianPage;
