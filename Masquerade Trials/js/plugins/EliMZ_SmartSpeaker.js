//==========================================================================
// EliMZ_SmartSpeaker.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderBefore EliMZ_FaceWindow
@orderAfter EliMZ_FontManager
@orderAfter EliMZ_FontManagerPro
@orderAfter EliMZ_BitmapFontPro

@plugindesc ♦2.3.1♦ Set message speaker name or face image automatically.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-smart-speaker-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

According to the speaker's name, automatically changes the following:
● Face Image
● Window Skin
● Message Sound(Requires Eli Message Sounds)
● Font (Requires Eli Font Manager Pro or Eli Bitmap Font Pro)
● Automatically pick a Speaker Name settings by using \v[id] on the Name 
box.

According to the Face and index, automatically changes the following:
● Speaker name
● Window Skin
● Message Sound(Requires Eli Message Sounds)
● Font (Requires Eli Font Manager Pro or Eli Bitmap Font Pro)
● Automatically pick an Auto Face settings by using v[id] on the filename 
of a face file.

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1JciSeVexb8YqfaGgyYxc4_4C6bX7pc-HmtVDowqdxCA/edit?usp=sharing

============================================================================

@param mode
@text Mode
@type select
@option Auto Speaker
@option Auto Face
@desc Auto Speaker => Speaker name defined automatically. 
Auto Face => Face image defined automatically.
@default Auto Speaker

@param speakerSettings
@text Auto Speaker Settings
@type struct<speakerSettingsSt>[]
@desc A speaker name will be defined according to the face image and index.
@default 

@param faceSettings
@text Auto Face Settings
@type struct<faceSettingsSt>[]
@desc A face image will be defined according to the speaker name.
@default 

*/

/* ---------------------------- SPEAKER SETTINGS ---------------------------- */
{
/*~struct~speakerSettingsSt:

@param file
@text Face Image
@type file
@dir img/faces
@desc Set here the image that will set this speaker's name.
@default

@param index
@text Index
@type text
@desc The indexes of the face file that will set this speaker name. Separate with a comma.
@default

@param name
@text Speaker Name
@type text
@desc The speaker's name attached to this face and indexes.
@default

@param windowSkin
@text Window Skin
@type file
@dir img/system
@desc A new window skin to be used by this setting.
@default

@param font
@text Font Face
@type text
@desc The font attached to this name. Need Eli Bitmap Font Pro or Font Manager Pro.
@default

@param se
@text Message Sound Id
@type text
@desc Set here a Message Sound ID. Need Eli Message Sounds.
@default

*/
}

