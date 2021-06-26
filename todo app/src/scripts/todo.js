let draggableTodo = null;
let ITEM_COUNT = 0;
export const addCollectionItem = (item) => {
    let itemId = ITEM_COUNT;
    const pendingItems = document.querySelector('#pending-items');
    const finsihedItems = document.querySelector('#finished-items');
    const newItem = document.createElement('div');
    newItem.className = 'collection-item';
    newItem.draggable = true;
    newItem.style.color = 'black';
    newItem.innerHTML = `<div class="todo-item-inner"><h2>${item}</h2><h3 id=${itemId}>X</h3></div>`;
    newItem.style.color = 'black';
    pendingItems.appendChild(newItem);
    document.getElementById(itemId).addEventListener('click', () => {
        try{
            pendingItems.removeChild(newItem);
        } 
        catch(err){}
        try{
            finsihedItems.removeChild(newItem)
        }
        catch(err){}
    })
    enableDragDrop(newItem);
    ITEM_COUNT++;
}

const enableDragDrop = (item) => {

    const pitem = item;
    const panes = document.querySelectorAll('.todo-pane');

    pitem.addEventListener('dragstart', onCardDrag);
    pitem.addEventListener('dragend', onCardDrop);

    panes.forEach((pane) => {
        pane.addEventListener('dragover', dragOver);
        pane.addEventListener('drop', drop);
    })

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
