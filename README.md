piSwitcher
==========

A simple interface for controlling Raspberry Pi PiFace outputs over socket.io

Installation
--

1. Have node.js, 0.12 or more...
2. Clone repo
3. Run `npm install` in directory
4. Run `npm install --global bower` and `bower install` to pull client libraries
5. `node app.js` to launch
6. Visit http://localhost:9000 to try out

NOTE: By default, the piface will be stubbed so you don't need a Rasppi to test this. To run on a device with a PiFace, run `NODE_ENV=production node app.js`


Demo
--

![Demo Gif](https://raw.githubusercontent.com/Swingline0/piSwitcher/master/piSwitcher-demo.gif)

Haha, turns out there's a bug with this that I only realized after making this GIF. See if you can find it!
