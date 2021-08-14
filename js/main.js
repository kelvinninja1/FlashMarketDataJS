

async function fetchMarketData() {
    let binanceETHDAI = await getMDfrom( "https://api.binance.com/api/v3/ticker/price?symbol=ETHDAI");
    let coinbaseETHDAI = await getMDfrom( "https://api.pro.coinbase.com/products/ETH-DAI/ticker");

    let binanceBTCUSDT = await getMDfrom( "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
    let coinbaseBTCUSDT = await getMDfrom( "https://api.pro.coinbase.com/products/BTC-USDT/ticker");

    // let binancePrice = binance.price;
    // let coinbasePrice = coinbase.price;
    // console.log(binance.price);
    // console.log(coinbase.price);
    function Asset(binance, coinbase) {
        this.Binance = binance;
        this.Coinbase = coinbase;
        this.Abitriage = (this.Binance != this.Coinbase) ? "Yes" : "NO";
        this.AbitriageOpportunity = (this.Abitriage == "Yes") ? ((this.Binance < this.Coinbase) ? "Binance to Coinbase" : "Coinbase to Binance") : "No";
        // this.ExitOpportunity = (this.AbitriageOpportunity == "Coinbase") ? "Binance" : "Coinbase";
        this.AbitriageValue = (this.Binance > this.Coinbase) ? this.Binance - this.Coinbase : this.Coinbase - this.Binance;
        this.NetValue = this.AbitriageValue - (this.AbitriageValue/100) * 10;

    }
    let Assets = {};

    Assets.ETHDAI = new Asset(binanceETHDAI.price, coinbaseETHDAI.price);
    Assets.BTCUSDT = new Asset(binanceBTCUSDT.price,  coinbaseBTCUSDT.price);

    console.table(Assets);

}

// function fetchMDfromBinance() {
//     getMDfrom( "https://api.binance.com/api/v3/ticker/price?symbol=ETHDAI")
// }
//
// function fetchMDfromCoinbase() {
//     getMDfrom( "https://api.pro.coinbase.com/products/ETH-DAI/ticker");
// }

async function getMDfrom( fetchEndpoint = "") {
    try {
        let res = await fetch(fetchEndpoint, {
            "method": "GET",
            "headers": {}
        })
        return await res.json();

    } catch (error) {
        console.log(error);
    }

    // fetch(fetchEndpoint, {
    //     "method": "GET",
    //     "headers": {}
    // })
        // .then(response => { return response.json() })
        // .then(data => { return data })
        // .catch(err => {
        //     console.error(err);
        // });
}

setInterval(function () { console.clear(); fetchMarketData() }, 2000)


function cleanMarketData() {
    var event = new Date();
    // var n = d.getTime();
    console.group(event.toTimeString());
    setInterval(function () { fetchMarketData() }, 6000)
    console.groupEnd(event.toTimeString());

}
