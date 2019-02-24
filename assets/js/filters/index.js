/* globals angular */

'use strict';

const moment = require('moment-timezone');

// milliseconds in step
const ms_in_step = 1800000;

const warn_list={
    'Eastern_Standard_Time_(North_America)/EST':{
        etalon:'America/New_York',
        alias:'EDT (Eastern Daylight Time)',
        current:'EST'
    },
    'Eastern_Daylight_Time_(North_America)/EDT':{
        etalon:'America/New_York',
        alias:'EST (Eastern Standart Time)',
        current:'EDT'
    },
    'Pacific_Standard_Time_(North_America)/PST':{
        etalon:'America/San_Francisco',
        alias:'PDT (Pacific Daylight Time)',
        current:'PST'
    },
    'Pacific_Daylight_Time_(North_America)/PDT':{
        etalon:'America/San_Francisco',
        alias:'PST (Pacific Standard Time)',
        current:'PDT'
    }
};

var customCurrency = angular.module('customCurrency', []);

customCurrency.filter('get_name', function () {
  return function (name) {

    var human_name = name.split('/');
    human_name = human_name[human_name.length - 1];
    human_name = human_name.replace(/_/g, ' ');

    return human_name;
  };
});

customCurrency.filter('get_second_name', function () {
  return function (name) {

    var human_name = name.split('/'),
      i = 1;
    if (human_name.length === 2) {
      i = 2;
    }
    human_name = human_name[human_name.length - i];
    human_name = human_name.replace(/_/g, ' ');

    return human_name;
  };
});

//@ngInject
customCurrency.filter('time_shift', function () {
  return function (val) {

    var minus = '+';

    if (val < 0) {
      val = Math.abs(val);
      minus = '-';
    }

    var ms = ms_in_step * val,
      duration = moment.duration(ms, 'milliseconds'),
      days = Math.floor(duration.asDays()),
      ms_without_days = ms - days * 86400000,
      hours = moment.duration(ms_without_days, 'milliseconds').asHours(),
      result;

    if (days == 0) {
      result = minus + hours + 'h';
    } else {
      if (hours == 0) {
        result = minus + days + 'd';
      } else {
        result = minus + days + 'd ' + hours + 'h';
      }
    }

    return result;

  };
});

customCurrency.filter('get_range', function () {
  return function (val, default_tz, range) {

    var timestamp_fin = get_timestamp_fin(range);

    var val_tz_offset = moment.tz.zone(val).offset(timestamp_fin),
      default_tz_offset = moment.tz.zone(default_tz).offset(timestamp_fin),
      shifted = (default_tz_offset - val_tz_offset) / 60,
      result = null;

    if (shifted > 0) {
      result = '+' + shifted + 'h';
    } else if (shifted < 0) {
      result = shifted + 'h';
    }

    // calculate the difference in hours
    return result;

  };
});

customCurrency.filter('get_warning', function () {
    return function (val, default_tz, range) {

        if(warn_list[val]){

            var timestamp_fin = get_timestamp_fin(range);

            var val_tz_offset = moment.tz.zone(val).offset(timestamp_fin),
                default_tz_offset = moment.tz.zone(warn_list[val].etalon).offset(timestamp_fin),
                shifted = default_tz_offset - val_tz_offset,
                result = null;

            if (shifted != 0) {
                let title = '<b>'+warn_list[val].current+'</b> may not reflect local time since most locations in <b>'+warn_list[val].current+'</b> are observing <b>'+warn_list[val].alias+'</b> now<div class="t-corner"></div>';
                result = '<span class="warn-notify"><div class="global-tooltip__content">'+title+'</div></span>';
            }

            // calculate the difference in hours
            return result;

        }

    };
});

customCurrency.filter('time_in_zone', function () {
  return function (val, moment_tz, range, time_format) {

    var timestamp_fin = get_timestamp_fin(range);

    if (time_format == '24h') {
      return moment.tz(timestamp_fin, val).format('HH:mm');
    } else if (time_format == 'am/pm') {
      return moment.tz(timestamp_fin, val).format('hh:mm') + '<span class="am_pm">' + moment.tz(timestamp_fin, val).format('a') + '</span>';
    }

  };
});

