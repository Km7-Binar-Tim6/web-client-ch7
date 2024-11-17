//src/routes/cars/index

import { createLazyFileRoute } from "@tanstack/react-router";
import Navbar from "../../components/FilterCarsUser/Navbar";
import { getCars } from "../../service/car";
import HeroCariMobil from "../../components/FilterCarsUser/HeroCariMobil";
import CariMobilMenu from "../../components/FilterCarsUser/CariMobilMenu";
import Footer from "../../components/User/Footer";
import CarCardGrid from "../../components/FilterCarsUser/CarCardGird";
import { useState } from "react";

export const Route = createLazyFileRoute("/cars/")({
  component: UserFilterCars,
});
function UserFilterCars() {
  const [filteredCars, setFilteredCars] = useState([]);
  const [showCarGrid, setShowCarGrid] = useState(false);

  const handleSearch = async (filters) => {
    const { rentperday, capacity, availableat } = filters;

    // Panggil API untuk mendapatkan semua mobil yang tersedia
    const result = await getCars(null, null, capacity, null, availableat, true);

    if (result.success) {
      // Filter berdasarkan kondisi yang diberikan
      const filtered = result.data.filter((car) => {
        return (
          car.rentperday >= rentperday && // Harga sewa lebih murah atau sama
          car.capacity >= capacity && // Kapasitas lebih besar atau sama
          new Date(car.availableat) <= new Date(availableat) && // Ketersediaan lebih awal/sama
          car.available // Wajib tersedia
        );
      });

      setFilteredCars(filtered); // Set hasil filter ke state
      setShowCarGrid(true); // Tampilkan grid hasil pencarian
    } else {
      setFilteredCars([]); // Jika gagal, kosongkan hasil
      setShowCarGrid(false);
    }
  };

  return (
    <>
      <Navbar />
      <HeroCariMobil />
      <CariMobilMenu onSearch={handleSearch} />
      {showCarGrid && <CarCardGrid filteredCars={filteredCars} />}
      <Footer />
    </>
  );
}
