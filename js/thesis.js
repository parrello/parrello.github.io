/* Based on the code for isitchristmas.com. Check https://github.com/isitchristmas */

var ThesisDeadline = {
  time: {
    year: 2015,
    month: 5,
    date: 23
  },

  stillTime: function(date) {
    if (!date) date = new Date();
    return !(date.getYear() == ThesisDeadline.time.year && date.getMonth() == ThesisDeadline.time.month && date.getDate() == ThesisDeadline.time.date);
  },

  answer: function(countryCode, date) {
    if (ThesisDeadline.isIt(date))
      return "NO"
    else
      return "YES";
  },

  yes: function() {
    return "YES";
  },

  no: function() {
    return "NO";
  }
};

if (typeof(window) !== "undefined") {
  window.ThesisDeadline = ThesisDeadline;
}
