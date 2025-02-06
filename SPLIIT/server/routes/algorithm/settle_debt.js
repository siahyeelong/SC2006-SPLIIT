import { People } from "./People.js"

/**
 * This function initialises the 2D matrix with respect to all participants in this group
 * 
 * @returns {Object} a 2D array object based on all users with all values initialised to 0
 */
function initialise_2D_matrix() {
    const people = People.getAllPeople()
    const ret_matrix = {}
    people.forEach(px => {
        ret_matrix[px.personKey] = {}
        people.forEach(py => {
            ret_matrix[px.personKey][py.personKey] = 0
        })
    })
    return ret_matrix
}
/**
 * This function generates the basic debt matrix based on the transactions.
 * 
 * @param {Object} transactions The transactions data returned from MongoDB
 * @returns {Object} The 2D array object debt_matrix containing the amount that each person owes
*/
function generate_raw_matrix(transactions) {
    const debt_matrix = initialise_2D_matrix() // a 2D array containing the amount. debt_matrix[x][y] = a --> x owes y $a

    // for each recipient, log how much they owe the payer according to an even-split
    transactions.forEach(transaction => {
        const payer = transaction.payer
        const recipients = transaction.recipients
        const amount = transaction.SGD / recipients.length

        recipients.forEach(recipient => {
            if (recipient !== payer)
                debt_matrix[recipient][payer] += amount
        })
    })

    return debt_matrix
}
/**
 * This function generates the reduced debt matrix 'debt_matrix_reduced'
 * If A owes B $5, but B owes A $2, then A only owes B $3
 * 
 * @param {Object} debt_matrix The debt matrix to reduce
 * @returns {Object} debt_matrix_reduced, a reduced version of the debt_matrix
 */
function reduce_debts(debt_matrix) {
    const debt_matrix_reduced = initialise_2D_matrix()
    Object.keys(debt_matrix).forEach(px => {
        Object.keys(debt_matrix[px]).forEach(py => {
            if (px !== py) {
                // (I owe you) - (you owe me)
                debt_matrix_reduced[px][py] = debt_matrix[px][py] - debt_matrix[py][px]
                // if I owe you -ve, then I owe you $0
                if (debt_matrix_reduced[px][py] < 0) debt_matrix_reduced[px][py] = 0
            }
        })
    })
    return debt_matrix_reduced
}

// #3 GENERATE SIMPLIFIED DEBT MATRIX

/**
 * This function generates the simplified debt matrix 'debt_matrix_simplified'. 
 * For a group where there will be owers and there will be owed, generate the minimum transactions such that everybody's 
 * transaction is accounted for. owers will pay what they owe, and the owed will receive what they are owed.
 * 
 * @param {PeopleClass} peopleData The People instance of PeopleClass, containing data about all users involved in this transaction
 * @param {Object} debt_matrix The debt matrix to simplify. It can take in the reduced matrix too.
 * @returns {Object} debt_matrix_simplified, the simplified version of the debt_matrix
 */
