//==========================================================================
// EliMZ_ControlEvents.js
//==========================================================================

/*:
@target MZ
@base EliMZ_CameraManager
@orderAfter EliMZ_CameraManager
@orderAfter EliMZ_DiagonalMovement
@orderAfter EliMZ_JumpSystem
@orderAfter EliMZ_PlatformEventPro

@plugindesc ♦1.1.0♦ Control events, followers, and vehicle by input, just like the player!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-control-events-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^

● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
============================================================================
Features
============================================================================

● Let you control characters with movement input, just like you can do with 
the player.
● Support events, vehicles, and followers!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1Mi1QAkuJMXTXRem5UWbavqDTQhS6DMmElewk0LdNeMs/edit?usp=sharing

============================================================================

@param varControlCharId
@text Variable Control Char Id
@type variable
@desc This variable will store the character ID that is being controlled.
@default 0

@param controlSwitch
@text Control Char Switch
@type switch
@desc This switch will be turned ON, everytime the camera is controlling a character.
@default 0

@param eventSwitch
@text Control Event Switch
@type switch
@desc This switch will be turned ON, everytime the camera is controlling a event.
@default 0

@param followerSwitch
@text Control Follower Switch
@type switch
@desc This switch will be turned ON, everytime the camera is controlling a follower.
@default 0

@param vehicleSwitch
@text Control Vehicle Switch
@type switch
@desc This switch will be turned ON, everytime the camera is controlling a vehicle.
@default 0

@command cmd_controlCharacter
@text Control Character
@desc

    @arg flag
    @text Flag
    @type select
    @option Enable
    @option Disable
    @option Toggle
    @desc Enable/Disable or Toggle the control of the character.
    @default Enable

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_ControlEvents = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.ControlEvents = {

    Parameters: class {
        constructor(parameters){
            this.varControlCharId = Number(parameters.varControlCharId)
            this.controlSwitch = Number(parameters.controlSwitch)
            this.eventSwitch = Number(parameters.eventSwitch)
            this.followerSwitch = Number(parameters.followerSwitch)
            this.vehicleSwitch = Number(parameters.vehicleSwitch)
        }
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
        const commands = ["cmd_controlCharacter"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    getParam(){
        return this.parameters
    },

    cmd_controlCharacter(args){
        const gameCamera = Eli.CameraManager.getGameCamera()
        const value = args.flag === "Toggle" ? !gameCamera.controlCharacter : args.flag === "Enable"
        const cameraChar = Eli.CameraManager.getCharacterOnCamera()
        const charType = cameraChar.constructor.name
        let charId = 0

        if(value){
            
            if(charType === "Game_Vehicle" || charType === "Game_Camera"){
                charId = cameraChar.getSpriteId()
            }else{
                charId = Number(cameraChar.getSpriteId())
            }
        }

        gameCamera.controlCharacter = value
        $gameVariables.setValue(this.getParam().varControlCharId, charId)
        $gameSwitches.setValue(this.getParam().controlSwitch, value)
        $gameSwitches.setValue(this.getParam().eventSwitch, value && charType === "Game_Event")
        $gameSwitches.setValue(this.getParam().followerSwitch, value && charType === "Game_Follower")
        $gameSwitches.setValue(this.getParam().vehicleSwitch, value && charType === "Game_Vehicle")
    },
    
}

{

const Plugin = Eli.ControlEvents
const Alias = {}

Plugin.initialize()

/* --------------------------- GAME CHARACTER BASE -------------------------- */
Game_CharacterBase.prototype.executeMove = function(direction) {
    Game_Player.prototype.executeMove.call(this, direction)
}

Game_CharacterBase.prototype.getInputDirection = function() {
    return Game_Player.prototype.getInputDirection.call(this)
}

Game_CharacterBase.prototype.canMove = function() {
    return Game_Player.prototype.canMove.call(this)
}

Game_CharacterBase.prototype.canMoveOutOfFocus = function() {
    return Game_Player.prototype.canMoveOutOfFocus.call(this)
}

Game_CharacterBase.prototype.isDashButtonPressed = function() {
    return Game_Player.prototype.isDashButtonPressed.call(this)
}

Game_CharacterBase.prototype.areFollowersGathering = function() {
    return false
}

Game_CharacterBase.prototype.isInVehicle = function() {
    return false
}

Game_CharacterBase.prototype.vehicle = function() {
    return null
}

Game_CharacterBase.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove() && !this.isJumping()) {
        let direction = this.getInputDirection()

        if(direction > 0){
            $gameTemp.clearDestination()

        }else if($gameTemp.isDestinationValid()){
            const x = $gameTemp.destinationX()
            const y = $gameTemp.destinationY()
            direction = this.findDirectionTo(x, y)
        }

        if(direction > 0){
            this.executeMove(direction)
        }
    }
}

Alias.Game_CharacterBase_isDashing = Game_CharacterBase.prototype.isDashing
Game_CharacterBase.prototype.isDashing = function() {
    if(this.isBeingControlledByCamera()){
        return this.isDashButtonPressed() && !$gameMap.isDashDisabled()
    }else{
        return Alias.Game_CharacterBase_isDashing.call(this)
    }
}

