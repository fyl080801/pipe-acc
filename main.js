const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
  var win = new BrowserWindow({
    // width: '100%',
    // height: '100%',
    // frame: false,
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile('dist/index.html');

  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
    app.exit();
  });

  ipcMain.on('win-close', (event, arg) => {
    app.exit();
  });
}

app.on('ready', createWindow);
