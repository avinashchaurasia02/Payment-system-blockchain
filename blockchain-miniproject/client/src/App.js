import abi from "./contract/payment.json";
import {useState,useEffect} from "react";
// import {ethers} from "ethers";
import "./App.css";
import "./header.css";
import bg from "./bgimage.jpg";
import Pay from "./components/Dopayment.js";
import Memos from "./components/Memos.js";

const ethers = require("ethers");
const provider = require("ethers");
function App() {
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account, setAccount] = useState("None");
  useEffect(()=>{
    const connectWallet=async()=>{
      const contractAddress = "0x83889255a9c3cfae69aCD58Aa8EDE80e0Bba6906";
      const contractAbi = abi.abi;
      try{
        const {ethereum}=window;
        if(ethereum){
          const account = await ethereum.request({
            method:"eth_requestAccounts",
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
        // const provider = new ethers.provides.Web3Provider(ethereum);
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress,contractAbi,signer);
          setAccount(account);
          setState({provider,signer,contract});  
        }else{
          alert("Please install metamask");
        }
      }
      catch(error){
        console.log(error);
      }
    };
    connectWallet();
  },[]);
  //console.log(state);
  return (
    <div style={{backgroundColor: "#EFEFEF", height: "100%"}}>
    {/* <h3>MERCHANT PAYMENT SYSTEM</h3>
    <img src={bg} className="img-fluid" class="center" alt=".." width="100%" height="400px"/> */}
    <header>
      <div className = "head-text">
        <div className = "head-image">
          <img src = {bg} className="img-fluid" class="center" alt=".." width="100%" height="400px" />
        </div>
          <div class='text-on-image'>
             <h1> MERCHANT PAYMENT SYSTEM </h1>
          </div>
      </div>
    </header>
    <p 
      class="text-muted lead"
      stylw={{ marginTop:"10px", marginLeft:"5px"}}
    >
      <small>Connected Account - {account}</small>
    </p>
    <div className="App">
      <Pay state={state}></Pay>
      <Memos state={state}></Memos>
    </div>
    </div>
  );
}

export default App;
