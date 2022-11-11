# cards-deck
cards-deck is a photo gallery built mainly in CSS with a few Javascript elements.

It displays photos as a fan of 5 cards.
- When mouse-overed the cards fan out further.
- When a card is clicked it zooms to full-screen.
- When the zoomed card is clicked it flies off the screen.
- If there are more than 5 photos, there will be buttons on either side to scroll them. The cards scroll smoothly to the next / previous photos.

The cards positions are set by a data-position attribute on each of the "card" elements.
- data-position should normally start at 1 and increase.
- If you have fewer than 5 photos then you can use data-position to set where they will be. For example put data-positions as 1, 2 and 3 to have them all on the left; 2, 3 and 4 to have them centered; 1, 3 and 5 to have them spread out.
- If you have more than 5 cards, you can change the deck starting position by starting data-position at 0, or at -1 etc.
