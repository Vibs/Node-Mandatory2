// nu er copyrightet altid dynamisk ift. hvilket år det er lige NU
const pCopyrightYear = document.getElementById('copyright-year');
pCopyrightYear.innerText = `© ${new Date().getFullYear()}`;