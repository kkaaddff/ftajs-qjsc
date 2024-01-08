import test from 'ava'
import { qjsc } from '../index.js'

test('Qjsc from native', (t) => {
  t.is(qjsc.version, '2021-03-27')
})
