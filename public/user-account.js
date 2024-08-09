//user icon functionality
function toggleBox() {
    const box = document.getElementById('box');
    if (box.style.display === 'block') {
        box.style.display = 'none';
    } else {
        box.style.display = 'block';
    }
}

document.addEventListener('click', function(event) {
    const box = document.getElementById('box');
    const iconContainer = document.querySelector('.icon-container');
    const isClickInsideBox = box.contains(event.target);
    const isClickInsideIcon = iconContainer.contains(event.target);

    if (!isClickInsideBox && !isClickInsideIcon) {
        box.style.display = 'none';
    }
});
