import React, { Component } from "react";
import { render } from "react-dom";
import Web3 from 'web3';
import Cert from '../abis/Cert.json';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      Hash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: null,
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Cert.networks[networkId]
    if(networkData) {
      const contract = new web3.eth.Contract(Cert.abi, networkData.address)
      this.setState({ contract })
      const Hash = await contract.methods.get().call()
      this.setState({ Hash })
      console.log(Hash,networkId)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  componentDidMount() {
    this.loadWeb3();
    this.loadBlockchainData();
    fetch("SETyRS/api/lead")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  async onSubmit(event) {
    event.preventDefault()
    console.log("Submitting file to ipfs...")
    console.log('buffer', this.state.buffer)
    console.log(ipfs)
    //ipfs method
    const result = await ipfs.add(this.state.buffer)
    console.info("result ->", result)
    console.log("AAA ->", this.state.account)
    const blockchainIPFS = await this.state.contract.methods
      .set(result.path)
      .send({ from: this.state.account })
      .then((r) => {
        console.log("r -> ", r)
        //return this.setState({ Hash: result[0].hash })
      })
    /*ipfs.add(this.state.buffer, (error, result) => {
      console.log("error -> ", error)
      console.log("result -> ", result)
      console.log("buffer -> ", this.state.buffer)
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }//blockchain method to add y and ge4t the ipfs hash
      
        console.log("hash",this.state.Hash)
        this.setState({
          user: {
            id:this.state.id,
            title:this.state.title,
            hash:this.state.Hash
          }
        });
      console.log("usedatacer",this.state.user) 
    })*/
  }

  captureFile(event) {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  onChange(e){
    this.setState({...this.state,[e.target.name] : e.target.value});
  }

  render() {
    return (
      <>
        <input type="file" accept=".jpg,.png" onChange={(e) => this.captureFile(e)}/>
        <button onClick={(event) => this.onSubmit(event)}>Aceptar</button>
        <ul>
          {this.state.data.map(contact => {
            return (
              <li key={contact.id}>
                {contact.name} - {contact.email}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);