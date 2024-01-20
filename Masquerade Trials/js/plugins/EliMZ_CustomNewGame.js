//============================================================================
// EliMZ_CustomNewGame.js
//============================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦1.4.2♦ Adds transfer to a new map in new game command.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-customnewgame-rpg-maker-mv/rate?source=game

@help 
★★★★★ Rate the plugin by clicking on the link above! 
Please, is very important to me ^^

● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

• Make the new game command on the title screen transfer the player to 
another map set on the plugin parameters.
• Skip the title screen when the game boots.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1ahDryhyrlQy7g-38GuWuQPF1sZ3R7SWz0LxY7FdCeho/edit?usp=sharing

============================================================================

@param skipTitle
@text Skip Title
@type boolean
@desc Set this to true if you want to skip the title screen by default.
@default true

@param destination
@text Destination
@type text
@desc The map ID and X Y position which the player will be transfered. Separate by comma.
@default 1, 1, 1

@param direction
@text Direction
@type select
@option 2-Down
@value 2
@option 4-Left
@value 4
@option 6-Right
@value 6
@option 8-Up
@value 8
@desc Choose the initial direction that the player will be facing after the transfer.
@default 2

@param fadeType
@text Fade Type
@type select
@option 0-Black
@value 0
@option 1-White
@value 1
@option 2-None
@value 2
@desc Choose the fade type that will be used for the transfer.
@default 0

@command cmd_setup
@text Start On Custom Map
@desc Execute a new game to start in the custom map. Useful in cases of evented title screens.

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CustomNewGame = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.CustomNewGame = {

    Parameters: class {
        constructor(parameters){
            const [mapId, x, y] = parameters.destination.split(",")
            this.skipTitle = parameters.skipTitle === "true"
            this.mapId = Number(mapId)
            this.x = Number(x)
            this.y = Number(y)
            this.direction = Number(parameters.direction)
            this.fadeType = Number(parameters.fadeType)
        }
    },
    customMapTransfer: false,

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters(Eli.PluginManager.getPluginName())
        this.parameters = new this.Parameters(parameters)
    },

    initPluginCommands(){
        const commands = ["cmd_setup"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    setSkipTitle(value){
        this.parameters.skipTitle = value
    },

    canSkipTitle(sceneClass){
        return this.parameters.skipTitle && sceneClass === Scene_Title
    },

    setCustomMapTransfer(value){
        this.customMapTransfer = value
    },

    canTransferToCustomMap(){
        return this.customMapTransfer && this.parameters.mapId > 0
    },

    getParam(){
        return this.parameters
    },

    cmd_setup(){
        this.setCustomMapTransfer(true)
        DataManager.setupNewGame()
    },

}

{

const Plugin = Eli.CustomNewGame
const Alias = {}

Plugin.initialize()

/* ------------------------------ SCENE MANAGER ----------------------------- */
Alias.SceneManager_goto = SceneManager.goto
SceneManager.goto = function(sceneClass) {
    if(Plugin.canSkipTitle(sceneClass)){
        Plugin.setSkipTitle(false)
        sceneClass = Scene_Map
    } 
    Alias.SceneManager_goto.call(this, sceneClass)
}

/* ------------------------------- GAME PLAYER ------------------------------ */
Alias.Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer
Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
    if(Plugin.canTransferToCustomMap()){
        this.reserveTransferToCustomNewGame()
    }else{
        Alias.Game_Player_reserveTransfer.call(this, mapId, x, y, d, fadeType)
    }
}

Game_Player.prototype.reserveTransferToCustomNewGame = function(){
    const {mapId, x, y, direction, fadeType} = Plugin.getParam()
    this._transferring = true
    this._newMapId = mapId
    this._newX = x
    this._newY = y
    this._newDirection = direction
    this._fadeType = fadeType
    Plugin.setCustomMapTransfer(false)
}

/* ------------------------------- SCENE TITLE ------------------------------ */
Alias.Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame
Scene_Title.prototype.commandNewGame = function() {
    Plugin.setCustomMapTransfer(true)
    Alias.Scene_Title_commandNewGame.call(this)
}

}