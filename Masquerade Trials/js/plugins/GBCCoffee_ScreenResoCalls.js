/*:
 * @url https://coffeenahc.itch.io/
 * @target MZ
 * @author coffeenahc (GBRO)
 * @plugindesc (v.1.0) Screen reso calls. Commissioned by ReiyaNox (Reddit)  
 * 
 * @help
 * Script calls:
 * 
 * Graphics.resizeScreen(width, height, scale) //scale is an optional parameter. You may omit it like so: Graphics.resizeScreen(400, 500);
 * Graphics.adjustScale(scale) //ie. Graphics.adjustScale(2)
 * Graphics.toggleFullScreen() //ie. Graphics.toggleFullScreen()
 * Graphics.toggleResizable(bool) //where bool is either true or false. ie. Graphics.toggleResizable(false)
 * 
 * Call this script call if you are changing resolutions from the map to force the map to reload:
 * $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer._x, $gamePlayer._y);
*/

Graphics.resizeScreen = function(width, height, s) {
    this.resize(width, height);
    this.adjustBoxSize(width, height);
    this.adjustScale(s);
    if (SceneManager._scene instanceof Scene_Map) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer._x, $gamePlayer._y);
    }
};

Graphics.adjustBoxSize = function(width, height) {
    const boxMargin = 4;
    this.boxWidth = width - boxMargin * 2;
    this.boxHeight = height - boxMargin * 2;
};

Graphics.adjustScale = function(s) {
    if (Utils.isNwjs()) {
        const scale = s || $dataSystem.advanced.screenScale;
        const xDelta = this.width * scale - window.innerWidth;
        const yDelta = this.height * scale - window.innerHeight;
        window.moveBy(-xDelta / 2, -yDelta / 2);
        window.resizeBy(xDelta, yDelta);
    }
    this._updateAllElements();
};

Graphics.toggleFullScreen = function() {
    if (this._isFullScreen()) {
        this._cancelFullScreen();
    } else {
        this._requestFullScreen();
    }
};

Graphics.toggleResizable = function(bool) {
    nw.Window.get().setResizable(bool)
};