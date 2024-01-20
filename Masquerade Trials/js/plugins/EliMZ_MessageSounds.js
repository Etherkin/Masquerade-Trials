//==========================================================================
// EliMZ_MessageSounds.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦1.1.1♦ Play talk sounds on the Message Window 
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-message-sounds-for-rpg-maker-mz/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

• Adds text sounds to Show Text!
• Crete several SE sounds presets!
• Can change pitch, volume, and pan values! Including applying variance!
• Set a default SE sound
• Optionally can set it to require a face, or a name, or both to play 
the letter sounds!
• Optionally mute some letters.
• Optionally mute when the text is showing fast.
• Use a switch to enable/disable the sounds.
• Set a specific SE sound for when opening and closing the message window!
• Change sounds with escape codes(Requires Eli Message Actions)

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1-8uOjb-SJ4dGIlHCzHhzJKyc3Md2wxGaXVzDN296uNQ/edit?usp=sharing

============================================================================

@param seList
@text Preset Sounds
@type struct<seListSt>[]
@desc The list of all preset SE sounds to be used on message.
@default []

@param defaultSe
@text Default Message Sound
@type text
@desc Optionally set a default SE sound to be played. Leave it as -1 to not use.
@default -1

@param openSe
@text Open Message Sound
@type text
@desc Optionally set a SE sound to be played when opening the window. Leave it as -1 to not use.
@default -1

@param closeSe
@text Close Message Sound
@type text
@desc Optionally set a SE sound to be played when closing the window. Leave it as -1 to not use.
@default -1

@param smartPlay
@text Smart Play Open/Close
@type boolean
@desc See help file for more details.
@default true

@param muteLetters
@text Mute letters
@type multiline_string
@desc Set a list of letters that you want to not play sound.
@default .!? '"´

@param muteOnShowFast
@text Mute On Show Fast
@type boolean
@desc If true, the SE sounds will not be played when the message is showing fast.
@default true

@param muteSwitch
@text Mute Switch
@type switch
@desc If this switch is ON, the SE sounds will not be played.
@default 0

@param requireMode
@text Require Mode
@type select
@option Face
@option Name
@option Face and Name
@option None
@desc Optionally choose a requirement for the SE to be played.
@default None

@command cmd_changeSe
@text Change SE
@desc Change the SE played on the Message Window

    @arg id
    @text Id / Index
    @type text
    @desc The ID(case sensitive) or index of the preset you want to use.

*/

/* -------------------------------- SE SOUNDS ------------------------------- */
{
/*~struct~seListSt:

    @param file
    @text Filename
    @type file
    @dir audio/se
    @desc The audio used to play the SE.
    @default

    @param interval
    @text Interval
    @type text
    @desc The interval between each X characters the SE will be played.
    @default 4

    @param seConfig
    @text Se Config
    @type text
    @desc Volume(0 to 100) | Pitch(50 to 150) | Pan (-100 to 100)
    @default 50, 100, 0

    @param variationConfig
    @text Variation Config
    @type text
    @desc A variation value to be increased from the default Se Config values.
    Volume | Pitch | Pan
    @default 0, 0, 0

    @param id
    @text Id
    @type text
    @desc The id of this preset. To be referenced on plugin commands/escape codes.
    @default

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MessageSounds = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.MessageSounds = {

    Parameters: class {

        constructor(parameters){
            this.seList = this.createSeList(parameters.seList)
            this.muteLetters = this.createMuteLetters(parameters.muteLetters)
            this.openSe = this.findSeIndex(parameters.openSe)
            this.closeSe = this.findSeIndex(parameters.closeSe)
            this.defaultSe = this.findSeIndex(parameters.defaultSe)
            this.isRequirementMet = this.setRequireMethod(parameters.requireMode)
            this.muteOnShowFast = parameters.muteOnShowFast === "true"
            this.muteSwitch = Number(parameters.muteSwitch)
            this.smartPlay = parameters.smartPlay === "true" || Imported.Eli_MessageManager
        }
    
        createSeList(rawParams){
            const seList = []
            const sounds = JSON.parse(rawParams)
    
            for(const sound of sounds){
                seList.push(this.createSe(JSON.parse(sound)))
            }
    
            return seList
        }
    
        createSe(sound){
            const [volume, pitch = "100", pan = "0"] = sound.seConfig.split(",")
            const [randomVolume, randomPitch = "0", randomPan = "0"] = sound.variationConfig.split(",")
    
            return {
                file: sound.file,
                interval: Number(sound.interval),
                volume: Number(volume),
                pitch: Number(pitch),
                pan: Number(pan),
                randomVolume: Number(randomVolume) + 1,
                randomPitch: Number(randomPitch) + 1,
                randomPan: Number(randomPan) + 1,
                id: sound.id,
            }
        }
    
        createMuteLetters(rawParams){
            if(rawParams){
                return [...rawParams.split("")]
            }else{
                return []
            }
        }
    
        findSeIndex(id){
            if(isNaN(id)){
                return this.seList.findIndex(item => item.id === id)
            }else{
                return Number(id)
            }
        }
    
        setRequireMethod(requireMethod){
            switch(requireMethod){
                case "Face": return this.requireFace
                case "Name": return this.requireName
                case "Face and Name": return this.requireFaceAndName
                case "None": return this.requireNone
            }
        }
    
        requireName(){
            return !!$gameMessage.speakerName()
        }
    
        requireFace(){
            return !!$gameMessage.faceName()
        }
    
        requireFaceAndName(){
            return this.requireName() && this.requireFace()
        }
    
        requireNone(){
            return true
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
        const commands = ["cmd_changeSe"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    getParam(){
        return this.parameters
    },

    getLetterSeIndex(){
        return $eliData.contents.messageSounds.seIndex
    },

    getOpenSe(){
        return this.getParam().seList[this.getParam().openSe]
    },

    getLetterSe(){
        return this.getParam().seList[this.getLetterSeIndex()]
    },

    getCloseSe(){
        return this.getParam().seList[this.getParam().closeSe]
    },

    createSe(customSe){
        return {
            name: customSe.file,
            volume: (customSe.volume + Math.randomInt(customSe.randomVolume)).clamp(0, 100),
            pitch: (customSe.pitch + Math.randomInt(customSe.randomPitch)).clamp(50, 150),
            pan: (customSe.pan + Math.randomInt(customSe.randomPan)).clamp(-100, 100),
        }
    },

    cmd_changeSe(args){
        const presets = this.getParam().seList
        const index = isNaN(args.id) ? presets.findIndex(item => item.id === args.id) : Number(args.id)

        if(index > -1){
            $eliData.contents.messageSounds.seIndex = index
        }
    },

}

{

const Plugin = Eli.MessageSounds
const Alias = {}

Plugin.initialize()

/* ------------------------------ SAVE CONTENTS ----------------------------- */
Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.contents.messageSounds = {
        seIndex: Plugin.getParam().defaultSe 
    }
}

