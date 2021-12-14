const fs = require("fs");

const dotenv = require('dotenv');
dotenv.config();

const nav = fs.readFileSync("./public/main-views/view-components/navbar/navbar.html", "utf8");
const footer = fs.readFileSync("./public/main-views/view-components/footer/footer.html", "utf8")
.replace("%%PHONENO%%", process.env.PHONENO)
.replace("%%EMAIL%%", process.env.EMAIL)
.replace("%%GITHUB%%", process.env.GITHUB)
.replace("%%GITHUB%%", process.env.GITHUB);

function createPage(path, options) {
    return (nav + fs.readFileSync(`./public/main-views/${path}`, "utf8") + footer)
            .replace("%%DOCUMENT_TITLE%%", options?.title || "Nodefolio")
            .replace("%%SCRIPT%%", options?.script ? `<script src="${options.script}"></script>` : null)
            .replace("%%ACTIVE_NAV_LINK%%", options?.activeNavLink);
}


//---------------DASHBOARD

const dashboardNav = fs.readFileSync("./public/dashboard-views/view-components/navbar/navbar.html", "utf8");

function createDashboardPage(path, options) {
    return (dashboardNav + fs.readFileSync(`./public/dashboard-views/${path}`, "utf8"))
            .replace("%%DOCUMENT_TITLE%%", options?.title || "Nodefolio")
            .replace("%%SCRIPT%%", options?.script ? `<script src="${options.script}"></script>` : null)
            .replace("%%ACTIVE_NAV_LINK%%", options?.activeNavLink);
}


module.exports = {
    createPage, createDashboardPage
};

//    <script src="./assets/lib/escapeHTML.js"></script>