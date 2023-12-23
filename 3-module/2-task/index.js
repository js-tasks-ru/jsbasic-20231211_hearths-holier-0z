function filterRange(arr, a, b) {
  let res = arr.slice();

  if(a > 0 && b > 0) {
    res = res.splice(a, b-a);
    return res.filter(item => item === res.at(0) || item === res.at(-1));
  } else  {
    return res;
  }
}
