import React, { Component } from "react";
import { render } from "react-dom";
import Web3 from 'web3';
import Cert from '../abis/Cert.json';
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
import $ from 'jquery';


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
      estampados: {
        nombre: "Admisión de trámite",
        descripción: "Prueba",
        hashInfura: null,
        hash: null,
        blockHash: null,
        blockNumber: null,
      }
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

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
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
    console.log("Estampados 1 -> ", this.state.estampados)
    const blockchainIPFS = await this.state.contract.methods
      .set(result.path)
      .send({ from: this.state.account })
      .then((r) => {
        console.log("r -> ", r)
        this.setState(prevState => {
          let estampados = Object.assign({}, prevState.estampados);
          estampados.hashInfura = result.path, 
          estampados.hash = r.transactionHash,
          estampados.blockHash = r.blockHash,
          estampados.blockNumber = r.blockNumber
          return { estampados };
        })
        //return this.setState({ Hash: result[0].hash })
      })
    console.log("Estampados 2 -> ", this.state.estampados)
    var body = this.state.estampados
    console.log(body)
    var csrftoken = this.getCookie('csrftoken');
    fetch('SETyRS/api/estampados', {
      method : "POST",
      body : body,
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    }).then(res => res.json())
      .then(data => data)
      .catch((err) => { console.log(err) });
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
      </>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);