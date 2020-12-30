const nodes = document.querySelectorAll('[print]')
nodes.forEach(node => {
    node.addEventListener('click', () => {
    	const target = node.getAttribute('print')
        const head = document.querySelector('head')
        const links = Array.from(head.children).filter(n => n.localName === 'link')
        const allLinks = links.map(l => l.outerHTML).join('\n')
        const divContents = document.querySelector(target).innerHTML; 
        const a = window.open('', 'PRINT', 'height=400,width=600'); 
        a.document.write(`
        <html>
            <head>${allLinks}</head>
            <body >${divContents}</body>
        </html>`);
        a.document.close(); // necessary for IE >= 10
        a.focus(); // necessary for IE >= 10*/
        a.onload = () => {
        	window.print()
          window.close()
        }
    })
})