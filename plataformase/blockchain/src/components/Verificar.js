import React, { Component } from "react"
import Web3 from 'web3'
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values

class Verificar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      path: ""
    }
  }

  componentDidMount() {
    document.getElementById("spinner").style.display = 'none';
  }

  captureFile(event) {
    const file = event.target.files[0]
    document.getElementById("lblCustomFile").innerHTML = file.name
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }

  async onSubmit(event) {
    event.preventDefault()
    document.getElementById("spinner").style.display = 'block';
    this.setState({ path: "" })
    document.getElementById("alert").setAttribute("class", "")
    document.getElementById("resultado").innerHTML = ""
    const result = await ipfs.add(this.state.buffer)
    await fetch('../SETyRS/api/estampados?hashInfura='+result.path)
      .then((resp) => resp.json()) // Transform the data into json
      .then( data => {
          data.map( e => {
            if(e.hashInfura == result.path)
              this.setState({ path: "https://ipfs.infura.io/ipfs/"+e.hashInfura })
          })
      })
      .catch(function(error) {
        console.error(error)
      })
    if(this.state.path == ""){
      document.getElementById("alert").setAttribute("class", "col-6 alert alert-danger")
      document.getElementById("resultado").innerHTML = "Su archivo NO es válido"
    } else {
      document.getElementById("alert").setAttribute("class", "col-6 alert alert-success")
        document.getElementById("resultado").innerHTML = "Su archivo es válido y se encuentra registrado en nuestra base de datos"
    }
    document.getElementById("spinner").style.display = 'none';
  }

  render() {
    return (
      <>
        <div className="container p-2">
          <div className="row justify-content-center">
            <div className="custom-file col-6">
              <input type="file" className="custom-file-input" id="customFile"
                onChange={ e => this.captureFile(e)} />
              <label id="lblCustomFile" className="custom-file-label" htmlFor="customFile">Seleccionar archivo</label>
            </div>
            <button type="button" className="btn btn-info ml-2"
              onClick={ (e) => this.onSubmit(e) }>Verificar</button>
          </div>
          <div className="row mt-3 justify-content-center">
            <div id="spinner" className="spinner-border text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div role="alert" id="alert">
              <p id="resultado" className="text-center"></p>
            </div><br/>
            <embed id="data" type="text/html" className="w-75 d-inline-block" height="500px" src={ this.state.path } />
          </div>
        </div>
      </>
    );
  }

}

export default Verificar;
