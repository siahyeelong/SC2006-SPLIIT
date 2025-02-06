class ExchangeRate {
    constructor() {
        this.exchange_rate = {}
    }

    setRate(currency, rate) {
        this.exchange_rate[currency] = { rate: rate };
    }

    getRate(currency) {
        return this.exchange_rate[currency] ? this.exchange_rate[currency].rate : 1
    }

}

export const ExchangeRates = new ExchangeRate();
ExchangeRates.setRate('IDR', 11877.96);