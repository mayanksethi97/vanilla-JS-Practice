import './styles/style.css';
import { openModal, closeModal } from './scripts/modal';

const addCollection = document.getElementById('addcollection');

addCollection.addEventListener('click', () => {
  openModal('myModal');
})
