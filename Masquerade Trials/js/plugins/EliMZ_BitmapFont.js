//==========================================================================
// EliMZ_BitmapFont.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_MessageActions

@plugindesc ♦3.1.2♦ Use bitmap font instead of default fonts!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-bitmap-font-for-rpg-maker

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
• Rate the plugin! Please, is very important to me ^^
https://hakuenstudio.itch.io/eli-bitmap-font-for-rpg-maker/rate?source=game

• Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Add bitmap font to your game.
● Choose the size of the space between characters.
● Choose the size of the space bar.
● Choose the characters(letters) your bitmap will use.
● Choose if you want to smooth or not the font.
● Can add as many fonts as you want. (PRO)
● Can add an outline to the font. (PRO)
● Set specific fonts for scenes or windows. (PRO)
● Change text/outline color. (PRO)
● Increase/decrease the font size (\{ \}) (PRO)
● Use Underline and Strike-through with Eli Message Actions. (PRO)

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1_oBWAIgPLPW_Y7HRFuQSYh8OSCwOF1uf6iQduyNHfuA/edit?usp=sharing

============================================================================

@param buildJSON
@text Build Bitmap File
@type boolean
@desc Set this to true for the plugin build the JSON data for the bitmaps fonts.
@default true

@param file
@text Font file
@type file
@dir img/system
@desc The bitmap font to use.
@default 

@param characters
@text All Characters
@type struct<charactersSt>
@desc A list of all the characters your font bitmap file have.
@default {"upper":"ABCDEFGHIJKLMNOPQRSTUVWXYZ","lower":"abcdefghijklmnopqrstuvwxyz","numbers":"0123456789","signs":"!?.'\"|#$%¨&*()-_=+§¢¬ºª´`~^,<>:;/\\@"}

@param spaceBetweenCharacters
@text Space between characters
@type number
@desc The size in pixels of space between each character.
@default 2

@param blankSpace
@text Blank space size
@type number
@desc The size in pixels that the space will have.
@default 6

@param smooth
@text Apply smooth?
@type boolean
@desc Choose if you want to apply smooth when drawing the font.
@default false

@param spaceBitmap
@text Add space as a bitmap
@type boolean
@desc If true, the "space" will be rendered as an empty bitmap.
@default true

*/

