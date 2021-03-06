//= require geoblacklight/viewers/viewer

GeoBlacklight.Viewer.Map = GeoBlacklight.Viewer.extend({
  
  options: {
    /**
    * Initial bounds of map
    * @type {L.LatLngBounds}
    */
    //bbox: [[-80, -180], [80, 180]]
    //-152.578125 -49.61071 36.210938 73.726595
    bbox: [[0.73970, -161.20524], [64.68346, -42.43180]]
  },
  
  overlay: L.layerGroup(),

  load: function() {
    if (this.data.mapBbox) {
      this.options.bbox = L.bboxToBounds(this.data.mapBbox);
    }
    this.map = L.map(this.element).fitBounds(this.options.bbox);
    this.map.addLayer(this.selectBasemap());
    this.map.addLayer(this.overlay);

    // Add layer controller of basemaps array
    L.control.layers(GeoBlacklight.Basemaps, null).addTo(this.map);

    if (this.data.map !== 'index') {
      this.addBoundsOverlay(this.options.bbox);
    }
  },

  /**
   * Add a bounding box overlay to map.
   * @param {L.LatLngBounds} bounds Leaflet LatLngBounds
   */
  addBoundsOverlay: function(bounds) {
    if (bounds instanceof L.LatLngBounds) {
      this.overlay.addLayer(L.polygon([
        bounds.getSouthWest(),
        bounds.getSouthEast(),
        bounds.getNorthEast(),
        bounds.getNorthWest()
      ]));
    }
  },

  /**
   * Remove bounding box overlay from map.
   */
  removeBoundsOverlay: function() {
    this.overlay.clearLayers();
  },

  /**
  * Selects basemap if specified in data options, if not return mapquest
  */
  selectBasemap: function() {
    var _this = this;
    if (_this.data.basemap) {
      return GeoBlacklight.Basemaps[_this.data.basemap];
    } else {
      return _this.basemap.mapquest;
    }
  }
});

