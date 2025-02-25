class ExchangeRate {
    // NOTE: the rates are against SGD. e.g. SGD 1 == MYR 3.3
    constructor(country_name, currency_name, rate) {
        this.country_name = country_name;
        this.currency_name = currency_name;
        this.rate = rate;
    }
}

export const ExchangeRates = {}
ExchangeRates['IDR'] = new ExchangeRate('Indonesia', 'IDR', 11877.96);