/* --------------------------- CHARACTER SETTINGS --------------------------- */
{
/*~struct~charactersSt:

@param upper
@text Upper Case
@type text
@desc A list of all the characters your font bitmap file have.
@default ABCDEFGHIJKLMNOPQRSTUVWXYZ

@param lower
@text Lower Case
@type text
@desc A list of all the characters your font bitmap file have.
@default abcdefghijklmnopqrstuvwxyz

@param numbers
@text Numbers
@type text
@desc A list of all the characters your font bitmap file have.
@default 0123456789

@param signs
@text Signs
@type text
@desc A list of all the characters your font bitmap file have.
@default !?.'"|#$%¨&*()-_=+§¢¬ºª´`~^,<>:;/\@

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_BitmapFont = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

const FOLDER_NAME = "data/BitmapFonts"

Eli.BitmapFont = {

    version: 5.12,
    url: "https://hakuenstudio.itch.io/eli-bitmap-font-for-rpg-maker",
    parameters: {
        buildJSON: true,
        fonts: [{
            file: "", 
            characters: {upper: "", lower:"", signs:"", numbers:""}, 
            spaceBetweenCharacters: 0, 
            blankSpace: 0, 
            smooth: false, 
            spaceBitmap: false,
        }],
    },
    alias: {},
    charactersLoaded: 0,
    index: 0,
    allCharactersToLoad: 0,
    pro: false,
    sourceData: {},

    initialize(){
        this.initParameters()
        this.initPluginCommands()

        if(this.parameters.buildJSON && Utils.isOptionValid("test")){
            this.createBitmapFontDataFolder()
            this.startBuildingJson()
        }else{
            this.loadAllSourceData()
        }
    },

    initParameters(){
        const parameters = PluginManager.parameters("EliMZ_BitmapFont")

        const font = {
            spaceBitmap: parameters.spaceBitmap === "true",
            characters: JSON.parse(parameters.characters),
            blankSpace: Number(parameters.blankSpace),
            spaceBetweenCharacters: Number(parameters.spaceBetweenCharacters),
            smooth: parameters.smooth === "true",
            file: parameters.file,
        }

        this.parameters.buildJSON = parameters.buildJSON === "true"

        this.parameters.fonts[0] = font
    },

    initPluginCommands(){},

    createBitmapFontDataFolder(){
        const fs = require("fs")
        
        if(!fs.existsSync(FOLDER_NAME)){
            fs.mkdirSync(FOLDER_NAME)
        }
    },

    startBuildingJson(){
        for(const fontData of this.parameters.fonts){
            const fontBitmap = this.loadBitmapFont(fontData.file)

            fontBitmap.addLoadListener(() => {
                const sourceData = this.createSourceData(fontData, fontBitmap)
                this.writeFontJsonData(sourceData, fontData)
            })
        }
    },

    loadBitmapFont(file){
        const fontBitmap = ImageManager.loadSystem(file)

        return fontBitmap
    },

    createSourceData(fontData, fontBitmap){
        const characters = this.getAllCharacters(fontData.characters)
        const height = fontBitmap.height
        const width = fontBitmap.width / characters.length
        const sourceData = {}

        for(let i = 0; i < characters.length; i++){
            const char = characters[i]
            const sourceSettings = this.createCharacterSourceSettings(i, width, height, fontBitmap)
            sourceData[char] = sourceSettings
        }

        return sourceData
    },

    getAllCharacters(fontCharacters){
        const {upper, lower, numbers, signs} = fontCharacters
        return upper + lower + numbers + signs
    },

    createCharacterSourceSettings(index, standardWidth, standardHeight, fontBitmap){
        const bounds = this.createCharacterBounds(index, standardWidth, fontBitmap)
        const width = this.createCharacterWidth(bounds)
        const sourceSettings = {
            sx: bounds[0],
            sy: 0,
            sw: width,
            sh: standardHeight
        }

        return sourceSettings
    },

    createCharacterBounds(index, standardWidth, fontBitmap){
        const minX = index * standardWidth
        const maxX = minX + standardWidth
        const bounds = fontBitmap.searchBounds(minX, maxX)

        return bounds
    },

    createCharacterWidth(bounds){
        return (bounds[1] + 1) - bounds[0]
    },

    writeFontJsonData(rawData, font){
        const fs = require('fs')
        const data = JSON.stringify(rawData)
        const filename = `data/BitmapFonts/Default.json`

        fs.writeFile(filename, data, "utf8", (err) => {
            if(err){
                console.log("An error occured while writing JSON Object to File.")
                return console.log(err)
            }else{
                this.loadSourceData(font)
            }
        })
        
    },

    loadAllSourceData(){
        for(const font of this.parameters.fonts){
            this.loadSourceData(font)
        }
    },

    loadSourceData(font){
        const xhr = new XMLHttpRequest()
        const filename = "Default"
        const url = `${FOLDER_NAME}/${filename}.json`

        xhr.open("GET", url)
        xhr.overrideMimeType("application/json");
        xhr.onload = () => {
            if(xhr.status < 400){
                this.sourceData[filename] = JSON.parse(xhr.responseText) 
                this.setupFont(font)
            }else{
                console.log("error")
            }
        }
        xhr.onerror = () => {
            console.log("RESET THE GAME")
        }
        xhr.send()
    },

    setupFont(fontData){
        const mainBitmap = this.loadBitmapFont(fontData.file)
        fontData.bitmaps = {}
        fontData.height = 0
        fontData.size = 1

        mainBitmap.addLoadListener(() => {
            this.setupCharacters(fontData, mainBitmap)
        })
    },

    setupCharacters(font, mainBitmap){
        const height = mainBitmap.height
        const sourceData = this.sourceData.Default
        font.height = height

        for(const char in sourceData){
            const sourceSettings = sourceData[char]
            
            this.createBitmapCharacters(font, char, sourceSettings, mainBitmap)
        }

        if(this.param().spaceBitmap){
            font.bitmaps[" "] = new Bitmap(font.blankSpace, height)
        }
    },

    createBitmapCharacters(font, char, sourceSettings, mainBitmap){
        this.createMainCharacterBitmap(font, char, sourceSettings, mainBitmap)
    },

    createMainCharacterBitmap(font, char, sourceSettings, fontBitmap){
        font.bitmaps[char] = new Bitmap(sourceSettings.sw + font.spaceBetweenCharacters, sourceSettings.sh)
        font.bitmaps[char].addLoadListener(() => {
            this.drawCharacter(sourceSettings, font.bitmaps[char], fontBitmap)
        })
    },

    drawCharacter(sourceSettings, charBitmap, fontBitmap){
        const {sx, sy, sw, sh} = sourceSettings
        charBitmap.blt(fontBitmap, sx, sy, sw, sh, 0, 0)
    },

    param(){
        return this.parameters
    },
    
}

const Plugin = Eli.BitmapFont
const Alias = Eli.BitmapFont.alias

Plugin.initialize()

/* --------------------------------- BITMAP --------------------------------- */
{

Alias.Bitmap_initialize = Bitmap.prototype.initialize
Bitmap.prototype.initialize = function(width, height) {
    this.bitmapFontIndex = 0
    Alias.Bitmap_initialize.call(this, width, height)
}

// Overwrite
Bitmap.prototype.measureTextWidth = function(text) {
    let width = 0

    for(const char of String(text)){
        const bitmap = this.fontBitmap().bitmaps[char]
        const blankSpace = this.fontBitmap().blankSpace

        if(bitmap && char !== " "){
            width += bitmap.width
        }else{
            width += blankSpace
        } 
    }

    return width
}

// Overwrite
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    if(this.hasInlineImage){
        this.drawTextWithInlineImage(text, x, y, maxWidth, lineHeight, align, this.drawTextWithBitmapFont)
    }else{
        this.drawTextWithBitmapFont(text, x, y, maxWidth, lineHeight, align)
    }
}

Bitmap.prototype.drawTextWithBitmapFont = function(text, x, y, maxWidth, lineHeight, align){
    text = String(text)
    const size = this.bitmapFontSize
    let tx = this.getTextX(text, x, maxWidth, align)

    for(let i = 0; i < text.length; i++){
        const char = text[i]
        const bitmap = this.fontBitmap().bitmaps[char]
        const charWidth = this.measureTextWidth(char)

        if(bitmap){
            this.drawBitmapFontCharacter(bitmap, size, tx, y, lineHeight)
        }

        tx += charWidth //* size
    }
}

Bitmap.prototype.getTextX = function(text, x, maxWidth, align){
    const textWidth = this.measureTextWidth(text)
    const options = {
        left:   x,
        center: x + (maxWidth / 2) - (textWidth / 2),
        right:  x + maxWidth - textWidth,
    }
    return options[align] || x
}

Bitmap.prototype.drawBitmapFontCharacter = function(bitmap, size, tx, y, lineHeight){
    const {sx, sy, sw, sh, dw, dh, ty} = this.getSourceAndDestinationSettings(bitmap, size, y, lineHeight)
    const oldSmooth = this._smooth
    const oldContextSmooth = this.context.imageSmoothingEnabled

    this._smooth = this.fontBitmap().smooth
    this.context.imageSmoothingEnabled = this.fontBitmap().smooth

    this.blt(bitmap, sx, sy, sw, sh, tx, ty, dw, dh)
    
    this._smooth = oldSmooth
    this.context.imageSmoothingEnabled = oldContextSmooth
}

Bitmap.prototype.getSourceAndDestinationSettings = function(bitmap, size, y, lineHeight){
    const width = bitmap.width
    const height = bitmap.height

    return {
        sx: 0,
        sy: 0,
        sw: width,
        sh: height,
        dw: width * size,
        dh: height * size,
        ty: (y + (lineHeight/2) - (height/2)) + 2,
    }
}

Bitmap.prototype.searchBounds = function(minX, maxX){
    const coords = [
        this.getFirstLeftPixel(minX, maxX), 
        this.getLastRightPixel(maxX, minX)
    ]

    return coords
}

Bitmap.prototype.getFirstLeftPixel = function(minX, maxX){
    let canBreak = false
    let firstPixel = 0
    
    for(let w = minX; w <= maxX; w++){
        
        for(let h = 0; h < this.height; h++){
            
            if(this.getAlphaPixel(w, h) > 0){
                firstPixel = w
                canBreak = true
                break
            }
        }

        if(canBreak) break
    }
    
    return firstPixel
}

Bitmap.prototype.getLastRightPixel = function(maxX, minX){
    let canBreak = false
    let lastPixel = 0
    
    for(let w = maxX-1; w >= minX; w--){
        
        for(let h = this.height; h >= 0; h--){

            if(this.getAlphaPixel(w, h) > 0){
                lastPixel = w
                canBreak = true
                break
            }
        }
        if(canBreak) break
    }

    return lastPixel
}

Bitmap.prototype.fontBitmap = function(){
    return Plugin.param().fonts[this.bitmapFontIndex]
}

// Not Used
Bitmap.prototype.measureBitmapTextWidthForEachChar = function(text){
    let width = []
    const txt = String(text)

    for(let i = 0; i < txt.length; i++ ){
        const char = txt[i]
        const bitmap = this.fontBitmap().bitmaps[char]
        const {size, blankSpace} = this.fontBitmap()

        if(bitmap){
            width.push(bitmap.width * size)
        }else{
            width.push(blankSpace * size)
        }
    }

    return width
}

}

/* ------------------------------- WINDOW BASE ------------------------------ */
{

Alias.Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings
Window_Base.prototype.resetFontSettings = function() {
    Alias.Window_Base_resetFontSettings.call(this)
    this.contents.fontSize = this.contents.fontBitmap().height
}

Alias.Window_Base_calcTextHeight = Window_Base.prototype.calcTextHeight
Window_Base.prototype.calcTextHeight = function(textState) {
    const textHeight = Alias.Window_Base_calcTextHeight.call(this, textState)
    const defaultLineSpacing = this.lineHeight() - $gameSystem.mainFontSize()
    const fontBitmapLineSpacing = this.lineHeight() - this.contents.fontBitmap().height
    
    return (textHeight - defaultLineSpacing) + fontBitmapLineSpacing
}

}

}