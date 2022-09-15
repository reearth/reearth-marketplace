# Changelog

All notable changes to this project will be documented in this file.

## 0.2.0 - 2022-09-15

## 0.1.1 - 2022-09-15

## 0.1.0 - 2022-09-15

### server

#### chore

- Update go to 1.19 [`f10761`](https://github.com/reearth/reearth-marketplace/commit/f10761)
- Fix lint ([#13](https://github.com/reearth/reearth-marketplace/pull/13)) [`821669`](https://github.com/reearth/reearth-marketplace/commit/821669)
- Fix typo [`dcf832`](https://github.com/reearth/reearth-marketplace/commit/dcf832)
- Add initial schema [`3934f0`](https://github.com/reearth/reearth-marketplace/commit/3934f0)

#### feat

- Add initial user name ([#44](https://github.com/reearth/reearth-marketplace/pull/44)) [`733fc2`](https://github.com/reearth/reearth-marketplace/commit/733fc2)
- Add cors middleware ([#19](https://github.com/reearth/reearth-marketplace/pull/19)) [`19282e`](https://github.com/reearth/reearth-marketplace/commit/19282e)
- Add plugin download endpoint ([#18](https://github.com/reearth/reearth-marketplace/pull/18)) [`5c404d`](https://github.com/reearth/reearth-marketplace/commit/5c404d)
- Support global object identifier ([#17](https://github.com/reearth/reearth-marketplace/pull/17)) [`cfca9a`](https://github.com/reearth/reearth-marketplace/commit/cfca9a)
- Add liked field to the plugin ([#16](https://github.com/reearth/reearth-marketplace/pull/16)) [`9c758e`](https://github.com/reearth/reearth-marketplace/commit/9c758e)
- Initial implementation ([#12](https://github.com/reearth/reearth-marketplace/pull/12)) [`cc31ff`](https://github.com/reearth/reearth-marketplace/commit/cc31ff)

#### fix

- Error handling without auth [`8488ac`](https://github.com/reearth/reearth-marketplace/commit/8488ac)
- Nodes query [`9a1601`](https://github.com/reearth/reearth-marketplace/commit/9a1601)
- Fix plugin api [`6e2aad`](https://github.com/reearth/reearth-marketplace/commit/6e2aad)
- Error logger [`d20a68`](https://github.com/reearth/reearth-marketplace/commit/d20a68)
- User id [`2a27b3`](https://github.com/reearth/reearth-marketplace/commit/2a27b3)
- Parsing plugin id [`2d88b7`](https://github.com/reearth/reearth-marketplace/commit/2d88b7)
- Remove plugin id prefix [`4f427d`](https://github.com/reearth/reearth-marketplace/commit/4f427d)
- Repourl small sbug [`7f6ab8`](https://github.com/reearth/reearth-marketplace/commit/7f6ab8)
- To handle io.EOF ([#37](https://github.com/reearth/reearth-marketplace/pull/37)) [`de3d55`](https://github.com/reearth/reearth-marketplace/commit/de3d55)
- Fix search liked ([#36](https://github.com/reearth/reearth-marketplace/pull/36)) [`df5ef8`](https://github.com/reearth/reearth-marketplace/commit/df5ef8)
- Fix unlike plugin ([#35](https://github.com/reearth/reearth-marketplace/pull/35)) [`f7189a`](https://github.com/reearth/reearth-marketplace/commit/f7189a)
- Add .zip to plugin download API endpoint [`48923c`](https://github.com/reearth/reearth-marketplace/commit/48923c)
- Use id instead of ID ([#34](https://github.com/reearth/reearth-marketplace/pull/34)) [`ba83bd`](https://github.com/reearth/reearth-marketplace/commit/ba83bd)
- Wrap id.PluginIDFrom ([#31](https://github.com/reearth/reearth-marketplace/pull/31)) [`94d123`](https://github.com/reearth/reearth-marketplace/commit/94d123)
- Support for duplicate pluginIDs and versions ([#26](https://github.com/reearth/reearth-marketplace/pull/26)) [`dfdf1f`](https://github.com/reearth/reearth-marketplace/commit/dfdf1f)
- Fix ParsePlugin bugs ([#25](https://github.com/reearth/reearth-marketplace/pull/25)) [`e0f15b`](https://github.com/reearth/reearth-marketplace/commit/e0f15b)
- Fix ContextAuthInfo type ([#24](https://github.com/reearth/reearth-marketplace/pull/24)) [`577f1f`](https://github.com/reearth/reearth-marketplace/commit/577f1f)
- Remove allow headers ([#21](https://github.com/reearth/reearth-marketplace/pull/21)) [`fa5335`](https://github.com/reearth/reearth-marketplace/commit/fa5335)
- Fix schemas [`aefa99`](https://github.com/reearth/reearth-marketplace/commit/aefa99)

### web

#### chore

- Format [`61d4b1`](https://github.com/reearth/reearth-marketplace/commit/61d4b1)
- Update config variable name to avoid collision [`7787d2`](https://github.com/reearth/reearth-marketplace/commit/7787d2)
- Add apollo-upload-client ([#22](https://github.com/reearth/reearth-marketplace/pull/22)) [`a4de51`](https://github.com/reearth/reearth-marketplace/commit/a4de51)
- Set up Vite config for extension ([#2](https://github.com/reearth/reearth-marketplace/pull/2)) [`657a27`](https://github.com/reearth/reearth-marketplace/commit/657a27)
- Add mock server [`2a4250`](https://github.com/reearth/reearth-marketplace/commit/2a4250)
- Load config file [`0d470a`](https://github.com/reearth/reearth-marketplace/commit/0d470a)
- Fix storybook config [`18a319`](https://github.com/reearth/reearth-marketplace/commit/18a319)

#### feat

- Add loading ([#41](https://github.com/reearth/reearth-marketplace/pull/41)) [`97f99e`](https://github.com/reearth/reearth-marketplace/commit/97f99e)
- Add notification and fix publish bugs ([#40](https://github.com/reearth/reearth-marketplace/pull/40)) [`e7577b`](https://github.com/reearth/reearth-marketplace/commit/e7577b)
- Image upload ([#39](https://github.com/reearth/reearth-marketplace/pull/39)) [`4c2e06`](https://github.com/reearth/reearth-marketplace/commit/4c2e06)
- Implement UIs ([#38](https://github.com/reearth/reearth-marketplace/pull/38)) [`4bb235`](https://github.com/reearth/reearth-marketplace/commit/4bb235)
- Setup ext for fetching plugins + refactor ([#32](https://github.com/reearth/reearth-marketplace/pull/32)) [`867178`](https://github.com/reearth/reearth-marketplace/commit/867178)
- Update plugin installed extension and refactoring ([#30](https://github.com/reearth/reearth-marketplace/pull/30)) [`813036`](https://github.com/reearth/reearth-marketplace/commit/813036)
- Gql hooks user page and user plugins page ([#29](https://github.com/reearth/reearth-marketplace/pull/29)) [`091bee`](https://github.com/reearth/reearth-marketplace/commit/091bee)
- Detail page query ([#14](https://github.com/reearth/reearth-marketplace/pull/14)) [`3f4b19`](https://github.com/reearth/reearth-marketplace/commit/3f4b19)
- Add theme and update root, user, and plugin pages ([#20](https://github.com/reearth/reearth-marketplace/pull/20)) [`2f1a0e`](https://github.com/reearth/reearth-marketplace/commit/2f1a0e)
- Add gql and style components ([#11](https://github.com/reearth/reearth-marketplace/pull/11)) [`25a972`](https://github.com/reearth/reearth-marketplace/commit/25a972)
- Fix auth0 problem &amp; add update components ([#8](https://github.com/reearth/reearth-marketplace/pull/8)) [`d7f251`](https://github.com/reearth/reearth-marketplace/commit/d7f251)
- Add components, styles and some GQL ([#7](https://github.com/reearth/reearth-marketplace/pull/7)) [`f81349`](https://github.com/reearth/reearth-marketplace/commit/f81349)

#### fix

- Disable buttons of non-installable plugins [`4dde80`](https://github.com/reearth/reearth-marketplace/commit/4dde80)
- Apollo requires auth [`aaecc5`](https://github.com/reearth/reearth-marketplace/commit/aaecc5)
- Type error [`600f68`](https://github.com/reearth/reearth-marketplace/commit/600f68)
- Stop using react-router-dom in extensions [`5f7428`](https://github.com/reearth/reearth-marketplace/commit/5f7428)
- Fix install plugin [`7ced5d`](https://github.com/reearth/reearth-marketplace/commit/7ced5d)
- Config path [`a4e504`](https://github.com/reearth/reearth-marketplace/commit/a4e504)
- Workaround fix build result [`54e499`](https://github.com/reearth/reearth-marketplace/commit/54e499)
- Reearth_config url issue [`317584`](https://github.com/reearth/reearth-marketplace/commit/317584)
- Remove HttpLink ([#23](https://github.com/reearth/reearth-marketplace/pull/23)) [`e4acf6`](https://github.com/reearth/reearth-marketplace/commit/e4acf6)
- Gql provider endpoint configuration [`0fd614`](https://github.com/reearth/reearth-marketplace/commit/0fd614)

#### refactor

- Split core from header and footer to be used as extension ([#9](https://github.com/reearth/reearth-marketplace/pull/9)) [`f15275`](https://github.com/reearth/reearth-marketplace/commit/f15275)

### 

#### chore

- Update codeowners [`44614c`](https://github.com/reearth/reearth-marketplace/commit/44614c)
- Clean up app file, update naming to be same as other repos [`fc0f95`](https://github.com/reearth/reearth-marketplace/commit/fc0f95)
- Updated project route alias and small refactor [`a969e8`](https://github.com/reearth/reearth-marketplace/commit/a969e8)
- Update code owners [`aa21cd`](https://github.com/reearth/reearth-marketplace/commit/aa21cd)
- Update config ([#3](https://github.com/reearth/reearth-marketplace/pull/3)) [`1d4354`](https://github.com/reearth/reearth-marketplace/commit/1d4354)
- Add CODEOWNERS ([#1](https://github.com/reearth/reearth-marketplace/pull/1)) [`f87e17`](https://github.com/reearth/reearth-marketplace/commit/f87e17)

#### ci

- Fix release [`7d248e`](https://github.com/reearth/reearth-marketplace/commit/7d248e)
- Fix ci [`159be7`](https://github.com/reearth/reearth-marketplace/commit/159be7)
- Uncomment ci [`32cdfe`](https://github.com/reearth/reearth-marketplace/commit/32cdfe)
- Fix test deploy [`c8f465`](https://github.com/reearth/reearth-marketplace/commit/c8f465)
- Fix stage [`71001f`](https://github.com/reearth/reearth-marketplace/commit/71001f)
- Fix [`22ea39`](https://github.com/reearth/reearth-marketplace/commit/22ea39)
- Fix build to fetch artifact [`441b8d`](https://github.com/reearth/reearth-marketplace/commit/441b8d)
- Fix artifact [`f65078`](https://github.com/reearth/reearth-marketplace/commit/f65078)
- Set up workflows which generate changelog, trigger GitHub&[#39](https://github.com/reearth/reearth-marketplace/pull/39);s release and save rc to the artifacts ([#42](https://github.com/reearth/reearth-marketplace/pull/42)) [`c57a83`](https://github.com/reearth/reearth-marketplace/commit/c57a83)
- Set golangci-lint timeout [`3250cb`](https://github.com/reearth/reearth-marketplace/commit/3250cb)
- Uncomment needed workflow [`35280d`](https://github.com/reearth/reearth-marketplace/commit/35280d)
- Update test extensions and add extensionType [`d6c4d4`](https://github.com/reearth/reearth-marketplace/commit/d6c4d4)
- Fix workflow to build docker image ([#6](https://github.com/reearth/reearth-marketplace/pull/6)) [`3d284b`](https://github.com/reearth/reearth-marketplace/commit/3d284b)
- Setup workflow to run CI by detecting file changes, build and deploy ([#4](https://github.com/reearth/reearth-marketplace/pull/4)) [`2157da`](https://github.com/reearth/reearth-marketplace/commit/2157da)

#### feat

- To case-insensitive search ([#33](https://github.com/reearth/reearth-marketplace/pull/33)) [`6cba63`](https://github.com/reearth/reearth-marketplace/commit/6cba63)
- Update plugin detail page to better support extension ([#28](https://github.com/reearth/reearth-marketplace/pull/28)) [`fa1aed`](https://github.com/reearth/reearth-marketplace/commit/fa1aed)
- Basic setup of library extension ([#15](https://github.com/reearth/reearth-marketplace/pull/15)) [`5ae8e8`](https://github.com/reearth/reearth-marketplace/commit/5ae8e8)

#### fix

- UI styles ([#43](https://github.com/reearth/reearth-marketplace/pull/43)) [`9a908b`](https://github.com/reearth/reearth-marketplace/commit/9a908b)
- Name of stage workflow [`89dad1`](https://github.com/reearth/reearth-marketplace/commit/89dad1)
- Update button in installed plugin list [`27f2e4`](https://github.com/reearth/reearth-marketplace/commit/27f2e4)
- Add nodeType input to node query [`e7ae95`](https://github.com/reearth/reearth-marketplace/commit/e7ae95)
- Extension theme ([#27](https://github.com/reearth/reearth-marketplace/pull/27)) [`71cf2a`](https://github.com/reearth/reearth-marketplace/commit/71cf2a)
- Deploy [`28509f`](https://github.com/reearth/reearth-marketplace/commit/28509f)
- Build [`ccf580`](https://github.com/reearth/reearth-marketplace/commit/ccf580)
- Build [skip ci] [`1c8a60`](https://github.com/reearth/reearth-marketplace/commit/1c8a60)
- Build flow [`58fbf5`](https://github.com/reearth/reearth-marketplace/commit/58fbf5)
- Build workflow to save docker image [`9deb57`](https://github.com/reearth/reearth-marketplace/commit/9deb57)
- Typo of build workflow [`84c519`](https://github.com/reearth/reearth-marketplace/commit/84c519)

#### 

- Fix [`06232e`](https://github.com/reearth/reearth-marketplace/commit/06232e)