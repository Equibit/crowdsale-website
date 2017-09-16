import callback from 'can-view-callbacks'
import 'eonasdan-bootstrap-datetimepicker';

callback.attr('datetimepicker', (el) => {
  let $el = $(el),
		value = (el.getAttribute('datetimepicker') ? el.getAttribute('datetimepicker') : '');

  if (value === 'TBD') value = '';

  setTimeout(() => {
  	if (value === 'min-mode') $el.datetimepicker({viewMode: 'years', format: 'MM/DD/YYYY'});
  	else if (value !== '') $el.datetimepicker({defaultDate: value});
  	else return $el.datetimepicker();
	}, 50);
});