//==========================================================================
// EliMZ_CameraManager.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦1.1.6♦ Enhances the default camera system!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-camera-manager-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

● Change between a smooth camera scroll or a default camera scroll.
● Control the smooth value as you want!
● Move the camera to a specific coordinate X Y or a character position 
using a speed value!
● Move the camera using a specific duration and easing effects!
● Focus the camera on a specific character or tile!
● Activate a Manual Control to the camera, so you can move it with 
directional inputs!
● Automatically turn on a switch when the camera is scrolling or when the 
Manual Control is on!
● Save origin points before moving the camera, so you can return the 
camera to it!
● Play a common event every time the camera finish scrolling!
● Optionally let the player move even if the camera is not focusing on 
him.
● “Unlock” the camera directions, individually, so the scroll is no 
longer limited to the end of the screen!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/13y3n3Jc5FpVpfR8HVFPjkP_e4K_wXcLVC9GYFRp268A/edit?usp=sharing

============================================================================

@param scrollSwitch
@text Scroll Switch
@type switch
@desc This switch will be turned ON, everytime the camera is scrolling.
@default 0

@param manualSwitch
@text Manual Control Switch
@type switch
@desc This switch will be turned ON, everytime the camera is on Manual Control.
@default 0

@param smoothScroll
@text Smooth Scroll
@type boolean
@desc If true, the camera will scroll smoothly
@default true

@param smoothSpeed
@text Smooth Speed
@type text
@desc The default smooth speed. Higher values mean more smooth. Leave 0 to match the character speed.
@default 10
@parent smoothScroll

@command cmd_speedScrollXY
@text Speed - Scroll To XY
@desc Move the camera like a character moves. By using Speed.

    @arg operation
    @text Operation Type
    @type select
    @option Instant
    @option Moving
    @desc Select the way you want for the camera to get into his destination.
    @default Moving 

    @arg destination
    @text Destination
    @type text
    @desc Separate X and Y by comma. Can use \v[id]
    @default 0, 0

    @arg speedAndFrequency
    @text Settings
    @type text
    @desc Separate Speed and Frequency by a comma. Can use \v[id].
    @default 6, 6

    @arg wait
    @text Wait
    @type boolean
    @desc If true, the interpreter will wait the camera finish scrolling.
    @default true

    @arg commonEventId
    @text Common Event
    @type common_event
    @desc Play a common event when the camera reach his destination.
    @default 0

    @arg saveOrigin
    @text Save Origin
    @type boolean
    @desc Save the origin point X Y before move.
    @default false

@command cmd_speedScrollCharacter
@text Speed - Scroll To Character
@desc Move the camera like a character moves. By using Speed.

    @arg operation
    @text Operation Type
    @type select
    @option Instant
    @option Moving
    @desc Select the way you want for the camera to get into his destination.
    @default Moving 

    @arg id
    @text Character Id
    @type text 
    @desc The id of the character. See Help File. Can use \v[id]
    @default -1

    @arg speedAndFrequency
    @text Settings
    @type text
    @desc Separate Speed and Frequency by a comma. Can use \v[id].
    @default 6, 6

    @arg wait
    @text Wait
    @type boolean
    @desc If true, the interpreter will wait the camera finish scrolling.
    @default true

    @arg commonEventId
    @text Common Event
    @type common_event
    @desc Play a common event when the camera reach his destination.
    @default 0

    @arg saveOrigin
    @text Save Origin
    @type boolean
    @desc Save the origin X Y before move.
    @default true

@command cmd_originSpeedScroll
@text Speed - Return to Origin 
@desc Return the camera to a origin point.

    @arg operation
    @text Operation Type
    @type select
    @option Instant
    @option Moving
    @desc Select the way you want for the camera to get into his destination.
    @default Moving 

    @arg speedAndFrequency
    @text Settings
    @type text
    @desc Separate Speed and Frequency by a comma. Can use \v[id].
    @default 6, 6

    @arg wait
    @text Wait
    @type boolean
    @desc If true, the interpreter will wait the camera finish scrolling.
    @default true

    @arg commonEventId
    @text Common Event
    @type common_event
    @desc Play a common event when the camera reach his destination.
    @default 0

