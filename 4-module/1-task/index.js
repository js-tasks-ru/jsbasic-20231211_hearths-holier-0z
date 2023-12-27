function makeFriendsList(friends) {
  let friendList = document.createElement("UL");

  for (let friend of friends) {
    friendList.insertAdjacentHTML("beforeend", `<li>${friend.firstName} ${friend.lastName}</li>`);
  }

  return friendList;
}
