const copyrightElement = document.getElementById("copyright-year");

copyrightElement.innerText = `© ${new Date().getFullYear()}`;




const phone = document.getElementById("phone");

phone.innerText = phone.value = process.env.PHONENO;