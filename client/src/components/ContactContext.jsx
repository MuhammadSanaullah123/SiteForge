import React, { createContext, useContext, useState } from "react";

const ContactContext = createContext();

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <ContactContext.Provider value={{ isContactOpen, toggleContact }}>
      {children}
    </ContactContext.Provider>
  );
};
