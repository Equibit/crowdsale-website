import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './count-down.less'
import view from './count-down.stache'
import moment from 'moment'

export const ViewModel = DefineMap.extend({
	countdown: {
		value: false
	},
	showLabels: {
	  value: false
  },
	showZeros: {
		value: false
	},
	timestamp: 'number',
	current: 'number',
	months: {
		value: "00"
	},
	days: {
		values: "00"
	},
	hours: {
		value: "00"
	},
	minutes: {
		values: "00"
	},
	seconds: {
		value: "00"
	},
	loaded: {
		value: false
	},
	hasMonths: {
		get() {
			return parseInt(this.months)
		}
	},
	hasDays: {
		get() {
			return parseInt(this.days) || parseInt(this.months)
		}
	},
	hasHours: {
		get() {
			return parseInt(this.hours) || parseInt(this.days) || parseInt(this.months)
		}
	},
	hasMinutes: {
		get() {
			return parseInt(this.minutes) || parseInt(this.hours) || parseInt(this.days) || parseInt(this.months)
		}
	},
	hasSeconds: {
		get() {
			return parseInt(this.seconds) || parseInt(this.minutes) || parseInt(this.hours) || parseInt(this.days) || parseInt(this.months)
		}
	},
	manyMonths: {
		get() {
			return (parseInt(this.months) > 1)
		}
	},
	manyDays: {
		get() {
			return (parseInt(this.days) > 1)
		}
	},
	manyHours: {
		get() {
			return (parseInt(this.hours) > 1)
		}
	},
	manyMinutes: {
		get() {
			return (parseInt(this.minutes) > 1)
		}
	},
	manySeconds: {
		get() {
			return (parseInt(this.seconds) > 1)
		}
	},
	yearProgress: {
		get() {
			return (parseInt(this.months)/12)*100
		}
	},
	monthProgress: {
		get() {
			return (parseInt(this.days)/30)*100
		}
	},
	dayProgress: {
		get() {
			return (parseInt(this.hours)/24)*100
		}
	},
	hourProgress: {
		get() {
			return (parseInt(this.minutes)/60)*100
		}
	},
	minuteProgress: {
		get() {
			return (parseInt(this.seconds)/60)*100
		}
	}
});

export default Component.extend({
  tag: 'count-down',
  ViewModel,
  view,
	events: {
		inserted() {

			let startInterval = setInterval(() => {
				if (typeof this.viewModel.timestamp !== 'undefined' && typeof this.viewModel.current !== 'undefined') {
					clearInterval(startInterval);
					let eventTime = this.viewModel.timestamp,
						currentTime = this.viewModel.current,
						timeOffset = this.viewModel.current - Math.floor(Date.now()),
						diffTime = eventTime - currentTime,
						duration = moment.duration(diffTime, 'milliseconds'),
						interval = 1000;

					if (diffTime > 0) {
						let countdownInterval = setInterval(() => {

							currentTime = Math.floor(Date.now()) + timeOffset;
							diffTime = eventTime - currentTime;
							duration = moment.duration(diffTime, 'milliseconds');

							duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');

							if (duration._milliseconds >= 0) {
								let o = moment.duration(duration).months(),
									d = moment.duration(duration).days(),
									h = moment.duration(duration).hours(),
									m = moment.duration(duration).minutes(),
									s = moment.duration(duration).seconds();

								if (this.viewModel.showZeros) {
									o = $.trim(o).length === 1 ? '0' + o : o;
									d = $.trim(d).length === 1 ? '0' + d : d;
									h = $.trim(h).length === 1 ? '0' + h : h;
									m = $.trim(m).length === 1 ? '0' + m : m;
									s = $.trim(s).length === 1 ? '0' + s : s;
								}

								this.viewModel.months = o;
								this.viewModel.days = d;
								this.viewModel.hours = h;
								this.viewModel.minutes = m;
								this.viewModel.seconds = s;

								this.viewModel.loaded = true;
							} else {
								this.viewModel.countdown = true;
								clearInterval(countdownInterval);
							}

						}, interval);
					} else {
						this.viewModel.countdown = true;
						this.viewModel.loaded = true;
					}
				}
			}, 50);
		}
	}
});
