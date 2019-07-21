# DashCam Viewer

![License](https://img.shields.io/badge/license-MIT-green)
![GitHub issues](https://img.shields.io/github/issues-raw/ibiliskov/dashcam-viewer)
![GitHub package.json version](https://img.shields.io/github/package-json/v/ibiliskov/dashcam-viewer)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

DashCam Viewer is application that lets you view dashcam videos with additional information and live map.

![DashCam Viewer in action](./docs/example.gif)

[Visit live DEMO page](https://dashcam-viewer.ivanbiliskov.now.sh)

## How it works

DashCam Viewer requests list of video files from server (can be any server that returns list of files in [directory-tree](https://www.npmjs.com/package/directory-tree) format). Application will scan for video elements to show in sidebar. DashCam Viewer will also download log file (it looks for a file with a same name as video), convert it to [WebVTT](https://en.wikipedia.org/wiki/WebVTT) format and attach as subtitles to [Video.js](https://videojs.com/) player. Player emits cue change and that is used to show current speed and position on map.

### Supported dashcam videos

- Any dashcam gives raw video file, so basically file can be loaded in player

### Supported dashcam logs

- Eonon DVR (tested)
- Eonon CarRecord
- Any other log file that has following format

```
<date>,E<longitude> N<latitude> <speed> <unit>
```

Example:

```
2019/05/28 20:06:05,E16.345036 N43.553672 0.3 km/h
2019/05/28 20:06:06,E16.345037 N43.553671 0.3 km/h
2019/05/28 20:06:07,E16.345037 N43.553670 0.1 km/h
```

- `date`: sent to [MomentJS](https://momentjs.com/), so any string that MomentJS can parse is valid
- `longitude`, `latitude`, `speed`: parsed using `parseFloat`
- `unit` is currently used as is

## How to contribute

Contributions, issues and feature requests are welcome.

1. File an issue to notify the maintainers about what you're working on.
2. Fork the repo, develop and test your code changes, add docs.
   Make sure that your commit messages clearly describe the changes.
3. Submit Pull Request with comprehensive description of changes

### Code

DashCam Viewer is written in [Angular 7](https://angular.io).

### Install

After clone run `npm install` to get npm packages.

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. In dev environment, application will default to `http://localhost:3000/` to get files manifest. It can be changed in `environment.ts` file.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module` to help you generating basic Angular components.

### Style guide

There are Prettier and ESLint configs in root folder, most editors should support them out of the box. If not, make sure to run `npm run eslint` before commiting.

### To Do

- [x] Live demo
- [ ] Drag'n'drop support (open local files)
- [ ] Download as SRT
- [ ] Add sample server output
- [ ] Support different dashcam log files
- [ ] Unit conversion
- [ ] Switch to better map library

## License

Released under the [MIT license](./LICENSE).
