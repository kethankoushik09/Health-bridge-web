import { createSlice } from "@reduxjs/toolkit";
import doct1 from "../../assets/doct1.png";
import doct2 from "../../assets/doct2.png";
import doct3 from "../../assets/doct3.png";
import doct4 from "../../assets/doct4.png";


const initialState = {
  list: [
    { id: 1, name: "Dr. G Kethan", specialization: "Cardiologist", image: doct1, available: true },
    { id: 2, name: "Dr. R Sindhu Pallavi", specialization: "Dermatologist", image: doct2, available: true },
    { id: 3, name: "Dr. G Keerthi", specialization: "Gynecologist", image: doct4, available: true },
    { id: 4, name: "Dr. G Vikram", specialization: "Neurologist", image: doct1, available: true },
    { id: 5, name: "Dr. M Sindhu", specialization: "Gastroenterologist", image: doct2, available: false },
    { id: 6, name: "Dr. K Varun", specialization: "Orthopedist", image: doct1, available: true },
    { id: 7, name: "Dr. R Sathvika", specialization: "Pediatrician", image: doct2, available: false },
    { id: 8, name: "Dr. G Tagore", specialization: "General Physician", image: doct1, available: true },
    { id: 9, name: "Dr. RK Arjun", specialization: "Cardiologist", image: doct1, available: true },
    { id: 10, name: "Dr. B Reena", specialization: "Dermatologist", image: doct4, available: false },
    { id: 11, name: "Dr. C Naveen", specialization: "Orthopedist", image: doct3, available: true },
    { id: 12, name: "Dr. D Teju", specialization: "General Physician", image: doct4, available: true },
    { id: 13, name: "Dr. K Guna", specialization: "Gynecologist", image: doct1, available: false },
    { id: 14, name: "Dr. F Anitha", specialization: "Neurologist", image: doct4, available: true },
    { id: 15, name: "Dr. G Vijay", specialization: "Pediatrician", image: doct1, available: true },
    { id: 16, name: "Dr. H Radhi", specialization: "Gastroenterologist", image: doct4, available: true },
    { id: 17, name: "Dr. M Rocky", specialization: "Cardiologist", image: doct3, available: true }
  ],
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
});

export default doctorsSlice.reducer;
