export default function promiseClick(button) {
  return new Promise((resolve) => {
    const onClick = (event) => {
      button.removeEventListener('click', onClick);
      resolve(event);
    };
    button.addEventListener('click', onClick, { once: true });
  });
}
