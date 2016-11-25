'use strict'

var xml2js = require('xml2js')
var parseMs = require('parse-ms')
var leftPad = require('left-pad')

function _parseFormat3 (p, cb) {
  var s = ''

  for (var i = 0; i < p.length; ++i) {
    var t = parseInt(p[i].$.t, 10)
    var d = parseInt(p[i].$.d, 10)
    d = parseMs(t + d)
    t = parseMs(t)

    var startTime = [t.hours, t.minutes, t.seconds]
    var endTime = [d.hours, d.minutes, d.seconds]

    for (var j = 0; j < 3; ++j) {
      startTime[j] = leftPad(startTime[j], 2, 0)
      endTime[j] = leftPad(endTime[j], 2, 0)
    }

    startTime = startTime.join(':')
    endTime = endTime.join(':')

    startTime += (',' + t.milliseconds)
    endTime += (',' + d.milliseconds)

    var time = [startTime, '-->', endTime].join(' ')
    s += [i, time, p[i]._, '\n'].join('\n')
  }

  return s
}

function parseFormat3 (p, cb) {
  try {
    var s = _parseFormat3(p, cb)
  } catch (e) {
    return cb(e)
  }
  cb(null, s)
}

module.exports = function (timedText, cb) {
  xml2js.parseString(timedText, function (err, result) {
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
          '`' + timedtext.$.format + '`.'
        ].join(' ')))
    }
  })
}
