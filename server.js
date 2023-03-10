var express = require("express");
const Binance = require('node-binance-api');
var fs = require("fs")
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.io = io;
server.listen(3000);

io.on("connection", (socket) => {
    console.log(socket.id);
  })

loadConfigFile("./config.json")

function loadConfigFile(file) {
    var obj;
    fs.readFile(file, "utf-8", function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        const binance = new Binance().options({
            APIKEY: obj.API,
            APISECRET: obj.KEY
          });
          console.log(binance);
        //   binance.futuresMiniTickerStream( 'BTCUSDT', (data) => {
        //     console.info( data.close );
        //     app.io.sockets.emit("server-send-price", data.close)
        // } );
        
        require("./routers/client")(app, obj, binance);
    })
}


