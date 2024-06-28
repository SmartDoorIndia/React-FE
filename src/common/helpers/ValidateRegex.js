/** @format */

const validateRegex = {
  alphaOnly: '^[a-zA-Z .]*$', // alphabet space and dot
  // alphaOnly: '^[a-zA-Z ]*$',// alphabet and space
  // alphaOnly: '/^[A-Za-z\\s]+$/',
  // passwordPattern:
  //   '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#])[A-Za-z\\d$@$!%*?&#]{8,20}/',

  // passwordPattern:
  //   '/^(?=\\S*[a-z])(?=\\S*[A-Z])(?=\\S*\\d)(?=\\S*[^\\w\\s])\\S{8,}$/',
  passwordPattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
  passwordSpaceRemove: '^[ A-Za-z0-9()[]+-*/%]*$',
  numberOnly: '^[0-9]*$',
  validUrl:
      '((http|ftp|https)://)?(www.)?([w_-]+(?:(?:.[w_-]+)+))([w.,@?^=%&:/~+#-]*[w@?^=%&/~+#-])?',
  newValidUrl: '//,',
  googleDocUrl: ' /([w-_]{15,})\\/(.*?gid=(d+))?',
  validateLinkURL:
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,

  validateEmail:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/,
  validatePAN: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
};

export default validateRegex;
