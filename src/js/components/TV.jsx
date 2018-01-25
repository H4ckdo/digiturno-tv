//@ sourceMappingUR=/assets/js/tv.bundle.js.map
import React from 'react';
import ReactDOM from 'react-dom';
import '../../scss/components/TV.scss';
import './../../../assets/js/dependencies/slick/slick.js';
import PopUp from "./PopUp.jsx";
import FormChangeIp from "./FormChangeIp.jsx";
import { copyCollection } from '../utils';
import $ from 'jquery';
import '../../../assets/js/dependencies/slick/slick.js';
const SADDRESS = window.localStorage.getItem('SADDRESS') || 'localhost';

/**
* Represent TV componnent class
* @constructor
* @param {Object} props - properties inherited of React.Component
*/
export default class TV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      config: {
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 1000,
        slidesToScroll: -1
      }
    }
  }

  generateTemplate(data = []) {
    let result = data.map((element) => {
      return `
        <li>
          <i class="material-icons">notifications_active</i>
          <span class='token-name'>${ element.name }</span>
        </li>
      `
    })
    return result;
  }

  updateIp(form) {
    let input = this.refs[form].refs['input-ip'];
    if (input.state.valid) {
      let newIp = ReactDOM.findDOMNode(input).querySelector('input');
      window.localStorage.setItem('SADDRESS', newIp.value);
      this.refs.changeIpPopUp.modal.closePopUp();
      this.refs.restartPackPopUp.modal.openPopUp();
    }
  }

  componentDidMount() {
    let self = this;
    this.SADDRESS = SADDRESS;

    const sound = new Audio(`./../../../assets/audio/call.mp3`);
    this.refs.loaderPopUp.modal.openPopUp();
    window.failPopUp = this.refs.failPopUp;
    window.loaderPopUp = this.refs.loaderPopUp;
    window.changeIpPopUp = this.refs.changeIpPopUp;
    window.wrongIpPopUp = this.refs.wrongIpPopUp;
    window.restartPackPopUp = this.refs.restartPackPopUp;
    io.sails.url = `http://${SADDRESS}:1337`;
    let client = io.sails.connect();
    setTimeout(() => {
      if(client.isConnecting) {
        this.refs.loaderPopUp.modal.closePopUp();
        this.refs.failPopUp.modal.openPopUp();
      }  
    }, 30000);

    client.on('connect_error', function () {
      console.log('connect_error');
    })

    client.on('disconnect', function () {
      //alert('client socketio disconnect!')
    });

    client.get(`http://${SADDRESS}:1337/tv/join`, (response, jwRes) => {
      this.refs.loaderPopUp.modal.closePopUp();
      if (response.data) this.setState({ tokens: response.data });
      $(".regular").html(this.generateTemplate(this.state.tokens)).slick(this.state.config);
    })

    client.on('newToken', (newToken) => {
      console.log("NEW TOKEN ", newToken)
      let clonetokens = copyCollection(this.state.tokens);
      clonetokens.push(newToken.data[0]);
      this.setState({ tokens: clonetokens });
      $(".regular").slick('slickAdd', `
        <li>
          <i class="material-icons">notifications_active</i>
          <span class='token-name'>${ newToken.data[0].name}</span>
        </li>
      `)
      sound.play();
    })

    client.on('pullToken', (oldToken) => {
      console.log('oldToken', oldToken);
      if (oldToken.data.length === 0) return;
      let tokenIndex = this.state.tokens.findIndex((token) => token.id === oldToken.data[0].id);
      if (tokenIndex > -1) {
        let tokensCopy = copyCollection(this.state.tokens);
        tokensCopy.splice(tokenIndex, 1);
        this.setState({ tokens: tokensCopy });
        $(".regular").slick('slickRemove', tokenIndex);
      }
    })
  }

  restartApp() {
    window.location.reload();
  }

  render() {
    return (
      <div className="wrap-moduldos">
        <ul className="wrap-tokens regular slider">

        </ul>
        <PopUp
          id="changeIpPopUp"
          ref="changeIpPopUp"
          animation={"rebound"}
          full={false}
          type="custom"
          data={
            <FormChangeIp
              ref="form-set-ip"
              title="DIRECCIÓN IP"
              onUpdate={this.updateIp.bind(this, 'form-set-ip')}
              ipMessage={`Dirección establecida en el sistema ${window.localStorage.getItem('SADDRESS')}`}
              placeholder={`Escribe la dirección ip que tiene el equipo actualmente`}
            />
          }
        />

        <PopUp
          id="wrongIpPopUp"
          ref="wrongIpPopUp"
          animation={"rebound"}
          full={false}
          type="custom"
          data={
            <FormChangeIp
              ref="form-change-ip"
              onUpdate={this.updateIp.bind(this, 'form-change-ip')}
              type="error"
              title="Error"
              ipMessage={`La aplicacion no puede iniciar sobre la ip ${window.localStorage.getItem('SADDRESS')}`}
              placeholder={`Escribe la dirección ip que tiene el equipo actualmente`}
            />
          }
        />

        <PopUp
          ref="restartPackPopUp"
          id="restartPackPopUp"
          animation={"rebound"}
          full={false}
          hideOptions={false}
          onConfirm={this.restartApp.bind(this)}
          type="confirm"
          title="INFORMACIÓN"
          message="¿ Desea reiniciar esta ventana ahora, para que los cambios tengan efecto ?"
        />

        <PopUp
          id="failPopUp"
          ref="failPopUp"
          animation={"rebound"}
          full={false}
          type="error"
          message={
            `Se ha producido un error, asegurate que el pack este conectado en la direccion ${SADDRESS},
            o cambia la dirección ip en la opción Archivo>DIRECCION IP`
          }
        />

        <PopUp
          id="loaderPopUp"
          ref="loaderPopUp"
          animation={"rebound"}
          full={false}
          type="load"
        />
      </div>
    )
  }
}
