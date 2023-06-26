import './App.css';

// import StockPanel from './components/StockPanel';

import OrderTable from './components/OrderTable';

import UpdatedStocks from './components/UpdatedStocks';




function App() {

  return (

    <div>
      <center>
        <h3 className="text-center">Stock Trading App</h3>
      </center>

      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <UpdatedStocks name="Apple"/>

        <UpdatedStocks name="IBM"/>

        <UpdatedStocks name="Zensar"/>
        


      </div>
      <OrderTable/>

    </div>

  );

}

export default App;