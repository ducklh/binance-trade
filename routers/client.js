
module.exports = function(app, obj,binance) {
            binance.futuresMiniTickerStream( 'BTCUSDT', (data) => {
            app.io.sockets.emit("server-send-price", data.close)
        } );
        
    app.get("/", function(req, res) {
        // res.send("hello" + obj.KEY)
        res.render("master")
    });
    app.get("/buy/:amount", function(req,res) {
        var quantity =parseFloat( req.params.amount);
        binance.marketBuy("BTCUSTD", quantity)
        .then((data)=>{
            console.log(data);
            res.json(data);
        }
        )
        .catch((err)=>{
            console.log(err.body);
            res.json(err.body);
        })
    })
}