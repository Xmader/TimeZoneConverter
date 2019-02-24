'use strict';

const moment = require('moment-timezone');
const india_cities = require('./countries/india');
const australia_cities = require('./countries/australia');

const timeService = function () {


    function extendCities() {

        //add zones
        moment.tz.add(
            [
                "Iran_Standard_Time/IRST|+03:30|-3u|0|",
                "Iran_Daylight_Time/IRDT|+04:30|-4u|0|",
                "Indian_Standard_Time/IST|+05:30|-5u|0|",
                "Nepal_Time/NPT|+05:45|-5J|0|",
                "Cocos_Islands_Time/CCT|+06:30|-6u|0|",
                "Central_Western_Standard_Time/CWST|+08:45|-8J|0|",
                "Australian_Central_Standard_Time/ACST|+09:30|-9u|0|",
                "Australian_Central_Daylight_Savings_Time/ACDT|+10:30|-au|0|",
                "Chatham_Standard_Time/CHAST|+12:45|-cJ|0|",
                "Chatham_Daylight_Time/CHADT|+13:45|-dJ|0|",
                "Newfoundland_Daylight_Time/NDT|-02:30|2u|0|",
                "Newfoundland_Standard_Time/NST|-03:30|3u|0|",
                "Marquesas_Islands_Time/MART|-09:30|9u|0|",
                "Azores_Summer_Time/AZOST|AZOST|0|0|",
                "Eastern_Greenland_Summer_Time/EGST|EGST|0|0|",
                "Western_European_Time/WET|WET|0|0|",
                "/GMT0|WET|0|0|",
                "/GMT|WET|0|0|",
                "/UTC0|WET|0|0|",
                "/UTC|WET|0|0|"]
        );


        let link_array = [
            'America/San_Francisco|America/Los_Angeles',
            'America/Cupertino|America/Los_Angeles',
            'America/Washington,_D.C.|America/New_York',
            'Asia/Abu_Dhabi|Asia/Dubai',
            'Europe/Amsterdam|Europe/Luxembourg',
            'Europe/Ankara|Europe/Istanbul',
            'Europe/Bern|Europe/Berlin',
            'Europe/Ottava|Europe/Berlin',
            'Europe/Munich|Europe/Berlin',
            'Europe/Frankfurt|Europe/Berlin',
            'Europe/Barcelona|Europe/Berlin',
            'Europe/Venice|Europe/Berlin',
            'Europe/Milan|Europe/Berlin',
            'Europe/Geneva|Europe/Berlin',
            'Europe/Edinburgh|Europe/London',
            "Europe/Odesa|Europe/Kiev",
            'Asia/Beijing|Asia/Shanghai',
            'America/Brasilia|America/Sao_Paulo',
            'America/Rio_De_Janeiro|America/Sao_Paulo',
            'Africa/Cape_Town|Africa/Johannesburg',
            'Pacific/Wellington|Pacific/Auckland',
            'Asia/New_Delhi|Asia/Colombo',
            'Asia/Islamabad|Asia/Karachi',
            'Asia/Lahore|Asia/Karachi',


            'GMT+1|Etc/GMT-1',
            'GMT+2|Etc/GMT-2',
            'GMT+3|Etc/GMT-3',
            'GMT+4|Etc/GMT-4',
            'GMT+5|Etc/GMT-5',
            'GMT+6|Etc/GMT-6',
            'GMT+7|Indian/Christmas',
            'GMT+8|Etc/GMT-8',
            'GMT+9|Pacific/Palau',
            'GMT+10|Pacific/Port_Moresby',
            'GMT+11|Pacific/Pohnpei',
            'GMT+12|Pacific/Tarawa',
            'GMT+13|Etc/GMT-13',
            'GMT+14|Etc/GMT-14',
            'GMT-1|Etc/GMT+1',
            'GMT-2|Atlantic/South_Georgia',
            'GMT-3|Etc/GMT+3',
            'GMT-4|Etc/GMT+4',
            'GMT-5|Etc/GMT+5',
            'GMT-6|Etc/GMT+6',
            'GMT-7|Etc/GMT+7',
            'GMT-8|Etc/GMT+8',
            'GMT-9|Etc/GMT+9',
            'GMT-10|Etc/GMT+10',
            'GMT-11|Etc/GMT+11',
            'GMT-12|Etc/GMT+12',

            'UTC+1|Etc/GMT-1',
            'UTC+2|Etc/GMT-2',
            'UTC+3|Etc/GMT-3',
            'UTC+4|Etc/GMT-4',
            'UTC+5|Etc/GMT-5',
            'UTC+6|Etc/GMT-6',
            'UTC+7|Indian/Christmas',
            'UTC+8|Etc/GMT-8',
            'UTC+9|Pacific/Palau',
            'UTC+10|Pacific/Port_Moresby',
            'UTC+11|Pacific/Pohnpei',
            'UTC+12|Pacific/Tarawa',
            'UTC+13|Etc/GMT-13',
            'UTC+14|Etc/GMT-14',
            'UTC-1|Etc/GMT+1',
            'UTC-2|Atlantic/South_Georgia',
            'UTC-3|Etc/GMT+3',
            'UTC-4|Etc/GMT+4',
            'UTC-5|Etc/GMT+5',
            'UTC-6|Etc/GMT+6',
            'UTC-7|Etc/GMT+7',
            'UTC-8|Etc/GMT+8',
            'UTC-9|Etc/GMT+9',
            'UTC-10|Etc/GMT+10',
            'UTC-11|Etc/GMT+11',
            'UTC-12|Etc/GMT+12',


            "Central_European_Time/CET|Etc/GMT-1",
            "Irish_Standard_Time/IST|Etc/GMT-1",
            "Middle_European_Time/MET|Etc/GMT-1",
            "West_Africa_Time/WAT|Etc/GMT-1",
            "Western_European_Summer_Time/WEST|Etc/GMT-1",


            "Central_Africa_Time/CAT|Etc/GMT-2",
            "Central_European_Summer_Time/CEST|Etc/GMT-2",
            "Eastern_European_Time/EET|Etc/GMT-2",
            "Israel_Standard_Time/IST|Etc/GMT-2",
            "Middle_European_Summer_Time/MEST|Etc/GMT-2",
            "South_African_Standard_Time/SAST|Etc/GMT-2",
            "Kaliningrad_Time/USZ1|Etc/GMT-2",
            "West_Africa_Summer_Time/WAST|Etc/GMT-2",


            "Arabia_Standard_Time/AST|Etc/GMT-3",
            "East_Africa_Time/EAT|Etc/GMT-3",
            "Eastern_European_Summer_Time/EEST|Etc/GMT-3",
            "Further-eastern_European_Time/FET|Etc/GMT-3",
            "Israel_Daylight_Time/IDT|Etc/GMT-3",
            "Indian_Ocean_Time/IOT|Etc/GMT-3",
            "Moscow_Time/MSK|Etc/GMT-3",
            "Showa_Station_Time/SYOT|Etc/GMT-3",
            "Turkey_Time/TRT|Etc/GMT-3",


            "Armenia_Time/AMT|Etc/GMT-4",
            "Azerbaijan_Time/AZT|Etc/GMT-4",
            "Georgia_Standard_Time/GET|Etc/GMT-4",
            "Gulf_Standard_Time/GST|Etc/GMT-4",
            "Mauritius_Time/MUT|Etc/GMT-4",
            "Réunion_Time/RET|Etc/GMT-4",
            "Samara_Time/SAMT|Etc/GMT-4",
            "Seychelles_Time/SCT|Etc/GMT-4",
            "Volgograd_Time/VOLT|Etc/GMT-4",


            "Afghanistan_Time/AFT|Iran_Daylight_Time/IRDT",


            "Heard_and_McDonald_Islands_Time/HMT|Etc/GMT-5",
            "Mawson_Station_Time/MAWT|Etc/GMT-5",
            "Maldives_Time/MVT|Etc/GMT-5",
            "Oral_Time/ORAT|Etc/GMT-5",
            "Pakistan_Standard_Time/PKT|Etc/GMT-5",
            "Indian/Kerguelen/TFT|Etc/GMT-5",
            "Tajikistan_Time/TJT|Etc/GMT-5",
            "Turkmenistan_Time/TMT|Etc/GMT-5",
            "Uzbekistan_Time/UZT|Etc/GMT-5",
            "Yekaterinburg_Time/YEKT|Etc/GMT-5",


            "Sri_Lanka_Standard_Time/SLST|Indian_Standard_Time/IST",


            "British_Indian_Ocean_Time/BIOT|Etc/GMT-6",
            "Bangladesh_Standard_Time/BST|Etc/GMT-6",
            "Bhutan_Time/BTT|Etc/GMT-6",
            "Kyrgyzstan_time/KGT|Etc/GMT-6",
            "Omsk_Time/OMST|Etc/GMT-6",
            "Vostok_Station_Time/VOST|Etc/GMT-6",

            "Myanmar_Standard_Time/MMT|Cocos_Islands_Time/CCT",


            "Christmas_Island_Time/CXT|Indian/Christmas",
            "Davis_Time/DAVT|Indian/Christmas",
            "Khovd_Standard_Time/HOVT|Indian/Christmas",
            "Indochina_Time/ICT|Indian/Christmas",
            "Krasnoyarsk_Time/KRAT|Indian/Christmas",
            "Thailand_Standard_Time/THA|Indian/Christmas",
            "Western_Indonesian_Time/WIT|Indian/Christmas",


            "Australian_Western_Standard_Time/AWST|Etc/GMT-8",
            "Brunei_Time/BDT|Etc/GMT-8",
            "Choibalsan_Standard_Time/CHOT|Etc/GMT-8",
            "Central_Indonesia_Time/CIT|Etc/GMT-8",
            "China_Standard_Time/CST|Etc/GMT-8",
            "China_time/CT|Etc/GMT-8",
            "Hong_Kong_Time/HKT|Etc/GMT-8",
            "Khovd_Summer_Time/HOVST|Etc/GMT-8",
            "Irkutsk_Time/IRKT|Etc/GMT-8",
            "Malaysia_Standard_Time/MST|Etc/GMT-8",
            "Malaysia_Time/MYT|Etc/GMT-8",
            "Philippine_Time/PHT|Etc/GMT-8",
            "Philippine_Standard_Time/PST|Etc/GMT-8",
            "Singapore_Time/SGT|Etc/GMT-8",
            "Singapore_Standard_Time/SST|Etc/GMT-8",
            "Ulaanbaatar_Standard_Time/ULAT|Etc/GMT-8",
            "Western_Standard_Time/WST|Etc/GMT-8",


            "Choibalsan_Summer_Time/CHOST|Pacific/Palau",
            "Eastern_Indonesian_Time/EIT|Pacific/Palau",
            "Japan_Standard_Time/JST|Pacific/Palau",
            "Korea_Standard_Time/KST|Pacific/Palau",
            "Timor_Leste_Time/TLT|Pacific/Palau",
            "Ulaanbaatar_Summer_Time/ULAST|Pacific/Palau",
            "Yakutsk_Time/YAKT|Pacific/Palau",

            "Australian_Eastern_Standard_Time/AEST|Pacific/Port_Moresby",
            "Chamorro_Standard_Time/CHST|Pacific/Port_Moresby",
            "Chuuk_Time/CHUT|Pacific/Port_Moresby",
            "Dumont_d'Urville_Time/DDUT|Pacific/Port_Moresby",
            "Eastern_Standard_Time_(Australia)/AEST|Pacific/Port_Moresby",
            "Papua_New_Guinea_Time/PGT|Pacific/Port_Moresby",
            "Vladivostok_Time/VLAT|Pacific/Port_Moresby",

            "Central_Summer_Time_(Australia)/ACDT|Australian_Central_Daylight_Savings_Time/ACDT",
            "Lord_Howe_Standard_Time/LHST|Australian_Central_Daylight_Savings_Time/ACDT",


            "Australian_Eastern_Daylight_Savings_Time/AEDT|Pacific/Pohnpei",
            "Bougainville_Standard_Time/BST|Pacific/Pohnpei",
            "Eastern_Summer_Time_(Australia)/AEDT|Pacific/Pohnpei",
            "Kosrae_Time/KOST|Pacific/Pohnpei",
            "Lord_Howe_Summer_Time/LHST|Pacific/Pohnpei",
            "Macquarie_Island_Station_Time/MIST|Pacific/Pohnpei",
            "New_Caledonia_Time/NCT|Pacific/Pohnpei",
            "Norfolk_Time/NFT|Pacific/Pohnpei",
            "Pohnpei_Standard_Time/PONT|Pacific/Pohnpei",
            "Sakhalin_Island_time/SAKT|Pacific/Pohnpei",
            "Solomon_Islands_Time/SBT|Pacific/Pohnpei",
            "Srednekolymsk_Time/SRET|Pacific/Pohnpei",
            "Vanuatu_Time/VUT|Pacific/Pohnpei",
            "Australia/Newcastle|Australia/Sydney",


            "Fiji_Time/FJT|Pacific/Tarawa",
            "Gilbert_Island_Time/GILT|Pacific/Tarawa",
            "Magadan_Time/MAGT|Pacific/Tarawa",
            "Marshall_Islands/MHT|Pacific/Tarawa",
            "New_Zealand_Standard_Time/NZST|Pacific/Tarawa",
            "Kamchatka_Time/PETT|Pacific/Tarawa",
            "Tuvalu_Time/TVT|Pacific/Tarawa",
            "Wake_Island_Time/WAKT|Pacific/Tarawa",


            "New_Zealand_Daylight_Time/NZDT|Etc/GMT-13",
            "Phoenix_Island_Time/PHOT|Etc/GMT-13",
            "Tokelau_Time/TKT|Etc/GMT-13",
            "Tonga_Time/TOT|Etc/GMT-13",


            "Line_Islands_Time/LINT|Etc/GMT-14",


            "Azores_Standard_Time/AZOT|Etc/GMT+1",
            "Cape_Verde_Time/CVT|Etc/GMT+1",
            "Eastern_Greenland_Time/EGT|Etc/GMT+1",


            "Brasilia_Summer_Time/BRST|Atlantic/South_Georgia",
            "Fernando_de_Noronha_Time/FNT|Atlantic/South_Georgia",
            "South_Georgia_and_the_South_Sandwich_Islands/GST|Atlantic/South_Georgia",
            "Saint_Pierre_and_Miquelon_Daylight_time/PMDT|Atlantic/South_Georgia",
            "Uruguay_Summer_Time/UYST|Atlantic/South_Georgia",


            "Atlantic_Daylight_Time/ADT|Etc/GMT+3",
            "Amazon_Summer_Time_(Brazil)/AMST|Etc/GMT+3",
            "Argentina_Time/ART|Etc/GMT+3",
            "Brasilia_Time/BRT|Etc/GMT+3",
            "Chile_Summer_Time/CLST|Etc/GMT+3",
            "Falkland_Islands_Summer_Time/FKST|Etc/GMT+3",
            "French_Guiana_Time/GFT|Etc/GMT+3",
            "Saint_Pierre_and_Miquelon_Standard_Time/PMST|Etc/GMT+3",
            "Paraguay_Summer_Time_(South_America)/PYST|Etc/GMT+3",
            "Rothera_Research_Station_Time/ROTT|Etc/GMT+3",
            "Suriname_Time/SRT|Etc/GMT+3",
            "Uruguay_Standard_Time/UYT|Etc/GMT+3",


            "Newfoundland_Time/NT|Newfoundland_Standard_Time/NST",


            "Amazon_Time_(Brazil)/AMT|Etc/GMT+4",
            "Atlantic_Standard_Time/AST|Etc/GMT+4",
            "Bolivia_Time/BOT|Etc/GMT+4",
            "Cuba_Daylight_Time/CDT|Etc/GMT+4",
            "Chile_Standard_Time/CLT|Etc/GMT+4",
            "Colombia_Summer_Time/COST|Etc/GMT+4",
            "Eastern_Caribbean_Time/ECT|Etc/GMT+4",
            "Eastern_Daylight_Time_(North_America)/EDT|Etc/GMT+4",
            "Falkland_Islands_Time/FKT|Etc/GMT+4",
            "Guyana_Time/GYT|Etc/GMT+4",
            "Paraguay_Time_(South_America)/PYT|Etc/GMT+4",
            "Venezuelan_Standard_Time/VET|Etc/GMT+4",


            "Acre_Time/ACT|Etc/GMT+5",
            "Central_Daylight_Time_(North_America)/CDT|Etc/GMT+5",
            "Colombia_Time/COT|Etc/GMT+5",
            "Cuba_Standard_Time/CST|Etc/GMT+5",
            "Easter_Island_Summer_Time/EASST|Etc/GMT+5",
            "Ecuador_Time/ECT|Etc/GMT+5",
            "Eastern_Standard_Time_(North_America)/EST|Etc/GMT+5",
            "Peru_Time/PET|Etc/GMT+5",


            "Central_Standard_Time_(North_America)/CST|Etc/GMT+6",
            "Easter_Island_Standard_Time/EAST|Etc/GMT+6",
            "Galapagos_Time/GALT|Etc/GMT+6",
            "Mountain_Daylight_Time_(North_America)/MDT|Etc/GMT+6",


            "Mountain_Standard_Time_(North_America)/MST|Etc/GMT+7",
            "Pacific_Daylight_Time_(North_America)/PDT|Etc/GMT+7",


            "Alaska_Daylight_Time/AKDT|Etc/GMT+8",
            "Clipperton_Island_Standard_Time/CIST|Etc/GMT+8",
            "Pacific_Standard_Time_(North_America)/PST|Etc/GMT+8",


            "Alaska_Standard_Time/AKST|Etc/GMT+9",
            "Gambier_Islands/GAMT|Etc/GMT+9",
            "Gambier_Island_Time/GIT|Etc/GMT+9",
            "Hawaii-Aleutian_Daylight_Time/HADT|Etc/GMT+9",


            "Marquesas_Islands_Time/MIT|Marquesas_Islands_Time/MART",


            "Cook_Island_Time/CKT|Etc/GMT+10",
            "Hawaii-Aleutian_Standard_Time/HAST|Etc/GMT+10",
            "Samoa_Daylight_Time/SDT|Etc/GMT+10",
            "Tahiti_Time/TAHT|Etc/GMT+10",


            "Niue_Time/NUT|Etc/GMT+11",
            "Samoa_Standard_Time/SST|Etc/GMT+11",


            "Baker_Island_Time/BIT|Etc/GMT+12",

            "Eastern_Time/ET|America/New_York",
            "Pacific_Time/PT|America/Los_Angeles",

            //Major Cities in Eastern Time Zone US
            'America/Akron|America/New_York',
            'America/Albany|America/New_York',
            'America/Annapolis|America/New_York',
            'America/Atlanta|America/New_York',
            'America/Augusta|America/New_York',
            'America/Baltimore|America/New_York',
            'America/Boston|America/New_York',
            'America/Buffalo|America/New_York',
            'America/Charleston|America/New_York',
            'America/Charlotte|America/New_York',
            'America,_South_Carolina/Columbia|America/New_York',
            'America,_New_Hampshire/Concord|America/New_York',
            'America/Cincinnati|America/New_York',
            'America/Cleveland|America/New_York',
            'America/District_of_Columbia|America/New_York',
            'America/Columbus|America/New_York',
            'America/Dover|America/New_York',
            'America/Fayetteville|America/New_York',
            'America/Frankfort|America/New_York',
            'Canada/Hamilton|America/New_York',
            'America/Harrisburg|America/New_York',
            'America/Hartford|America/New_York',
            'America/Jacksonville|America/New_York',
            'America/Jersey_City|America/New_York',
            'America/Kingston|America/New_York',
            'Canada/Kitchener|America/New_York',
            'America/Knoxville|America/New_York',
            'America/Lexington|America/New_York',
            'America/Lansing|America/New_York',
            'America/Miami|America/New_York',
            'America/Montpelier|America/New_York',
            'America/Newark|America/New_York',
            'America/Orlando|America/New_York',
            'Canada/Ottawa|America/New_York',
            'America/Fort_Lauderdale|America/New_York',
            'America/Greenville|America/New_York',
            'America/Philadelphia|America/New_York',
            'America/Pittsburgh|America/New_York',
            'America/Providence|America/New_York',
            'Canada/Quebec|America/New_York',
            'America/Raleigh|America/New_York',
            'America/Rochester|America/New_York',
            'America/Tampa|America/New_York',
            'America/Toledo|America/New_York',
            'America/Trenton|America/New_York',
            'America/Tallahassee|America/New_York',
            'America/Virginia_Beach|America/New_York',
            'Canada/Windsor|America/New_York',

            //Major Cities in Pacific Standard Zone US
            'America/Anaheim|America/Los_Angeles',
            'America/Burnaby|America/Los_Angeles',
            'America/Carson_City|America/Los_Angeles',
            'America/Fresno|America/Los_Angeles',
            'America/Las_Vegas|America/Los_Angeles',
            'America/Long_Beach|America/Los_Angeles',
            'America/Oakland|America/Los_Angeles',
            'America/Olympia|America/Los_Angeles',
            'America/Portland|America/Los_Angeles',
            'Canada/Richmond|America/Los_Angeles',
            'America/Riverside|America/Los_Angeles',
            'America/Sacramento|America/Los_Angeles',
            'America/San_Bernardino|America/Los_Angeles',
            'America/San_Diego|America/Los_Angeles',
            'America/San_Jose|America/Los_Angeles',
            'America,_Oregon/Salem|America/Los_Angeles',
            'America/Seattle|America/Los_Angeles',
            'America/Stockton|America/Los_Angeles',
            'America/Surrey|America/Los_Angeles',
            'America/Santa_Barbara|America/Los_Angeles',

            //Major Cities in Mountain Time Zone US
            "America/Albuquerque|America/Denver",
            "America/Billings|America/Denver",
            "America/Boise|America/Denver",
            "America/Calgary|America/Denver",
            "America/Cheyenne|America/Denver",
            "America/Helena|America/Denver",
            "America/El_Paso|America/Denver",
            "America/Rapid_City|America/Denver",
            "America/Salt_Lake_City|America/Denver",
            "America/Santa_Fe|America/Denver",

            //Major Cities in Central Time Zone US
            "America/Austin|America/Chicago",
            "America/Baton_Rouge|America/Chicago",
            "America/Birmingham|America/Chicago",
            "America/Bismarck|America/Chicago",
            "America/Dallas|America/Chicago",
            "America/Des_Moines|America/Chicago",
            "America/Fargo|America/Chicago",
            "America/Fort_Worth|America/Chicago",
            "America/Houston|America/Chicago",
            "America/Jackson|America/Chicago",
            "America/Jefferson_City|America/Chicago",
            "America/Kansas_City|America/Chicago",
            "America/Lincoln|America/Chicago",
            "America/Little_Rock|America/Chicago",
            "America/Madison|America/Chicago",
            "America/Memphis|America/Chicago",
            "America/Midland|America/Chicago",
            "America/Milwaukee|America/Chicago",
            "America/Minneapolis|America/Chicago",
            "America/St._Paul|America/Chicago",
            "America/Montgomery|America/Chicago",
            "America/Nashville|America/Chicago",
            "America/New_Orleans|America/Chicago",
            "America/Oklahoma_City|America/Chicago",
            "America/Omaha|America/Chicago",
            "America/Pensacola|America/Chicago",
            "America,_South_Dakota/Pierre|America/Chicago",
            "America/San_Antonio|America/Chicago",
            "America/Sioux_Falls|America/Chicago",
            "America/Springfield, Illinois|America/Chicago",
            "America/St._Louis|America/Chicago",
            "America/Tulsa|America/Chicago",
            "America/Topeka|America/Chicago",
            "America/Wichita|America/Chicago",

            "America/Tucson|Etc/GMT+7",
            "America/Scottsdale|Etc/GMT+7",
            "America/Phoenix|Etc/GMT+7",
            "Canada/Saskatoon|Etc/GMT+6",
            "Europe/Belgrade|Europe/Split",
            "Europe/Belgrade|Europe/Nice",
            "Europe/Belgrade|Europe/Oslo",
            "Europe/Belgrade|Europe/Gothenburg",
            "America/Juneau|US/Alaska"

        ];

        link_array = link_array.concat(india_cities);
        link_array = link_array.concat(australia_cities);

        moment.tz.link(link_array);
    }

    extendCities();

    return {

        renderDefaults: function () {

            var local = moment.tz.guess(),
                defaultArray = [];

            if (local !== 'America/San_Francisco' && local !== 'America/New_York' && local !== 'Europe/London' && local !== 'Asia/Tokyo') {
                defaultArray.push(local);
            }

            defaultArray.push('America/San_Francisco');
            defaultArray.push('America/New_York');
            defaultArray.push('Europe/London');
            defaultArray.push('Asia/Tokyo');

            return defaultArray;

        }
    }
};

module.exports = timeService;