@command cmd_durationScrollXY
@text Duration - Scroll To XY
@desc Move the camera using easing movement with a set duration.

    @arg destination
    @text Destination
    @type text
    @desc Separate X and Y by comma. Can use \v[id]
    @default 0, 0

    @arg duration
    @text Duration
    @type text
    @desc The amount of frames the camera needs to reach his destination. Can use \v[id]
    @default 30

    @arg easing
    @text Easing
    @type combo
    @option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic 
    @desc Choose the easing type. Can use \v[id].
    @default linear

    @arg wait
    @text Wait
    @type boolean
    @desc If true, the interpreter will wait the camera finish scrolling.
    @default true

    @arg commonEventId
    @text Common Event
    @type common_event
    @desc Play a common event when the camera reach his destination.
    @default 0

    @arg saveOrigin
    @text Save Origin
    @type boolean
    @desc Save the origin point X Y before move.
    @default false

@command cmd_durationScrollCharacter
@text Duration - Scroll To Character
@desc Move the camera using easing movement with a set duration.

    @arg id
    @text Character Id
    @type text 
    @desc The id of the character. See Help File. Can use \v[id]
    @default -1

    @arg duration
    @text Duration
    @type text
    @desc The amount of frames the camera needs to reach his destination. Can use \v[id]
    @default 30

    @arg easing
    @text Easing
    @type combo
    @option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic 
    @desc Choose the easing type. Can use \v[id].
    @default linear

    @arg wait
    @text Wait
    @type boolean
    @desc If true, the interpreter will wait the camera finish scrolling.
    @default true

    @arg commonEventId
    @text Common Event
    @type common_event
    @desc Play a common event when the camera reach his destination.
    @default 0

    @arg saveOrigin
    @text Save Origin
    @type boolean
    @desc Save the origin point X Y before move.
    @default false

@command cmd_originDurationScroll
@text Duration - Return to Origin
@desc Return the camera to a origin point using easing movement with a set duration.

    @arg duration
    @text Duration
    @type text
    @desc The amount of frames the camera needs to reach his destination. Can use \v[id]
    @default 30

    @arg easing
    @text Easing
    @type combo
    @option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic 
    @desc Choose the easing type. Can use \v[id].
    @default linear

    @arg wait
    @text Wait
    @type boolean
    @desc If true, the interpreter will wait the camera finish scrolling.
    @default true

    @arg commonEventId
    @text Common Event
    @type common_event
    @desc Play a common event when the camera reach his destination.
    @default 0

@command cmd_manualControl
@text Manual Control
@desc Change the value of the manual control property of the camera.

    @arg flag
    @text Change Control
    @type select
    @option Toggle
    @option Activate
    @option Deactivate
    @desc Set to true if you want to lock this scroll direction.
    @default Toggle

    @arg saveOrigin
    @text Save Origin
    @type boolean
    @desc Save the origin point X Y before move.
    @default true

@command cmd_smooth
@text Scroll Smooth
@desc The scroll smooth settings.

    @arg enable
    @text Enable Smooth
    @type boolean
    @desc Set to true if you want to enable smooth.
    @default true

    @arg speed
    @text Smooth Speed
    @type text
    @desc Higher values mean more smooth. Leave 0 to match the character speed.
    @default 20

@command cmd_playerOutFocus
@text Player Move Out Of Focus
@desc You can change to let the player move even when the camera is not focusing on it.

    @arg flag
    @text Behavior
    @type select
    @option Allow Movement
    @option Block Movement
    @option Toggle
    @desc Choose the behavior of the player when the camera is not focused on him.
    @default Allow Movement

@command cmd_screenLimit
@text Screen Scroll Limit
@desc Choose the directions you want to remove the scroll limit.

    @arg down
    @text Down
    @type boolean
    @desc Set to true if you want to lock this scroll direction.
    @default true

    @arg left
    @text Left
    @type boolean
    @desc Set to true if you want to lock this scroll direction.
    @default true

    @arg right
    @text Right
    @type boolean
    @desc Set to true if you want to lock this scroll direction.
    @default true

    @arg up
    @text Up
    @type boolean
    @desc Set to true if you want to lock this scroll direction.
    @default true

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CameraManager = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
function Game_Camera() {
    this.initialize(...arguments)
}

