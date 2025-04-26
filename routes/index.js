const express = require("express");
const supabase = require("../config/database");
const router = express.Router();
const response = require("../utils/response");

router.get("/", async (req, res) => {
  try {
    // const response = await fetch('https://fakestoreapi.com/products')
    // const response = await fetch('https://api.escuelajs.co/api/v1/products')
    // const data = await response.json()
    // console.log(data)
    // const response = await fetch("http://localhost:3000/api/products");
    // const localData = await response.json();
    // console.log(localData);
    const { data, error } = await supabase.from("products").select("*").order('id', { ascending: true });

    if (error) {
      return response.error(res, "Error fetching product");
    }

    res.render("index", { data });
  } catch (error) {
    console.log(error);
    res.render("Welp, try again");
  }
});

module.exports = router;
