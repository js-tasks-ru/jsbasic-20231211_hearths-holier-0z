function showSalary(users, age) {
  let results = users.filter(item => item.age <= age);
  let value = results.reduce((sum, item) => sum + (item.name + ", " +  item.balance + "\n"), "");
  return value.trim() ;
}