/* ----------------------------- WINDOW MESSAGE ----------------------------- */
Alias.Window_Message_clearFlags = Window_Message.prototype.clearFlags
Window_Message.prototype.clearFlags = function() {
    Alias.Window_Message_clearFlags.call(this)
    this.clearMessageSeFlags()
}

Window_Message.prototype.clearMessageSeFlags = function() {
    this.currentInterval = 0
    this.closeSePlayed = false
}

Window_Message.prototype.isMessageSeActive = function() {
    return  Plugin.getParam().isRequirementMet() && 
            !$gameSwitches.value(Plugin.getParam().muteSwitch)
}

Alias.Window_Message_processCharacter = Window_Message.prototype.processCharacter
Window_Message.prototype.processCharacter = function(textState){
    if(this.isMessageSeActive()){
        this.updateMessageSe(textState)
    }else{
        this.currentInterval = 0
    }

    Alias.Window_Message_processCharacter.call(this, textState)
}

Window_Message.prototype.updateMessageSe = function(textState){
    const letter = textState.text[textState.index]

    if(this.isMuteLetter(letter)){
        this.onMuteLetters()

    }else if(this.canPlayMessageSe()){
        this.onSoundLetters()

    }else{
        this.currentInterval++
    }
}

Window_Message.prototype.muteLetterWhenShowFast = function() {
    return (this._showFast || this._lineShowFast) && Plugin.getParam().muteOnShowFast
}

Window_Message.prototype.isMuteLetter = function(letter) {
    return Plugin.getParam().muteLetters.includes(letter) || this.muteLetterWhenShowFast()
}

Window_Message.prototype.onMuteLetters = function() {
    this.currentInterval = 0
}

Window_Message.prototype.canPlayMessageSe = function() {
    const customSe = Plugin.getLetterSe()

    return customSe && this.currentInterval >= customSe.interval
}

Window_Message.prototype.onSoundLetters = function() {
    const customSe = Plugin.getLetterSe()
    const se = Plugin.createSe(customSe)

    AudioManager.playSe(se)
    this.currentInterval = 0
}

Alias.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage
Window_Message.prototype.terminateMessage = function() {
    Alias.Window_Message_terminateMessage.call(this)
    this.clearMessageSeFlags()
}

Window_Message.prototype.playOpenSe = function() {
    const customSe = Plugin.getOpenSe()
    const se = Plugin.createSe(customSe)

    AudioManager.playSe(se)
}

Window_Message.prototype.playCloseSe = function() {
    const customSe = Plugin.getCloseSe()
    const se = Plugin.createSe(customSe)

    this.closeSePlayed = true
    AudioManager.playSe(se)
}

if(Plugin.getParam().smartPlay){

    Alias.Window_Message_onFirstMessage = Window_Message.prototype.onFirstMessage
    Window_Message.prototype.onFirstMessage = function() {
        Alias.Window_Message_onFirstMessage.call(this)
        if(Plugin.getParam().openSe > -1){
            this.playOpenSe()
        }
    }
    
    Alias.Window_Message_onLastMessage = Window_Message.prototype.onLastMessage
    Window_Message.prototype.onLastMessage = function() {
        Alias.Window_Message_onLastMessage.call(this)
        if(Plugin.getParam().closeSe > -1){
            this.playCloseSe()
        }
    }

}else{

    Alias.Window_Message_isOpen = Window_Message.prototype.isOpen
    Window_Message.prototype.isOpen = function() {

        if(this.canPlayOpenSe()){
            this.playOpenSe()
        }

        return Alias.Window_Message_isOpen.call(this)
    }

    Window_Message.prototype.canPlayOpenSe = function() {
        return this.isOpening() && this.openness === 0 && Plugin.getParam().openSe > -1
    }

    Alias.Window_Message_isClosed = Window_Message.prototype.isClosed
    Window_Message.prototype.isClosed = function() {

        if(this.canPlayCloseSe()){
            this.playCloseSe()
        }

        return Alias.Window_Message_isClosed.call(this)
    }

    Window_Message.prototype.canPlayCloseSe = function() {
        return this.isClosing() && this.openness <= 128 && !this.closeSePlayed && Plugin.getParam().closeSe > -1
    }

}

}