Eli.CameraManager = {

    Parameters: class {
        constructor(parameters){
            this.scrollSwitch = Number(parameters.scrollSwitch)
            this.manualControlSwitch = Number(parameters.manualSwitch)
            this.smoothScroll = parameters.smoothScroll === "true"
            this.smoothSpeed = Number(parameters.smoothSpeed)
        }
    },
    character: null,
    commonEventId: 0,
    controlCharacter: false,
    dirTable: {
        1: [4, 2],
        3: [6, 2],
        7: [4, 8],
        9: [6, 8],
    },

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){
        const parameters = PluginManager.parameters(Eli.PluginManager.getPluginName())
        this.parameters = new this.Parameters(parameters)
    },

    initPluginCommands(){
        const commands = [
            "cmd_speedScrollXY", "cmd_speedScrollCharacter", "cmd_durationScrollXY", 
            "cmd_durationScrollCharacter", "cmd_screenLimit", "cmd_manualControl",
            "cmd_originDurationScroll", "cmd_originSpeedScroll", "cmd_smooth",
            "cmd_playerOutFocus"
        ]
        Eli.PluginManager.registerCommands(this, commands)
    },

    getParam(){
        return this.parameters
    },

    getCharacterOnCamera(){
        return this.character
    },

    getGameCamera(){
        return $eliData.contents.camera
    },

    refreshCameraCharacter(id){
        this.character = this.getMapCharacter(id)
    },

    getMapCharacter(id) {
        if(id === "camera"){
            return this.getGameCamera()
        }else{
            return Eli.Utils.getMapCharacter(id)
        }
    },

    cmd_speedScrollXY(args){
        const [x, y] = Eli.PluginManager.parseVariables(args.destination).split(",").map(coordinate => Number(coordinate))
        const [speed, frequency] = Eli.PluginManager.parseVariables(args.speedAndFrequency).split(",").map(data => Number(data))
        const commonEventId = Number(Eli.PluginManager.parseVariables(args.commonEventId))
        const wait = args.wait === "true"
        const targetId = args.id || "camera"
        const gameCamera = this.getGameCamera()

        if(args.saveOrigin === "true"){
            gameCamera.originX = gameCamera.x
            gameCamera.originY = gameCamera.y
            gameCamera.originId = gameCamera.id
        }

        if(args.operation === "Instant"){
            this.getGameCamera().setFocusToTile(x, y, speed, frequency, targetId)
        }else{
            this.getGameCamera().scrollToTile(x, y, speed, frequency, targetId)
        }

        if(commonEventId > 0){
            this.commonEventId = commonEventId
        }

        if(wait){
            Eli.PluginManager.currentInterpreter.setWaitMode("camera")
        }
    },

    cmd_speedScrollCharacter(args){
        const id = Eli.PluginManager.parseVariables(args.id)
        const char = Eli.Utils.getMapCharacter(id)

        if(char){
            
            args.id = id
            args.destination = `${char.x}, ${char.y}`

            if(args.saveOrigin === "true"){
                const gameCamera = this.getGameCamera()
                gameCamera.originX = gameCamera.x
                gameCamera.originY = gameCamera.y
                gameCamera.originId = gameCamera.id
            }

            this.cmd_speedScrollXY(args)
        }
    },

    cmd_originSpeedScroll(args){
        const gameCamera = this.getGameCamera()
        const isValidOriginPoint = $gameMap.isValid(gameCamera.originX, gameCamera.originY)

        if(isValidOriginPoint){
            args.destination = `${gameCamera.originX},${gameCamera.originY}`
            args.saveOrigin = "false"
            args.id = gameCamera.originId
    
            this.cmd_speedScrollXY(args)
        }
    },

    cmd_durationScrollXY(args){
        const [x, y] = Eli.PluginManager.parseVariables(args.destination).split(",").map(coordinate => Number(coordinate))
        const duration = Number(Eli.PluginManager.parseVariables(args.duration)) || 1
        const commonEventId = Number(Eli.PluginManager.parseVariables(args.commonEventId))
        const wait = args.wait === "true"
        const targetId = args.id || "camera"
        const easing = Eli.PluginManager.parseVariables(args.easing)
        const gameCamera = this.getGameCamera()

        if(args.saveOrigin === "true"){
            gameCamera.originX = gameCamera.x
            gameCamera.originY = gameCamera.y
            gameCamera.originId = gameCamera.id
        }

        gameCamera.createAnime(x, y, duration, easing, targetId)

        if(commonEventId > 0){
            this.commonEventId = commonEventId
        }

        if(wait){
            Eli.PluginManager.currentInterpreter.setWaitMode("camera")
        }
    },

    cmd_durationScrollCharacter(args){
        const id = Eli.PluginManager.parseVariables(args.id)
        const char = Eli.Utils.getMapCharacter(id)

        if(char){
            args.id = id
            args.destination = `${char.x}, ${char.y}`

            if(args.saveOrigin === "true"){
                const gameCamera = this.getGameCamera()
                gameCamera.originX = gameCamera.x
                gameCamera.originY = gameCamera.y
                gameCamera.originId = gameCamera.id
            }

            this.cmd_durationScrollXY(args)
        }
    },

    cmd_originDurationScroll(args){
        const gameCamera = this.getGameCamera()
        const isValidOriginPoint = $gameMap.isValid(gameCamera.originX, gameCamera.originY)

        if(isValidOriginPoint){
            args.destination = `${gameCamera.originX},${gameCamera.originY}`
            args.saveOrigin = "false"
            args.id = gameCamera.originId
    
            this.cmd_durationScrollXY(args)
        }
    },

    cmd_manualControl(args){
        const gameCamera = this.getGameCamera()
        const value = args.flag === "Toggle" ? !gameCamera.manualControl : args.flag === "Activate"

        if(args.saveOrigin === "true"){
            gameCamera.originX = gameCamera.x
            gameCamera.originY = gameCamera.y
            gameCamera.originId = gameCamera.id
        }

        if(value){
            gameCamera.setId("camera")
        }

        gameCamera.manualControl = value
        $gameSwitches.setValue(this.getParam().manualControlSwitch, gameCamera.manualControl)
    },

    cmd_playerOutFocus(args){
        const gameCamera = this.getGameCamera()
        const value = args.flag === "Toggle" ? !gameCamera.playerMoveOutFocus : args.flag === "Allow Movement"

        gameCamera.playerMoveOutFocus = value
    },

    cmd_smooth(args){
        const gameCamera = this.getGameCamera()
        gameCamera.smoothScroll = args.enable === "true"
        gameCamera.smoothSpeed = Number(args.speed)
    },

    cmd_screenLimit(args){
        this.getGameCamera().screenLocked = {
            left: args.left === "true",
            down: args.down === "true",
            right: args.right === "true",
            up: args.up === "true",
        }
    },
}

