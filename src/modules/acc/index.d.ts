declare namespace acc {
  export namespace extend {
    /**
     *
     */
    export interface IMapBuilder {
      map(): L.Map;
    }
  }

  /**
   *
   */
  export interface IMapLayerFactory {
    (controlOptions: IMapControlOptions): L.Control;
  }

  /**
   *
   */
  export interface IMapControlOptions {
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

export as namespace acc;
export = acc;
