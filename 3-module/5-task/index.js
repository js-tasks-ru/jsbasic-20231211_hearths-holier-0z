function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}
function getMinMax(str) {
  let arr = str.split(" ");
  const numbers = (arr.filter((item) => isFinite(item))).map( s => +s );

  let result = {
    min: (getMinOfArray(numbers)),
    max: (getMaxOfArray(numbers))
  }

  return result;
}
