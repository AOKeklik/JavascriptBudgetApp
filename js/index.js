import {
    inputLoginUsername,
    inputLoginPin,
    btnLogin,
    containerApp,
    // ---------- login
    labelWelcome,
    labelBalance,
    containerMovements,
    accounts,
    labelDate,
    labelSumIn,
    labelSumOut,
    labelSumInterest,
    // ---------- updateUI
    inputTransferTo,
    inputTransferAmount,
    // ---------- transfer
    inputCloseUsername,
    inputClosePin,
    // ---------- close
    inputLoanAmount,
    // ---------- loan
    labelTimer,
    // ---------- timer
    btnTransfer,
    btnClose,
    btnLoan,
    btnSort,
    // --------- eventListeners
} from "./data.js"

console.log(accounts)

class login {
    _currentUser
    _sorted = false
    #timer
    #time = 20

    constructor() {
        this._createUserName()
        // this._startLogOutTimer()

        btnLogin.addEventListener("click", this._login.bind(this))
        btnTransfer.addEventListener("click", this._transfer.bind(this))
        btnClose.addEventListener("click", this._close.bind(this))
        btnLoan.addEventListener("click", this._loan.bind(this))
        btnSort.addEventListener("click", this._sort.bind(this))
    }
    _currency(user, num) {
        return Intl.NumberFormat(user.locale, {
            style: "currency",
            currency: user.currency,
        }).format(num)
    }
    _date(date, locale) {
        return new Intl.DateTimeFormat(locale).format(new Date(date))
    }
    _formatMovementDate(date, locale) {
        const newTime = new Date()
        const oldTime = new Date(date)

        const days = Math.round((newTime - oldTime) / (1000 * 60 * 60 * 24))
        // prettier-ignore
        switch (days) {
            case 0: return "Today"
            case 1: return "Yesterday"
            case 2: case 3: case 4: case 5: case 6:
                return days + " Days Ego"
            case 7: return "1 Week Ego"
            default: return this._date(date, locale)
        }
    }
    _updateUI(user) {
        this._displayMovements(user)
        this._calcDisplayBalance(user)
        this._calcDisplaySummary(user)
    }

    _login(e) {
        try {
            e.preventDefault()
            const username = inputLoginUsername.value.trim().toLowerCase()
            const pin = inputLoginPin.value.trim()

            this._errors("isEmpty", "All fileds must be writen!", username, pin)
            this._errors("isNum", "Pin must be a number!", pin)
            this._errors("isMin1Max4", "Pin must be from 1 to 4!", pin)

            this._currentUser = this._errors(
                "isValidUserPass",
                "User name or pin not valid!",
                username,
                +pin
            )

            inputLoginUsername.value = inputLoginPin.value = ""

            // if login is done
            containerApp.style.opacity = 100
            labelDate.textContent = this._date(
                new Date().toISOString(),
                this._currentUser.locale
            )
            labelWelcome.textContent = `You are welcome ${
                this._currentUser.owner.split(" ")[0]
            }`
            inputLoginUsername.blur()
            inputLoginPin.blur()
            this._updateUI(this._currentUser)

            this._startLogOutTimer()
        } catch (err) {
            // alert(err.message)
            console.log(err)
        }
    }
    _transfer(e) {
        try {
            e.preventDefault()
            const to = inputTransferTo.value.trim().toLowerCase()
            const amount = inputTransferAmount.value.trim()

            this._errors("isEmpty", "All fileds must be writen!", to, amount)
            this._errors("isMin1", "Amount can be minimum 10 units!", amount)
            this._errors("isNum", "Amount must be a number!", amount)

            const user = this._errors(
                "isValidCurrentUser",
                "Not valid user!",
                to
            )

            inputTransferTo.value = inputTransferAmount.value = ""

            user.movements.push(+amount)
            this._currentUser.movements.push(-+amount)

            user.movementsDates.push(new Date().toISOString())
            this._currentUser.movementsDates.push(new Date().toISOString())

            this._updateUI(this._currentUser)
            this._startLogOutTimer()
        } catch (err) {
            console.log(err)
        }
    }
    _close(e) {
        try {
            e.preventDefault()

            const username = inputCloseUsername.value.trim().toLowerCase()
            const pin = inputClosePin.value.trim()

            this._errors("isEmpty", "All fileds must be writen!", username, pin)
            this._errors("isNum", "Pin must be a number!", pin)
            this._errors("isMin1Max4", "Pin must be from 1 to 4!", pin)

            const user = this._errors(
                "isValidCurrentUserPass",
                "Not valid user!",
                username,
                +pin
            )

            inputCloseUsername.value = inputClosePin.value = ""

            accounts.splice(accounts.indexOf(user), 1)
            containerApp.style.opacity = 0
        } catch (err) {
            console.log(err)
        }
    }
    async _loan(e) {
        try {
            e.preventDefault()
            const amount = inputLoanAmount.value.trim()

            this._errors("isEmpty", "Amount filed must be writen!", amount)
            this._errors("isNum", "Amount must be a number!", amount)
            this._errors(
                "isMin100",
                "Amount can be a minimum of 100 units!",
                amount
            )
            this._errors(
                "isValidAmount",
                "Amount can be a minimum of %10 units!",
                amount
            )

            inputLoanAmount.value = ""

            await this._awaiting(2.5)

            this._currentUser.movements.push(+amount)
            this._currentUser.movementsDates.push(new Date().toISOString())

            this._updateUI(this._currentUser)
            this._startLogOutTimer()
        } catch (err) {
            console.log(err)
        }
    }
    _sort(e) {
        e.preventDefault
        console.log(e.target)
        if (e.target.closest(".btn--sort")) {
            this._displayMovements(this._currentUser, !this._sorted)
            this._sorted = !this._sorted
        }
    }

