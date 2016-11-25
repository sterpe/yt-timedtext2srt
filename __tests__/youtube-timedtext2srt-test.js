/* eslint-env jest */

var FILE = '..'
var TIMED_TEXT = './__tests__/RWBY-Vol1-Episode-1.xml'
var SRT = './__tests__/RWBY-Vol1-Episode-1.srt'

jest.autoMockOff()

describe([
  'youtube-timedtext2srt'
].join(' '), function () {
  it([
    'should convert timedtext to srt'
  ].join(' '), function (done) {
    var fs = require('fs')
    var timedtext = fs.readFileSync(TIMED_TEXT)
      .toString()
    var srt = fs.readFileSync(SRT)
      .toString()
    var ƒ = require(FILE)

    ƒ(timedtext, function (err, s) {
      expect(err).toBe(null)
      expect(s).toEqual(srt)
      done()
    })
  })
})