function simplify_debts(peopleData, debt_matrix) {
    const people = peopleData.getAllPeople()
    const debt_matrix_simplified = initialise_2D_matrix()


    // const total_give = [] // total that each person owes 
    // const total_receive = [] // total that each person is expecting to receive
    const equivalent_to_give = [] // combines total_give and total_receive. +ve value indicates overall this person owes some money. -ve value indicates overall this person will be receiving money. 0 means they can be excluded from the simplified transactions, since they neither owe nor are owed money.
    // initialise dictionary to 0 
    people.forEach(person => {
        equivalent_to_give[person.personKey] = 0
    })

    // based on the reduced debt matrix, summarise how much a person is expected to give and receive
    Object.keys(debt_matrix).forEach(px => {
        Object.keys(debt_matrix[px]).forEach(py => {
            equivalent_to_give[px] += debt_matrix[px][py] // sum all rows: add on the amount owed to others
            equivalent_to_give[py] -= debt_matrix[px][py] // sum all columns: subtract amount others owe you
        })
    })
    // notice that if you sum up the values in equivalent_to_give, it is always 0. 

    // create 2 groups: givers and receivers. givers are those who net-owe others, while receivers are those who are net-owed.
    const givers = []
    const receivers = []
    Object.keys(equivalent_to_give).forEach(person => {
        const amount = equivalent_to_give[person]

        if (amount < 0) receivers[person] = -1 * amount // -ve givers are receivers
        else if (amount > 0) givers[person] = amount
        // for those who have to give 0, they will be excluded since they don't matter
    })

    // function that returns the key with the greatest value in a given dictionary
    function max(dict) {
        let highestKey = null
        let max = 0
        for (let key in dict) {
            if (dict[key] > max) {
                highestKey = key
                max = dict[key]
            }
        }
        return highestKey
    }

    do { // minimise transactions to cover owers and the owed

        // the logic is as such (assuming giver = ower; receiver = owed)
        // - the biggest giver will give the biggest receiver first
        // - scenario 1: giver has not given away all their money yet
        // - scenario 2: receiver has not received all their money yet
        // - in either case, update their amount correspondingly
        // - loop again until everyone has been satisfied
        // (not sure if this is optimal, but from my few tests, it seems like it. is the alg efficient? hell no LOL)

        let max_giver = max(givers)
        let max_receiver = max(receivers)

        let amt_giver = givers[max_giver]
        let amt_receiver = receivers[max_receiver]

        let amt_given = Math.min(amt_giver, amt_receiver)
        let amt_left = amt_giver - amt_receiver
        if (amt_left > 0) { // giver still has money left after giving
            givers[max_giver] = amt_left // amount left to be given
            receivers[max_receiver] = 0 // receiver satisfied
        } else { // receiver still needs money after receiving OR receiver and giver both satisfied
            givers[max_giver] = 0 // giver satisfied
            receivers[max_receiver] = -1 * amt_left // amount left to be received
        }
        debt_matrix_simplified[max_giver][max_receiver] += amt_given // update matrix to show giver gives receiver amt_given

    } while (max(givers) && max(receivers));

    return debt_matrix_simplified
}

/**
 * [Debugging] This function prints the debt matrices on the console
 * 
 * @param {Object} data 
 */
// function print2DArray(data) {
//     const keys = Object.keys(data); // Get all keys (person1, person2, etc.)

//     // Print header row
//     console.log("     " + keys.map(key => key.padEnd(8)).join(" "));

//     // Print each row
//     keys.forEach(rowKey => {
//         const row = data[rowKey];
//         const rowData = keys.map(colKey => String(row[colKey] || 0).padEnd(8)).join(" "); // Use 0 if key doesn't exist
//         console.log(rowKey.padEnd(10) + rowData);
//     });
// }
/**
 * [Debugging] This function is used to verify the functionality of the functions written
 */
// function runTest() {
//     const debt_matrix = generate_raw_matrix(test_transactions)
//     const debt_matrix_reduced = reduce_debts(debt_matrix)
//     const debt_matrix_simplified = simplify_debts(People, debt_matrix)

//     console.log("\nOG\n")
//     print2DArray(debt_matrix)
//     console.log("\nreduced\n")
//     print2DArray(debt_matrix_reduced)
//     console.log("\nsimplified\n")
//     print2DArray(debt_matrix_simplified)
// }
/**
 * This function is exported and used in record.js to return all debts
 * @param {Object} transactions The transactions returned from MongoDB
 * @returns 3 matrices
 */
export function settle_debt(transactions) {
    const debt_matrix = generate_raw_matrix(transactions)
    const debt_matrix_reduced = reduce_debts(debt_matrix)
    const debt_matrix_simplified = simplify_debts(People, debt_matrix)

    return [debt_matrix, debt_matrix_reduced, debt_matrix_simplified];
}