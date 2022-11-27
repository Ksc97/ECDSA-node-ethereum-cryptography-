const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0461a64b0238ab4fbc9e8f77979f9320fdd507b37754622aac057e7e202a0ef3c2228d6b7e2de01071b9fa2cf6b1063ee93674419a8e021c9d61bf8eac46369549": 100,
  "0464d4368cef2e756eba394273082304d3e62078629461f1a0056afb44c41ebb1c19939f5e767a2be5839e5706c6d6e44c2ca7e9bf11ab4599a7aeade183d337a3": 50,
  "045584b0e13258078d62f59354296608ec3815e34ce98d8d76576d55753ed40e0dd254d1da6525b216276c3ddaeacd573d67fff1cb867e8262ddc0435e1a90388e": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  //todo 
  //
  
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
