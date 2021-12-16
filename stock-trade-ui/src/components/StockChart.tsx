import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function StockChart({ trades }) {
  return (
    <ResponsiveContainer>
      <LineChart data={trades} margin={{ top: 5, right: 20, bottom: 10, left: 0 }}>
        <Line type="linear" dataKey="price" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="timestamp"
          padding={{ left: 55 }}
          tick={{ fontSize: 12 }}
          label={{ value: "Timestamp", position: "insideBottom", offset: -7 }}
        />
        <YAxis label={{ value: "Price", angle: -90, position: "insideLeft", offset: 15 }} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StockChart;
