module.exports = class extends require('../../bufferbe') {

  readMagic() { return this.slice(0, 4).toString(); }
  readSize() { return this.readUInt32(4); }

  unpack() {
    return {
      magic: this.readMagic(),
      size: this.readSize()
    };
  }
};
