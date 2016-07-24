#!/usr/bin/env node
var data
if (process.stdin.isTTY) {
} else {
	data = ''
	process.stdin.setEncoding('utf-8')
	process.stdin.on('readable', function () {
		var chunk
		while (chunk = process.stdin.read()) {
			data += chunk
		}
	})
	process.stdin.on('end', function () {
		data = data.replace(/\n$/, '')
		require('../')(data, function (err, result) {
			if (err) {
				throw err
			} else {
				process.stdout.write(result)
			}
		})
	})
}
