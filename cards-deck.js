// Javascript for cards-deck
window.addEventListener('load',() => {
	// Show the "next" button if there are more than 5 images in the deck
	document.querySelectorAll('.cards-deck:not(#cards-zoom-container)').forEach(deck => {
		if([...deck.querySelectorAll('.card[data-position="6"]')].length>0) deck.querySelector('.cards-next').style.display='block';
		if([...deck.querySelectorAll('.card[data-position="0"]')].length>0) deck.querySelector('.cards-prev').style.display='block';
	});
	// Click the "previous" / "next" buttons
	document.querySelectorAll('.cards-deck .cards-next,.cards-deck .cards-prev').forEach(btn => {
		btn.addEventListener('click',function() {
			[...btn.parentElement.querySelectorAll('.card')].every((card,cardIndex,cardArray) => {
				const newPosition=parseInt(card.dataset.position)+(btn.classList.contains('cards-next') ? -1 : 1);
				if(cardIndex===0) {
					// Hide the "previous" / "next" buttons if we've reached the beginning or end
					btn.parentElement.querySelector('.cards-prev').style.display=newPosition>0 ? 'none' : 'block';
					btn.parentElement.querySelector('.cards-next').style.display=newPosition+cardArray.length<7 ? 'none' : 'block';
					// If we've reached the beginning, stop
					if(newPosition>1) return false;
					// If we've reached the end, stop
					if(newPosition+cardArray.length<6) return false;
				}
				// Move this card into the new position
				card.dataset.position=newPosition;
				return true;
			});
		});
	});
	// Click card to zoom
	document.querySelectorAll('.cards-deck .card').forEach(i => {i.addEventListener('click',() => {
		// Find the zoom card and its container
		const zoomContainer=document.querySelector('#cards-zoom-container');
		const zoomCard=document.querySelector('#cards-zoom');
		// Prevent transitions while we move it into place over the clicked card
		zoomContainer.classList.add('no-transition');
		zoomCard.classList.add('no-transition');
		// Move the zoom card's container over the clicked card's container
		zoomContainer.style.top=i.parentElement.getBoundingClientRect().top+'px';
		zoomContainer.style.left=i.parentElement.getBoundingClientRect().left+'px';
		zoomContainer.style.maxWidth=i.parentElement.getBoundingClientRect().width+'px';
		zoomContainer.style.maxHeight=i.parentElement.getBoundingClientRect().height+'px';
		// Move the zoom card over the clicked card
		zoomCard.style.left=i.offsetLeft+'px';
		zoomCard.style.top=i.offsetTop+'px';
		// Copy the transform from the clicked card to the zoom card
		const style=window.getComputedStyle(i);
		zoomCard.style.transform=style.transform || style.webkitTransform || style.mozTransform;
		// Copy the content from the clicked card to the zoom card
		zoomCard.innerHTML=i.innerHTML;
		// We need to do the next part on a setTimeout of zero, otherwise the transitions come back in before the zoom card is in position
		setTimeout(() => {
			// Put transitions back
			zoomContainer.classList.remove('no-transition');
			zoomCard.classList.remove('no-transition');
			// Make the zoom card and its container active, remove its overridden position, and set it to centered
			zoomContainer.classList.add('active');
			zoomCard.classList.add('active');
			zoomCard.style.transform='translate(-50%,-50%)';
			zoomContainer.style.top='';
			zoomContainer.style.left='';
			zoomContainer.style.maxWidth='';
			zoomContainer.style.maxHeight='';
		},0);
	})});
	// Click zoomed card to close
	document.querySelector('#cards-zoom-container').addEventListener('click',function() {
		// Find the zoom card and its container
		const zoomContainer=document.querySelector('#cards-zoom-container');
		const zoomCard=document.querySelector('#cards-zoom');
		// Remove the active class
		zoomContainer.classList.remove('active');
		zoomCard.classList.remove('active');
		// Remove the card's overridden positioning
		zoomCard.style.left='';
		zoomCard.style.top='';
		// Shrink to nothing
		zoomContainer.style.maxWidth='0';
		zoomContainer.style.maxHeight='0';
	});
});
