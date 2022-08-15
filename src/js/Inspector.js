import {
  elemFormChat, elemInput, elemTable, getMessage, getDate
} from './utils';

import { ajax } from 'rxjs/ajax';
import { interval } from 'rxjs';

export default class Inspector {
  constructor() {
    this.data = undefined;
    this.lastIdMessage = undefined;
  }

  getStreamMessage() {
    const renderMessages$ = ajax.getJSON('http://localhost:7070/?method=getMessages');
    renderMessages$.subscribe({
      next: value => {
        const lastIdMessageResponse = value.response.messages[value.response.messages.length - 1].id;
        if (!this.lastIdMessage) {
          value.response.messages.forEach(a => {
            let { id, subject, received } = a;
            if (subject.length > 15) subject = subject.substring(0, 15) + '...';
            elemTable.insertAdjacentHTML('beforeend', getMessage(a.from, subject, getDate(received * 1000)));
            this.lastIdMessage = id;
          });
        } else if (this.lastIdMessage !== lastIdMessageResponse) {
          for (let i = this.lastIdMessage; i <= lastIdMessageResponse - 1; i += 1) {
            let { id, subject, received } = value.response.messages[i];
            if (subject.length > 15) subject = subject.substring(0, 15) + '...';
            elemTable.insertAdjacentHTML('beforeend', getMessage(value.response.messages[i].from, subject, getDate(received * 1000)));
            this.lastIdMessage = id;
          }
        }
      },
      error: err => console.log('Новых сообщений не найдено')
    });
  }

  getStream() {
    const source = interval(5000);
    const subscribe = source.subscribe(() => this.getStreamMessage());
  }

  getPost() {
    const text = elemInput.value;
    const formData = new FormData();
    const date = String(Date.now());
    const dateStr = date.substring(0, date.length - 3);
    formData.append('subject', text);
    formData.append('from', 'user@user');
    formData.append('body', 'Long message body here');
    formData.append('received', dateStr);
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:7070/?method=addMessage';
    xhr.open('POST', url);
    xhr.send(formData);
    elemFormChat.reset();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          this.data = JSON.parse(xhr.responseText);
          console.log(this.data)
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
}
