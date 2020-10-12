'use strict'

const t = (module.exports = require('../tester').createServiceTester())

t.create('Localazy translation progress')
  .get('/floating-apps.json')
  .intercept(nock =>
    nock('https://connect.localazy.com')
      .get('/status/floating-apps/data')
      .query({ title: 'translated', content: 'progress' })
      .reply(200, {
        schemaVersion: 1,
        label: 'translated',
        message: '61%',
        color: '#066fef',
        style: 'flat',
        cacheSeconds: 3600,
      })
  )
  .expectBadge({
    label: 'translated',
    message: '61%',
    color: '#066fef',
  })
