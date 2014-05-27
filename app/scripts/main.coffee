#/*global require*/
'use strict'

require.config
  shim: 
    bootstrap:
      deps: ['jquery'],
      exports: 'jquery'
  paths:
    jquery: '../bower_components/jquery/dist/jquery'
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/underscore/underscore'
    bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'

require [
  'backbone'
], (Backbone) ->
  Backbone.history.start()

mapa = 
  init: ()->
    console.log 'Cargando mapa inicial...'
    L.mapbox.map('map', 'examples.map-i86nkdio').setView([0, 0], 2)
  loadPoint: ()->
    L.mapbox.featureLayer().addTo map

features =
  all: [ 
    {
        type: 'Feature'
        properties: 
          'title': 'Indonesia',
          'description': 'Misool Eco Resort',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/02-indonesia-misool_66861_600x450.jpg'
        geometry: 
          type: 'Point',
          coordinates: [116.3671875, -2.811371193331128]
      }
      {
        type: 'Feature'
        properties: 
          'title': 'Peru',
          'description': 'Inkaterra Reserva Amazónica',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/03-inkaterra_66862_600x450.jpg'
        geometry: 
          type: 'Point',
          coordinates: [-74.8828125, -12.554563528593656]
      }
      {
        type: 'Feature'
        properties: 
          'title': 'Australia',
          'description': 'Great Ocean Ecolodgea',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/04-australia-wallaby_66863_600x450.jpg'
        geometry: 
          type: 'Point',
          coordinates: [137.4609375, -22.91792293614603]
      }
      {
        type: 'Feature'
        properties: 
          'title': 'Grecce',
          'description': 'Milia Mountain Retreat',
          'marker-color': '#548cba',
          'marker-size': 'large',
          'img': 'http://images.nationalgeographic.com/wpf/media-live/photos/000/668/overrides/05-greece-retreat_66864_600x450.jpg'
        geometry: 
          type: 'Point',
          coordinates: [21.796875, 38.272688535980976]
      }
  ]
geoJson =
  type : 'FeatureCollection'
  features: features['all']

map = mapa.init()
featureLayer = mapa.loadPoint()

changeFeature = (num)->
  geoJson.features = _.filter(features['all'], (el)->
    el.properties.title == num 
  )
  loadData()

$('.filter').on('click',->
  region = $(this).data('name')
  if region == "all"
    geoJson.features = features['all']
    loadData()
  else
    changeFeature region
)

loadData = ()->
  featureLayer.setGeoJSON(geoJson)
  featureLayer.eachLayer((layer)-> 
      content = '<h2>' + layer.feature.properties.title + '<\/h2>' +
          '<p>' + layer.feature.properties.description + '<br \/>' +
          '<img src="' + layer.feature.properties.img + '"\/>'
      layer.bindPopup content
  )
  featureLayer.on('mouseover',(e)->
    e.layer.openPopup();
  )
  featureLayer.on('mouseout', (e)-> 
      e.layer.closePopup();
  )
loadData()

