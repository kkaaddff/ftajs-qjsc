import test from 'ava'
import { qjsc, qjsc3 } from '../index.js'

test('Qjsc from native', (t) => {
  t.is(qjsc.version, '2020-07-05')
  t.is(qjsc3.version, '2021-03-27')
})
