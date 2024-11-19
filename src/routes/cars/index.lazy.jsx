// src/routes/cars/index.jsx

import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "../../components/FilterCarsUser/Navbar";
import HeroCariMobil from "../../components/FilterCarsUser/HeroCariMobil";
import CariMobilMenu from "../../components/FilterCarsUser/CariMobilMenu";
import Footer from "../../components/User/Footer";
import { useState, useEffect } from "react";
import CarsIndex from "../../components/FilterCarsUser/CarsIndex";
import { getCars } from "../../service/car";

export const Route = createLazyFileRoute("/cars/")({
  component: UserFilterCars,
});

function UserFilterCars() {
  const [allCars, setAllCars] = useState([]); // Semua data mobil
  const [filteredCars, setFilteredCars] = useState([]); // Data mobil yang difilter
  const [filters, setFilters] = useState({ rentperday: "", capacity: "" }); // State untuk filter

  useEffect(() => {
    // Terapkan filter setiap kali filters atau allCars berubah
    const filtered = allCars.filter((car) => {
      return (
        (filters.rentperday === "" ||
          car.rentperday >= Number(filters.rentperday)) &&
        (filters.capacity === "" || car.capacity >= Number(filters.capacity)) &&
        car.available === true
      );
    });
    setFilteredCars(filtered);
  }, [filters, allCars]);

  const handleSearch = async () => {
    try {
      const cars = await getCars(); // Ambil semua data mobil
      setAllCars(cars); // Simpan ke state allCars
    } catch (error) {
      console.error("Error fetching cars:", error);
      setAllCars([]); // Reset allCars jika terjadi error
      setFilteredCars([]); // Reset filteredCars
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters })); // Update filter
  };

  return (
    <>
      <Navbar />
      <HeroCariMobil />
      <CariMobilMenu
        onFilterChange={handleFilterChange} // Kirim handler perubahan filter
        onSearch={handleSearch} // Kirim handler pencarian
      />
      <CarsIndex cars={filteredCars} />
      <Footer />
    </>
  );
}