customCurrency.filter('availibility', function () {
  return function (val, moment_tz, range) {

    var timestamp_fin = get_timestamp_fin(range);

    var day_of_week = moment.tz(timestamp_fin, val).format('E'),
      hour_of_day = moment.tz(timestamp_fin, val).format('HH'),
      add_class = '';

    if (hour_of_day >= 23 || hour_of_day < 8) { //night
      add_class = 'cities-list__item-moon';
    } else if (day_of_week == 6 || day_of_week == 7 || ( hour_of_day < 23 && hour_of_day >= 20 ) || ( hour_of_day < 9 && hour_of_day >= 8 )) { // days off or evening time
      add_class = 'cities-list__item-red';
    } else if (hour_of_day < 20 && hour_of_day >= 18) { // days off or evening time
      add_class = 'cities-list__item-yellow';
    }

    // calculate the difference in hours
    return add_class;

  };
});

customCurrency.filter('date', function () {
  return function (val, moment_tz, range) {

    var timestamp_fin = get_timestamp_fin(range);

    var respose_text = '',
      now_day = parseInt(moment().format('DDD', 10)),
      now_year = parseInt(moment().format('YYYY'), 10),
      that_day = parseInt(moment.tz(timestamp_fin, val).format('DDD'), 10),
      that_year = parseInt(moment.tz(timestamp_fin, val).format('YYYY'), 10);

    if (now_year === that_year) { //if current year
      if (now_day === that_day) {
        respose_text = 'today';
      } else if (now_day === (that_day - 1)) {
        respose_text = 'tomorrow';
      } else if (now_day === (that_day + 1)) {
        respose_text = 'yesterday';
      } else {
        respose_text = renderDate(timestamp_fin, val);
      }
    } else if (now_year === (that_year - 1) && now_day === 365 && that_day === 1) { //if 31 dec and 1 jan
      respose_text = 'tomorrow';
    } else if (now_year === (that_year + 1) && now_day === 1 && that_day === 365) { //if 1 jan and 31 dec
      respose_text = 'yesterday';
    } else { //simple date
      respose_text = renderDate(timestamp_fin, val);
    }

    // calculate the difference in hours
    return respose_text;

  };
});

function renderDate(timestamp_fin, val) {
  var dof = moment.tz(timestamp_fin, val).format('dddd'),
    moy = moment.tz(timestamp_fin, val).format('MMMM'),
    dom = moment.tz(timestamp_fin, val).format('D');
  return dof + ', ' + moy + ' ' + dom;
}

customCurrency.filter("searchFilter", function () {
  return function (input, searchText, AND_OR, cities) {

    if (!searchText) {
      return false;
    }

    searchText = searchText.replace(/\\/g, "");
    searchText = searchText.replace(/[+]/g, "\\$&");

    var returnArray = [],
      // Split on single or multi space
      splitext = searchText.toLowerCase().split(/\s+/),
      // Build Regexp with Logical AND using "look ahead assertions"
      regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")",
      // Build Regexp with logicial OR
      regexp_or = searchText.toLowerCase().replace(/\s+/g, "|"),
      // Compile the regular expression
      re = new RegExp((AND_OR == "AND") ? regexp_and : regexp_or, "i");

    for (var x = 0; x < input.length; x++) {
      var matched = false;

      for (var i = 0; i < cities.length; i++) {
        if (input[x].original == cities[i]) {
          matched = true;
        }
      }

      if (re.test(input[x].original) && !matched) returnArray.push(input[x]);
    }
    return returnArray;
  }
});

function get_timestamp_fin(range) {

  var timestamp_fin = +new Date();

  timestamp_fin += range * ms_in_step;

  if (range < 0) {
    timestamp_fin = Math.ceil(timestamp_fin / ms_in_step) * ms_in_step;
  } else if (range > 0) {
    timestamp_fin = Math.floor(timestamp_fin / ms_in_step) * ms_in_step;
  }

  return timestamp_fin;
}

module.exports = customCurrency;