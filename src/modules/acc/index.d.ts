declare namespace acc {
  export namespace extend {
    /**
     *
     */
    export interface IMapBuilder {
      map(): L.Map;
    }
  }

  export namespace configs {
    export interface ISeedAppConfig extends app.IAppConfig {
      siteSettings: any;
    }
  }

  export namespace services {
    export interface IRequestService {
      url(url: string): IWebApiContext;
    }

    export interface IWebApiContext extends IWebApi {
      options(options: IRequestOptions): IWebApi;
    }

    export interface IRequestOptions {
      dataOnly?: boolean;
      showLoading?: boolean;
      url?: string;
    }

    export interface IWebApi {
      get<TOutput>(): IRequestContext<TOutput>;
      post<TOutput>(data?: any): IRequestContext<TOutput>;
      put<TOutput>(data?: any): IRequestContext<TOutput>;
      patch<TOutput>(data?: any): IRequestContext<TOutput>;
      drop<TOutput>(): IRequestContext<TOutput>;
    }

    export interface IRequestContext<TOutput> {
      cancel();
      result: ng.IPromise<TOutput>;
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
