class ApiFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search(searchFields) {
    if (this.queryString.search) {
      const felids = searchFields.split(",");
      const searchValue = this.queryString.search;

      const OrArray = felids.map((felid) => ({
        [felid]: { $regex: searchValue, $options: "i" },
      }));

      this.query.or(OrArray);
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["search"];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.query = this.query.find(queryObj);
    return this;
  }
}

module.exports = ApiFeature;
