function openPanel(id) {
  document.getElementById('main-header').style.display = 'none';
  document.getElementById('hero').style.display = 'none';
  document.getElementById(`panel-${id}`).classList.add('active');
}

function closePanel() {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('main-header').style.display = 'flex';
  document.getElementById('hero').style.display = 'flex';
}

function resetView() {
  closePanel();
}


window.onload = function () {
  let a = '';
  let b = '';
  let expressionResult = '';
  let selectedOperation = null;

  const output = document.getElementById('result');

  // Цифры и точка
  document.querySelectorAll('[id^="btn_digit_"]').forEach(button => {
    button.onclick = () => {
      const digit = button.innerHTML;

      if (!selectedOperation) {
        if (digit !== '.' || !a.includes('.')) {
          a += digit;
        }
        output.innerHTML = a || '0';
      } else {
        if (digit !== '.' || !b.includes('.')) {
          b += digit;
        }
        output.innerHTML = b || '0';
      }
    };
  });

  // Операции
  document.getElementById('btn_op_plus').onclick = () => { if (a) selectedOperation = '+'; };
  document.getElementById('btn_op_minus').onclick = () => { if (a) selectedOperation = '-'; };
  document.getElementById('btn_op_mult').onclick = () => { if (a) selectedOperation = 'x'; };
  document.getElementById('btn_op_div').onclick = () => { if (a) selectedOperation = '/'; };

  // Очистка
  document.getElementById('btn_op_clear').onclick = () => {
    a = '';
    b = '';
    selectedOperation = null;
    output.innerHTML = '0';
  };

  // Равно
  document.getElementById('btn_op_equal').onclick = () => {
    if (!a || !b || !selectedOperation) return;

    let res;
    switch (selectedOperation) {
      case '+': res = +a * 2 + +b; break;
      case '-': res = +a - +b; break;
      case 'x': res = +a * +b; break;
      case '/': res = +a / +b; break;
    }

    a = res.toString();
    b = '';
    selectedOperation = null;
    output.innerHTML = a;
  };
};