{
const Plugin = Eli.CameraManager
const Alias = {}

Plugin.initialize()

Alias.Graphics_onPixiSetup = Graphics.onPixiSetup
Graphics.onPixiSetup = function() {
    PIXI.settings.ROUND_PIXELS = true
    Alias.Graphics_onPixiSetup.call(this)
}

/* ------------------------------ DATA MANAGER ------------------------------ */
Alias.DataManager_createGameObjects = DataManager.createGameObjects
DataManager.createGameObjects = function() {
    Alias.DataManager_createGameObjects.call(this)
    $eliData.contents.camera = new Game_Camera()
}

/* ------------------------------- GAME SYSTEM ------------------------------ */
Alias.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad
Game_System.prototype.onAfterLoad = function() {
    Plugin.refreshCameraCharacter(Plugin.getGameCamera().id)
    Alias.Game_System_onAfterLoad.call(this)
}

/* -------------------------------- GAME MAP -------------------------------- */
Alias.Game_Map_setupScroll = Game_Map.prototype.setupScroll
Game_Map.prototype.setupScroll = function() {
    this.setupCamera()
    Alias.Game_Map_setupScroll.call(this)
}

Game_Map.prototype.setupCamera = function() {
    Plugin.getGameCamera().setId(-1)
}

Alias.Game_Map_updateEvents = Game_Map.prototype.updateEvents
Game_Map.prototype.updateEvents = function() {
    Alias.Game_Map_updateEvents.call(this)
    Plugin.getGameCamera().update()
}

Alias.Game_Map_scrollDown = Game_Map.prototype.scrollDown
Game_Map.prototype.scrollDown = function(distance) {
    if(Plugin.getGameCamera().screenLocked.down){
        Alias.Game_Map_scrollDown.call(this, distance)
    }else{
        this.scrollDownUnlocked(distance)
    }
}

Game_Map.prototype.scrollDownUnlocked = function(distance) {
    const lastY = this._displayY
    const newDisplayY = this._displayY + distance
    const limit = this.height() + this.screenTileY()

    this._displayY = Math.min(newDisplayY, limit)
    this._parallaxY += this._displayY - lastY
}

Alias.Game_Map_scrollLeft = Game_Map.prototype.scrollLeft
Game_Map.prototype.scrollLeft = function(distance) {
    if(Plugin.getGameCamera().screenLocked.left){
        Alias.Game_Map_scrollLeft.call(this, distance)
    }else{
        this.scrollLeftUnlocked(distance)
    }
}

Game_Map.prototype.scrollLeftUnlocked = function(distance) {
    const lastX = this._displayX
    const newDisplayX = this._displayX - distance
    const limit = -this.screenTileX()

    this._displayX = Math.max(newDisplayX, limit)
    this._parallaxX += this._displayX - lastX
}

Alias.Game_Map_scrollRight = Game_Map.prototype.scrollRight
Game_Map.prototype.scrollRight = function(distance) {
    if(Plugin.getGameCamera().screenLocked.right){
        Alias.Game_Map_scrollRight.call(this, distance)
    }else{
        this.scrollRightUnlocked(distance)
    }
}

Game_Map.prototype.scrollRightUnlocked = function(distance) {
    const lastX = this._displayX
    const newX = this._displayX + distance
    const limit = this.width() + this.screenTileX()

    this._displayX = Math.min(newX, limit)
    this._parallaxX += this._displayX - lastX
}

Alias.Game_Map_scrollUp = Game_Map.prototype.scrollUp
Game_Map.prototype.scrollUp = function(distance) {
    if(Plugin.getGameCamera().screenLocked.up){
        Alias.Game_Map_scrollUp.call(this, distance)
    }else{
        this.scrollUpUnlocked(distance)
    }
}

Game_Map.prototype.scrollUpUnlocked = function(distance) {
    const lastY = this._displayY
    const newY = this._displayY - distance
    const limit = -this.screenTileY()

    this._displayY = Math.max(newY, limit)
    this._parallaxY += this._displayY - lastY
}

/* --------------------------- GAME CHARACTER BASE -------------------------- */
Alias.Game_CharacterBase_locate = Game_CharacterBase.prototype.locate
Game_CharacterBase.prototype.locate = function(x, y) {
    Alias.Game_CharacterBase_locate.call(this, x, y)

    if(this.isCameraFocus() || this.getSpriteId() === "camera"){
        this.center(x, y)
    }
}

Game_CharacterBase.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
    if(Plugin.getGameCamera().smoothScroll){ // Smooth
        this.updateSmoothScroll(lastScrolledX, lastScrolledY)
    }else{
        this.updateDefaultScroll(lastScrolledX, lastScrolledY)
    }
}

