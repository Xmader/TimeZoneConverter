window.$ = window.jQuery = require('jquery');
require('angular');
require('jquery.pep.js/src/jquery.pep');
const moment = require('moment-timezone');
require('jquery-mousewheel')(window.$);
require('../assets/js/services/scroll_service');
require('../assets/js/libs/jquery-ui');
require('angular-ui-sortable');
const trackAnalytics = require('../assets/js/services/analytics_service');
const storage = require('../assets/js/services/storage_service');
const timeServiceFunc = require('../assets/js/services/time_service');
let grid_pixel = 50;

var wcc_app = angular.module('wcc', [
        require('../assets/js/filters/index').name,
        'ui.sortable',
        require('angular-sanitize')
    ])
        .controller('wccController', ['$scope', 'timeService', '$interval', '$timeout', '$filter', function ($scope, timeService, $interval, $timeout, $filter) {

            trackAnalytics('page', '/app/Clocks');
            //set defaults
            $scope.range = 0;
            $scope.cities = [];
            $scope.detected_city = moment.tz.guess();
            $scope.moment = moment();
            $scope.items_are_sorting = false;
            $scope.main_view = true;
            $scope.cities_array = [];
            $scope.item_height = 120;
            $scope.success_form = false;

            $scope.$watch('search_form__input', function (val) {
                $scope.searched_array = $filter('searchFilter')($scope.cities_array, $scope.search_form__input, 'AND', $scope.cities);

                if (!$scope.searched_array.length && $scope.search_form__input) {
                    trackAnalytics('event', 'Cities', 'Not Found', $scope.search_form__input);
                }

                resetSelected();
            });

            $interval(function () {
                $scope.moment = moment();
            }, 1000);

            $scope.sortableOptions = {
                update: function (e, ui) {
                    $timeout(function () {
                        trackAnalytics('event', 'Clocks', 'Reordered');
                        saveZonesArray();
                    });
                },
                revert: 200,
                axis: 'y',
                tolerance: 'pointer',
                sort: function (event, ui) {

                    $(this).sortable("refreshPositions");
                }
            };


            //parse + human readable zone names
            angular.forEach(moment.tz.names(), function (value) {

                if (value.indexOf('Etc/') == -1 &&
                    value !== 'CET' &&
                    value !== 'CST6CDT' &&
                    value !== 'EET' &&
                    value !== 'EST' &&
                    value !== 'EST5EDT' &&
                    value !== 'GB' &&
                    value !== 'GB-Eire' &&
                    value !== 'GMT' &&
                    value !== 'GMT+0' &&
                    value !== 'GMT-0' &&
                    value !== 'GMT0' &&
                    value !== 'HST' &&
                    value !== 'MET' &&
                    value !== 'MST' &&
                    value !== 'MST7MDT' &&
                    value !== 'NZ' &&
                    value !== 'NZ-CHAT' &&
                    value !== 'PRC' &&
                    value !== 'PST8PDT' &&
                    value !== 'ROC' &&
                    value !== 'ROK' &&
                    value !== 'UCT' &&
                    value !== 'UTC' &&
                    value !== 'W-SU' &&
                    value !== 'WET'
                ) {

                    let item = {
                        original: value,
                        selected: false
                    }

                    let value_spaced = value.replace(/_/g, ' ');

                    var arr = value_spaced.split('/');

                    if (arr.length === 1) { //if single
                        item.value_spaced_city = arr[0];
                    } else if (arr.length === 2) {
                        item.value_spaced_country = arr[0];
                        item.value_spaced_city = arr[1];
                    } else if (arr.length === 3) {
                        item.value_spaced_country = arr[0] + ', ' + arr[1];
                        item.value_spaced_city = arr[2];
                    }


                    $scope.cities_array.push(item);
                }


            });

            let tooltip = $('<div class="global-tooltip not_shown"></div>');
            tooltip.appendTo('body');
            let $body = $('body');

            //add tooltip
            $body.on('mouseenter', '.warn-notify', function () {

                let el = $(this),
                    message = el.html(),
                    top = el.offset().top - tooltip.height() - 11,
                    left = el.offset().left - 4;

                tooltip.html(message).removeClass('not_shown').css('top',top+'px');
                $('.t-corner').css('left',left+'px');
            });

            $body.on('mouseleave', '.warn-notify', function () {
                tooltip.addClass('not_shown');
            });

            //init pep
            var $pep = $('.pep').pep(
                {
                    axis: 'x',
                    useCSSTranslation: false,
                    initiate: pdrag,
                    start: pdrag,
                    easing: pdrag,
                    drag: pdrag,
                    stop: pdrag,
                    rest: pdrag
                }
            );

            let $pep_wrap = $('#pep_wrap'),
                $pep_track = $('#pep_track'),
                $map_block = $('#colored-block'),
                $pep_block = $('#pep');

            function pdrag(e, obj) {
                var drag = $(obj.el);
                var pos_left = drag.position().left;
                var left = pos_left * (-1) + "px";
                $scope.range = Math.round(pos_left * (-1) / grid_pixel);
                $scope.$apply();
                track_scroll_analytics();
                $pep_wrap.css('left', left);
                $pep_track.css('background-position', pos_left + 'px 54px');
                $map_block.css('background-position', pos_left / 5 + 'px 200px');

            }

            //mousewheel
            $('body').on('mousewheel', '.site:not(.add-shown)', function (event) {

                if ($pep_block.hasClass('pep-active') || !$scope.cities.length) {
                    return false;
                }

                if (Math.abs(event.deltaY) < 2) {
                    var drag = $pep_block,
                        shift_left = drag.position().left + event.deltaX * (-1);
                    drag.css('left', shift_left + 'px');

                    var pos_left = drag.position().left;
                    var left = pos_left * (-1) + "px";
                    $scope.range = Math.round(pos_left * (-1) / grid_pixel);
                    $scope.$apply();
                    track_scroll_analytics();
                    $pep_wrap.css('left', left);
                    $pep_track.css('background-position', pos_left + 'px 54px');
                    $map_block.css('background-position', pos_left / 5 + 'px 200px');
                    $pep_block.css('transform', '');
                    $pep_block.css('transition', '');
                }

            });


            //reset range
            $scope.reset_range = function (force, track_analytics) {
                if ($pep_block.hasClass('pep-ease') && !force) {
                    return false;
                }
                if (track_analytics) {
                    trackAnalytics('event', 'Clocks', 'Time Reset');
                }
                $pep_block.removeClass('pep-ease');
                // $pep.data('plugin_pep').revert();
                $pep.data('plugin_pep').moveTo(0, 0);
                $scope.range = 0;
                $pep_block.css('transform', '');
                $pep_block.css('transition', '');
                $pep_wrap.css('left', 0);
                $pep_track.css('background-position', '0 54px');
                $map_block.css('background-position', '0 200px');

                $scope.tip_appearance = false;

                var for_storage = {
                    already_shown: true
                }

                storage.set('tip_appearance', for_storage, function (error) {
                    if (error) throw error;
                });
            };

            let clear_timeout;
            document.addEventListener("visibilitychange", function () {

                if (document.visibilityState === 'visible') {
                    if (clear_timeout) {
                        $timeout.cancel(clear_timeout);
                    }
                } else {
                    clear_timeout = $timeout(function () {
                        $scope.reset_range();
                    }, 300000);
                }

            });

            $scope.toggleAddScreen = function () {

                $scope.main_view ? $scope.main_view = false : $scope.main_view = true;
                if (!$scope.main_view) {

                    $timeout(function () {
                        $('#search-form__input').focus();
                    }, 100);
                    trackAnalytics('page', '/app/Add-City');
                } else {
                    $scope.resetSearch();
                    $('#search-form__input').blur();
                    trackAnalytics('page', '/app/Clocks');
                }

            };

            var was_keyupped = false;

            $scope.setAsActive = function (el) {
                if (was_keyupped) {
                    return false;
                }
                resetSelected();
                el.selected = true;
            };

            $scope.unchooseActive = function (el) {
                if (was_keyupped) {
                    return false;
                }
                resetSelected();
            };

            $scope.chooseCity = function () {
                var active = findActive();
                if (active) {
                    trackAnalytics('event', 'Cities', 'City Added', active.value.original);
                    $scope.cities.push(active.value.original);
                    saveZonesArray();
                    $scope.toggleAddScreen();
                }
            }

            $scope.resetSearch = function () {
                $scope.search_form__input = null;
                resetSelected();
                $('#search-form__input').focus();
            };

            $scope.delete_item = function (index) {
                let city_name = $scope.cities[index];
                $scope.cities.splice(index, 1);
                trackAnalytics('event', 'Cities', 'City Deleted', city_name);
                saveZonesArray();
                $scope.reset_range();
            };


            $scope.toggle_theme = function (ui_theme) {
                $map_block.addClass('faded_map');
                $scope.ui_theme = ui_theme;
                trackAnalytics('event', 'Settings', 'Theme Switched', ui_theme);
                saveUserData();

                $timeout(function () {
                    $map_block.removeClass('faded_map');
                }, 1);
            }

            $scope.show_settings_menu = function () {
                ipcRenderer.send('show-settings-menu');
            };

            $scope.navigateSearch = function (event) {

                if (!$scope.searched_array.length) {
                    return false;
                }

                if (event.keyCode === 40) { //down
                    downUpSearch(true);
                } else if (event.keyCode === 38) { //up
                    downUpSearch(false);
                } else if (event.keyCode === 13) { //enter
                    $scope.chooseCity();
                }

                if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13 || event.keyCode === 27) {
                    return event.preventDefault();
                }

            };

            $scope.open_share = function ($event) {
                $event.preventDefault();
                var href = $($event.currentTarget).attr('href');
                window.open(href, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');


            }

            $scope.cancelBubble = function (event) {

                if (event.keyCode === 27) { //esc
                    event.stopPropagation();
                    $scope.toggleAddScreen();
                }

            };

            $scope.play_video = function () {
                $scope.video_played = true;
                if (player) {
                    player.playVideo();
                }
            };

            $scope.pause_video = function () {
                $scope.video_played = false;
                if (player) {
                    player.pauseVideo();
                }
            };

            function saveZonesArray() {

                var for_storage = {
                    cities: $scope.cities
                };

                storage.set('added_cities', for_storage, function (error) {
                    if (error) throw error;
                });

            }

            let find_scroll = $('#searched-list'),
                keyupped_timeout;

            function downUpSearch(down) {

                var active = findActive();

                if (!active) { //if no active

                    $scope.searched_array[0].selected = true;

                } else {
                    var nex_index;


                    if (down) { //pressed down
                        nex_index = (active.key + 1);
                    } else { //pressed up
                        nex_index = (active.key - 1);
                    }

                    if ($scope.searched_array[nex_index]) {
                        $scope.searched_array[nex_index].selected = true;
                        $scope.searched_array[active.key].selected = false;

                        var scrolled_top = find_scroll.scrollTop(),
                            active_pos_top = find_scroll.find('>li').eq(nex_index).position().top;

                        if (active_pos_top > 400) {
                            find_scroll.scrollTop((nex_index - 4) * 100);
                        } else if (active_pos_top < 0) {
                            find_scroll.scrollTop(nex_index * 100);
                        }
                        $timeout.cancel(keyupped_timeout);
                        was_keyupped = true;
                        keyupped_timeout = $timeout(function () {
                            was_keyupped = false;
                        }, 100);

                    }

                }

            }

            function findActive() {

                var result = null;
                angular.forEach($scope.searched_array, function (value, key) {
                    if (value.selected === true) {
                        result = {
                            value: value,
                            key: key
                        }
                        return;
                    }
                });

                return result;

            }

            function resetSelected() {
                angular.forEach($scope.searched_array, function (value, key) {
                    value.selected = false;
                });
            }

            //get cities from storage
            storage.get('added_cities', function (error, data) {
                if (error) throw error;

                if (!data.cities) { //first run
                    $scope.cities = timeService.renderDefaults();
                } else { //already have cities
                    $scope.cities = data.cities;
                }

            });

            //get scrolled tip appearance
            storage.get('tip_appearance', function (error, data) {
                if (error) throw error;

                $scope.tip_appearance = true;

                if (data.already_shown) { //first run
                    $scope.tip_appearance = false;
                }

            });

            $scope.toggle_time_format = function () {
                $scope.time_format_check ? $scope.time_format = '24h' : $scope.time_format = 'am/pm';
                saveUserData();
                trackAnalytics('event', 'Settings', 'Time Format Switched', $scope.time_format);
            };

            $scope.scroll_to_download = function () {


                var el = $('.platforms'),
                    elTop = el.offset().top - 30 + 'px';

                $(window).animate({
                    scrollTop: elTop
                }, 600);
            };

            storage.get('user_data', function (error, data) {
                if (error) throw error;

                $scope.time_format = 'am/pm';
                $scope.time_format_check = false;
                $scope.ui_theme = 'white';

                if (data.format) {
                    $scope.time_format = data.format;
                    $scope.time_format_check = $scope.time_format === '24h';
                }
                if (data.theme) {
                    $scope.ui_theme = data.theme;
                }

                $timeout(function () {
                    $('.ng-cloak-hid').removeClass('ng-cloak-hid');
                });

            });

            var scroll_timeout;

            function track_scroll_analytics() {

                if (scroll_timeout) {
                    clearTimeout(scroll_timeout);
                }

                scroll_timeout = setTimeout(function () {
                    trackAnalytics('event', 'Clocks', 'Time Scrolled');
                }, 3000);
            }

            function saveUserData() {

                var for_storage = {
                    format: $scope.time_format,
                    theme: $scope.ui_theme
                };

                storage.set('user_data', for_storage, function (error) {
                    if (error) throw error;

                });
            };

            //login form
            $('body').on('keyup', '.subscribe-form__input', function () {

                $(this).removeClass('errored');

            });

            $scope.read_success = function () {
                $scope.success_form = false;
                $('.subscribe-form__input').val('');
            };

            //form submit
            $('body').on('submit', '.subscribe-form', function () {

                var form = $(this),
                    marker = false;

                form.find('.errored').removeClass('errored');

                //validate before submit
                var mailInp = form.find('.subscribe-form__input');

                var validMail = /^[+-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/i.test(mailInp.val());

                if (validMail === false) {
                    mailInp.focus();
                    mailInp.addClass('errored');
                    marker = true;
                }

                if (marker) {
                    return false;
                }

                $('input').blur();

                var data = form.serialize();

                form.addClass('form_in_progress');
                mailInp.attr('disabled', true);

                $.ajax({
                    type: form.attr('method'),
                    url: form.attr('action'),
                    data: data,
                    error: function (err) {
                        alert("Could not connect to the registration server. Please try again later.");
                        form.removeClass('form_in_progress');
                        mailInp.attr('disabled', false);
                    },
                    success: function (data) {
                        $scope.success_form = true;
                        $scope.$apply();
                        form.removeClass('form_in_progress');
                        mailInp.attr('disabled', false);
                    }
                });

                return false;

            });

        }])
;

wcc_app.factory('timeService', timeServiceFunc);
