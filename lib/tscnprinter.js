module.exports = class {

  constructor(emit) {
    this.emit = emit;
  }
  
  resource(type, attrs, items) {
    this.emit(`[${type} ${Object.keys(attrs).map(
      key => `${key}=${attrs[key]}`
    ).join(' ')}]`);
    for (key in Object.keys(items)) {
      this.emit(`${key}=${items[key]}`);
    }
  }

  ext_resource() {}
  sub_resource() {}
  node(type, name, parent) {
    attrs = {type: type, name: name};
    if (parent) attrs.parent = parent;
    this.resource('node', attrs, {})
  }

  J3D(model) {
    this.resource('gd_scene', {load_steps: 1, format: 2}, {});
  }
}
