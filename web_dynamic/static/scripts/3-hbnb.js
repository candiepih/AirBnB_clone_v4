/**
 * script must be executed only when DOM is loaded
 * Listen for changes on each input checkbox tag
 */

const articleTree = (place) => {
  const article = $('<article>');

  const divTitleBox = $('<div>', { class: 'title_box' });
  const placeName = $('<h2>').html(place.name);
  const price = $('<div>', { class: 'price_by_night' }).text(`$${place.price_by_night}`);
  divTitleBox.append([placeName, price]);

  const information = $('<div>', { class: 'information' });
  const maxGuests = $('<div>', { class: 'max_guest' });
  const maxGuestsText = `${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}`;
  maxGuests.html(maxGuestsText);
  const numberRooms = $('<div>', { class: 'number_rooms' });
  const numberRoomsText = `${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}`;
  numberRooms.html(numberRoomsText);
  const bathrooms = $('<div>', { class: 'number_bathrooms' });
  const bathroomsText = `${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}`;
  bathrooms.html(bathroomsText);
  information.append([maxGuests, numberRooms, bathrooms]);

  // let user = $('<div>', {'class': 'user'});
  // let details = $('<b>').text('Owner:');
  // let ownerText = `${ place.user.first_name } ${ place.user.last_name }`;
  // user.append(details).text(ownerText);

  const description = $('<div>', { class: 'description' });
  const descriptionText = `${place.description}`;
  description.html(descriptionText);

  article.append([divTitleBox, information, description]);
  $('section.places').append(article);
};

$(document).ready(() => {
  const amenities = {};
  $('.amenities ul li input').bind('change', (e) => {
    const element = e.target;
    const id = element.dataset.id;
    const name = element.dataset.name;
    if (element.checked) {
      amenities[name] = id;
    } else {
      const amenityKey = Object.keys(amenities).find(key => amenities[key] === id);
      delete amenities[amenityKey];
    }
    const amenityNames = Object.keys(amenities);
    const substring = amenityNames.join(', ').substring(0, 30);
    const trailling = substring.length >= 30 ? '...' : '';
    $('.amenities h4').text(`${substring}${trailling}`);
  });

  // Checks the status of the api
  $.ajax({
    url: 'http://localhost:5001/api/v1/status/',
    success: (result) => {
      if (result.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        if ($('div#api_status').hasClass('available')) {
          $('div#api_status').removeClass('available');
        }
      }
    }
  });

  // Fetches the places
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    contentType: 'application/json',
    data: JSON.stringify({}),
    type: 'POST',
    dataType: 'json',
    success: (result) => {
      result.forEach(place => articleTree(place));
    }
  });
});
