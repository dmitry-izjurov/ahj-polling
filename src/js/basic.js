import Inspector from './Inspector';
import { elemFormChat } from './utils';

const inspector = new Inspector();

elemFormChat.addEventListener('submit', (e) => {
  e.preventDefault();
  inspector.getPost();
});

inspector.getStream();
