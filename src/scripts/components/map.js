import '../helpers/jquery';
import vMap from 'jvectormap-next/jquery-jvectormap';
import mapRegions from './mapSVG.json';
import mapValues from './mapRegions.json';

export default class Map {
  constructor($element) {
    this.$element = $element;
  }

  init() {
    vMap(jQuery);

    jQuery.fn.vectorMap('addMap', 'world_mill', {
      "insets": [{
        "width": 900,
        "top": 0,
        "height": 440.7063107441331,
        "bbox": [{"y": -12671671.123330014, "x": -20004297.151525836}, {
          "y": 6930392.025135122,
          "x": 20026572.394749384
        }],
        "left": 0
      }],
      "paths": mapRegions,
      "height": 440.7063107441331,
      "projection": {"type": "mill", "centralMeridian": 11.5},
      "width": 900.0
    });

    this.$element.each(function () {
      $(this).vectorMap({
        map: "world_mill",
        backgroundColor: "transparent",
        zoomOnScroll: !1,
        regionStyle: {
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": .9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          }
        },
        series: {
          regions: [
            {
              "values": mapValues,
              "scale": [
                "#ff0000",
                "#ffc100"
              ],
              "normalizeFunction": "polynomial"
            }
          ]
        }
      });
    });
  }
}
