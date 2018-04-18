class MapperIterator {
  constructor(mapper) {
    this.mapper = mapper;
    this.index = -1;
  }

  current() {
    return this.mapper[this.index];
  }

  next() {
    ++this.index;
    return this.current();
  }
}
