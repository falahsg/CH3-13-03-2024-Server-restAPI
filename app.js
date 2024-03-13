const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 8000; // localhost:8000

// middleware untuk membaca json dari request body ke kita
app.use(express.json());

const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/data/dummy_data.json`)
);

app.get("/", (req, res, next) => {
  res.send("<h1>halo fsw1</h1>");
});

app.get("/api/v1/customers", (req, res, next) => {
  res.status(200).json({
    status: "success",
    totalData: customers.length,
    data: {
      customers,
    },
  });
});

app.post("/api/v1/customers", (req, res) => {
  console.log(req.body);

  const newCustomer = req.body;

  customers.push(newCustomer);

  fs.writeFile(
    `${__dirname}/data/dummy_data.json`,
    JSON.stringify(customers),
    (err) =>
      res.status(200).json({
        status: "success",
        data: {
          customers: newCustomer,
        },
      })
  );

  res.send("oke udah");
});

app.listen(PORT, () => {
  console.log(`APP runing on port : ${PORT}`);
});
