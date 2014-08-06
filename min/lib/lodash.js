/*
 * autokey v1.3.0
 * (c) hex7c0 http://supergiovane.tk/#/autokey
 * Licensed under GPLv3
 */
"use strict";function body(a,b,c){var a=new Buffer(a),d=_.size(b),e=d;if(c){for(var f=[],g=0,h=_.size(a);h>g;g++)f[g]=e-->0?(a[g]-b.shift())%256:(a[g]-f[g-d])%256;return new Buffer(f)}return new Buffer(_.map(a,function(c,f){return e-->0?(c+b.shift())%256:(c+a[f-d])%256}))}function AUTOKEY(a){this.key=this.change(a)}try{var _=require("lodash")}catch(MODULE_NOT_FOUND){console.error(MODULE_NOT_FOUND),process.exit(1)}module.exports=function(a){return new AUTOKEY(a)},AUTOKEY.prototype.change=function(a){if(_.isString(a)||Buffer.isBuffer(a))return _.map(new Buffer(a),function(a){return a});if(_.isArray(a))return a;throw new Error("Invalid data")},AUTOKEY.prototype.encodeString=function(a){return body(a,this.key.slice(0))},AUTOKEY.prototype.encodeArray=function(a){return _.map(body(a,this.key.slice(0)),function(a){return a})},AUTOKEY.prototype.encodeBuffer=function(a){return body(a,this.key.slice(0))},AUTOKEY.prototype.encode=function(a){if(_.isString(a))return this.encodeString(a);if(_.isArray(a))return this.encodeArray(a);if(Buffer.isBuffer(a))return this.encodeBuffer(a);throw new Error("Invalid data")},AUTOKEY.prototype.decodeString=function(a){return body(a,this.key.slice(0),!0).toString()},AUTOKEY.prototype.decodeArray=function(a){return _.map(body(a,this.key.slice(0),!0),function(a){return a})},AUTOKEY.prototype.decodeBuffer=function(a){return body(a,this.key.slice(0),!0)},AUTOKEY.prototype.decode=function(a){if(_.isString(a))return this.decodeString(a);if(_.isArray(a))return this.decodeArray(a);if(Buffer.isBuffer(a))return this.decodeBuffer(a);throw new Error("Invalid data")};
