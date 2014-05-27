(function() {
  'use strict';
  var changeFeature, featureLayer, features, geoJson, loadData, map, mapa;

  require.config({
    shim: {
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      }
    },
    paths: {
      jquery: '../bower_components/jquery/dist/jquery',
      backbone: '../bower_components/backbone/backbone',
      underscore: '../bower_components/underscore/underscore',
      bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
  });

  require(['backbone'], function(Backbone) {
    return Backbone.history.start();
  });

  mapa = {
    init: function() {
      console.log('Cargando mapa inicial...');
      return L.mapbox.map('map', 'examples.map-i86nkdio').setView([0, 0], 2);
    },
    loadPoint: function() {
      return L.mapbox.featureLayer().addTo(map);
    }
  };

  features = {
    all: [
      {
        type: 'Feature',
        properties: {
          'title': 'Indonesia',
          'country': 'Indonesia',
          'region': 'Asia',
          'description': 'Misool Eco Resort',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/02-indonesia-misool_66861_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [116.3671875, -2.811371193331128]
        }
      }, {
        type: 'Feature',
        properties: {
          'title': 'Peru',
          'country': 'Peru',
          'region': 'America',
          'description': 'Inkaterra Reserva Amazónica',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/03-inkaterra_66862_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [-74.8828125, -12.554563528593656]
        }
      }, {
        type: 'Feature',
        properties: {
          'title': 'Australia',
          'country': 'Australia',
          'region': 'Australia',
          'description': 'Great Ocean Ecolodgea',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/04-australia-wallaby_66863_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [137.4609375, -22.91792293614603]
        }
      }, {
        type: 'Feature',
        properties: {
          'title': 'Grecce',
          'country': 'Grecce',
          'region': 'Europe',
          'description': 'Milia Mountain Retreat',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/05-greece-retreat_66864_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [21.796875, 38.272688535980976]
        }
      }, {
        type: 'Feature',
        properties: {
          'title': 'South Africa',
          'country': 'South Africa',
          'region': 'Africa',
          'description': 'Bushmans Kloof Wilderness Reserve',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/01-south-africa-bushmans-kloof_66860_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [23.90625, -28.613459424004414]
        }
      }, {
        type: 'Feature',
        properties: {
          'title': 'Nicaragua',
          'country': 'Nicaragua',
          'region': 'America',
          'description': 'Jicaro Island Ecolodge',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/06-jicaro-nicaragua_66865_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [-85.078125, 12.21118019150401]
        }
      }, {
        type: 'Feature',
        properties: {
          'title': 'China',
          'country': 'China',
          'region': 'Asia',
          'description': 'Yangshuo Mountain Retreat',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/07-china-yangshuo_66866_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [118.30078125, 26.902476886279807]
        }
      }, {
        type: 'Feature',
        properties: {
          'title': 'Sri Lanka',
          'country': 'Sri Lanka',
          'region': 'Asia',
          'description': 'Jetwing Vil Uyana',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/08-jetwing-sri-lanka_66867_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [81.03515625, 7.710991655433229]
        }
      }, {
        type: 'Feature',
        properties: {
          'title': 'Poland',
          'country': 'Poland',
          'region': 'Europe',
          'description': 'Eco-Frontiers Ranch',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/09-poland-frontier_66868_600x450.jpg'
        },
        geometry: {
          type: 'Point',
          coordinates: [18.80859375, 51.944264879028765]
        }
      }
    ]
  };

  geoJson = {
    type: 'FeatureCollection',
    features: features['all']
  };

  map = mapa.init();

  featureLayer = mapa.loadPoint();

  changeFeature = function(num, type) {
    geoJson.features = _.filter(features['all'], function(el) {
      return el.properties[type] === num;
    });
    return loadData();
  };

  $('.filter').on('click', function() {
    var name, type;
    name = $(this).data('name');
    type = $(this).data('type');
    if (name === "all") {
      geoJson.features = features['all'];
      return loadData();
    } else {
      return changeFeature(name, type);
    }
  });

  loadData = function() {
    featureLayer.setGeoJSON(geoJson);
    featureLayer.eachLayer(function(layer) {
      var content;
      content = '<h2>' + layer.feature.properties.title + '<\/h2>' + '<p>' + layer.feature.properties.description + '<br \/>' + '<img src="' + layer.feature.properties.img + '"\/>';
      return layer.bindPopup(content);
    });
    return featureLayer.on('mouseover', function(e) {
      return e.layer.openPopup();
    });
  };

  loadData();

}).call(this);
