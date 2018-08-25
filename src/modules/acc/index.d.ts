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
  }

  export namespace gis {
    interface IMapScope extends ng.IScope {
      [key: string]: any;
      model?: model.ILocation;
    }

    export namespace model {
      interface ILocation {
        id: number;
        name: string;
        favorite: boolean;
        description?: string;
        properties: any;
      }

      interface ILocationProperties {
        defaults: L.MapOptions;
        center?: any;
        layers: any;
      }
    }
  }
}

export as namespace acc;
export = acc;
