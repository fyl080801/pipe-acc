declare namespace common {
  export namespace configs {
    interface ISeedAppConfig extends app.IAppConfig {
      siteSettings: any;
    }
  }

  export namespace factories {
    interface ISchemaFormParamsFactory {
      (
        schema: schema.ISchema,
        options?: schema.IOptions
      ): services.ISchemaFormParams;
    }

    interface INgTableRequestFactory {
      (options: any): services.INgTableRequest;
    }
  }

  export namespace services {
    interface IRequestService {
      url(url: string): IWebApiContext;
    }

    interface IWebApiContext extends IWebApi {
      options(options: IRequestOptions): IWebApi;
    }

    interface IRequestOptions {
      dataOnly?: boolean;
      showLoading?: boolean;
      url?: string;
    }

    interface IWebApi {
      get<TOutput>(): IRequestContext<TOutput>;
      post<TOutput>(data?: any): IRequestContext<TOutput>;
      put<TOutput>(data?: any): IRequestContext<TOutput>;
      patch<TOutput>(data?: any): IRequestContext<TOutput>;
      drop<TOutput>(): IRequestContext<TOutput>;
    }

    interface IRequestContext<TOutput> {
      cancel();
      result: ng.IPromise<TOutput>;
    }

    interface ISchemaFormParams {
      options(optionsDefine?: schema.IOptions): ISchemaFormParams | any;
      schema(schemaDefine?: schema.ISchema): ISchemaFormParams | any;
      properties(propertiesDefine?): ISchemaFormParams | any;
      property(
        propertyName: string,
        propertyDefine?: any
      ): ISchemaFormParams | any;
    }

    interface INgTableRequest {
      options(newOptions);
      table(newParams?, newSettings?);
    }
  }

  export namespace table {
    interface INgTableColumn {
      class(): string;
      headerTemplateURL(): any | boolean;
      headerTitle(): string;
      sortable(): boolean;
      show(): boolean;
      title(): string;
      titleAlt(): string;
    }
  }

  export namespace schema {
    interface ISfBuilder {
      sfField(args);
      ngModel(args);
      simpleTransclusion(args);
      ngModelOptions(args);
      transclusion(args);
      condition(args);
      array(args);
    }

    interface ISfBuilderProvider extends ng.IServiceProvider {
      builders: ISfBuilder;
      stdBuilders: Array<(args) => void>;
    }

    interface ISfPathProvider extends ng.IServiceProvider {
      parse(str: string);
      stringify(arr: string[] | string);
      normalize(data: string[] | string);
    }

    interface ISchemaFormProvider {
      defaults: {
        [key: string]: Array<(name: string, schema, options) => void>;
      };
      stdFormObj(name, schema, options): fields.IField;
      defaultFormDefinition(name, form: Array<any>, options);
      postProcess(fn: Function);
      appendRule(type, rule);
      prependRule(type, rule);
      createStandardForm(name, schema, options);
    }

    interface ISchemaFormDecoratorsProvider extends ng.IServiceProvider {
      createDecorator(name: string, templates: { [type: string]: string });
      defineDecorator(
        name: string,
        fields: { [type: string]: IFieldMap },
        builders?: Array<any>
      );
      createDirective(type: string, templateUrl: string, transclude?: boolean);
      createDirectives(templates: { [type: string]: string });
      decorator(name): IFieldMap[];
      addMapping(
        name: string,
        type: string,
        url: string,
        builder?: Function | Array<Function>,
        replace?: boolean
      );
      defineAddOn(
        name: string,
        type: string,
        url: string,
        builder?: Function | Array<Function>
      );
    }

    interface IFieldMap {
      template: string;
      builder: Function | Array<Function>;
    }

    interface ISchema {
      type?: string;
      title?: string;
      properties?: { [key: string]: ISchema };
      items?: Array<ISchema>;
      required?: boolean | string[];
    }

    interface IPristine {
      errors?: boolean;
      success?: boolean;
    }

    interface IOptions {
      supressPropertyTitles?: boolean;
      formDefaults?: object;
      validationMessage?: object | Function;
      setSchemaDefaults?: boolean;
      destroyStrategy?: string;
      pristine?: IPristine;
      validateOnRender?: boolean;
    }

    interface ISchemaForm {
      $id?: number;
      schema: ISchema;
      form: Array<fields.FieldTypes | string>;
      options?: IOptions;
      model?: any;
    }

    namespace fields {
      type FieldTypes =
        | IField
        | IButton
        | ISection
        | ITabs
        | IRow
        | IColumn
        | IPanel
        | ITable
        | INavbar
        | IActionField;

      interface IField {
        /**
         * 别名
         */
        alias?: string;
        key?: string | Array<string>; // The dot notatin to the attribute on the model
        type?: string; // Type of field
        title?: string; // Title of field, taken from schema if available
        notitle?: boolean; // Set to true to hide title
        description?: string; // A description, taken from schema if available, can be HTML
        validationMessage?: string; // A custom validation error message
        onChange?: (key, modelValue) => any; // onChange event handler, expression or function
        feedback?: boolean; // Inline feedback icons
        disableSuccessState?: boolean; // Set true to NOT apply 'has-success' class to a field that was validated successfully
        disableErrorState?: boolean; // Set true to NOT apply 'has-error' class to a field that failed validation
        placeholder?: string; // placeholder on inputs and textarea
        ngModelOptions?: any; // Passed along to ng-model-options
        readonly?: boolean; // Same effect as readOnly in schema. Put on a fieldset or array and their items will inherit it.
        htmlClass?: string; // CSS Class(es) to be added to the container div
        fieldHtmlClass?: string; // CSS Class(es) to be added to field input (or similar)
        labelHtmlClass?: string; // CSS Class(es) to be added to the label of the field (or similar)
        copyValueTo?: Array<string>; // Copy values to these schema keys.
        condition?: string; // Show or hide field depending on an angular expression
        destroyStrategy?: string; // One of "null", "empty" , "remove", or 'retain'. Changes model on $destroy event. default is "remove".
        container?: boolean | string;
        required?: boolean;
      }

      interface ISection {
        items: FieldTypes[];
        htmlClass?: string;
      }

      interface ITabs {
        tabs?: FieldTypes[];
      }

      interface IButton extends IField {
        icon?: string;
        onClick?: string | (() => any);
      }

      interface IPanel extends IField {
        icon?: string;
        theme: string;
      }

      interface IRow extends IField {
        columns: Array<IColumn>;
      }

      interface IColumn extends IField {
        flex?: number;
      }

      interface ITable extends IField {
        tableParams?: any;
        tableColumns?: any[];
      }

      interface INavbar extends IField {
        theme?: string;
      }

      interface IActionField extends IField {
        actionIcon?: string;
        displayKey?: string;
        action?: (form, model) => ng.IDeferred<any>;
        callback?: (result, model) => void;
      }
    }
  }
}