    _createUserName() {
        accounts.forEach(account => {
            account.username = account.owner
                .toLowerCase()
                .split(" ")
                .map(n => n[0])
                .join("")
        })
    }
    _calcDisplayBalance(user) {
        labelBalance.textContent = this._currency(
            user,
            user.movements.filter(n => n > 0).reduce((total, n) => total + n, 0)
        )
    }
    _calcDisplaySummary(user) {
        labelSumIn.textContent = this._currency(
            user,
            user.movements
                .slice()
                .filter(n => n > 0)
                .reduce((total, n) => total + n, 0)
        )
        labelSumOut.textContent = this._currency(
            user,
            user.movements
                .slice()
                .filter(n => n < 0)
                .reduce((total, n) => total + Math.abs(n), 0)
        )
        labelSumInterest.textContent = this._currency(
            user,
            user.movements
                .slice()
                .filter(n => n > 0)
                .reduce((total, n) => total + (n * user.interestRate) / 100, 0)
        )
    }
    _displayMovements(user, sort = false) {
        containerMovements.innerHTML = ""
        const movements = sort
            ? user.movements.slice().sort((a, b) => a - b)
            : user.movements

        movements.forEach((move, i) => {
            const date = user.movementsDates[i]
            const isDeposit = move > 0 ? "deposit" : "withdrawal"
            const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${isDeposit}">${i} ${isDeposit}</div>
                <div class="movements__date">${this._formatMovementDate(
                    date,
                    user.locale
                )}</div>
                <div class="movements__value">${this._currency(
                    user,
                    move
                )}</div>
            </div>
        `

            containerMovements.insertAdjacentHTML("afterbegin", html)
        })
    }

    _startLogOutTimer() {
        if (this.#timer) {
            clearInterval(this.#timer)
            this.#time = 20
        }
        const tik = () => {
            const mn = String(Math.round(this.#time / 60)).padStart(2, 0)
            const sn = String(this.#time % 60).padStart(2, 0)

            labelTimer.textContent = mn + ": " + sn
            if (this.#time === 0) {
                clearInterval(this.#timer)
                labelWelcome.textContent = "Log in to get started"
                containerApp.style.opacity = 0
            }

            this.#time--
        }
        tik()
        this.#timer = setInterval(tik, 1000)
    }
    _awaiting(sn) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Hello ..")
            }, sn * 1000)
        })
    }
    _errors(type, message, ...inputs) {
        if (type === "isEmpty" && inputs.some(n => n === ""))
            throw new Error(message)
        if (
            type === "isMin1Max4" &&
            inputs.some(n => n.length > 4 || n.length < 1)
        )
            throw new Error(message)
        if (type === "isMin1" && inputs.some(n => n < 10))
            throw new Error(message)
        if (type === "isMin100" && inputs.some(n => n < 100))
            throw new Error(message)
        if (type === "isNum" && inputs.some(n => !Number.isFinite(+n)))
            throw new Error(message)
        if (
            type === "isValidAmount" &&
            !this._currentUser.movements.some(n => n >= +inputs[0] * 0.1)
        )
            throw new Error(message)
        if (type === "isValidCurrentUser") {
            const user = accounts.find(
                n =>
                    n.username === inputs[0] &&
                    inputs[0] !== this._currentUser.username
            )

            if (!user) throw new Error(message)
            return user
        }
        if (type === "isValidCurrentUserPass") {
            const user = accounts.find(
                n =>
                    inputs[0] === n.username &&
                    inputs[0] === this._currentUser.username &&
                    inputs[1] === this._currentUser.pin
            )
            if (!user) throw new Error(message)
            return user
        }
        if (type === "isValidUserPass") {
            const user = accounts.find(
                n => inputs[0] === n.username && inputs[1] === n.pin
            )
            if (!user) throw new Error(message)
            return user
        }

        // console.log(this._currentUser)
    }
}

const newLogin = new login()
