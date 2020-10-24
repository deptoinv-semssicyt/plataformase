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
        descripcion: "Prueba",
        hashInfura: null,
        hash: null,
        blockHash: null,
        blockNumber: null,
        solicitud: null,
        userReg: null
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
      // console.log(Hash,networkId)
    } else {
      window.alert('Smart contract not deployed to detected network.')
    }
  }

  componentDidMount() {
    this.loadWeb3();
    this.loadBlockchainData();
    this.captureFile();
    const user = document.getElementById('user').value;
    this.setState(prevState => {
      let estampados = Object.assign({}, prevState.estampados);
      estampados.userReg = user;
      return { estampados };
    })
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
    //ipfs method
    const result = await ipfs.add(this.state.buffer)
    const blockchainIPFS = await this.state.contract.methods
      .set(result.path)
      .send({ from: this.state.account })
      .then((r) => {
        this.setState(prevState => {
          let estampados = Object.assign({}, prevState.estampados);
          estampados.hashInfura = result.path,
          estampados.hash = r.transactionHash,
          estampados.blockHash = r.blockHash,
          estampados.blockNumber = r.blockNumber
          return { estampados };
        })
      })
    var body = JSON.stringify(this.state.estampados)
    var csrftoken = this.getCookie('csrftoken');
    fetch('SETyRS/api/estampados', {
      method : 'POST',
      body : body,
      headers : {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    }).then(res => res.json())
      .catch((err) => { console.log(err) });
  }

  async captureFile() {
    const id_solicitud = document.getElementById('IDSolicitud').value;
    this.setState(prevState => {
      let estampados = Object.assign({}, prevState.estampados);
      estampados.solicitud = id_solicitud;
      return { estampados };
    })
    let blob = await fetch('SETyRS/institucion/solicitud/'
      + id_solicitud
      + '/informe_aprobacion_solicitud'
    ).then(r => r.blob());
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(blob)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }

  onChange(e){
    this.setState({...this.state,[e.target.name] : e.target.value});
  }

  handleChangeDes(event) {
    const value = event.target.value;
    this.setState(prevState => {
      let estampados = Object.assign({}, prevState.estampados);
      estampados.descripcion = value;
      return { estampados };
    })
  }

  handleChangeNom(event) {
    const value = event.target.value;
    this.setState(prevState => {
      let estampados = Object.assign({}, prevState.estampados);
      estampados.nombre = value;
      return { estampados };
    })
  }

  render() {
    return (
      <>
        <form>
          <div class="form-inline">
            <label for="idNombre">Nombre:</label>
            <input onChange={ event => this.handleChangeNom(event)}
              className="form-control col-6 ml-2"
              id="idNombre"/>
          </div>
          <div class="form-group">
            <label for="idDescripcion">Descripción del documento a estampar:</label>
            <textarea onChange={ event => this.handleChangeDes(event)}
              className="md-textarea form-control"
              rows="2"
              id="idDescripcion"/>
          </div>
          <div className="d-flex justify-content-end">
            <button onClick={(event) => this.onSubmit(event)}
              className="btn btn-success ">
                Estampar
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
