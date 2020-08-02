const readSection = require('./jstudiomodel/readsection');

module.exports = class extends require('./bufferbe') {

  readMagic() { return this.slice(0, 8).toString(); }
  readSize() { return this.readUInt32(8); }
  readSectionCount() { return this.readUInt32(12); }

  get sections() {
    const sections = [];
    for (let offset = 0x20, i = 0; i < this.readSectionCount(); i++) {
      const section = readSection(this.slice(offset));
      sections.push(section);
      offset += section.readSize();
    }
    return sections;
  }

  unpack() {
    const sections = {}
    this.sections.forEach(s => {
      sections[s.readMagic()] = s.unpack();
    });
    return {
      magic: this.readMagic(),
      data: sections
    };
  }
}
