module.exports = class extends require('./base') {

  readVertexBuffer(index) {
    return this.slice(this.readUInt32(12 + (index << 2)));
  }

  unpack() {
    const arrays = [];
    const offset = this.readUInt32(8);
    for (let i = 0; this.readUInt32(offset + 16 * i) != 0xff; i++) {
      const format = new VertexFormat(this.slice(offset + 16 * i));
      arrays.push({
        format: format.unpack(),
        buffer: format.unpackBuffer(this.readVertexBuffer(i))
      });
    }
    return arrays;
  }
}

class VertexFormat extends require('../../bufferbe') {
  readArrayType() { return this.readUInt32(0); }
  readComponentCount() { return this.readUInt32(4); }
  readDataType() { return this.readUInt32(8); }
  readMantissaBits() { return this.readUInt8(12); }
  nameArrayType() { return ARRAYTYPES[this.readArrayType()]; }
  nameDataType() {
    // according to http://wiki.tockdom.com/wiki/BMD_and_BDL_(File_Format) :
    // return DATATYPES[this.readComponentCount()][this.readDataType()];
    // according to https://wiki.cloudmodding.com/tww/BMD_and_BDL#Vertex_Attributes_.28VTX1.29 :
    const at = this.readArrayType();
    return DATATYPES[(at == 11 || at == 12) ? 1 : 0][this.readDataType()];
  }
  unpack() {
    return {
      attribute: this.nameArrayType(),
      component_count: this.readComponentCount(),
      type: this.nameDataType(),
      mantissa_bits: this.readMantissaBits()
    }
  }
  unpackBuffer(buffer) {
    return buffer;
  }
}

ARRAYTYPES = [
  'POSITION_MATRIX_INDEX',
  'TEX0_MATRIX_INDEX', 'TEX1_MATRIX_INDEX',
  'TEX2_MATRIX_INDEX', 'TEX3_MATRIX_INDEX',
  'TEX4_MATRIX_INDEX', 'TEX5_MATRIX_INDEX',
  'TEX6_MATRIX_INDEX', 'TEX7_MATRIX_INDEX',
  'POSITION',
  'NORMAL',
  'COLOR0', 'COLOR1',
  'TEX0', 'TEX1', 'TEX2', 'TEX3', 'TEX4', 'TEX5', 'TEX6', 'TEX7',
  'POSITION_MATRIX_ARRAY',
  'NORMAL_MATRIX_ARRAY',
  'TEXTURE_MATRIX_ARRAY',
  'LIT_MATRIX_ARRAY',
  'NORMAL_BINORMAL_TANGENT'
];

DATATYPES = [
  ['U8', 'S8', 'U16', 'S16', 'F32'],
  ['RGB565', 'RGB8', 'RGBX8', 'RGBA4', 'RGBA6', 'RGBA8']
];

//https://github.com/comex/libogc/blob/master/gc/ogc/gx.h
// #define GX_POS_XY			0
// #define GX_POS_XYZ			1
// #define GX_NRM_XYZ			0
// #define GX_NRM_NBT			1
// #define GX_NRM_NBT3			2
// #define GX_CLR_RGB			0
// #define GX_CLR_RGBA			1
// #define GX_TEX_S			0
// #define GX_TEX_ST	1