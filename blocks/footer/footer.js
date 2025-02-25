// footer.js
import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  
  // Create main footer content div
  const footerMain = document.createElement('div');
  footerMain.className = 'footer-main';
  
  // Create bottom footer div
  const footerBottom = document.createElement('div');
  footerBottom.className = 'footer-bottom';
  
  // Move all content except the last div to footerMain
  const children = Array.from(fragment.children);
  children.slice(0, -1).forEach(child => footerMain.appendChild(child));
  
  // Move the last div (containing logo and copyright) to footerBottom
  const lastDiv = children[children.length - 1];
  footerBottom.appendChild(lastDiv);

  // Create footer wrapper
  const footer = document.createElement('div');
  footer.className = 'footer-wrapper';
  footer.appendChild(footerMain);
  footer.appendChild(footerBottom);
  
  block.append(footer);
}