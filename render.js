const fs = require("fs");

const nav = fs.readFileSync("./public/view-components/navbar/navbar.html", "utf8");
const footer = fs.readFileSync("./public/view-components/footer/footer.html", "utf8");

function createPage(path, options) {
    return (nav + fs.readFileSync(`./public/views/${path}`, "utf8") + footer)
            .replace("%%DOCUMENT_TITLE%%", options?.title || "Nodefolio")
            .replace("%%SCRIPTS%%", options?.scriptTag || "");
}

module.exports = {
    createPage
};