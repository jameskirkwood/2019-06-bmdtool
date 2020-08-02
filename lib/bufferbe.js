module.exports = class {
  constructor(buffer) { this.buffer = buffer; }
  readUInt32(offset) { return this.buffer.readUInt32BE(offset); }
  readUInt16(offset) { return this.buffer.readUInt16BE(offset); }
  readUInt8(offset) { return this.buffer.readUInt8(offset); }
  slice(start, end) { return this.buffer.slice(start, end); }
}
