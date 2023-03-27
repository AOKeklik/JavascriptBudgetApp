export const account1 = {
    owner: "Jonas Schmedtmann",
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    interestRate: 1.2, // %
    pin: 1111,

    movementsDates: [
        "2020-11-01T13:15:33.035Z",
        "2020-11-30T09:48:16.867Z",
        "2023-02-22T06:04:23.907Z",
        "2023-02-25T14:18:46.235Z",
        "2023-02-26T16:33:06.386Z",
        "2023-02-27T14:43:26.374Z",
        "2023-02-28T18:49:59.371Z",
        "2023-03-01T12:01:20.894Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
}

export const account2 = {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

    movementsDates: [
        "2020-11-01T13:15:33.035Z",
        "2020-11-30T09:48:16.867Z",
        "2023-02-22T06:04:23.907Z",
        "2023-02-25T14:18:46.235Z",
        "2023-02-26T16:33:06.386Z",
        "2023-02-27T14:43:26.374Z",
        "2023-02-28T18:49:59.371Z",
        "2023-03-01T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
}

export const accounts = [account1, account2]

/////////////////////////////////////////////////
// Elements
export const labelWelcome = document.querySelector(".welcome")
export const labelDate = document.querySelector(".date")
export const labelBalance = document.querySelector(".balance__value")
export const labelSumIn = document.querySelector(".summary__value--in")
export const labelSumOut = document.querySelector(".summary__value--out")
export const labelSumInterest = document.querySelector(
    ".summary__value--interest"
)
export const labelTimer = document.querySelector(".timer")

export const containerApp = document.querySelector(".app")
export const containerMovements = document.querySelector(".movements")

export const btnLogin = document.querySelector(".login__btn")
export const btnTransfer = document.querySelector(".form__btn--transfer")
export const btnLoan = document.querySelector(".form__btn--loan")
export const btnClose = document.querySelector(".form__btn--close")
export const btnSort = document.querySelector(".btn--sort")

export const inputLoginUsername = document.querySelector(".login__input--user")
export const inputLoginPin = document.querySelector(".login__input--pin")
export const inputTransferTo = document.querySelector(".form__input--to")
export const inputTransferAmount = document.querySelector(
    ".form__input--amount"
)
export const inputLoanAmount = document.querySelector(
    ".form__input--loan-amount"
)
export const inputCloseUsername = document.querySelector(".form__input--user")
export const inputClosePin = document.querySelector(".form__input--pin")
