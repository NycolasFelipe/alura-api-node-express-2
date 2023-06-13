import mongoose from "mongoose";

mongoose.connect("mongodb+srv://nycolasfelipecontato:YSDUeOfqBA1pU7h5@cluster0.s5jchvi.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;