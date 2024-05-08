import React, {useEffect, useMemo, useState} from "react";
import Web3 from "web3";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import Student from "./components/student";
import Educator from "./components/educator";
import Course from "./components/Course";
import {UserContext} from "./UserContext";
import {Home} from "./components/Home";
import {Error} from "./components/Error";
import {Login} from "./components/login";
import {Signup} from "./components/signup";
import GuestLogin from "./components/guestlogin";
import EdublocksABI from "./contracts/Edublocks.json";
import TokenABI from "./contracts/EdublocksToken.json";
import TokenSaleABI from "./contracts/EdublocksTokenSale.json";

function App() {
  const [id, setID] = useState({id: null, user: null});
  const value = useMemo(() => ({id, setID}), [id, setID]);
  const [contract, setContract] = useState(); //main contract
  const [t_contract, setT_contract] = useState(); //token contract
  const [ts_contract, setTS_contract] = useState(); //token sale contract
  const [err, setErr] = useState(false);
  const [acc, setAcc] = useState("");

  useEffect(() => {
    loadWeb3();
    LoadBlockchainData();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      setErr(true);
    }

    // Update provider URL to connect to Ganache running on port 7545
    window.web3 = new Web3("http://localhost:7545");
  };

  const LoadBlockchainData = async () => {
    if (window.web3) {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const networkData1 = EdublocksABI.networks[networkId];
      const networkData2 = TokenABI.networks[networkId];
      const networkData3 = TokenSaleABI.networks[networkId];
      const account = accounts[0];
      setAcc(account);

      // Check if the node is syncing before proceeding
      const isSyncing = await web3.eth.isSyncing();
      if (isSyncing) {
        console.log("Node is currently syncing. Please wait...");
        return;
      }

      if (networkData1) {
        const Edublocks_Contract = new web3.eth.Contract(
          EdublocksABI.abi,
          networkData1.address
        );
        setContract(Edublocks_Contract);
        if (networkData2) {
          const Token_Contract = new web3.eth.Contract(
            TokenABI.abi,
            networkData2.address
          );
          setT_contract(Token_Contract);
          if (networkData3) {
            const TokenSale_Contract = new web3.eth.Contract(
              TokenSaleABI.abi,
              networkData3.address
            );
            setTS_contract(TokenSale_Contract);
          } else {
            window.alert("Error! Token Sale Contract not deployed");
          }
        } else {
          window.alert("Error! Token Contract not deployed");
        }
      } else {
        window.alert("Error! Edublocks Smart Contract not deployed");
      }
    } else {
      window.alert("Error! Web3 not detected");
    }
  };
  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={value}>
          <Navigation />
          <Switch>
            <Route
              path="/login"
              render={props => <Login {...props} contract={contract} />}
            />
            <Route
              path="/signup"
              render={props => (
                <Signup {...props} address={acc} contract={contract} />
              )}
            />
            <Route
              path="/guestlogin"
              render={props => <GuestLogin/>}
            />
            <Route
              path="/student"
              render={props => (
                <Student
                  {...props}
                  ts_contract={ts_contract}
                  address={acc}
                  contract={contract}
                  t_contract={t_contract}
                />
              )}
            />
            <Route
              path="/educator"
              render={props => (
                <Educator
                  {...props}
                  ts_contract={ts_contract}
                  address={acc}
                  contract={contract}
                  t_contract={t_contract}
                />
              )}
            />
            <Route
              path="/course"
              render={props => (
                <Course {...props} address={acc} contract={contract} />
              )}
            />
            <Route
              path="/"
              render={props => (
                <Home
                  {...props}
                  ts_contract={ts_contract}
                  address={acc}
                  contract={contract}
                  t_contract={t_contract}
                  error={err}
                />
              )}
              exact
            />
            <Route component={Error} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
