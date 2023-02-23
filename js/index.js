let a = ''; //first number
let b = ''; //second number
let sign = ''; // знак операції
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '%', '+/-'];

//screen

// const container = document.querySelector('.calc');

function createMarkup() {
  return `<div class="calc__container">
        <p class="calc__total">0</p>
        <div class="calc__screen"></div>
        <div class="btn__container">
          <button class="calc__btn calc__btn--clear ac">AC</button>
          <button class="calc__btn calc__btn--clear plusminus">+/-</button>
          <button class="calc__btn calc__btn--clear interest">%</button>
          <button class="calc__btn calc__btn--operator division">/</button>
          <button class="calc__btn one">1</button>
          <button class="calc__btn two">2</button>
          <button class="calc__btn three">3</button>
          <button class="calc__btn calc__btn--operator multiply">x</button>
          <button class="calc__btn four">4</button>
          <button class="calc__btn five">5</button>
          <button class="calc__btn six">6</button>
          <button class="calc__btn calc__btn--operator minus">-</button>
          <button class="calc__btn seven">7</button>
          <button class="calc__btn eight">8</button>
          <button class="calc__btn nine">9</button>
          <button class="calc__btn calc__btn--operator plus">+</button>
          <button class="calc__btn calc__btn--zero zero">0</button>
          <button class="calc__btn point">.</button>
          <button class="calc__btn calc__btn--operator amount">=</button>
        </div>
      </div>`;
}
document.body.insertAdjacentHTML('afterbegin', createMarkup());

const out = document.querySelector('.calc__total');
const clear = document.querySelector('.ac');
const btnS = document.querySelector('.btn__container');

clear.addEventListener('click', clearAll);
btnS.addEventListener('click', onClickBtn);

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  out.textContent = 0;
  return;
}

function onClickBtn(e) {
  // не нажата кнопка
  if (!e.target.classList.contains('calc__btn')) return;
  // нажата кнопка AC
  if (e.target.classList.contains('ac')) return;

  out.textContent = '';

  // отримую нажату кнопку
  const key = e.target.textContent;

  // якщо нажата клавіша 0-9 або .
  if (digit.includes(key)) {
    if ((b === '') & (sign === '')) {
      a += key;
      out.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      out.textContent = b;
    } else {
      b += key;
      out.textContent = b;
    }
    console.log(a, b, sign);
    return;
  }

  // якщо нажата клавіша + - * /
  if (action.includes(key)) {
    sign = key;
    out.textContent = a;
    console.log(a, b, sign);

    return;
  }

  //нажата =
  if (key === '=') {
    if (b === '') b = a;
    switch (sign) {
      case '+':
        a = +a + +b;
        break;
      case '-':
        a = a - b;
        break;
      case 'x':
        a = a * b;
        break;
      case '/':
        if (b === '0') {
          out.textContent = 'Error';
          a = '';
          b = '';
          sign = '';
          return;
        }
        a = a / b;
        break;
      case '%':
        a = (a % b).toFixed(6);
    }
    finish = true;
    out.textContent = a;
    console.log(a, b, sign);
  }
}
