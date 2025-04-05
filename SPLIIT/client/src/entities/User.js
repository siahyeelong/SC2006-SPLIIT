const backendURL = process.env.REACT_APP_BACKEND_URL;

export class User {
    constructor(profile) {
        this.email = profile.email
        this.username = profile.username
        this.displayName = profile.displayName
        this.favColour = profile.favColour
        this.trips = profile.trips
    }

    async getAllTripInfo() {
        try {
            const response = await fetch(`${backendURL}/trips/getAllTrips/${this.username}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    async updateInfo(updateField, value) {
        try {
            const response = await fetch(`${backendURL}/users/edituser/${this.username}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ updateField, value }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const updatedData = await response.json();

            if (updateField in this) {
                this[updateField] = value;
            }

            return updatedData;
        } catch (error) {
            console.error("Failed to update user:", error);
            return null;
        }
    }

    async deleteTrip(tripID) {
        if (!this.trips.includes(tripID)) {
            console.warn(`Trip ID ${tripID} not found in user's trip list.`);
            return;
        }

        // Remove the trip from the local list
        this.trips = this.trips.filter(id => id !== tripID);

        // Update the backend
        await this.updateInfo("trips", this.trips);
    }

    async joinTrip(tripID) {
        try {
            const response = await fetch(`${backendURL}/trips/jointrip/${this.username}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ tripID }),
            });

            const message = await response.json(); // Always parse JSON response

            if (response.status === 404 || response.status === 400) {
                return { message: message.message || "An error occurred", severity: "error" };
            }

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            // Ensure tripID is added to this.trips
            if (!this.trips.includes(tripID)) {
                this.trips.push(tripID);
            }

            return { message: message.message, severity: "success" };
        } catch (error) {
            console.error("Failed to join trip:", error);
            return { message: "Internal server error", severity: "error" };
        }
    }




    printInfo() {
        console.log("email is:", this.email)
        console.log("username is:", this.username)
        console.log("displayName is:", this.displayName)
        console.log("favColour is:", this.favColour)
        console.log("trips are:", this.trips)
    }


}