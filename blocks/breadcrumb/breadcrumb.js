import { getMetadata } from "../../scripts/aem.js";
export default function decorate(block) {
    let breadcrumbHTML = `<p><a href="/" title="Home">Home</a> / <span>${getMetadata('productname')}</span></p>`
    block.innerHTML = breadcrumbHTML;
}