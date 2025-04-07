const backendURL = process.env.REACT_APP_BACKEND_URL;

export class Trip {
    constructor(tripInfo) {
        this.tripID = tripInfo.tripID;
        this.tripName = tripInfo.tripName;
        this.tripDescription = tripInfo.tripDescription;
        this.foreignCurrency = tripInfo.foreignCurrency;
        this.localCurrency = tripInfo.localCurrency;
        this.tripImage = tripInfo.tripImage;
        this.cities = tripInfo.cities;
        this.budget = tripInfo.budget;
        this.startDate = tripInfo.startDate;
        this.endDate = tripInfo.endDate;
        this.users = tripInfo.users;
    }

    async createTrip() {
        try {
            const response = await fetch(`${backendURL}/trips/createtrip`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this),
            });

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            return response.json();
        } catch (error) {
            console.error("Failed to create trip:", error);
            return null;
        }
    }

    async updateInfo(updateField, value) {
        try {
            const response = await fetch(
                `${backendURL}/trips/edittrip/${this.tripID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ updateField, value }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} - ${response.statusText}`
                );
            }

            const updatedData = await response.json();

            if (updateField in this) {
                this[updateField] = value;
            }

            return updatedData;
        } catch (error) {
            console.error("Failed to update trip:", error);
            return null;
        }
    }

    // async getParticipants() {
    //     try {
    //         const response = await fetch(`${backendURL}/users/getParticipants/${this.tripID}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         if (!response.ok) {
    //             throw new Error(`Error: ${response.status} - ${response.statusText}`);
    //         }
    //         return response.json();
    //     } catch (error) {
    //         console.error("Failed to get trip participants:", error);
    //         return null;
    //     }
    // }
    async getParticipants() {
        try {
            const response = await fetch(
                `${backendURL}/users/getParticipants/${this.tripID}`
            );
            if (!response.ok) return [];
            const data = await response.json();
            return data || []; // Ensure we always return an array
        } catch (error) {
            console.error("Failed to get trip participants:", error);
            return [];
        }
    }

    async getTransactions() {
        try {
            const response = await fetch(
                `${backendURL}/transactions/tripTransactions/${this.tripID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} - ${response.statusText}`
                );
            }
            return response.json();
        } catch (error) {
            console.error("Failed to get trip transactions:", error);
            return null;
        }
    }

    async getDebtMatrices() {
        try {
            const response = await fetch(
                `${backendURL}/transactions/owe/${this.tripID}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error(
                    `Error: ${response.status} - ${response.statusText}`
                );
            }
            return response.json();
        } catch (error) {
            console.error("Failed to get trip transactions:", error);
            return null;
        }
    }

    printInfo() {
        console.log("tripID is:", this.tripID);
        console.log("tripName is:", this.tripName);
        console.log("tripDescription is:", this.tripDescription);
        console.log("foreignCurrency is:", this.foreignCurrency);
        console.log("localCurrency is:", this.localCurrency);
    }
}
