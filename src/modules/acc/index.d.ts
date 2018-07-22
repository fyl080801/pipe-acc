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
}

export as namespace acc;
export = acc;
