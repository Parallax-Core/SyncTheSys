const trashItems = [
    { id: 'paper', type: 'recycle', img: '/Pictures/recycle-bin.png' },
    { id: 'bottle', type: 'recycle', img: '/Pictures/recycle-bin.png' },
    { id: 'banana', type: 'compost', img: '/Pictures/recycle-bin.png' },
    { id: 'apple', type: 'compost', img: '/Pictures/recycle-bin.png' },
    { id: 'plastic', type: 'landfill', img: '/Pictures/recycle-bin.png' },
    { id: 'straw', type: 'landfill', img: '/Pictures/recycle-bin.png' },
    { id: 'can', type: 'recycle', img: '/Pictures/recycle-bin.png' },
    { id: 'leaf', type: 'compost', img: '/Pictures/recycle-bin.png' },
    { id: 'wrapper', type: 'landfill', img: '/Pictures/recycle-bin.png' },
    { id: 'carton', type: 'recycle', img: '/Pictures/recycle-bin.png' }
];

let score = 0;

function createTrash() {
    const minY = document.getElementById('score').offsetTop + 40;
    const maxY = window.innerHeight * 0.8;
    const minX = window.innerWidth * 0.3;
    const maxX = window.innerWidth * 0.7;

    trashItems.forEach((item) => {
        const div = document.createElement('div');
        div.classList.add('trash-item');
        div.draggable = true;
        div.id = item.id;
        div.dataset.type = item.type;
        div.ondragstart = drag;
        div.ondragend = dragEnd;
        
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = item.id;
        img.style.width = '50px';
        img.style.height = '50px';

        div.appendChild(img);

        div.style.left = `${Math.random() * (maxX - minX) + minX}px`;
        div.style.top = `${Math.random() * (maxY - minY) + minY}px`;

        document.body.appendChild(div);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    let draggedElement = event.target.closest('.trash-item'); // Ensure we always get the div
    event.dataTransfer.setData('text', draggedElement.id);
    
    // Hide the element without affecting layout
    setTimeout(() => {
        draggedElement.style.visibility = "hidden"; 
    }, 0);
}

function dragEnd(event) {
    let draggedElement = event.target.closest('.trash-item');
    draggedElement.style.visibility = "visible"; // Restore visibility
}

function drop(event, binType) {
    event.preventDefault();
    const id = event.dataTransfer.getData('text');
    const draggedItem = document.getElementById(id);

    if (draggedItem) {
        if (draggedItem.dataset.type === binType) {
            score++;
        } else {
            score--;
        }

        draggedItem.remove();
        document.getElementById('score').textContent = `Score: ${score}`;
    }
}

createTrash();
