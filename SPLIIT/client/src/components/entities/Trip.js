export class Trip {
    constructor(tripInfo) {
        console.log("trip initialised!")
        this.tripID = tripInfo.tripID
        this.tripName = tripInfo.tripName
        this.tripDescription = tripInfo.tripDescription
        this.foreignCurrency = tripInfo.foreignCurrency
        this.localCurrency = tripInfo.localCurrency
        this.tripImage = tripInfo.tripImage
        this.cities = tripInfo.cities
        this.budget = tripInfo.budget
        this.startDate = tripInfo.startDate
        this.endDate = tripInfo.endDate
        this.users = tripInfo.users
        this.printInfo()
    }


    printInfo() {
        console.log("tripID is:", this.tripID)
        console.log("tripName is:", this.tripName)
        console.log("tripDescription is:", this.tripDescription)
        console.log("foreignCurrency is:", this.foreignCurrency)
        console.log("localCurrency is:", this.localCurrency)
    }
}