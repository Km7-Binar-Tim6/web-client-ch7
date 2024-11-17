// src/routes/cars/index.jsx

import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "../../components/FilterCarsUser/Navbar";
import HeroCariMobil from "../../components/FilterCarsUser/HeroCariMobil";
import CariMobilMenu from "../../components/FilterCarsUser/CariMobilMenu";
import Footer from "../../components/User/Footer";
import { useState } from "react";
import CarsIndex from "../../components/FilterCarsUser/CarsIndex";
import { getCars } from "../../service/car";

export const Route = createLazyFileRoute("/cars/")({
  component: UserFilterCars,
});

function UserFilterCars() {
  const [filteredCars, setFilteredCars] = useState([]);

  // Function to handle search button click (fetch all cars)
  const handleSearch = async () => {
    const result = await getCars(); // Fetch all cars without filter parameters

    if (result.success) {
      setFilteredCars(result.data); // Set all cars to the state
    } else {
      setFilteredCars([]); // Clear results if API fails
    }
  };

  return (
    <>
      <Navbar />
      <HeroCariMobil />
      <CariMobilMenu onSearch={handleSearch} />
      <CarsIndex cars={filteredCars} /> {/* Pass filteredCars as prop */}
      <Footer />
    </>
  );
}
