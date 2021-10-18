import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss'
import { listenerCount } from 'process';

const { Socket } = require('socket.io')
const app = express()
const http = require('http').createServer(app);
const path = require('path')
const port = 8080

const io = require('socket.io')(http)

app.get('/', (req, res) => (
  res.sendFile(path.join(__dirname, '../public/index.html'))
))

http.listen(port, () => {
  console.log('listening!')
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
