const SectionBase = require('./section/base');

module.exports = function(buffer) {
  const section = new SectionBase(buffer);
  if (!SECTIONS.hasOwnProperty(section.readMagic())) return section;
  return new SECTIONS[section.readMagic()](section.buffer);
}

const SECTIONS = {
  INF1: require('./section/inf1'),
  VTX1: require('./section/vtx1'),
  EVP1: require('./section/evp1'),
  DRW1: require('./section/drw1'),
  JNT1: require('./section/jnt1'),
  SHP1: require('./section/shp1'),
  MAT3: require('./section/mat3'),
  MDL3: require('./section/mdl3'),
  TEX1: require('./section/tex1')
}
