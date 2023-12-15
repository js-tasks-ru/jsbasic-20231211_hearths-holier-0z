function checkSpam(str) {
  const substring1= "1xBet".toLowerCase();
  const substring2= "XXX".toLowerCase();
  
  return str.toLowerCase().includes(substring1) || str.toLowerCase().includes(substring2);
}
