import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
// @ts-ignore
import { Connectivity } from '../connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  image: any;
  apiKey: string = "Your Key";

  constructor(public connectivityService: Connectivity, public geolocation: Geolocation) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        console.log("Google maps JavaScript needs to be loaded.");
        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          };

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

      this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latLng,
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(this.mapElement, mapOptions);

        var icons = {
          bestbuy: {
            icon: 'assets/img/mapbestbuy.png',
          },
          target: {
            icon: 'assets/img/maptarget.png',
          },
          walmart: {
            icon: 'assets/img/mapwalm.png',
          }
        };
        var features = [
          {
            name: 'Walmart',
            address:'2300 Metropolitan Ave, Kansas City, KS 66106',
            position: new google.maps.LatLng(39.0747104  ,-94.6559286),
            type: 'walmart'
          }, {
            name: 'Walmart',
            address:'4701 Mission Rd, Westwood, KS 66205',
            position: new google.maps.LatLng(39.0435861,-94.6193647),
            type: 'walmart'
          }, {
            name: 'Walmart',
            address:'5150 Roe Blvd, Roeland Park',
            position: new google.maps.LatLng(39.0355529,-94.6411952),
            type: 'walmart'
          }, {
            name: 'Walmart',
            address:'11601 E US Hwy 40, Kansas City, MO 64133',
            position: new google.maps.LatLng(39.044986,-94.4427681),
            type: 'walmart'
          }, {
            name: 'Walmart',
            address:'7701 E Frontage Rd, Overland Park, KS 66204',
            position: new google.maps.LatLng(38.9892692,-94.6991014),
            type: 'walmart'
          }, {
            name: 'Walmart',
            address:'10300 E State Rte 350, Raytown, MO 64138',
            position: new google.maps.LatLng(38.9837985,-94.4595909),
            type: 'walmart'
          }, {
            name: 'Walmart',
            address:'11701 Metcalf Ave, Overland Park, KS 66210',
            position: new google.maps.LatLng(38.9147782,-94.6639109),
            type: 'walmart'
          }, {
            name: 'Bestbuy',
            address:'11701 Metcalf Ave, Overland Park, KS 66210',
            position: new google.maps.LatLng(38.9592086,-94.722662),
            type: 'bestbuy'
          }, {
            name: 'Bestbuy',
            address:'11525 Metcalf Ave, Overland Park, KS 66210',
            position: new google.maps.LatLng(38.9169487,-94.666872),
            type: 'bestbuy'
          }, {
            name: 'Bestbuy',
            address:'1608 NW Chipman Rd, Lee\'s Summit, MO 64081',
            position: new google.maps.LatLng(39.0501854,-94.3549633),
            type: 'bestbuy'
          }, {
            name: 'Bestbuy',
            address:'19110 East 39th St S, Independence, MO 64057',
            position: new google.maps.LatLng(38.9303036,-94.4071484),
            type: 'bestbuy'
          }, {
            name: 'Target',
            address:'6100 Broadmoor St, Mission, KS 66202',
            position: new google.maps.LatLng(39.0179834,-94.6646404),
            type: 'target'
          }, {
            name: 'Target',
            address:'8509 State Line Rd, Kansas City, MO 64114',
            position: new google.maps.LatLng(38.9717548,-94.6073914),
            type: 'target'
          }
        ];

        features.forEach(function(feature) {
          var marker = new google.maps.Marker({
            position: feature.position,
            icon: {
              url: icons[feature.type].icon,
              scaledSize: new google.maps.Size(64, 64)
            },
            map: map
          });

          var infowindow = new google.maps.InfoWindow({
            content: feature.address
          });

          marker.addListener('click', function() {
            map.setZoom(14);
            map.setCenter(marker.getPosition());
            infowindow.open(marker.get('map'), marker);
          });
        });
        resolve(true);
      });

    });

  }

  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      this.disableMap();

    });

  }

}
