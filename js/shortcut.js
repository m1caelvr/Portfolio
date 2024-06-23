document.addEventListener('DOMContentLoaded', function() {
    const sectionHome = document.getElementById('section-landing');
    const sectionAbout = document.getElementById('section-about');
    const sectionSkills = document.getElementById('section-skills');
    const sectionProjects = document.getElementById('section-projects');
    const sectionContact = document.getElementById('section-contact');

    document.addEventListener('keydown', function(event) {
        if (event.altKey && event.key === 'h') {
            event.preventDefault();
            sectionHome.scrollIntoView({ behavior: 'smooth' });
        }

        if (event.altKey && event.key === '1') {
            event.preventDefault();
            sectionAbout.scrollIntoView({ behavior: 'smooth' });
        }

        if (event.altKey && event.key === '2') {
            event.preventDefault();
            sectionSkills.scrollIntoView({ behavior: 'smooth' });
        }

        if (event.altKey && event.key === '3') {
            event.preventDefault();
            sectionProjects.scrollIntoView({ behavior: 'smooth' });
        }

        if (event.altKey && event.key === '4') {
            event.preventDefault();
            sectionContact.scrollIntoView({ behavior: 'smooth' });
        }
    });
});