Game_CharacterBase.prototype.updateSmoothScroll = function(lastScrolledX, lastScrolledY){
    const speed = Plugin.getGameCamera().smoothSpeed || this.realMoveSpeed()

    if(lastScrolledY > this.centerY()){
        const distance = (lastScrolledY - this.centerY()) / speed
        $gameMap.scrollDown(distance)
    }

    if(lastScrolledX < this.centerX()){
        const distance = (this.centerX() - lastScrolledX) / speed
        $gameMap.scrollLeft(distance)
    }

    if(lastScrolledX > this.centerX()){
        const distance = (lastScrolledX - this.centerX()) / speed
        $gameMap.scrollRight(distance)
    }
    
    if(lastScrolledY < this.centerY()){
        const distance = (this.centerY() - lastScrolledY) / speed
        $gameMap.scrollUp(distance)
    }
}

Game_CharacterBase.prototype.updateDefaultScroll = function(lastScrolledX, lastScrolledY){
    const x1 = lastScrolledX
    const y1 = lastScrolledY
    const x2 = this.scrolledX()
    const y2 = this.scrolledY()

    if(y2 > y1 && y2 > this.centerY()){
        $gameMap.scrollDown(y2 - y1)
    }

    if(x2 < x1 && x2 < this.centerX()){
        $gameMap.scrollLeft(x1 - x2)
    }

    if(x2 > x1 && x2 > this.centerX()){
        $gameMap.scrollRight(x2 - x1)
    }

    if(y2 < y1 && y2 < this.centerY()){
        $gameMap.scrollUp(y1 - y2)
    }
}

Game_CharacterBase.prototype.centerX = function() {
    return ($gameMap.screenTileX() - 1) / 2;
}

Game_CharacterBase.prototype.centerY = function() {
    return ($gameMap.screenTileY() - 1) / 2;
}

Game_CharacterBase.prototype.center = function(x, y) {
    return $gameMap.setDisplayPos(x - this.centerX(), y - this.centerY());
}

Game_CharacterBase.prototype.isCameraFocus = function() {
    return Plugin.getGameCamera().id == this.getSpriteId()
}

Game_CharacterBase.prototype.updateCamera = function(lastScrolledX, lastScrolledY) {
    if(this.isCameraFocus()){
        this.onCameraFocusUpdate(lastScrolledX, lastScrolledY)
    }
}

Game_CharacterBase.prototype.onCameraFocusUpdate = function(lastScrolledX, lastScrolledY) {
    Plugin.getGameCamera().copyPosition(this)
    this.updateScroll(lastScrolledX, lastScrolledY)
}

/* ------------------------------- GAME EVENT ------------------------------- */
Alias.Game_Event_update = Game_Event.prototype.update
Game_Event.prototype.update = function() {
    const lastScrolledX = this.scrolledX()
    const lastScrolledY = this.scrolledY()

    Alias.Game_Event_update.call(this)
    this.updateCamera(lastScrolledX, lastScrolledY)
}

