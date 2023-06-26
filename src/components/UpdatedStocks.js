import { useEffect, useState } from "react";




import SockJS from "sockjs-client";




import { Client, Stomp } from "@stomp/stompjs";




const stockPriceData = {

  Apple: { bidPrices: [0, 0, 0], askPrices: [0, 0, 0] },




  IBM: { bidPrices: [0, 0, 0], askPrices: [0, 0, 0] },




  Zensar: { bidPrices: [0, 0, 0], askPrices: [0, 0, 0] },

};




const UpdatedStocks = (props) => {

  const [receivedStock, setReceivedStock] = useState(null);




  useEffect(() => {

    //const socket = new WebSocket("ws://zen-stock-trading-app-env.eba-dmiud7ea.us-east-1.elasticbeanstalk.com/stocks-prices/websocket");

    const socket = new WebSocket("ws://localhost:8080/stocks-prices/websocket");

    const stompClient = Stomp.over(socket);




    stompClient.connect({}, () => {

      stompClient.subscribe("/topic/stockbidask", (message) => {

        const stock = JSON.parse(message.body);




        console.log("stock ask bid prices:", stock);




        const companyName = Object.keys(stock)[0];




        const bidPrices = stock[companyName]?.bidPrice || [];




        const askPrices = stock[companyName]?.askPrice || [];




        setReceivedStock({ companyName, bidPrices, askPrices });




        updateStockPriceData(companyName, bidPrices, askPrices);

      });

    });

  });




  const updateStockPriceData = (companyName, bidPrice, askPrice) => {

    if (bidPrice.length > 0) {

      stockPriceData[companyName].bidPrices = bidPrice;

    }




    if (askPrice.length > 0) {

      stockPriceData[companyName].askPrices = askPrice;

    }

  };




  const name = props.name;




  const StockPriceTableData = stockPriceData[name]?.bidPrices.map(function (

    bidPrice,

    index

  ) {

    const askPrice = stockPriceData[name]?.askPrices[index];




    const shouldHighlightBidPrice =

      receivedStock &&

      receivedStock.companyName === name &&

      receivedStock.bidPrices[index] === bidPrice &&

      receivedStock.askPrices[index] !== askPrice;




    const shouldHighlightAskPrice =

      receivedStock &&

      receivedStock.companyName === name &&

      receivedStock.bidPrices[index] !== bidPrice &&

      receivedStock.askPrices[index] === askPrice;




    const bidPriceStyle = {

      backgroundColor: shouldHighlightBidPrice ? "red" : "transparent",

    };




    const askPriceStyle = {

      backgroundColor: shouldHighlightAskPrice ? "red" : "transparent",

    };




    return (

      <tr key={index}>

        <td style={bidPriceStyle}>{bidPrice}</td>




        <td style={askPriceStyle}>{askPrice}</td>

      </tr>

    );

  });




  return (

    <div>

      <table

        style={{ border: "1px solid black", margin: "10px", padding: "10px" }}

      >

        <thead>

          <tr>

            <th colSpan={2}>{name}</th>

          </tr>




          <tr>

            <th>Bid Price</th>




            <th>Ask Price</th>

          </tr>

        </thead>




        <tbody>{StockPriceTableData}</tbody>

      </table>

    </div>

  );

};




export default UpdatedStocks;