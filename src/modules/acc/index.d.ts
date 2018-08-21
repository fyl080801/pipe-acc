declare namespace acc {
  export namespace extend {
    /**
     *
     */
    interface IMapBuilder {
      map(): L.Map;
    }
  }

  export namespace services {
    // interface ILayerStore {
    //   [key: string]: any | acc.gis.model.IMapLayer;
    // }

    interface ILayerStore {
      add(layer: acc.gis.model.IMapLayer);
      remove(uuid: string);
    }
  }

  export namespace factories {
    /**
     *
     */
    interface IMapControlOptions {
      templateUrl?: string;
      controller?: string | Function | Array<string | Function>;
      controllerAs?: string;
      options?: L.ControlOptions;
      scope?: ng.IScope;
      resolve?: {
        [key: string]: string | Function | Array<string | Function> | Object;
      };
    }

    /**
     *
     */
    interface IMapLayerFactory {
      (controlOptions: IMapControlOptions): L.Control;
    }

    /**
     *
     */
    interface ILayerStoreFactory {
      (layers: acc.gis.model.IMapLayer[], map: L.Map): services.ILayerStore;
    }
  }

  export namespace gis {
    interface IMapScope extends ng.IScope {
      [key: string]: any;
      model?: model.ILocation;
      map: L.Map;
    }

    interface IMapLayerEntity {
      layer: model.IMapLayer;
      entity: L.Layer;
      trigger(evt: string);
    }

    export namespace model {
      interface ILocation {
        id: number;
        name: string;
        favorite: boolean;
        description: string;
        properties: ILocationProperties;
      }

      interface IMapLayer {
        type: 'group' | 'markers' | 'tileLayer' | 'geoJson';
        uuid: string;
        name: string;
      }

      interface ILayerGroup extends IMapLayer, services.ILayerStore {
        children: IMapLayer[];
      }

      interface IMarkerLayer extends IMapLayer {
        items: IMapItem[];
      }

      interface ITileLayer extends IMapLayer {
        source: string;
        options: L.TileLayerOptions;
      }

      interface ILocationProperties {
        mapview: {
          centerLng: number;
          centerLat: number;
          zoom: number;
        };
        layers: IMapLayer[];
      }

      interface IMapItem {
        type: 'equipment' | 'vectorgraph';
        latlng: { lat: number; lng: number };
        identity: number | string;
      }
    }
  }
}

export as namespace acc;
export = acc;
