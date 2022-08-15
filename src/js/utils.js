export const body = document.querySelector('body');
export const elemTable = document.querySelector('.table');
export const elemFormChat = document.querySelector('.form_chat');
export const elemInput = document.querySelector('.field_chat');

export function getDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month;

  return `${hour}:${minutes} ${date.getDate()}.${month}.${date.getFullYear()}`;
}

export function getMessage(from, subject, received) {
  return `
    <tr><td>${from}</td><td>${subject}</td><td>${received}</td></tr>
  `
}
