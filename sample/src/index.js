(function main() {
  const newDiv = document.createElement("div");
  newDiv.className = "sorniaks_converter";
  document.body.appendChild(newDiv);
  item = document.getElementsByClassName("sorniaks_converter")[document.getElementsByClassName("sorniaks_converter").length - 1];
  item.appendChild(document.createElement("input")).placeholder = "Source numeral system";
  item.appendChild(document.createElement("input")).placeholder = "Target numeral system";
  item.appendChild(document.createElement("input")).placeholder = "Number to be converted";
  item.appendChild(document.createElement("input")).placeholder = "Result";
  item.appendChild(document.createElement("button")).innerText = "Convert!";

  document.querySelectorAll(".sorniaks_converter button")[document.querySelectorAll(".sorniaks_converter button")
    .length - 1]
    .addEventListener('click', function (event) {
      this.previousElementSibling.value = convertBase(
        this.previousElementSibling.previousElementSibling.value,
        this.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.value,
        this.previousElementSibling.previousElementSibling.previousElementSibling.value,
        event.clientX,
        event.clientY
      );
    });
  return newDiv;

  function convertBase(value, from_base, to_base, x, y) {
    if ((value !== '') && (from_base !== '') && (to_base !== '')) {
      var range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
      var from_range = range.slice(0, from_base);
      var to_range = range.slice(0, to_base);

      var dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
        if (from_range.indexOf(digit) === -1) {
          const errMsg = 'Invalid digit `' + digit + '` for base ' + from_base + '.';
          popUp(errMsg, x, y);
        }
        return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
      }, 0);

      var new_value = '';
      while (dec_value > 0) {
        new_value = to_range[dec_value % to_base] + new_value;
        dec_value = (dec_value - (dec_value % to_base)) / to_base;
      }
      return new_value || '0';
    } else {
      const errMsg = 'Empty input field(s)!';
      popUp(errMsg, x, y);
    }
  }

  function popUp(messageText, x, y) {
    var popup = document.createElement('div');
    popup.className = "sorniaks_converter_error";
    var cancel = document.createElement('div');
    cancel.innerHTML = 'X';
    cancel.style.float = "right";
    cancel.style.width = "fit-content";
    cancel.style.cursor = "pointer";
    cancel.style.border = "solid 2px black"
    popup.style.color = "white";
    popup.style.fontSize = "2vw";
    cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };
    var message = document.createElement('span');
    message.style.margin = "0 5px 0 5px";
    message.innerHTML = messageText;
    popup.appendChild(message);
    popup.appendChild(cancel);
    popup.style.position = "absolute";
    popup.style.width = "fit-content";
    popup.style.top = y + "px";
    popup.style.left = x + "px";
    popup.style.backgroundColor = "red";
    document.body.appendChild(popup);
  }
})();