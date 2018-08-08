declare namespace acc {
  export namespace extend {
    /**
     *
     */
    interface IMapBuilder {
      map(): L.Map;
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
  }

  export namespace gis {
    interface IMapScope extends ng.IScope {
      [key: string]: any;
      model?: model.ILocation;
      map: L.Map;
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
        items: string[];
        zIndex: number;
        name: string;
      }

      interface ILocationProperties {
        mapview: {
          centerLng: number;
          centerLat: number;
          zoom: number;
        };
        layers: IMapLayer[];
      }
    }
  }
}

export as namespace acc;
export = acc;
