'use strict';
/**
 * @file autokey test
 * @module autokey
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
var autokey = require('..');
var assert = require('assert');

/*
 * test module
 */
describe('autokey', function() {

  var a; // key
  var b; // data

  it('string - should return same string', function(done) {

    a = 'pippo';
    b = 'ciao';
    var cipher = autokey(a);
    var d = cipher.encodeString(b); // encrypt
    var e = cipher.decodeString(d); // decrypt
    assert.deepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');

    var cipher = autokey(a, true);
    var dd = cipher.encodeString(b); // encrypt
    var ee = cipher.decodeString(dd); // decrypt
    assert.deepEqual(b, ee, 'lodash');
    assert.notDeepEqual(b, dd, 'orig - encrypt');
    assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

    // assert.deepEqual(d, dd, 'encrypt');
    assert.deepEqual(e, ee, 'decrypt');
    done();
  });

  it('array - should return same array', function(done) {

    a = [ 112, 105, 112, 112, 111 ];
    b = [ 99, 105, 97, 111 ];
    var cipher = autokey(a);
    var d = cipher.encodeArray(b); // encrypt
    var e = cipher.decodeArray(d); // decrypt
    assert.deepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');

    var cipher = autokey(a, true);
    var dd = cipher.encodeArray(b); // encrypt
    var ee = cipher.decodeArray(dd); // decrypt
    assert.deepEqual(b, ee, 'lodash');
    assert.notDeepEqual(b, dd, 'orig - encrypt');
    assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

    assert.deepEqual(d, dd, 'encrypt');
    assert.deepEqual(e, ee, 'decrypt');
    done();
  });

  it('buffer - should return same buffer', function(done) {

    a = new Buffer('pippo');
    b = new Buffer('ciao');
    var cipher = autokey(a);
    var d = cipher.encodeBuffer(b); // encrypt
    var e = cipher.decodeBuffer(d); // decrypt
    assert.deepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');

    var cipher = autokey(a, true);
    var dd = cipher.encodeBuffer(b); // encrypt
    var ee = cipher.decodeBuffer(dd); // decrypt
    assert.deepEqual(b, ee, 'lodash');
    assert.notDeepEqual(b, dd, 'orig - encrypt');
    assert.notDeepEqual(ee, dd, 'encrypt - decrypt');

    assert.deepEqual(d, dd, 'encrypt');
    assert.deepEqual(e, ee, 'decrypt');
    done();
  });

  it('wrong - change key', function(done) {

    a = 'pippo';
    b = 'ciao';
    var cipher = autokey(a);
    var d = cipher.encodeString(b); // encrypt
    cipher.change('pluto'); // change key
    var e = cipher.decodeString(d); // decrypt
    assert.notDeepEqual(b, e, 'clear');
    assert.notDeepEqual(b, d, 'orig - encrypt');
    assert.notDeepEqual(e, d, 'encrypt - decrypt');
    done();
  });

  it('file - should read encrypted file', function(done) {

    var fs = require('fs');
    a = 'hex7c0';
    b = new Buffer('ciao I\'m hex7c0\nHow are you?\n:D');
    var cipher = autokey(a);

    var d = cipher.encodeBuffer(b); // encrypt
    // use {encoding: null} when you write buffer
    fs.writeFile('crypted', d, {
      encoding: null
    }, function(err) {

      if (err) return done(err);
      // use {encoding: null} when you read buffer
      fs.readFile('crypted', {
        encoding: null
      }, function(err, data) {

        if (err) return done(err);
        var e = cipher.decodeBuffer(data); // decrypt
        assert.deepEqual(b, e, 'clear');
        assert.notDeepEqual(b, d, 'orig - encrypt');
        assert.notDeepEqual(e, d, 'encrypt - decrypt');
        fs.unlink('crypted', function() {

          done();
        });
      });
    });
  });
});
