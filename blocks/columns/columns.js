export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // Add appropriate class based on block type
          if (block.classList.contains('vacation')) {
            picWrapper.classList.add('vacation-img-col');
          } else {
            picWrapper.classList.add('columns-img-col');
          }
        }
      } else {
        // Add appropriate class based on block type
        if (block.classList.contains('vacation')) {
          col.classList.add('vacation-content');
        } else {
          col.classList.add('columns-text-col');
          
          // Only apply text centering wrapper for regular columns
          const textContent = col.innerHTML;
          const textContainer = document.createElement('div');
          textContainer.classList.add('text-center-wrapper');
          textContainer.innerHTML = textContent;
          col.innerHTML = '';
          col.appendChild(textContainer);

          const headings = col.querySelectorAll('h1, h2, h3, h4, h5, h6');
          const paragraphs = col.querySelectorAll('p');
          const links = col.querySelectorAll('a');

          headings.forEach(heading => {
            heading.style.textAlign = 'center';
          });

          paragraphs.forEach(para => {
            para.style.textAlign = 'center';
          });

          if (links.length > 0) {
            const linkContainer = document.createElement('div');
            linkContainer.classList.add('links-center');
            links.forEach(link => {
              linkContainer.appendChild(link.cloneNode(true));
            });
            links[0].parentElement.replaceWith(linkContainer);
          }
        }
      }
    });
  });
}