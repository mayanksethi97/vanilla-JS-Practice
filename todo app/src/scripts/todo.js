import { collectionDetail } from "../components/collection-detail";
const appContent = document.querySelector('#app-content');
let draggableTodo = null;

export const addCollectionItem = (item) => {
    const itemObj = {
        text: item,
        id: new Date().getMilliseconds()
    };
    const collectionContainer = document.querySelector('#cl');
    const newItem = document.createElement('div');
    newItem.className = 'collection-item';
    newItem.innerHTML = `<h2>${item}</h2>`;
    newItem.style.color = 'black';
    collectionContainer.appendChild(newItem);
    newItem.addEventListener('click', (e) => {
        navigateToCollectionDetail(itemObj)
    })
}

const navigateToCollectionDetail = (item) => {
    console.log(item);
    appContent.innerHTML = collectionDetail;

    const pitem = document.querySelector('#test123');
    const pendingItems = document.querySelector('#pending-items');
    const finishedItems = document.querySelector('#finished-items');
    const panes = document.querySelectorAll('.todo-pane');

    pitem.addEventListener('dragstart', onCardDrag);
    pitem.addEventListener('dragend', onCardDrop);

    panes.forEach((pane) => {
        pane.addEventListener('dragover', dragOver);
    pane.addEventListener('drop', drop);
    })

    
    
    // pendingItems.addEventListener('dragenter', dragEnter);
    // pendingItems.addEventListener('dragleave', dragLeave);
    // pendingItems.addEventListener('drop', drop);
    // pendingItems.addEventListener('drop', drop);

}

function onCardDrag() {
    draggableTodo = this;
};

function onCardDrop() {
    draggableTodo = null;
}

function dragOver(e){
    e.preventDefault();
}

function drop(){
    this.appendChild(draggableTodo)
}
