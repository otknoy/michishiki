var QueryOptionBuilder = function() {
    this.options = {};
};

QueryOptionBuilder.prototype.setMapBounds = function(lat1, lng1, lat2, lng2) {
    this.options['lat1'] = lat1;
    this.options['lng1'] = lng1;
    this.options['lat2'] = lat2;
    this.options['lng2'] = lng2;
    return this;
};

QueryOptionBuilder.prototype.setOrderBy = function(order_by, order) {
    this.options['order_by'] = order_by;
    this.options['order'] = order;
    return this;
};

QueryOptionBuilder.prototype.setLimit = function(limit) {
    this.options['limit'] = limit;
    return this;
};

QueryOptionBuilder.prototype.build = function() {
    return this.options;
};