Game_CharacterBase.prototype.isBeingControlledByCamera = function() {
    return this.isCameraFocus() && Eli.CameraManager.getGameCamera().isControlingCharacter()
}

/* ------------------------------- GAME PLAYER ------------------------------ */
Alias.Game_Player_moveByInput = Game_Player.prototype.moveByInput
Game_Player.prototype.moveByInput = function() {
    if(this.canMoveCharacterByInput()){
        this.moveCharacterByInput()
    }else{
        Alias.Game_Player_moveByInput.call(this)
    }
}

Game_Player.prototype.canMoveCharacterByInput = function() {
    const camera = Eli.CameraManager.getGameCamera()
    return  !this.isCameraFocus() && camera.id != "camera" && 
            camera.isControlingCharacter()
}

Game_Player.prototype.moveCharacterByInput = function() {
    const char = Eli.CameraManager.getCharacterOnCamera()
    char.moveByInput()
}

Alias.Game_Player_isDashing = Game_Player.prototype.isDashing
Game_Player.prototype.isDashing = function() {
    if(Eli.CameraManager.getGameCamera().isControllingFollower()){
        return this.isDashButtonPressed() && !$gameMap.isDashDisabled()
    }else{
        return Alias.Game_Player_isDashing.call(this)
    }
}

Game_Player.prototype.isBeingControlledByCamera = function() {
    return this.isCameraFocus()
}

/* ------------------------------- JUMP SYSTEM ------------------------------ */
if(Imported.Eli_JumpSystem){

    Game_CharacterBase.prototype.canUpdateJumpByButton = function(){
        return Game_Player.prototype.canUpdateJumpByButton.call(this)
    }
    
    Game_CharacterBase.prototype.isJumpButtonPressed = function(){
        return Game_Player.prototype.isJumpButtonPressed.call(this)
    }
    
    Game_CharacterBase.prototype.updateJumpByButton = function(){
        Game_Player.prototype.updateJumpByButton.call(this)
    }
    
    Game_CharacterBase.prototype.isJumpAllowed = function(){
        const blockSwitch = Eli.JumpSystem.isJumpDisabled()

        return !blockSwitch && this.canMove() && !this.isJumping()
    }
    
    Game_CharacterBase.prototype.jumpValue = function(){
        return Game_Player.prototype.jumpValue.call(this)
    }
    
    Game_CharacterBase.prototype.getJumpImpulse = function(){
        return Game_Player.prototype.getJumpImpulse.call(this)
    }
    
    Game_CharacterBase.prototype.getJumpImpulseType = function(){
        return Game_Player.prototype.getJumpImpulseType.call(this)
    }

    Alias.Game_CharacterBase_calculateJumpDistance = Game_CharacterBase.prototype.calculateJumpDistance
    Game_CharacterBase.prototype.calculateJumpDistance = function(value){
        if(this.isBeingControlledByCamera()){
            return Game_Player.prototype.calculateJumpDistance.call(this, value)
        }else{
            return Alias.Game_CharacterBase_calculateJumpDistance.call(this, value)
        }
    }

    Alias.Game_CharacterBase_beforeJump = Game_CharacterBase.prototype.beforeJump
    Game_CharacterBase.prototype.beforeJump = function(){
        if(this.isBeingControlledByCamera()){
            Game_Player.prototype.beforeJump.call(this)
        }else{
            Alias.Game_CharacterBase_beforeJump.call(this)
        }
    }

    Alias.Game_CharacterBase_afterJump = Game_CharacterBase.prototype.afterJump
    Game_CharacterBase.prototype.afterJump = function(){
        if(this.isBeingControlledByCamera()){
            Game_Player.prototype.afterJump.call(this)
        }else{
            Alias.Game_CharacterBase_afterJump.call(this)
        }
    }
    
    Alias.Game_Event_update = Game_Event.prototype.update
    Game_Event.prototype.update = function(){
        Alias.Game_Event_update.call(this)

        if(this.canUpdateJumpByButton()){
            this.updateJumpByButton()
        }
    }
    
    Alias.Game_Player_canUpdateJumpByButton = Game_Player.prototype.canUpdateJumpByButton
    Game_Player.prototype.canUpdateJumpByButton = function(){
        return Alias.Game_Player_canUpdateJumpByButton.call(this) && this.isBeingControlledByCamera()
    }

}

/* ----------------------------- PLATFORM EVENTS ---------------------------- */
if(Imported.Eli_MovingPlatform){

    Game_CharacterBase.prototype.isTryingToJumpFromCarryPlatform = function(){
        return false
    }

    Game_CharacterBase.prototype.isJumpAllowedOnCarryPlatform = function(){
        return false
    }

    Game_CharacterBase.prototype.refreshPlatformAfterJump = function(){}

    Game_CharacterBase.prototype.refreshSafePosition = function(){}

}

}