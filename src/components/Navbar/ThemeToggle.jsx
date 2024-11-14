import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-bs-theme", newTheme); // Set theme on <html> element
    localStorage.setItem("theme", newTheme); // Save to localStorage
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"; // Get saved theme from localStorage
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-bs-theme", savedTheme); // Apply saved theme on <html> element
  }, []);

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle btn btn-outline-secondary"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}{" "}
      {/* Display sun icon for dark theme, moon for light */}
    </button>
  );
};

export default ThemeToggle;
