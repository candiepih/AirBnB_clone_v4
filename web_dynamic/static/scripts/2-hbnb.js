/**
 * script must be executed only when DOM is loaded
 * Listen for changes on each input checkbox tag
 */
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
});
