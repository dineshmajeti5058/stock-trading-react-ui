import { Stomp } from "@stomp/stompjs";

import React, { useEffect, useState } from "react";




const OrderTable = () => {

  const [orders, setOrders] = useState([]);




  useEffect(() => {

    //const socket = new WebSocket("ws://zen-stock-trading-app-env.eba-dmiud7ea.us-east-1.elasticbeanstalk.com/stocks-prices/websocket");

   

    const socket = new WebSocket("ws://localhost:8080/stocks-prices/websocket");

    const stompClient = Stomp.over(socket);




    stompClient.connect({}, () => {

      stompClient.subscribe("/topic/stock-orders", (message) => {

        const newOrder = JSON.parse(message.body);

        console.log("Received new order:", newOrder);

        setOrders(newOrder);

      });

    });




    return () => {

      stompClient.disconnect();

    };

  }, []);




  const formatDateTime = (dateTimeString) => {

    const date = new Date(dateTimeString);

    if (isNaN(date)) {

      return dateTimeString; // Return the original value if the date is invalid

    }

    return date.toLocaleString(); // Modify the formatting as per your requirements

  };




  return (

    <center>

      <h3>Orders</h3>

      <table>

        <thead>

          <tr>

            <th>S.No</th>

            <th>Stock Name</th>

            <th>Bid Price</th>

            <th>Ask Price</th>

            <th>Date &amp; Time</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order, index) => (

            <tr key={index}>

              <td>{index + 1}</td>

              <td>{order.companyName}</td>

              <td>{order.bidPrice}</td>

              <td>{order.askPrice}</td>

              <td>{formatDateTime(order.localDateTime)}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </center>

  );

};




export default OrderTable;