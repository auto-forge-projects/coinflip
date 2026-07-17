'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { flip, handler } = require('../src/server.js');

test('flip yalnız Yazı veya Tura döner', () => {
  for (let i = 0; i < 50; i++) assert.ok(['Yazı', 'Tura'].includes(flip()));
});

test('/health → ok', () => {
  let code, body = '';
  const res = { writeHead: (c) => { code = c; }, end: (b) => { body = b || ''; } };
  handler({ url: '/health' }, res);
  assert.equal(code, 200);
  assert.equal(body, 'ok');
});

test('/flip → geçerli JSON sonuç', () => {
  let body = '';
  const res = { writeHead: () => {}, end: (b) => { body = b; } };
  handler({ url: '/flip' }, res);
  assert.ok(['Yazı', 'Tura'].includes(JSON.parse(body).result));
});
