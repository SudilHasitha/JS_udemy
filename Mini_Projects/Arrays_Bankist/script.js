'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  interestRate: 1.5,
  pin: 2222,
};

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const generateUserName = (accounts) => {
  accounts.forEach((account) => {
    account.username = account.owner.toLowerCase().split(" ").map((n) => n[0]).join('')
  }) 
}

generateUserName(accounts)

const startLogOutTimer = () => {
  
  const tick = () => {
    const min = String(Math.trunc(t/60)).padStart(2,'0')
    const seconds = String(t % 60).padStart(2,'0')
    labelTimer.textContent = `${min}:${seconds}`
    t--;
    if (t <= 0){
      clearInterval(tick)
      containerApp.style.opacity = 0;
    }
  }
  let t = 300;
  tick()
  const timer = setInterval(tick,1000)
  return timer

}


const formatMovementData = (date) => {
  const calDaysPassed = (date1, date2) => Math.abs(date1-date2) / (1000*60*60*24)

  const daysPassed = calDaysPassed(new Date(), date)

  // const day = `${date.getDate()}`.padStart(2,0)
  // const month = `${(date.getMonth()+1)}`.padStart(2,0)
  // const year = date.getFullYear()

  return new Intl.DateTimeFormat(navigator.language).format(date)
}

const displayMovements = (account,sort=false) => {

  const combinedMovements = account.movements.map((mov, i) => ({
    mov: mov,
    date: account.movementsDates.at(i)
  }))

  
  const acc = sort ? combinedMovements.sort((a,b) => a.mov-b.mov) : combinedMovements
  
  containerMovements.innerHTML = ''
  acc.forEach((acc,i) => {
    const type = acc.mov > 0 ? 'deposit' : 'withdrawal'
    console.log('acc',acc)
    const displayDate = new Date(acc.date);
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__date">${formatMovementData(displayDate)}</div>
          <div class="movements__value">${acc.mov}</div>
      </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin',html)
  })
}

const calcSum = (acc) => {
  acc.balance =  acc.movements.reduce((acc,i) => {
    return acc + i
  },0)
  labelBalance.textContent = `${acc.balance} €`
}
       
const calcSummary = (acc) => {
  const inflow = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${inflow} €`
  
  const outflow = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${-1 * outflow} €`

  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(e => e * acc.interestRate/100)
    .filter(i => i >= 1)
    .reduce((acc, curr) => acc + curr, 0)
  labelSumInterest.textContent = `${interest} €`
}

const updateUI = (currentAccount) => {
  calcSummary(currentAccount)
  calcSum(currentAccount)
  displayMovements(currentAccount)
}


let currentAccount, timer;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault()

  currentAccount = accounts.find(acc => {
    return acc.username === inputLoginUsername.value &&
    acc.pin === Number(inputLoginPin.value)
  });

  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur()

  console.log(currentAccount)
  labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}!`
  const date = new Date()
  const options = {
    hour:'numeric',
    minute:'numeric',
    day: 'numeric',
    month:'long',
    year:'numeric',
    weekday: 'long'
  }

  labelDate.textContent = new Intl.DateTimeFormat(navigator.language, options).format(date)
  containerApp.style.opacity = 100;
  updateUI(currentAccount)
  if (timer) clearInterval(timer)
  timer = startLogOutTimer()
})

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault()

  const amount = Number(inputTransferAmount.value)
  const receiveAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  if (amount > 0 && 
      amount <= currentAccount.balance &&
      receiveAcc?.username !== currentAccount.username && 
      receiveAcc)
      {
      
        currentAccount.movements.push(-amount)
        receiveAcc.movements.push(amount)
        currentAccount.movementsDates.push(new Date().toISOString())
        receiveAcc.movementsDates.push(new Date().toISOString())
      }

    updateUI(currentAccount)
    inputTransferAmount.value = inputTransferTo.value = ''
    inputTransferTo.blur()
    if (timer) clearInterval(timer)
    timer = startLogOutTimer();
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault()
  if(currentAccount.username === inputCloseUsername.value && currentAccount.pin === Number(inputClosePin.value)){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    accounts.splice(index,1)
    
    console.log(index,accounts)
  }
  containerApp.style.opacity = 0;

})

btnLoan.addEventListener('click', (e) => {
  e.preventDefault()
  const amount = Math.floor(inputLoanAmount.value);
  if (amount>0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    currentAccount.movements.push(amount)
    currentAccount.movementsDates.push(new Date().toISOString())
    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
  if (timer) clearInterval(timer)
  timer = startLogOutTimer();
})

let sorting = false
btnSort.addEventListener('click', (e) => {
  e.preventDefault()
  displayMovements(currentAccount,!sorting)
  sorting = !sorting
})