/* ------------------------------- GAME PLAYER ------------------------------ */
Alias.Game_Player_updateScroll = Game_Player.prototype.updateScroll
Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
    if(this.isCameraFocus()){
        Plugin.getGameCamera().copyPosition(this)
        Game_CharacterBase.prototype.updateScroll.call(this, lastScrolledX, lastScrolledY)
    }
}

Game_Player.prototype.canMoveOutOfFocus = function() {
    return !this.isCameraFocus() && !Plugin.getGameCamera().playerMoveOutFocus
}

Alias.Game_Player_canMove = Game_Player.prototype.canMove
Game_Player.prototype.canMove = function() {
    if(Plugin.getGameCamera().isOnManualControl()){
        return false
    }
    if(Plugin.getGameCamera().isScrolling()){
        return false
    }
    if(this.canMoveOutOfFocus()){
        return false
    }
    return Alias.Game_Player_canMove.call(this)
}

/* ------------------------------ GAME FOLLOWER ----------------------------- */
Alias.Game_Follower_update = Game_Follower.prototype.update
Game_Follower.prototype.update = function() {
    const lastScrolledX = this.scrolledX()
    const lastScrolledY = this.scrolledY()

    Alias.Game_Follower_update.call(this)
    this.updateCamera(lastScrolledX, lastScrolledY)
}

/* ------------------------------ GAME FOLLOWER ----------------------------- */
Alias.Game_Vehicle_update = Game_Vehicle.prototype.update
Game_Vehicle.prototype.update = function() {
    const lastScrolledX = this.scrolledX()
    const lastScrolledY = this.scrolledY()

    Alias.Game_Vehicle_update.call(this)
    this.updateCamera(lastScrolledX, lastScrolledY)
}

/* ------------------------------- GAME CAMERA ------------------------------ */


/* ---------------------------- GAME INTERPRETER ---------------------------- */
Alias.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode
Game_Interpreter.prototype.updateWaitMode = function() {
    if(this._waitMode === "camera"){
        if(Plugin.getGameCamera().isScrolling()){
            return true
        }else{
            this._waitMode = ""
        }
    }

    return Alias.Game_Interpreter_updateWaitMode.call(this)
}

/* ----------------------------- SPRITESET MAPX ----------------------------- */
Alias.Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters
Spriteset_Map.prototype.createCharacters = function() {
    Alias.Spriteset_Map_createCharacters.call(this)
    this.createCamera()
}

Spriteset_Map.prototype.createCamera = function() {
    const sprite = new Sprite_Character(Plugin.getGameCamera())
    Eli.Utils.spriteCharacters["camera"] = sprite
    this._characterSprites.push(sprite)
    this._tilemap.addChild(sprite)
}

Alias.Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap
Spriteset_Map.prototype.updateTilemap = function() {
    Alias.Spriteset_Map_updateTilemap.call(this)
    this._tilemap.origin.x = Math.floor(this._tilemap.origin.x)
    this._tilemap.origin.y = Math.floor(this._tilemap.origin.y)
}

/* -------------------------------- SCENE MAP ------------------------------- */
Alias.Scene_Map_isMenuEnabled = Scene_Map.prototype.isMenuEnabled
Scene_Map.prototype.isMenuEnabled = function() {
    return Alias.Scene_Map_isMenuEnabled.call(this) && !Plugin.getGameCamera().isScrolling()
}

Game_Camera.prototype = Object.create(Game_Character.prototype)
Game_Camera.prototype.constructor = Game_Camera

Alias.Game_Camera_initMembers = Game_Camera.prototype.initMembers
Game_Camera.prototype.initMembers = function() {
    Alias.Game_Camera_initMembers.call(this)
    this.initCameraMembers()
}

Game_Camera.prototype.initCameraMembers = function() {
    this._moveSpeed = 6
    this._moveFrequency = 6
    
    // news
    this.originX = -1
    this.originY = -1
    this.originId = -1
    this.animeGroup = null
    this.oldMoveSpeed = 6
    this.oldMoveFrequency = 6
    this.id = -1
    this.targetId = "camera"
    this.targetX = -1
    this.targetY = -1
    this.scrolling = false
    this.manualControl = false
    this.smoothScroll = Eli.CameraManager.getParam().smoothScroll
    this.smoothSpeed = Eli.CameraManager.getParam().smoothSpeed
    this.playerMoveOutFocus = false
    this.controlCharacter = false
    this.screenLocked = {
        down: true,
        left: true,
        right: true,
        up: true,
    }
}

