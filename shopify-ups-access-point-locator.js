(function($) {
  'use strict';

  /**
   * DOM Ready
   */
  $(function() {
    $('.js-ups-access-point-locator').upsAccessPointsLocator('A3607Y');
  });

}(jQuery));


(function($) {
  var pluginName = 'upsAccessPointsLocator';


  /**
   * UPS Access Points Locator
   */
  function UpsAccessPointsLocator($element, uac) {
    this.$element     = $element;
    this.$link        = null;
    this.uac          = uac;
    this.upsLocation  = {};

    if ( typeof uac === 'undefined' ) {
      console.warn('UPS Access Points Locator: Invalid uac');
      return;
    }

    this.init();
  }


  /**
   * Initialize instance
   *
   * @return {UpsAccessPointLocator}
   */
  UpsAccessPointsLocator.prototype.init = function() {
    this.appendLink();
    this.checkParams();

    console.log(this.$link);
    this.$link.on('click', $.proxy(this.open, this));

    return this;
  };


  /**
   * Append link
   */
  UpsAccessPointsLocator.prototype.appendLink = function() {
    var $html = $('<div class="fieldset"><div class="field"><label>Choose a UPS Access Point</label><a href="" class="btn-ups-access-point">Use a UPS Access Point as shipping address</a></div></div>');

    this.$link = $html.find('.btn-ups-access-point');

    $html.insertBefore('#checkout #shipping-address');
  };


  UpsAccessPointsLocator.prototype.checkParams = function() {
    this.upsLocation.name         = this.getParam('name');
    this.upsLocation.addLine1     = this.getParam('addLine1');
    this.upsLocation.city         = this.getParam('city');
    this.upsLocation.countryCode  = this.getParam('country');
    this.upsLocation.postal       = this.getParam('postal');
    this.upsLocation.imageUrl     = this.getParam('imageUrl');

    if ( this.upsLocation.name ) {
      this.fillInFields();
    }
  };


  UpsAccessPointsLocator.prototype.fillInFields = function() {
    $('#checkout_shipping_address_company').val( '[UPS Access Point] ' + this.upsLocation.name );
    $('#checkout_shipping_address_address1').val( this.upsLocation.addLine1 );
    $('#checkout_shipping_address_city').val( this.upsLocation.city );
    $('#checkout_shipping_address_zip').val( this.upsLocation.postal );
    $('#checkout_shipping_address_country option[value="' + countries[this.upsLocation.countryCode] + '"]').prop('selected', true);
  };


  /**
   * Get param out of current URL
   * @param  {[type]} param [description]
   * @return {[type]}       [description]
   */
  UpsAccessPointsLocator.prototype.getParam = function(param) {
    var currentUrl = window.location.search.substring(1),
        params     = currentUrl.split('&'),
        result     = null;

    for (var i = 0; i < params.length; i++) {
      var checkParam = params[i].split('=');

      if (checkParam[0] == param) {
        result = decodeURIComponent( checkParam[1] );
        break;
      }
    }

    return result;
  };


  /**
   * Build UPS locator URL based on several parameters
   *
   * Example URL
   * https://www.ups.com/lsw/invoke?uac=A3607Y&cburl=URL&oId=1&postal=2000&country=BE&loc=nl_BE
   *
   * @return {String}
   */
  UpsAccessPointsLocator.prototype.getUpsUrl = function() {
    var url         = 'https://www.ups.com/lsw/invoke?oId=1&loc=en_US',
        $country    = $('#checkout_shipping_address_country'),
        $zip        = $('#checkout_shipping_address_zip'),
        countryCode = '',
        zip         = '';

    // Add UPS Account ID
    url += '&uac=' + this.uac;

    // Add callback URL
    url += '&cburl=' + encodeURIComponent(window.location.href + '&');

    // Check country field
    if ( $country.length ) {
      country = $country.val();

      $.map(countries, function(value, key){
        if (value == country) {
          countryCode = key;
        }
      });

      url += '&country=' + countryCode;
    }

    // Check ZIP field
    if ( $zip.length ) {
      zip = $zip.val();

      url += '&postal=' + zip;
    }

    return url;
  };


  UpsAccessPointsLocator.prototype.open = function(e) {
    window.location = this.getUpsUrl();

    e.preventDefault();
  };


  /**
   * jQuery plugin
   *
   * @return {jQuery Nodelist}
   */
  $.fn.upsAccessPointsLocator = function(uac) {
    return this.each(function() {
      var $this    = $(this),
          instance = $this.data(pluginName);

      if ( typeof instance === 'undefined' ) {
        $this.data( pluginName, new UpsAccessPointsLocator($this, uac) );
      }
    });
  };


  var countries = {
    "AF": "Afghanistan",
    "AX": "Ãƒâ€¦land Islands",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "AndorrA",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BV": "Bouvet Island",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "BN": "Brunei Darussalam",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CG": "Congo",
    "CD": "Congo, Democratic Republic",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Cote D\"Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FK": "Falkland Islands (Malvinas)",
    "FO": "Faroe Islands",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "TF": "French Southern Territories",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GG": "Guernsey",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HM": "Heard Island and Mcdonald Islands",
    "VA": "Holy See (Vatican City State)",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IM": "Isle of Man",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JE": "Jersey",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KP": "Korea (North)",
    "KR": "Korea (South)",
    "XK": "Kosovo",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Laos",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libyan Arab Jamahiriya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MK": "Macedonia",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "MS": "Montserrat",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "AN": "Netherlands Antilles",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestinian Territory, Occupied",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PN": "Pitcairn",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Reunion",
    "RO": "Romania",
    "RU": "Russian Federation",
    "RW": "Rwanda",
    "SH": "Saint Helena",
    "KN": "Saint Kitts and Nevis",
    "LC": "Saint Lucia",
    "PM": "Saint Pierre and Miquelon",
    "VC": "Saint Vincent and the Grenadines",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "Sao Tome and Principe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "ME": "Montenegro",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "GS": "South Georgia and the South Sandwich Islands",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SJ": "Svalbard and Jan Mayen",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syrian Arab Republic",
    "TW": "Taiwan, Province of China",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TK": "Tokelau",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TC": "Turks and Caicos Islands",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UM": "United States Minor Outlying Islands",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Viet Nam",
    "VG": "Virgin Islands, British",
    "VI": "Virgin Islands, U.S.",
    "WF": "Wallis and Futuna",
    "EH": "Western Sahara",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
  };

}(jQuery));
