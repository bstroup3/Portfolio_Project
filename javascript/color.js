const text = document.getElementById('AboutText');

text.addEventListener('mouseover', function handleMouseOver() {
    text.style.color = 'red';
});

text.addEventListener('mouseout', function handleMouseOut() {
    text.style.color = '#C0C0C0'
});
