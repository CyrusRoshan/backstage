export function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomNoRepeat() {
  var lastItem;
  return function noRepeatFunc(arr) {
    var item = arr[Math.floor(Math.random() * arr.length)];

    if (item === lastItem) {
      return noRepeatFunc(arr);
    }

    lastItem = item;
    return item;
  }
}

export function request(method, url, onSuccess, onError, onPanic) {
  // edited from http://stackoverflow.com/a/13975363/4455222
  var started = new Date().getTime();
  var http = new XMLHttpRequest();

  try {
    http.open(method, url, true);
    http.onreadystatechange = () => {
      if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
        var ended = new Date().getTime();
        var milliseconds = ended - started;
        onSuccess(milliseconds, http);
      }
    }
    http.onerror = onError;
    http.send(null);
  } catch (e) {
    onPanic(e);
  }
}
