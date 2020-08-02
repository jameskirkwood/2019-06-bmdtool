module.exports = class extends require('./base') {

  readPacketCount() { return this.readUInt32(12); }
  readVertexCount() { return this.readUInt32(16); }
  readGraphOffset() { return this.readUInt32(20); }

  unpackGraphAt(offset) {
    const nodes = [];
    for (; this.readUInt16(offset) & ~2; offset += 4) {
      const type = this.readUInt16(offset);
      if (type & 16) {
        let node = {
          type: ['JNT', 'MAT', 'SHP'][type - 16] || type,
          id: this.readUInt16(offset + 2)
        };
        if (this.readUInt16(offset + 4) == 1) {
          [node.children, offset] = this.unpackGraphAt(offset + 8);
        }
        nodes.push(node);
      }
    }
    return [nodes, offset];
  }

  unpackGraph() { return this.unpackGraphAt(this.readGraphOffset())[0]; }

  unpack() {
    return {
      packets: this.readPacketCount(),
      vertices: this.readVertexCount(),
      graph: this.unpackGraph()
    }
  }
}
