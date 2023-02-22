let a = ''; //first number
let b = ''; //second number
let sign = ''; // знак операції
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '%', '+/-'];

//screen
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
