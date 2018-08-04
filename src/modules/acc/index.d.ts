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
    export namespace model {
      interface ILocation {
        id: number;
        name: string;
        favorite: boolean;
        description: string;
        properties: ILocationProperties;
      }

      interface ILocationProperties {
        mapview: {
          centerLng: number;
          centerLat: number;
          zoom: number;
        };
      }
    }
  }
}

export as namespace acc;
export = acc;