Game_Camera.prototype.getGlobalKey = function() {
    return "Camera"
}

Game_Camera.prototype.getMapSprite = function() {
    return Eli.Utils.spriteCharacters[this.getSpriteId()]
}

Game_Camera.prototype.canMove = function() {
    if($gameMap.isEventRunning() || $gameMessage.isBusy()){
        return false
    }
    if(this.isMoveRouteForcing()){
        return false
    }
    if(!this.isOnManualControl()){
        return false
    }
    if(this.isScrolling()){
        return false
    }
    if(this.isMoving()){
        return false
    }
    return true
}

Game_Camera.prototype.setId = function(id) {
    this.id = id
    Eli.CameraManager.refreshCameraCharacter(id)
}

Game_Camera.prototype.getSpriteId = function() {
    return "camera"
}

Game_Camera.prototype.isOnManualControl = function() {
    return this.manualControl
}

Game_Camera.prototype.moveToTile = function(x, y) {
    const sx = this.deltaXFrom(x)
    const sy = this.deltaYFrom(y)
    const horDir = sx > 0 ? 4 : 6
    const vertDir = sy > 0 ? 8 : 2
    
    if(sx !== 0 && sy !== 0){
        this.moveDiagonally(horDir, vertDir)

    }else if (sx !== 0){
        this.moveStraight(horDir)

    }else if (sy !== 0){
        this.moveStraight(vertDir)
    }
}

Alias.Game_Camera_setMoveSpeed = Game_Camera.prototype.setMoveSpeed
Game_Camera.prototype.setMoveSpeed = function(speed){
    this.oldMoveSpeed = this.moveSpeed()
    Alias.Game_Camera_setMoveSpeed.call(this, speed)
}

Alias.Game_Camera_isDashing = Game_Camera.prototype.isDashing
Game_Camera.prototype.isDashing = function() {
    if(this.isCameraFocus() && this.isOnManualControl()){
        return Input.isPressed("shift")
    }else{
        return Alias.Game_Camera_isDashing.call(this)
    }
}

// Overwrite
Game_Camera.prototype.canPass = function(x, y, d) {
    const x2 = $gameMap.roundXWithDirection(x, d)
    const y2 = $gameMap.roundYWithDirection(y, d)

    if(!$gameMap.isValid(x2, y2)){
        return false
    }
    
    return true
}

/* ------------------------------ ANIME SCROLL ------------------------------ */
Game_Camera.prototype.createAnime = function(x, y, duration, easing, targetId) {
    const props = this.createAnimeProps(x, y)
    const defaultData = this.createAnimeDefaultData(duration, easing)
    const animations = Eli.AnimeManager.createAnimations(this, props, defaultData)

    this.setMoveSpeed(1)
    this.setId("camera")
    this.targetId = targetId
    this.animeGroup = new Eli.AnimeGroup(animations, {paused: false})
    this.animeGroup.setAnimations(animations)
    this.animeGroup.onStart = this.onAnimeGroupStart.bind(this)
    this.animeGroup.onUpdate = this.onAnimeGroupUpdate.bind(this)
    this.animeGroup.onComplete = this.onAnimeGroupComplete.bind(this)
    this.animeGroup.play("normal")
}

Game_Camera.prototype.createAnimeProps = function(targetX, targetY){
    const initialX = this._realX
    const initialY = this._realY

    return {
        _realX: {value: [initialX, targetX]},
        _realY: {value: [initialY, targetY]},
    }
}

Game_Camera.prototype.createAnimeDefaultData = function(duration, easing){
    const defaultData = Eli.AnimeManager.createDefaultData()
    defaultData.autoPlay = false
    defaultData.duration = duration
    defaultData.easing = easing
    defaultData.direction = "normal"

    return defaultData
}

Game_Camera.prototype.onAnimeGroupStart = function(anime){
    $gameSwitches.setValue(Eli.CameraManager.getParam().scrollSwitch, true)
    this.scrolling = true
}

Game_Camera.prototype.onAnimeGroupUpdate = function(anime){
    this.scrolling = true
}

Game_Camera.prototype.onAnimeGroupComplete = function(anime){
    this._realX = Math.round(this._realX)
    this._realY = Math.round(this._realY)
    this._x = this._realX
    this._y = this._realY
    this.setMoveSpeed(this.oldMoveSpeed)
    this.onScrollDestination()
}
    
