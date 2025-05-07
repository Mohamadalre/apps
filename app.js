const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

//  Products array to store product objects in memory
let products = [
  { id: 1, name: "Laptop", price: "1500", quantity: 10 },
  { id: 2, name: "Phone", price: "800", quantity: 5 }
];

//  Get all products
app.get('/api/products', (req, res) => {
  res.json(products); 
});

//  Add a new product
app.post('/api/products', (req, res) => {
  const { name, price, quantity } = req.body;


  if (!name || !price||  Number(price) <= 0 || quantity < 0) {
    return res.status(400).json({ error: "Invalid product data" });
  }


  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    name,
    price,
    quantity
  };

  products.push(newProduct);
  res.status(201).json(newProduct); 
});

//  Update an existing product by id
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price, quantity } = req.body;


  if (!name || !price ||  Number(price) <= 0 || quantity < 0) {
    return res.status(400).json({ error: "Invalid product data" });
  }

 
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });


  product.name = name;
  product.price = price;
  product.quantity = quantity;

  res.json(product); 
});

//  Delete a product by id
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);

 
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Product not found" });

  products.splice(index, 1); 
  res.json({ message: "Product deleted" });
});

//  Get a ont product by id
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  res.json(product); 
});

//  Export all products to a JSON file and send it for download
app.get('/api/products/export/json', (req, res) => {
  
  const date1 = new Date().toISOString().split('T')[0];
  const filename = `products_${date1}.json`;


  fs.writeFile(filename, JSON.stringify(products, null, 2), err => {
    if (err) return res.status(500).json({ error: "Failed to export file" });

  
    res.download(filename, err => {
      if (err) res.status(500).json({ error: "Download failed" });

      fs.unlink(filename, () => {});
    });
  });
});

// Start the Express server on port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});