const { app, BrowserWindow, electron, ipcMain } = require('electron');
const path = require('path');

// Setup Events for Installer
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
    return;
}

// Set Environment
process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production" ? true : false;
const isWin = process.platform === "win32" ? true : false;
const isLinux = process.platform === "linux" ? true : false;
const isMac = process.platform.env === "darwin" ? true : false;

let mainWindow;

// Build Primary Window
function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: "Electron Starter",
        width: 400,
        height: 600,
        resizable: isDev,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    })

    mainWindow.loadFile('./app/index.html')
}

// Initialize Application
app.whenReady().then(() => {
    createMainWindow()

    app.on('active', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})