/* ------------------------------ INSTANT FOCUS ----------------------------- */
Game_Camera.prototype.setFocusToTile = function(x, y, speed, frequency, targetId = "camera") {
    this.targetId = targetId
    this.setId("camera")
    this.locate(x, y)
    this.setMoveSpeed(speed || 4)
    this.setMoveFrequency(frequency || 6)

    this.onScrollDestination()
}
    
/* --------------------------------- SCROLL --------------------------------- */
Game_Camera.prototype.scrollToTile = function(x, y, speed, frequency, targetId = "camera") {
    this.setId("camera")
    this.setMoveSpeed(speed || 6)
    this.setMoveFrequency(frequency || 6)
    this.targetId = targetId
    this.targetX = x
    this.targetY = y
    this.scrolling = true
    $gameSwitches.setValue(Eli.CameraManager.getParam().scrollSwitch, true)
}

/* --------------------------- SCROLL DESTINATION --------------------------- */
Game_Camera.prototype.onScrollDestination = function(){
    this.setId(this.targetId)
    this.resetStatus()
    this.checkCommonEventId()
}
    
Game_Camera.prototype.checkCommonEventId = function(){
    if(Eli.CameraManager.commonEventId){
        $gameTemp.reserveCommonEvent(Eli.CameraManager.commonEventId)
        Eli.CameraManager.commonEventId = 0
    }
}

Game_Camera.prototype.resetStatus = function(){
    this.targetX = -1
    this.targetY = -1
    this.targetId = "camera"
    this.scrolling = false
    this.animeGroup = null
    $gameSwitches.setValue(Eli.CameraManager.getParam().scrollSwitch, false)
}

/* --------------------------------- UPDATE --------------------------------- */
Alias.Game_Camera_update = Game_Camera.prototype.update
Game_Camera.prototype.update = function(){
    const lastScrolledX = this.scrolledX()
    const lastScrolledY = this.scrolledY()

    Alias.Game_Camera_update.call(this)

    if(this.isCameraFocus()){

        if(this.isScrolling()){
            this.updateScrolling()
        }else{
            this.updateNonScrolling()
        }

        this.updateScroll(lastScrolledX, lastScrolledY)
    }
}

Game_Camera.prototype.isScrolling = function(){
    return this.scrolling
}

Game_Camera.prototype.updateScrolling = function(){
    if(this.canUpdateEasingScroll()){
        this.animeGroup.update()

    }else if(this.canUpdateStandardScroll()){
        this.updateStandardScroll()
    }
}

Game_Camera.prototype.canUpdateEasingScroll = function(){
    return !!this.animeGroup
}

Game_Camera.prototype.canUpdateStandardScroll = function(){
    return !this.isMoving() && this.targetX > -1
}

Game_Camera.prototype.updateStandardScroll = function(){
    if(this.pos(this.targetX, this.targetY)){
        this.onScrollDestination()
    }else{
        this.moveToTile(this.targetX, this.targetY)
    }
}

Game_Camera.prototype.updateNonScrolling = function(){
    if(this.canMove()){
        this.moveByInput()
    }
}

/* ----------------------------- MANUAL CONTROL ----------------------------- */
Game_Camera.prototype.moveByInput = function() {
    let direction = this.getInputDirection()

    if(direction > 0){
        $gameTemp.clearDestination()

    }else if($gameTemp.isDestinationValid()) {
        const x = $gameTemp.destinationX()
        const y = $gameTemp.destinationY()

        direction = this.findDirectionTo(x, y)
    }

    if(direction > 0){
        this.executeMove(direction)
    }
}
    
Game_Camera.prototype.executeMove = function(direction) {
    if([1, 3, 7, 9].includes(direction)){
        const dirTable = Eli.CameraManager.dirTable[direction]
        this.moveDiagonally(...dirTable)

    }else{
        this.moveStraight(direction)
    }
}

Game_Camera.prototype.getInputDirection = function() {
    return Input.dir8 || Input.dir4
}

Game_Camera.prototype.isControlingCharacter = function(){
    return this.controlCharacter
}

Game_Camera.prototype.isControllingEvent = function(){
    return this.isControlingCharacter() && Eli.CameraManager.getCharacterOnCamera().constructor.name === "Game_Event"
}

Game_Camera.prototype.isControllingFollower = function(){
    return this.isControlingCharacter() && Eli.CameraManager.getCharacterOnCamera().constructor.name === "Game_Follower"
}

Game_Camera.prototype.isControllingVehicle = function(){
    return this.isControlingCharacter() && Eli.CameraManager.getCharacterOnCamera().constructor.name === "Game_Vehicle"
}

}