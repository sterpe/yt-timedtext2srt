var xml2js = require('xml2js')
var parseMs = require('parse-ms')
var leftPad = require('left-pad')

module.exports = function (timedTextXML, cb) {
  xml2js.parseString(timedTextXML, function (err, result) {
    if (err) {
      return cb(err)
    }
    var timedtext = result.timedtext
    switch (timedtext.$.format) {
      case '3':
        parseFormat3(timedtext.body[0].p, cb)
        break
      default:
        cb(new Error([
          'Unknown timedtext format',
          '`' + timedText.$.format + '`.'
        ].join(' ')))
    }
  })
}
function mergeS(s) {
  if (s) {
    return s.map(function(it) {
      return it._
    }).join('')
  }
  else {
    return ''
  }
}
function parseFormat3(p, cb) {
  var s = ''
  try {
    for (var i = 0; i < p.length; ++i) {
      var t = parseInt(p[i].$.t, 10)
      var d = parseInt(p[i].$.d, 10)
      d = parseMs(t + d)
      t = parseMs(t)
      var startTime = [
        leftPad(t.hours, 2, 0),
        leftPad(t.minutes, 2, 0),
        leftPad(t.seconds, 2, 0)
      ].join(':') + ',' + t.milliseconds
      var endTime = [
        leftPad(d.hours, 2, 0),
        leftPad(d.minutes, 2, 0),
        leftPad(d.seconds, 2, 0)
      ].join(':') + ',' + d.milliseconds
      var subtitle = [
        i,
        [
          startTime,
          '-->',
          endTime
        ].join(' '),
        p[i]._? p[i]._: mergeS(p[i].s),
        '\n'
      ].join('\n')
      s += subtitle
    }
  } catch (e) {
    return cb(e)
  }
  cb(null, s)
}
