const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

const app = express();

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://ftx.com/api/markets/BTC/USD/candles?resolution=3600&start_time=1666775988&end_time=1666387763',
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log("PRXY REQ:", proxyReq)
      },
      proxyRes: (proxyRes, req, res) => {
        /* handle proxyRes */
        console.log("PRXY RES:", res)
      },
      error: (err, req, res) => {
        /* handle error */
        console.log("PRXY ERR:", err)
      },
    }
  })
);
const port = Number(process.env.PORT) || 3000
console.log("Listening on " + port)
app.listen(port);