/* ------------------------------ FACE SETTINGS ----------------------------- */
{
/*~struct~faceSettingsSt:

@param name
@text Speaker Name
@type text
@desc The speaker's name that will set this face file and index.
@default

@param file
@text Face Image
@type file
@dir img/faces
@desc The face file attached to this speaker name.
@default

@param index
@text Index
@type number
@desc The face index attached to this speaker name.
@default

@param windowSkin
@text Window Skin
@type file
@dir img/system
@desc A new window skin to be used by this setting.
@default

@param font
@text Font Face
@type text
@desc The font attached to this name. Need Eli Bitmap Font Pro or Font Manager.
@default

@param se
@text Message Sound Id
@type text
@desc Set here a Message Sound ID. Need Eli Message Sounds.
@default

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_SmartSpeaker = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
Eli.SmartSpeaker = {

    Parameters: class {

        constructor(parameters){
            this.mode = parameters.mode
            this.speakerSettings = this.parseSpeakerParameters(JSON.parse(parameters.speakerSettings))
            this.faceSettings = this.parseFaceParameters(JSON.parse(parameters.faceSettings))
        }

        parseSpeakerParameters(parameters){
            const data = {}
    
            for(const param of parameters){
                const settings = JSON.parse(param)
                const indexes = settings.index.replaceAll(" ", "").split(",")
    
                const obj = {
                    name: settings.name,
                    indexes: indexes[0] === "" ? [0] : indexes,
                    file: settings.file,
                    fontFace: settings.font,
                    seId: settings.se,
                    windowSkin: settings.windowSkin
                }
    
                for(const index of obj.indexes){
                    const key = `${settings.file.toLowerCase()}_${index}`
                    data[key] = obj
                }
                
            }
    
            return data
        }
    
        parseFaceParameters(parameters){
            const data = {}
    
            for(const param of parameters){
                const settings = JSON.parse(param)
                const key = `${settings.name.toLowerCase()}`
    
                data[key] = {
                    file: settings.file,
                    index: Number(settings.index) || 0,
                    name: settings.name,
                    fontFace: settings.font,
                    seId: settings.se,
                    windowSkin: settings.windowSkin
                }
            }
    
            return data
        }
    },
    autoFont: null,
    autoWindowSkin: null,
    regVariableForFile: /V\[(\d+)\]/gi,

    initialize(){
        this.initParameters()
    },

    initParameters(){
        const parameters = PluginManager.parameters(Eli.PluginManager.getPluginName())
        this.parameters = new this.Parameters(parameters)
    },

    getParam(){
        return this.parameters
    },

    isAutoSpeakerMode(){
        return this.getParam().mode === "Auto Speaker"
    },

    isAutoFaceMode(){
        return !this.isAutoSpeakerMode()
    },

    getSpeakerSettings(face, index){
        return this.getParam().speakerSettings[`${face.toLowerCase()}_${index}`]
    },

    getFaceSettings(name){
        return this.getParam().faceSettings[name.toLowerCase()]
    },

    parseFileVariables(args){
        let str = args
        let match;

        while(match = this.regVariableForFile.exec(args)){
            const varId = Number(match[1]) || 0
            const value = $gameVariables.value(varId)

            str = str.replace(match[0], value)
        }

        return str
    },

}

{

const Plugin = Eli.SmartSpeaker
const Alias = {}

Plugin.initialize()

/* ---------------------------- GAME INTERPRETER ---------------------------- */
Alias.Game_Interpreter_command101 = Game_Interpreter.prototype.command101
Game_Interpreter.prototype.command101 = function(params) {
    const newParams = this.checkForSmartParamsOncommand101(params)

    return Alias.Game_Interpreter_command101.call(this, newParams)
}

Game_Interpreter.prototype.checkForSmartParamsOncommand101 = function(params) {
    const newParams = params.map(item => item)
    newParams[0] = Plugin.parseFileVariables(newParams[0])
    newParams[4] = Plugin.parseFileVariables(newParams[4])
    this.checkForAutoMessageSettings(newParams)

    return newParams
}

Game_Interpreter.prototype.checkForAutoMessageSettings = function(params){
    Plugin.autoFont = null
    Plugin.autoWindowSkin = null

    if(this.canAutoSetMessageSpeaker(params[0], params[1])){
        this.autoSetMessageSpeaker(params)

    }else if(this.canAutoSetMessageFace(params[4])){
        this.autoSetMessageFace(params)
    }

    this.refreshMessageWindowSkins()
}

Game_Interpreter.prototype.canAutoSetMessageSpeaker = function(face, index){
    return  Plugin.isAutoSpeakerMode() && 
            Plugin.getSpeakerSettings(face, index)
}

Game_Interpreter.prototype.autoSetMessageSpeaker = function(params){
    const speakerSettings = Plugin.getSpeakerSettings(params[0], params[1])
    this.setAutoWindowSkin(speakerSettings)

    if(Imported.Eli_MessageSounds){
        this.setAutoMessageSound(speakerSettings)
    }

    if(this.canSetAutoMessageFont()){
        this.setAutoMessageFont(speakerSettings)
    }
    
    params[4] = speakerSettings.name
}

Game_Interpreter.prototype.canAutoSetMessageFace = function(speakerName){
    return Plugin.isAutoFaceMode() && Plugin.getFaceSettings(speakerName)
}

Game_Interpreter.prototype.autoSetMessageFace = function(params){
    const faceSettings = Plugin.getFaceSettings(params[4])
    this.setAutoWindowSkin(faceSettings)

    if(Imported.Eli_MessageSounds){
        this.setAutoMessageSound(faceSettings)
    }
    
    if(this.canSetAutoMessageFont()){
        this.setAutoMessageFont(faceSettings)
    }

    params[0] = faceSettings.file
    params[1] = faceSettings.index
}

Game_Interpreter.prototype.setAutoWindowSkin = function(settings){
    Plugin.autoWindowSkin = settings.windowSkin
}

Game_Interpreter.prototype.canSetAutoMessageFont = function(){
    return  (Imported.Eli_FontManager && Eli.FontManager.pro) ||
            (Imported.Eli_BitmapFont && Eli.BitmapFont.pro)
}

Game_Interpreter.prototype.setAutoMessageSound = function(settings){
    if(settings.seId){
        Eli.MessageSounds.cmd_changeSe({id: settings.seId})

    }else{
        Eli.MessageSounds.cmd_changeSe({id: Eli.MessageSounds.getParam().defaultSe})
    }
}

Game_Interpreter.prototype.setAutoMessageFont = function(settings){
    if(settings.fontFace){

        if(Imported.Eli_FontManager){
            Plugin.autoFont = Eli.FontManager.findParameterFont(settings.fontFace)

        }else if(Imported.Eli_BitmapFont){
            Plugin.autoFont = Eli.BitmapFont.findParameterFontIndex(settings.fontFace)
        }
    }
}

Game_Interpreter.prototype.refreshMessageWindowSkins = function(){
    SceneManager._scene._messageWindow.loadWindowskin()
    SceneManager._scene._nameBoxWindow.loadWindowskin()
}

/* ----------------------------- WINDOW MESSAGE ----------------------------- */
Alias.Window_Message_loadWindowskin = Window_Message.prototype.loadWindowskin
Window_Message.prototype.loadWindowskin = function() {
    if(Plugin.autoWindowSkin){
        this.windowskin = ImageManager.loadSystem(Plugin.autoWindowSkin)
    }else{
        Alias.Window_Message_loadWindowskin.call(this)
    }
}

Alias.Window_Message_findCustomFont = Window_Message.prototype.findCustomFont
Window_Message.prototype.findCustomFont = function() {
    return Eli.FontManager.getParam().fonts[Plugin.autoFont] || Alias.Window_Message_findCustomFont.call(this)
}

Alias.Window_Message_findBitmapFontIndex = Window_Message.prototype.findBitmapFontIndex
Window_Message.prototype.findBitmapFontIndex = function() {
    if(Plugin.autoFont && Plugin.autoFont > -1){
        return Plugin.autoFont
    }else{
        return Alias.Window_Message_findBitmapFontIndex.call(this)
    }
}

/* ----------------------------- WINDOW NAME BOX ---------------------------- */
Alias.Window_NameBox_loadWindowskin = Window_NameBox.prototype.loadWindowskin
Window_NameBox.prototype.loadWindowskin = function() {
    if(Plugin.autoWindowSkin){
        this.windowskin = ImageManager.loadSystem(Plugin.autoWindowSkin)
    }else{
        Alias.Window_NameBox_loadWindowskin.call(this)
    }
}

}