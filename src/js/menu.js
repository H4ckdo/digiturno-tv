let gui = require('nw.gui');
const command = require('child_process').exec;
let win = gui.Window.get();

let config = {
	SADDRESS: window.localStorage.getItem('SADDRESS')
}

window.SADDRESS = global.process.env.SADDRESS || process.env.SADDRESS || config.SADDRESS ||  "localhost";
	var menu = new nw.Menu({ type: 'menubar' })
	var submenu = new nw.Menu();
	submenu.append(new nw.MenuItem({
	  label: 'Direccion IP',
	  click: () => {
			window.changeIpPopUp.modal.openPopUp();
			window.failPopUp.modal.closePopUp();
	  }
	}))
	
	submenu.append(new nw.MenuItem({
	  label: 'Cerrar',
	  click: () => {
			nw.App.quit();
	  }
	}))
	
	menu.append(new nw.MenuItem({
	  label: 'Archivo',
	  submenu: submenu
	}));
	
	nw.Window.get().menu = menu;
          
