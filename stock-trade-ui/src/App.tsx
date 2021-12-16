import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import useSWR from "swr";
import "./App.css";
import StockChart from "./components/StockChart";
import StockSelect from "./components/StockSelect";
import { groupBy } from "./lib/utils";

const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  const { data: trades = [], error } = useSWR("http://localhost:3000/trades", fetcher);
  const symbolsSet = trades.reduce((acc, trade) => acc.add(trade.symbol), new Set());
  const symbols = [...symbolsSet];

  const [selectedSymbol, setSelectedSymbol] = useState("");

  const groupedTrades = groupBy(trades, (trade) => trade.symbol);
  const handleChange = (event: any) => {
    setSelectedSymbol(event.target.value);
  };

  if (error) return <p>"An error has occurred."</p>;
  if (trades.length === 0) return <p>"Loading..."</p>;

  return (
    <Container maxWidth="lg" className="container">
      <Typography variant="h2" component="h2" style={{ textAlign: "center", color: "#66668c" }}>
        Stock Trades
      </Typography>

      <StockSelect handleChange={handleChange} symbols={symbols} selectedSymbol={selectedSymbol} />

      <StockChart trades={groupedTrades.get(selectedSymbol)} />
    </Container>
  );
}

export default App;
