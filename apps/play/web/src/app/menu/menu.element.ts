import './menu.element.scss';

export class MenuElement extends HTMLElement {
  public static observedAttributes = [];

  public isNormalMode: boolean;

  constructor() {
    super();
    this.isNormalMode = this.getAttribute('mode') === 'normal';
  }

  connectedCallback() {
    this.render(this.isNormalMode)
  }

  render(isNormalMode) {
    this.innerHTML = `
    <nav>
        <ul class="list">
            <li class="title">
                <a href="index.html" data-type="index-link">nx-az</a>
            </li>

            <li class="divider"></li>
            ${
              isNormalMode
                ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>`
                : ''
            }
            <li class="chapter">
                <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                <ul class="links">
                    <li class="link">
                        <a href="overview.html" data-type="chapter-link">
                            <span class="icon ion-ios-keypad"></span>Overview
                        </a>
                    </li>
                    <li class="link">
                        <a href="index.html" data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>README
                        </a>
                    </li>
                    <li class="link">
                        <a href="license.html"  data-type="chapter-link">
                            <span class="icon ion-ios-paper"></span>LICENSE
                        </a>
                    </li>
                            <li class="link">
                                <a href="dependencies.html" data-type="chapter-link">
                                    <span class="icon ion-ios-list"></span>Dependencies
                                </a>
                            </li>
                </ul>
            </li>
                <li class="chapter additional">
                    <div class="simple menu-toggler" data-toggle="collapse" ${
                      isNormalMode
                        ? 'data-target="#additional-pages"'
                        : 'data-target="#xs-additional-pages"'
                    }>
                        <span class="icon ion-ios-book"></span>
                        <span>Projects</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse " ${
                      isNormalMode
                        ? 'id="additional-pages"'
                        : 'id="xs-additional-pages"'
                    }>
                                <li class="link ">
                                    <a href="additional-documentation/a11y-focus.html" data-type="entity-link" data-context-id="additional">a11y-focus</a>
                                </li>
                                <li class="link ">
                                    <a href="additional-documentation/a11y-forms.html" data-type="entity-link" data-context-id="additional">a11y-forms</a>
                                </li>
                                <li class="link ">
                                    <a href="additional-documentation/util-types.html" data-type="entity-link" data-context-id="additional">util-types</a>
                                </li>
                                <li class="link ">
                                    <a href="additional-documentation/fire-auth.html" data-type="entity-link" data-context-id="additional">fire-auth</a>
                                </li>
                                <li class="link ">
                                    <a href="additional-documentation/seek-cli.html" data-type="entity-link" data-context-id="additional">seek-cli</a>
                                </li>
                                <li class="link ">
                                    <a href="additional-documentation/fire-store.html" data-type="entity-link" data-context-id="additional">fire-store</a>
                                </li>
                                <li class="link ">
                                    <a href="additional-documentation/feat-auth.html" data-type="entity-link" data-context-id="additional">feat-auth</a>
                                </li>
                                <li class="link ">
                                    <a href="additional-documentation/core-domain.html" data-type="entity-link" data-context-id="additional">core-domain</a>
                                </li>
                                <li class="link ">
                                    <a href="additional-documentation/core-data.html" data-type="entity-link" data-context-id="additional">core-data</a>
                                </li>
                    </ul>
                </li>
                <li class="chapter modules">
                    <a data-type="chapter-link" href="modules.html">
                        <div class="menu-toggler linked" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#modules-links"'
                            : 'data-target="#xs-modules-links"'
                        }>
                            <span class="icon ion-ios-archive"></span>
                            <span class="link-name">Modules</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                    </a>
                    <ul class="links collapse " ${
                      isNormalMode
                        ? 'id="modules-links"'
                        : 'id="xs-modules-links"'
                    }>
                        <li class="link">
                            <a href="modules/A11yFocusModule.html" data-type="entity-link">A11yFocusModule</a>
                        </li>
                        <li class="link">
                            <a href="modules/A11yFormsModule.html" data-type="entity-link">A11yFormsModule</a>
                        </li>
                        <li class="link">
                            <a href="modules/A11yModule.html" data-type="entity-link">A11yModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-A11yModule-d436b10eb8ec9e35b704d60c9b7d23a7"'
                                        : 'data-target="#xs-components-links-module-A11yModule-d436b10eb8ec9e35b704d60c9b7d23a7"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-A11yModule-d436b10eb8ec9e35b704d60c9b7d23a7"'
                                        : 'id="xs-components-links-module-A11yModule-d436b10eb8ec9e35b704d60c9b7d23a7"'
                                    }>
                                        <li class="link">
                                            <a href="components/A11yComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">A11yComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FocusComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FocusComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FormsComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormsComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/RdfModelComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">RdfModelComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-AdminModule-1bc1556b078b90ba2fa157827a26fdfb"'
                                        : 'data-target="#xs-components-links-module-AdminModule-1bc1556b078b90ba2fa157827a26fdfb"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-AdminModule-1bc1556b078b90ba2fa157827a26fdfb"'
                                        : 'id="xs-components-links-module-AdminModule-1bc1556b078b90ba2fa157827a26fdfb"'
                                    }>
                                        <li class="link">
                                            <a href="components/AdminComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-AppModule-4f87247ff67454e7b8e645734e392aed"'
                                        : 'data-target="#xs-components-links-module-AppModule-4f87247ff67454e7b8e645734e392aed"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-AppModule-4f87247ff67454e7b8e645734e392aed"'
                                        : 'id="xs-components-links-module-AppModule-4f87247ff67454e7b8e645734e392aed"'
                                    }>
                                        <li class="link">
                                            <a href="components/AppComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/HomeComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-AppModule-ecf29145f4565b3aeb3ff6133d6f09ba-1"'
                                        : 'data-target="#xs-components-links-module-AppModule-ecf29145f4565b3aeb3ff6133d6f09ba-1"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-AppModule-ecf29145f4565b3aeb3ff6133d6f09ba-1"'
                                        : 'id="xs-components-links-module-AppModule-ecf29145f4565b3aeb3ff6133d6f09ba-1"'
                                    }>
                                        <li class="link">
                                            <a href="components/AppComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-AppModule-adf346410d21515e2cf0e570f4ec0313-2"'
                                        : 'data-target="#xs-components-links-module-AppModule-adf346410d21515e2cf0e570f4ec0313-2"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-AppModule-adf346410d21515e2cf0e570f4ec0313-2"'
                                        : 'id="xs-components-links-module-AppModule-adf346410d21515e2cf0e570f4ec0313-2"'
                                    }>
                                        <li class="link">
                                            <a href="components/AppComponent-2.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AppComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/CheckboxModule.html" data-type="entity-link">CheckboxModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-CheckboxModule-a0c2b9040fde73eae0d7e4dd17cabfaf"'
                                        : 'data-target="#xs-components-links-module-CheckboxModule-a0c2b9040fde73eae0d7e4dd17cabfaf"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-CheckboxModule-a0c2b9040fde73eae0d7e4dd17cabfaf"'
                                        : 'id="xs-components-links-module-CheckboxModule-a0c2b9040fde73eae0d7e4dd17cabfaf"'
                                    }>
                                        <li class="link">
                                            <a href="components/CheckboxComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">CheckboxComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/FeatAuthModule.html" data-type="entity-link">FeatAuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-FeatAuthModule-701f05afddad9d4ba76f4691db078889"'
                                        : 'data-target="#xs-components-links-module-FeatAuthModule-701f05afddad9d4ba76f4691db078889"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-FeatAuthModule-701f05afddad9d4ba76f4691db078889"'
                                        : 'id="xs-components-links-module-FeatAuthModule-701f05afddad9d4ba76f4691db078889"'
                                    }>
                                        <li class="link">
                                            <a href="components/FeatAuthComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatAuthComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeatAuthContainer.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatAuthContainer</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeatAuthFormComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatAuthFormComponent</a>
                                        </li>
                                    </ul>
                                </li>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse" ${
                                  isNormalMode
                                    ? 'data-target="#directives-links-module-FeatAuthModule-701f05afddad9d4ba76f4691db078889"'
                                    : 'data-target="#xs-directives-links-module-FeatAuthModule-701f05afddad9d4ba76f4691db078889"'
                                }>
                                    <span class="icon ion-md-code-working"></span>
                                    <span>Directives</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse" ${
                                  isNormalMode
                                    ? 'id="directives-links-module-FeatAuthModule-701f05afddad9d4ba76f4691db078889"'
                                    : 'id="xs-directives-links-module-FeatAuthModule-701f05afddad9d4ba76f4691db078889"'
                                }>
                                    <li class="link">
                                        <a href="directives/FeatAuthProviderDirective.html"
                                            data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatAuthProviderDirective</a>
                                    </li>
                                </ul>
                            </li>
                        </li>
                        <li class="link">
                            <a href="modules/FeatModule.html" data-type="entity-link">FeatModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-FeatModule-fd3c2474040ef5fd2d798eecd3cff220"'
                                        : 'data-target="#xs-components-links-module-FeatModule-fd3c2474040ef5fd2d798eecd3cff220"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-FeatModule-fd3c2474040ef5fd2d798eecd3cff220"'
                                        : 'id="xs-components-links-module-FeatModule-fd3c2474040ef5fd2d798eecd3cff220"'
                                    }>
                                        <li class="link">
                                            <a href="components/AuthComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FeatComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FeatComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/FireAuthModule.html" data-type="entity-link">FireAuthModule</a>
                        </li>
                        <li class="link">
                            <a href="modules/FireModule.html" data-type="entity-link">FireModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-FireModule-a029c25394534229d6c877c3e3577b1a"'
                                        : 'data-target="#xs-components-links-module-FireModule-a029c25394534229d6c877c3e3577b1a"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-FireModule-a029c25394534229d6c877c3e3577b1a"'
                                        : 'id="xs-components-links-module-FireModule-a029c25394534229d6c877c3e3577b1a"'
                                    }>
                                        <li class="link">
                                            <a href="components/AuthCreateComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthCreateComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/AuthLoginComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthLoginComponent</a>
                                        </li>
                                        <li class="link">
                                            <a href="components/FireComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FireComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/FireStoreModule.html" data-type="entity-link">FireStoreModule</a>
                        </li>
                        <li class="link">
                            <a href="modules/FormModule.html" data-type="entity-link">FormModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#components-links-module-FormModule-3228b590c04c0ebe7cf3a090d473e324"'
                                        : 'data-target="#xs-components-links-module-FormModule-3228b590c04c0ebe7cf3a090d473e324"'
                                    }>
                                        <span class="icon ion-md-cog"></span>
                                        <span>Components</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="components-links-module-FormModule-3228b590c04c0ebe7cf3a090d473e324"'
                                        : 'id="xs-components-links-module-FormModule-3228b590c04c0ebe7cf3a090d473e324"'
                                    }>
                                        <li class="link">
                                            <a href="components/FormComponent.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">FormComponent</a>
                                        </li>
                                    </ul>
                                </li>
                        </li>
                        <li class="link">
                            <a href="modules/FormRoutingModule.html" data-type="entity-link">FormRoutingModule</a>
                        </li>
                        <li class="link">
                            <a href="modules/SeekCliModule.html" data-type="entity-link">SeekCliModule</a>
                            <li class="chapter inner">
                                <div class="simple menu-toggler" data-toggle="collapse" ${
                                  isNormalMode
                                    ? 'data-target="#injectables-links-module-SeekCliModule-ba09ef33932657d291af77ecbcabb17b"'
                                    : 'data-target="#xs-injectables-links-module-SeekCliModule-ba09ef33932657d291af77ecbcabb17b"'
                                }>
                                    <span class="icon ion-md-arrow-round-down"></span>
                                    <span>Injectables</span>
                                    <span class="icon ion-ios-arrow-down"></span>
                                </div>
                                <ul class="links collapse" ${
                                  isNormalMode
                                    ? 'id="injectables-links-module-SeekCliModule-ba09ef33932657d291af77ecbcabb17b"'
                                    : 'id="xs-injectables-links-module-SeekCliModule-ba09ef33932657d291af77ecbcabb17b"'
                                }>
                                    <li class="link">
                                        <a href="injectables/SeekCliExplorerService.html"
                                            data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SeekCliExplorerService</a>
                                    </li>
                                    <li class="link">
                                        <a href="injectables/SeekCliService.html"
                                            data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>SeekCliService</a>
                                    </li>
                                </ul>
                            </li>
                        </li>
                        <li class="link">
                            <a href="modules/UtilTypesModule.html" data-type="entity-link">UtilTypesModule</a>
                        </li>
            </ul>
            </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse" ${
                      isNormalMode
                        ? 'data-target="#components-links"'
                        : 'data-target="#xs-components-links"'
                    }>
                        <span class="icon ion-md-cog"></span>
                        <span>Components</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse " ${
                      isNormalMode
                        ? 'id="components-links"'
                        : 'id="xs-components-links"'
                    }>
                        <li class="link">
                            <a href="components/AppComponent-1.html" data-type="entity-link">AppComponent</a>
                        </li>
                        <li class="link">
                            <a href="components/AuthComponent-1.html" data-type="entity-link">AuthComponent</a>
                        </li>
                        <li class="link">
                            <a href="components/AuthCreateComponent.html" data-type="entity-link">AuthCreateComponent</a>
                        </li>
                        <li class="link">
                            <a href="components/AuthLoginComponent.html" data-type="entity-link">AuthLoginComponent</a>
                        </li>
                        <li class="link">
                            <a href="components/HomeComponent-1.html" data-type="entity-link">HomeComponent</a>
                        </li>
                    </ul>
                </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse" ${
                      isNormalMode
                        ? 'data-target="#classes-links"'
                        : 'data-target="#xs-classes-links"'
                    }>
                        <span class="icon ion-ios-paper"></span>
                        <span>Classes</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse " ${
                      isNormalMode
                        ? 'id="classes-links"'
                        : 'id="xs-classes-links"'
                    }>
                        <li class="link">
                            <a href="classes/AuthLoginDb.html" data-type="entity-link">AuthLoginDb</a>
                        </li>
                        <li class="link">
                            <a href="classes/AuthLoginRepository.html" data-type="entity-link">AuthLoginRepository</a>
                        </li>
                        <li class="link">
                            <a href="classes/ControlAccessor.html" data-type="entity-link">ControlAccessor</a>
                        </li>
                        <li class="link">
                            <a href="classes/CreateDocument.html" data-type="entity-link">CreateDocument</a>
                        </li>
                        <li class="link">
                            <a href="classes/Domain.html" data-type="entity-link">Domain</a>
                        </li>
                        <li class="link">
                            <a href="classes/FireAuthGuard.html" data-type="entity-link">FireAuthGuard</a>
                        </li>
                        <li class="link">
                            <a href="classes/FireAuthMessage.html" data-type="entity-link">FireAuthMessage</a>
                        </li>
                        <li class="link">
                            <a href="classes/FireStoreQuery.html" data-type="entity-link">FireStoreQuery</a>
                        </li>
                        <li class="link">
                            <a href="classes/IUserController.html" data-type="entity-link">IUserController</a>
                        </li>
                        <li class="link">
                            <a href="classes/IUserRepository.html" data-type="entity-link">IUserRepository</a>
                        </li>
                        <li class="link">
                            <a href="classes/IUserUseCase.html" data-type="entity-link">IUserUseCase</a>
                        </li>
                        <li class="link">
                            <a href="classes/IUserValidator.html" data-type="entity-link">IUserValidator</a>
                        </li>
                        <li class="link">
                            <a href="classes/LoadUserByEmailRepository.html" data-type="entity-link">LoadUserByEmailRepository</a>
                        </li>
                        <li class="link">
                            <a href="classes/User.html" data-type="entity-link">User</a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#injectables-links"'
                            : 'data-target="#xs-injectables-links"'
                        }>
                            <span class="icon ion-md-arrow-round-down"></span>
                            <span>Injectables</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${
                          isNormalMode
                            ? 'id="injectables-links"'
                            : 'id="xs-injectables-links"'
                        }>
                            <li class="link">
                                <a href="injectables/FireAuthService.html" data-type="entity-link">FireAuthService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/FireStoreService.html" data-type="entity-link">FireStoreService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/SeekCliLogService.html" data-type="entity-link">SeekCliLogService</a>
                            </li>
                            <li class="link">
                                <a href="injectables/UserUseCase.html" data-type="entity-link">UserUseCase</a>
                            </li>
                        </ul>
                    </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse" ${
                      isNormalMode
                        ? 'data-target="#interfaces-links"'
                        : 'data-target="#xs-interfaces-links"'
                    }>
                        <span class="icon ion-md-information-circle-outline"></span>
                        <span>Interfaces</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse " ${
                      isNormalMode
                        ? ' id="interfaces-links"'
                        : 'id="xs-interfaces-links"'
                    }>
                        <li class="link">
                            <a href="interfaces/Auth.html" data-type="entity-link">Auth</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/AuthParams.html" data-type="entity-link">AuthParams</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/AuthUser.html" data-type="entity-link">AuthUser</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/AuthWithEmailAndPassword.html" data-type="entity-link">AuthWithEmailAndPassword</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/Chainable.html" data-type="entity-link">Chainable</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/FeatAuthOptions.html" data-type="entity-link">FeatAuthOptions</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/FireAuthOptions.html" data-type="entity-link">FireAuthOptions</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/FireAuthUser.html" data-type="entity-link">FireAuthUser</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/FireStoreDoc.html" data-type="entity-link">FireStoreDoc</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/FireStoreDoc-1.html" data-type="entity-link">FireStoreDoc</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/SeekCliMetadata.html" data-type="entity-link">SeekCliMetadata</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/SeekCliOption.html" data-type="entity-link">SeekCliOption</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/SeekCliOptionsOption.html" data-type="entity-link">SeekCliOptionsOption</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/SeekCliParamMetadataItem.html" data-type="entity-link">SeekCliParamMetadataItem</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/SeekCliPositionalOption.html" data-type="entity-link">SeekCliPositionalOption</a>
                        </li>
                        <li class="link">
                            <a href="interfaces/ValidationResult.html" data-type="entity-link">ValidationResult</a>
                        </li>
                    </ul>
                </li>
                <li class="chapter">
                    <div class="simple menu-toggler" data-toggle="collapse" ${
                      isNormalMode
                        ? 'data-target="#miscellaneous-links"'
                        : 'data-target="#xs-miscellaneous-links"'
                    }>
                        <span class="icon ion-ios-cube"></span>
                        <span>Miscellaneous</span>
                        <span class="icon ion-ios-arrow-down"></span>
                    </div>
                    <ul class="links collapse " ${
                      isNormalMode
                        ? 'id="miscellaneous-links"'
                        : 'id="xs-miscellaneous-links"'
                    }>
                        <li class="link">
                            <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                        </li>
                        <li class="link">
                            <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                        </li>
                        <li class="link">
                            <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                        </li>
                        <li class="link">
                            <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                        </li>
                    </ul>
                </li>
                <li class="divider"></li>
                <li class="copyright">
                    Documentation generated using <a href="https://compodoc.app/" target="_blank">
                    <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                </a>
            </li>
        </ul>
    </nav>`;

    console.log('opa');

  }
}
customElements.define('guiseek-menu', MenuElement);
