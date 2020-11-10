export namespace compodoc {
  export interface Project {
    name: string;
    url: string;
  }

  export interface Compodoc {
    pipes:         any[];
    interfaces:    any[];
    injectables:   Injectable[];
    classes:       any[];
    directives:    Directive[];
    components:    Component[];
    modules:       Module[];
    miscellaneous: Miscellaneous;
  }

  export interface Component {
    name:             string;
    id:               string;
    file:             string;
    encapsulation:    any[];
    entryComponents:  any[];
    inputs:           any[];
    outputs:          any[];
    providers:        Provider[];
    selector:         string;
    styleUrls:        string[];
    styles:           any[];
    templateUrl:      string[];
    viewProviders:    any[];
    inputsClass:      InputsClass[];
    outputsClass:     HostBinding[];
    propertiesClass:  Propert[];
    methodsClass:     Method[];
    hostBindings:     HostBinding[];
    hostListeners:    HostListener[];
    description:      string;
    rawdescription:   string;
    type:             string;
    sourceCode:       string;
    assetsDirs:       any[];
    styleUrlsData:    StyleUrlsDatum[] | string;
    stylesData:       string;
    constructorObj?:  ConstructorObj;
    extends?:         string;
    implements?:      string[];
    accessors?:       ComponentAccessors;
    templateData?:    string;
    changeDetection?: string;
    template?:        string;
  }

  export interface ComponentAccessors {
    id?:       Checked;
    label?:    Checked;
    checked?:  Checked;
    disabled?: Checked;
    length?:   Checked;
    for?:      Checked;
  }

  export interface Checked {
    name:         string;
    setSignature: SetSignature;
    getSignature: InputsClass;
  }

  export interface InputsClass {
    name:          string;
    type?:         InputsClassType;
    returnType?:   string;
    line:          number;
    defaultValue?: string;
  }

  export enum InputsClassType {
    Any = "any",
    Boolean = "boolean",
    Empty = "",
    Number = "number",
    String = "string",
    TextEmailPassword = "\"text\" | \"email\" | \"password\"",
  }

  export interface SetSignature {
    name:       string;
    type:       ReturnTypeEnum;
    args:       Arg[];
    returnType: ReturnTypeEnum;
    line:       number;
    jsdoctags:  Jsdoctag[];
  }

  export interface Arg {
    name: string;
    type: string;
  }

  export interface Jsdoctag {
    name:    string;
    type:    string;
    tagName: TagName;
  }

  export interface TagName {
    text: Text;
  }

  export enum Text {
    Param = "param",
  }

  export enum ReturnTypeEnum {
    Void = "void",
  }

  export interface ConstructorObj {
    name:        string;
    description: string;
    args:        Arg[];
    line:        number;
    jsdoctags?:  Jsdoctag[];
  }

  export interface HostBinding {
    name:          string;
    defaultValue?: string;
    line:          number;
    type?:         string;
  }

  export interface HostListener {
    name:          string;
    args:          any[];
    argsDecorator: any[];
    line:          number;
  }

  export interface Method {
    name:           string;
    args:           Arg[];
    optional:       boolean;
    returnType:     ReturnTypeEnum;
    typeParameters: any[];
    line:           number;
    jsdoctags?:     Jsdoctag[];
    inheritance?:   Inheritance;
    description?:   string;
  }

  export interface Inheritance {
    file: string;
  }

  export interface Propert {
    name:          string;
    defaultValue?: string;
    type:          string;
    optional:      boolean;
    description:   string;
    line:          number;
    modifierKind?: number[];
    decorators?:   Decorator[];
    inheritance?:  Inheritance;
  }

  export interface Decorator {
    name:                 string;
    stringifiedArguments: string;
  }

  export interface Provider {
    name: string;
  }

  export interface StyleUrlsDatum {
    data:     string;
    styleUrl: string;
  }

  export interface Directive {
    name:            string;
    id:              string;
    file:            string;
    type:            string;
    description:     string;
    sourceCode:      string;
    selector:        string;
    providers:       any[];
    inputsClass:     InputsClass[];
    outputsClass:    any[];
    hostBindings:    InputsClass[];
    hostListeners:   any[];
    propertiesClass: PropertiesClass[];
    methodsClass:    Method[];
    accessors?:      DirectiveAccessors;
    constructorObj?: ConstructorObj;
    implements?:     string[];
  }

  export interface DirectiveAccessors {
    uxCol?:         Checked;
    uxContainer?:   Checked;
    gapSize?:       Checked;
    varGapSize?:    VarSize;
    rowSize?:       Checked;
    varRowSize?:    VarSize;
    columnSize?:    Checked;
    varColumnSize?: VarSize;
    uxRow?:         Checked;
  }

  export interface VarSize {
    name:         string;
    getSignature: InputsClass;
  }

  export interface PropertiesClass {
    name:         string;
    defaultValue: string;
    type:         InputsClassType;
    optional:     boolean;
    description:  string;
    line:         number;
  }

  export interface Injectable {
    name:        string;
    id:          string;
    file:        string;
    properties:  Propert[];
    methods:     Method[];
    description: string;
    sourceCode:  string;
    accessors:   InjectableAccessors;
    type:        string;
  }

  export interface InjectableAccessors {
    value: Checked;
  }

  export interface Miscellaneous {
    variables:           Variable[];
    functions:           any[];
    typealiases:         Alias[];
    enumerations:        any[];
    groupedVariables:    GroupedVariables;
    groupedFunctions:    GroupedTions;
    groupedEnumerations: GroupedTions;
    groupedTypeAliases:  { [key: string]: Alias[] };
  }

  export interface GroupedTions {
  }

  export interface Alias {
    name:        string;
    ctype:       string;
    subtype:     string;
    rawtype:     string;
    file:        string;
    description: string;
    kind:        number;
  }

  export interface GroupedVariables {
    "src/lib/components/forms/checkbox/checkbox.component.ts": Variable[];
    "src/utils/versions.ts":                                   Variable[];
  }

  export interface Variable {
    name:         string;
    ctype:        string;
    subtype:      string;
    file:         string;
    type:         string;
    defaultValue: string;
  }

  export interface Module {
    name:     string;
    children: Child[];
  }

  export interface Child {
    type:     string;
    elements: Provider[];
  }
}
