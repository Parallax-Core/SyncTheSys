function toggleSection(sectionId) {
    document.getElementById('announcements').style.display = 'none';
    document.getElementById('rates').style.display = 'none';
    document.getElementById('summary').style.display = 'none';
    
    document.getElementById(sectionId).style.display = 'block';
}
