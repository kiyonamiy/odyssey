import avatarPic from './picture.png';
import styles1 from './index.css';
import styles2 from './avatar.css';

console.log(styles2);

const img = new Image();
img.src = avatarPic;
img.classList.add(styles1.index);
img.classList.add(styles2.avatar);

const rootEle = document.getElementById('root');

rootEle.append(img);