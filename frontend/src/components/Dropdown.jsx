import React, { useEffect, useRef } from "react";

export const Dropdown = ({
  showDropdown,
  setShowDropdown,
  children,
  ...rest
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showDropdown]);

  return (
    showDropdown && (
      <div ref={dropdownRef} {...rest}>
        {children}
      </div>
    )
  );
};
