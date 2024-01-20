//==========================================================================
// EliMZ_CharacterGenerator.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter EliMZ_DiagonalCharacters

@plugindesc ♦2.0.2♦ Creates a in-game Character Generator Scene.
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-character-generator-for-rpg-maker-mz/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

• Adds a character generator scene!
• Supports multiple sprite sizes and frames with Eli Character Frames!
• Can create new Face, Walk, and Battler images!
• Organize your character pieces in nested folders!
• Customize the scene by changing window positions!
• Creates many kinds of Character Generators to be used by plugin commands!
• Stores created characters on the save file.
• Can restore original images from the characters.
• Works with Players, followers, and events!
• Change the Hue color of the pieces!
• Works with any character size!
• Works on mobile!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1XUcMBSlt45ofuibdZEHRt9oL3P-QnJwlWyJLCDDOGQo/edit?usp=sharing

============================================================================

@param buildJSON
@text Build Generator File
@type boolean
@desc Set this to true for the plugin build the JSON data for the generator list.
@default true

@param generatorList
@text Generator List
@type struct<generatorListSt>[]
@desc Here you can create all kinds of generator you want.
@default []

@param commandWindow
@text Command Window
@type struct<mainCommandWindowSt>
@desc The main command window for select the main actions on the scene.
@default {"width":"Graphics.boxWidth","maxCols":"4","numVisibleRows":"1","commandList":"[\"{\\\"name\\\":\\\"Category\\\",\\\"symbol\\\":\\\"category\\\"}\",\"{\\\"name\\\":\\\"Hue\\\",\\\"symbol\\\":\\\"hue\\\"}\",\"{\\\"name\\\":\\\"Clear\\\",\\\"symbol\\\":\\\"clear\\\"}\",\"{\\\"name\\\":\\\"Finish\\\",\\\"symbol\\\":\\\"finish\\\"}\"]","position":"{\"initialAlignX\":\"left\",\"initialOffsetX\":\"0\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"0\"}"}

@param categoryWindow
@text Category Window
@type struct<categoryWindowSt>
@desc The window that will show a list of all pieces name. Ex: Body, Glasses, Hair, etc.
@default {"width":"240","maxCols":"1","numVisibleRows":"14","position":"{\"initialAlignX\":\"left\",\"initialOffsetX\":\"0\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"70\"}"}

@param hueWindow
@text Hue Window
@type struct<hueWindowSt>
@desc A window used to change the hue color of the pieces.
@default {"title":"Hue Color","position":"{\"initialAlignX\":\"right\",\"initialOffsetX\":\"0\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"70\"}","autoUpdate":"true"}

@param Face Windows

@param faceCommandWindow
@text Piece Select
@type struct<pieceWindowSt>
@desc A window that will show all pieces by filename.
@default {"maxCols":"4","numVisibleRows":"2","position":"{\"initialAlignX\":\"left\",\"initialOffsetX\":\"242\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"70\"}"}
@parent Face Windows

@param facePreviewWindow
@text Piece Preview
@type struct<previewWindowsSt>
@desc Show a preview of the character already drawn.
@default {"Window":"","pieceSize":"144, 144","position":"{\"initialAlignX\":\"left\",\"initialOffsetX\":\"264\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"470\"}","Sprite":"","frameOrder":"0","rowOrder":"0"}
@parent Face Windows

@param Walk Windows

@param walkCommandWindow
@text Piece Select
@type struct<pieceWindowSt>
@desc A window that will show all pieces by filename.
@default {"maxCols":"4","numVisibleRows":"2","position":"{\"initialAlignX\":\"left\",\"initialOffsetX\":\"242\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"70\"}"}
@parent Walk Windows

@param walkPreviewWindow
@text Piece Preview
@type struct<previewWindowsSt>
@desc Show a preview of the character already drawn.
@default {"Window":"","pieceSize":"48, 48","position":"{\"initialAlignX\":\"left\",\"initialOffsetX\":\"442\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"470\"}","Sprite":"","frameOrder":"1, 2, 1, 0","rowOrder":"0, 1, 3, 2"}
@parent Walk Windows

@param Battler Windows

@param battlerCommandWindow
@text Piece Select
@type struct<pieceWindowSt>
@desc A window that will show all pieces by filename.
@default {"maxCols":"1","numVisibleRows":"1","position":"{\"initialAlignX\":\"left\",\"initialOffsetX\":\"242\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"70\"}"}
@parent Battler Windows

@param battlerPreviewWindow
@text Piece Preview
@type struct<previewWindowsSt>
@desc Show a preview of the character already drawn.
@default {"Window":"","pieceSize":"64, 64","position":"{\"initialAlignX\":\"left\",\"initialOffsetX\":\"436\",\"initialAlignY\":\"top\",\"initialOffsetY\":\"550\"}","Sprite":"","frameOrder":"1, 2, 1, 0","rowOrder":"0"}
@parent Battler Windows

@command cmd_openGenerator
@text Open Generator
@desc Open the generator scene and create a new character.

    @arg subjectId
    @text Subject Id
    @type text
    @desc The game character that will be used on the scene.
    @default 0

    @arg characterId
    @text Generated Filename
    @type text
    @desc It works like an id. It is like the filename of the created character. Not case sensitive.
    @default Test

    @arg genIndex
    @text Generator Id
    @type text
    @desc The generator index/name to use on the scene.
    @default 0

    @arg drawCharPieces
    @text Draw Character Pieces
    @type boolean
    @desc If true, the scene will start with the character drawn by default.
    @default true

@command cmd_changeCharacter
@text Change Character
@desc Change a subject generator character or set to it's default image.

    @arg subjectId
    @text Subject Id
    @type text
    @desc The game character that will be used on the scene.
    @default 0

    @arg characterId
    @text Generated Filename
    @type combo
    @option Original
    @desc It works like an id. It is like the filename of the created character. Not case sensitive.
    @default Original

*/

/* --------------------------- MAIN COMMAND WINDOW -------------------------- */
{
/*~struct~mainCommandWindowSt:

@param width
@text Width
@type text
@desc The width of the window. Can use formulas.
@default Graphics.boxWidth

@param maxCols
@text Max Cols
@type text
@desc The maximum amount of columns.
@default 5

@param numVisibleRows
@text Visible Rows
@type text
@desc The maximum visible rows to show at once.
@default 1

@param commandList
@text Main Command List
@type struct<mainCommandListSt>[]
@desc The command list of the window.
@default []

@param position
@text Position
@type struct<positionSt>
@desc The position of the window.
@default

*/
}

/* ---------------------------- MAIN COMMAND LIST --------------------------- */
{

/*~struct~mainCommandListSt:

@param name
@text Name
@type text
@desc The name of the command.
@default

@param symbol
@text Symbol
@type select
@option category
@option hue
@option clear
@option random
@option finish
@desc The symbol that will decide the function of that command.
@default category

*/
    
}

/* -------------------------- PIECE CATEGORY WINDOW ------------------------- */
{
/*~struct~categoryWindowSt:

@param width
@text Width
@type text
@desc The width of the window. Can use formulas.
@default 240

@param maxCols
@text Max Cols
@type text
@desc The maximum amount of columns.
@default 1

@param numVisibleRows
@text Visible Rows
@type text
@desc The maximum visible rows to show at once.
@default 14

@param position
@text Position
@type struct<positionSt>
@desc The position of the window.
@default

*/
}

/* --------------------------- PIECE SELECT WINDOW -------------------------- */
{

/*~struct~pieceWindowSt:

@param maxCols
@text Max Cols
@type text
@desc The maximum amount of columns.
@default 4

@param numVisibleRows
@text Visible Rows
@type text
@desc The maximum visible rows to show at once.
@default 2

@param position
@text Position
@type struct<positionSt>
@desc The position of the window.
@default

@param General Commands

@param generalCommands
@text Command List
@type select[]
@option clear
@option random
@desc General commands to be added on the piece select windows.
@default []
@parent General Commands

@param generalCommandIndex
@text Command Index
@type select
@option First
@option Last
@desc The position index of the general commands.
@default First
@parent General Commands

*/

}

/* -------------------------- PIECE PREVIEW WINDOW -------------------------- */
{
/*~struct~previewWindowsSt:

@param Window

@param position
@text Position
@type struct<positionSt>
@desc The position of the window.
@default 
@parent Window

@param Sprite

@param rowOrder
@text Row Order
@type text
@desc The animated order of the animation cycle for that image type, based on row.
@default 0, 1, 3, 2
@parent Sprite

*/
}

/* ----------------------------- GENERATOR LIST ----------------------------- */
{

/*~struct~generatorListSt:

@param id
@text Generator Id
@type text
@desc The Id of the generator. Must be unique among the others.
@default Human

@param diagonal
@text Diagonal Character
@type boolean
@desc If true, it will enable diagonal walk characters feature. Need Eli Diagonal Characters
@default false

@param customFrameKey
@text Character Frame Name
@type text
@desc The name of a custom frame settings on the Eli Character Frames plugin. Leave empty for default.
@default

@param Face

@param faceSize
@text Piece / Frame Size
@type text
@desc The size of this image that the engine uses by default.
@default 144, 144
@parent Face

@param facePieces
@text Piece Files
@type struct<pieceSt>[]
@desc The face pieces of this generator. Leave empty if you do no want to use.
@default []
@parent Face

@param faceRandomPiece
@text Random Command Image
@type file
@dir img/generator
@desc The image used for the random command. Must be the size of a piece for this window.
@default
@parent Face

@param faceClearPiece
@text Clear Command Image
@type file
@dir img/generator
@desc The image used for the clear command. Must be the size of a piece for this window.
@default
@parent Face

@param Walk

@param walkSize
@text Piece / Frame Size
@type text
@desc The size of this image that the engine uses by default.
@default 48, 48
@parent Walk

@param walkFrameOrder
@text Frame Order
@type text
@desc The animated order of the animation cycle for that image, based on column.
@default 1, 2, 1, 0
@parent Walk

@param walkPieces
@text Piece Files
@type struct<pieceSt>[]
@desc The walk pieces of this generator. Leave empty if you do no want to use.
@default []
@parent Walk

@param walkRandomPiece
@text Random Command Image
@type file
@dir img/generator
@desc The image used for the random command. Must be the size of a piece for this window.
@default
@parent Walk

@param walkClearPiece
@text Clear Command Image
@type file
@dir img/generator
@desc The image used for the clear command. Must be the size of a piece for this window.
@default
@parent Walk

@param Battler

@param battlerSize
@text Piece / Frame Size
@type text
@desc The size of this image that the engine uses by default.
@default 64, 64
@parent Battler

@param battlerFrameOrder
@text Frame Order
@type text
@desc The animated order of the animation cycle for that image, based on column.
@default 1, 2, 1, 0
@parent Battler

@param battlerPieces
@text Piece Files
@type struct<pieceSt>[]
@desc The battler pieces of this generator. Leave empty if you do no want to use.
@default []
@parent Battler

@param battlerRandomPiece
@text Random Command Image
@type file
@dir img/generator
@desc The image used for the random command. Must be the size of a piece for this window.
@default
@parent Battler

@param battlerClearPiece
@text Clear Command Image
@type file
@dir img/generator
@desc The image used for the clear command. Must be the size of a piece for this window.
@default
@parent Battler

@param commandOrder
@text Command Order
@type select
@option Default(Layer)
@option Alphabetically
@option Piece Type
@option Alphabetically and Piece Type
@desc The rule that will decide the order of the pieces name on the category window.
@default Default(Layer)

@param pieceTypeOrder
@text Piece Type Order
@type select[]
@option Face
@option Walk
@option Battler
@desc The piece type order. Only works if the Command Order has Piece Type.
@default []
@parent commandOrder

*/

}

/* ------------------------------ PIECE COMMAND ----------------------------- */
{

/*~struct~pieceSt:

@param visible
@text Visible
@type boolean
@desc If true, it will be shown on the category window.
@default true 

@param name
@text Command Name
@type text
@desc The name that will show on the category window.
@default 

@param frameIndex
@text Frame Index to Draw
@type text
@desc Starting at 0, that will choose the horizontal and vertical frame index of the file to drawn.
@default 0, 0 

@param folder
@text Piece Folder
@type text
@desc The folders for that piece. This will be a prefix of the path choosen: img/generator/...
@default

@param Visible Pieces Only

@param defaultPieceIndex
@text Default Piece Index
@type text
@desc The piece index to be drawn by default. Set to -1 to draw nothing. Need to be visible.
@default -1
@parent Visible Pieces Only

@param allowRandomAll
@text Allow Random All
@type boolean
@desc If true, this piece will be randomized on the Random All command.
@default true
@parent Visible Pieces Only

@param randomHue
@text Random Hue
@type boolean
@desc If true, when draw randomly, the hue will also be randomly changed.
@default false
@parent Visible Pieces Only

*/

}

/* ------------------------------- HUE WINDOW ------------------------------- */
{

/*~struct~hueWindowSt:

@param title
@text Title
@type text
@desc An optional title to show on the window. Leave empty for not use.
@default Hue Color

@param position
@text Position
@type struct<positionSt>
@desc The position of the window.
@default 

@param autoUpdate
@text Auto Update
@type boolean
@desc If true, the hue will change as you change values. Otherwise, you need to press OK after selecting a value.
@default true

*/

}

/* -------------------------------- POSITION -------------------------------- */
{
/*~struct~positionSt:

@param initialAlignX
@text Align X
@type select
@option left
@option center
@option right
@desc Select left to only use offset value.
@default left

@param initialOffsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0

@param initialAlignY
@text Align Y
@type select
@option top
@option center
@option bottom
@desc Select top to only use offset value.
@default top

@param initialOffsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_CharacterGenerator = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Scene_CharacterGenerator extends Scene_MenuBase{

    initialize(){
        super.initialize()
        this.pieceSelectWindows = {}
        this.previewWindows = {}
        this.imageLoadCount = 0
    }

    create(){
        super.create()  
        this.createCommandWindow()
        this.createCategoryWindow()

        if(this.canCreateFaceWindows()){
            this.createFaceWindows()
        }

        if(this.canCreateWalkWindows()){
            this.createWalkWindows()
        }

        if(this.canCreateBattlerWindows()){
            this.createBattlerWindows()
        }

        this.createHueWindow()
    }

    createCommandWindow(){
        this.commandWindow = new Window_GeneratorCommand()
        this.addWindow(this.commandWindow)
    }

    createCategoryWindow(){
        this.categoryWindow = new Window_GeneratorCategoryCommand()
        this.addWindow(this.categoryWindow)
    }

/* ---------------------------------- FACE ---------------------------------- */
    canCreateFaceWindows(){
        return Plugin.getSelectedGenerator().pieces.face.length
    }

    createFaceWindows(){
        this.createFacePieceWindow()
        this.createFacePreviewWindow()
    }

    createFacePieceWindow(){
        this.pieceSelectWindows.face = new Window_GeneratorFacePiecesSelect(this.categoryWindow)
        this.addWindow(this.pieceSelectWindows.face)
    }

    createFacePreviewWindow(){
        this.previewWindows.face = new Window_GeneratorFacePreview(this.categoryWindow)
        this.addWindow(this.previewWindows.face)
    }

/* ---------------------------------- WALK ---------------------------------- */
    canCreateWalkWindows(){
        return Plugin.getSelectedGenerator().pieces.walk.length
    }

    createWalkWindows(){
        this.createWalkPieceWindow()
        this.createWalkPreviewWindow()
    }

    createWalkPieceWindow(){
        this.pieceSelectWindows.walk = new Window_GeneratorWalkPiecesSelect(this.categoryWindow)
        this.addWindow(this.pieceSelectWindows.walk)
    }

    createWalkPreviewWindow(){
        this.previewWindows.walk = new Window_GeneratorWalkPreview(this.categoryWindow)
        this.addWindow(this.previewWindows.walk)
    }

/* --------------------------------- BATTLER -------------------------------- */
    canCreateBattlerWindows(){
        return Plugin.getSelectedGenerator().pieces.battler.length
    }

    createBattlerWindows(){
        this.createBattlerPieceWindow()
        this.createBattlerPreviewWindow()
    }

    createBattlerPieceWindow(){
        this.pieceSelectWindows.battler = new Window_GeneratorBattlerPiecesSelect(this.categoryWindow)
        this.addWindow(this.pieceSelectWindows.battler)
    }

    createBattlerPreviewWindow(){
        this.previewWindows.battler = new Window_GeneratorBattlerPreview(this.categoryWindow)
        this.addWindow(this.previewWindows.battler)
    }

/* ------------------------------------ - ----------------------------------- */
    createHueWindow(){
        const maxDigits = 3
        this.hueWindow = new Window_GeneratorHueColor(maxDigits)
        this.addWindow(this.hueWindow)
    }

    start(){
        super.start()
        this.categoryWindow.start()
        this.startPreviewWindows()
    }

    startPreviewWindows(){
        for(const piece of Plugin.getSelectedGenerator().pieces.visible){
            const {index, hue} = Plugin.settings.visiblePiecesSelected[piece.visibleIndex]

            if(this.hasDefaultPiece(index)){
                const pieceWindow = this.pieceSelectWindows[piece.type]
                pieceWindow.drawOnPreviewWindows(piece.visibleIndex, index)
            }
        }
    }

    hasDefaultPiece(pieceIndex){
        return pieceIndex > -1
    }

    updatePreload(){
        if(this.imageLoadCount < Plugin.getSelectedGenerator().pieces.visible.length){
            const piece = Plugin.getSelectedGenerator().pieces.visible[this.imageLoadCount]
            ImageManager.preloadTempPiece(piece, true)
            this.imageLoadCount++
        }
    }

    update(){
        super.update()
        //this.updatePreload()
    }

    terminate(){
        ImageManager.clearTempGeneratorCache()
        super.terminate()
    }

    getCurrentPieceWindow(){
        return this.pieceSelectWindows[this.categoryWindow.getCurrentCategory()]
    }

    getCurrentPreviewWindow(){
        return this.previewWindows[this.categoryWindow.getCurrentCategory()]
    }

    getCurrentPieceTypeContainer(){
        return this.getCurrentPieceWindow().getCurrentPieceTypeContainer()
    }

    //Overwrite from default.
    createButtons(){}

}

class Window_GeneratorCommand extends Window_Command{

    initialize(){
        this.initMembers()
        super.initialize(this.createSizeRect())
    }

    initMembers(){}

    createSizeRect(){
        const width = this.getParameters().width()
        const height = this.fittingHeight(this.getParameters().numVisibleRows)
        const [x, y] = Plugin.createPosition(width, height, this.getParameters().position.initial)
        
        return new Rectangle(x, y, width, height)
    }

    getParameters(){
        return Plugin.getParam().commandWindow
    }

    makeCommandList(){
        const handlers = this.getCommandHandlers()

        for(const {name, symbol} of Plugin.getParam().commandWindow.commandList){
            this.addCommand(name, symbol)
            this.setHandler(symbol, handlers[symbol].bind(this))
        }

    }

    getCommandHandlers(){
        return {
            category: this.onCategoryCmd,
            hue: this.onHueCmd,
            offset: this.onOffsetCmd,
            clear: this.onClearCmd,
            random: this.onRandomCmd,
            finish: this.onFinishCmd,
        }
    }

    onCategoryCmd(){
        SceneManager._scene.categoryWindow.activate()
    }

    onHueCmd(){
        SceneManager._scene.hueWindow.start()
    }

    onOffsetCmd(){
        this.activate()
    }

    onClearCmd(){
        const scene = SceneManager._scene
        const type = scene.categoryWindow.currentSymbol()
        const layerIndex = scene.categoryWindow.currentExt()
        const pieceIndex = scene.pieceSelectWindows[type].currentExt()

        scene.pieceSelectWindows[type].clearPreviewWindow(layerIndex, pieceIndex)
        this.activate()
    }

    onRandomCmd(){
        const pieceWindows = SceneManager._scene.pieceSelectWindows
        const hueWindow = SceneManager._scene.hueWindow
        const categoryWindow = SceneManager._scene.categoryWindow

        for(const piece of Plugin.getSelectedGenerator().pieces.visible){

            if(!piece.allowRandomAll) continue;

            const type = piece.type
            const pieceIndex = Math.randomInt(piece.files.length+1)
            const oldHue = Plugin.settings.visiblePiecesSelected[piece.visibleIndex].hue

            if(pieceIndex < piece.files.length){
                Plugin.settings.visiblePiecesSelected[piece.visibleIndex].hue = Math.randomInt(361)
                pieceWindows[type].drawOnPreviewWindows(piece.visibleIndex, pieceIndex)
                
            }else{
                pieceWindows[type].clearPreviewWindow(piece.visibleIndex, pieceIndex)
            }

            if(piece.randomHue){
                hueWindow.refreshPreviewHueFilters(piece)
            }else{
                Plugin.settings.visiblePiecesSelected[piece.visibleIndex].hue = oldHue
            }
            
        }

        SceneManager._scene.getCurrentPieceTypeContainer().refreshHueColor()
        categoryWindow.refreshHueWindow()
        this.activate()
    }

    onFinishCmd(){
        const character = Plugin.settings.character
        const genKey = Plugin.settings.charId
        const generatorPieces = Plugin.getSelectedGenerator().pieces

        Plugin.generatedCharacters[genKey] = {
            generatorIndex: Plugin.settings.index,
            pieces: [...Plugin.settings.visiblePiecesSelected],
            hasWalk: generatorPieces.walk.length > 0,
            hasFace: generatorPieces.face.length > 0,
            hasBattler: generatorPieces.battler.length > 0,
        }

        character._customFrameKey = Plugin.settings.backupCustomFrameKey
        
        character.setGeneratorCharacterId(genKey)
        character.applyGeneratedCharacter()
        SceneManager._scene.popScene()
    }

    maxCols(){
        return this.getParameters().maxCols
    }
}

class Window_GeneratorCategoryCommand extends Window_Command{

    initialize(){
        this.initMembers()
        super.initialize(this.createSizeRect())
        this.setHandler("ok", this.onOk.bind(this))
        this.setHandler("cancel", this.onCancel.bind(this))
    }

    initMembers(){
        this.canRefreshPieceWindows = false
    }

    maxCols(){
        return this.getParameters().maxCols
    }

    createSizeRect(){
        const width = this.getParameters().width()
        const height = this.fittingHeight(this.getParameters().numVisibleRows)
        const [x, y] = Plugin.createPosition(width, height, this.getParameters().position.initial)
        
        return new Rectangle(x, y, width, height)
    }

    getParameters(){
        return Plugin.getParam().categoryWindow
    }

    onOk(){
        this.deactivate()
        SceneManager._scene.pieceSelectWindows[this.getCurrentCategory()].activate()
    }

    onCancel(){
        this.deactivate()
        SceneManager._scene.commandWindow.activate()
    }

    getCurrentCategory(){
        return this.getCurrentPiece().type
    }

    getCurrentPiece(){
        return Plugin.getVisiblePiece(this.currentExt())
    }

    makeCommandList(){
        super.makeCommandList()
        const gen = Plugin.getSelectedGenerator()
        const method = gen.commandOrder
        const typeOrder = gen.pieceTypeOrder
        const pieceList = gen.pieces.visible.map(item => item).sort(this.onSort.bind(this, method, typeOrder))
    
        for(const piece of pieceList){
            this.addCommand(piece.name, piece.type, true, piece.visibleIndex)
        }
    }

    onSort(method, typeOrder, a, b){
        switch(method){
            case "Alphabetically": 
                return this.sortAlphabetically(a, b)

            case "Piece Type": 
                return this.sortByPieceType(a, b, typeOrder)

            case "Alphabetically and Piece Type": 
                return this.sortAlphabeticallyAndPieceType(a, b, typeOrder)

            default:
                return 0
        }
    }

    sortAlphabetically(a, b){
        if(a.name < b.name) {
            return -1

        }else if(a.name > b.name) {
            return 1

        }else{
            return 0
        }
    }

    sortByPieceType(a, b, typeOrder){
        const typeA = typeOrder[a.type]
        const typeB = typeOrder[b.type]

        if(typeA < typeB) {
            return -1

        }else if(typeA > typeB) {
            return 1

        }else{
            return 0
        }
    }

    sortAlphabeticallyAndPieceType(a, b, typeOrder){
        const result1 = this.sortByPieceType(a, b, typeOrder) * 2
        const result2 = this.sortAlphabetically(a, b, typeOrder)

        return  result1 + result2
    }

    select(index){
        const isNewSelection = this.index() !== index
        super.select(index)

        if(this.canRefreshPieceWindows){

            if(isNewSelection){
                this.onNewSelection()
            }

        }else{
            this.clearAllPieceWindows()
        }
    }

    onNewSelection(){
        this.refreshPieceWindows()
        this.refreshHueWindow()
    }

    refreshPieceWindows(){
        const pieceWindows = SceneManager._scene.pieceSelectWindows
        const category = this.getCurrentCategory()

        for(const key in pieceWindows){
            const win = pieceWindows[key]

            if(key === category){
                win.select(0)
                win.scrollTo(0, 0)
                win.refresh()
                win.visible = true
            }else{
                win.visible = false
            }
        }
    }

    refreshHueWindow(){
        const hueWindow = SceneManager._scene.hueWindow
        const pieceWindow = SceneManager._scene.pieceSelectWindows[this.getCurrentCategory()]
        const hue = pieceWindow.getCurrentPieceTypeContainer()._hue.toString().split("")

        hueWindow.setDigit(2, Number(hue.pop() ?? 0))
        hueWindow.setDigit(1, Number(hue.pop() ?? 0))
        hueWindow.setDigit(0, Number(hue.pop() ?? 0))     
    }

    clearAllPieceWindows(){
        const pieceWindows = SceneManager._scene.pieceSelectWindows
        
        for(const key in pieceWindows){
            pieceWindows[key].visible = false
            pieceWindows[key].select(0)
            pieceWindows[key].scrollTo(0, 0)
        }
    }

    start(){
        this.canRefreshPieceWindows = true
        this.select(0)
        this.onNewSelection()
        this.onCancel()
    }
}

class Window_GeneratorPiecesSelect extends Window_Command{

    initialize(commandWindow){
        this.initMembers(commandWindow)
        super.initialize(new Rectangle())
        this.initWindowSize()
        this.initRefresh()
        this.initializePlus()
        this.setHandler("ok", this.onOk.bind(this))
        this.setHandler("cancel", this.onCancel.bind(this))
    }

    initMembers(commandWindow){
        this.pieceTypeContainers = []
        //this.currentBitmaps = [] can delete this
        this.commandWindow = commandWindow
        this.canRefresh = false
    }

    initWindowSize(){
        this.move(...this.createSize())
        this.createContents()
    }

    createSize(){
        const width = this.makeWidth()
        const height = this.fittingHeight(this.getParameters().numVisibleRows)
        const [x, y] = Plugin.createPosition(width, height, this.getParameters().position.initial)

        return [x, y, width, height]
    }

    makeWidth(){
        const maxCols = this.maxCols()
        const pieceWidth = this.itemWidth()

        return (pieceWidth * maxCols) + this.padding * 2 
    }

    itemWidth() {
        return this.getPieceWidth() + this.colSpacing()*2
    }
    
    itemHeight() {
        return this.getPieceHeight() + this.rowSpacing()*2
    }
    
    initRefresh(){
        this.canRefresh = true
        this.refresh()
    }

    initializePlus(){
        this._canRepeat = false
        this.visible = false
        this.deactivate()
    }

    getParameters(){
        return Plugin.getParam().pieceSelectWindows[this.getType()]
    }

    onOk(){
        if(this.currentSymbol() === "clear"){
            this.clearPreviewWindow(this.commandWindow.currentExt(), this.currentExt())

        }else if(this.currentSymbol() === "random"){
            this.drawRandomly()
        }else{
            this.drawOnPreviewWindows(this.commandWindow.currentExt(), this.currentExt())
        }
        
        this.activate()
    }

    drawRandomly(){
        const visibleIndex = this.commandWindow.currentExt()
        const piece = Plugin.getVisiblePiece(visibleIndex)
        const pieceIndex = Math.randomInt(piece.files.length+1)
        const oldHue = Plugin.settings.visiblePiecesSelected[visibleIndex].hue

        if(pieceIndex < piece.files.length){
            Plugin.settings.visiblePiecesSelected[visibleIndex].hue = Math.randomInt(361)
            this.drawOnPreviewWindows(visibleIndex, pieceIndex)
            
        }else{
            this.clearPreviewWindow(visibleIndex, pieceIndex)
        }

        if(piece.randomHue){
            SceneManager._scene.hueWindow.refreshPreviewHueFilters(piece)
            this.getCurrentPieceTypeContainer().refreshHueColor()
            this.commandWindow.refreshHueWindow()
        }else{
            Plugin.settings.visiblePiecesSelected[visibleIndex].hue = oldHue
        }
    }

    clearPreviewWindow(visibleIndex, pieceIndex){
        const currentPiece = Plugin.getVisiblePiece(visibleIndex)
        const previewWindow = SceneManager._scene.previewWindows[this.getType()]

        previewWindow.clearSprite(currentPiece)
        Plugin.settings.visiblePiecesSelected[visibleIndex].index = -1

        for(const piece of currentPiece.subParts.all){
            const previewWindow = SceneManager._scene.previewWindows[piece.type]

            previewWindow.clearSprite(piece)
        }
    }

    drawOnPreviewWindows(visibleIndex, pieceIndex){
        const currentPiece = Plugin.getVisiblePiece(visibleIndex)
        const filename = currentPiece.files[pieceIndex]
        const previewWindow = SceneManager._scene.previewWindows[this.getType()]

        previewWindow.startDrawing(currentPiece, pieceIndex)
        Plugin.settings.visiblePiecesSelected[visibleIndex].index = pieceIndex

        for(const piece of currentPiece.subParts.all){
            const index = piece.files.indexOf(filename)
            const previewWindow = SceneManager._scene.previewWindows[piece.type]

            if(index > -1){
                previewWindow.startDrawing(piece, index)
            }else{
                previewWindow.clearSprite(piece)
            }
        }
    }

    onCancel(){
        this.deactivate()
        this.commandWindow.activate()
    }

    activate(){
        super.activate()
        this.cursorVisible = true
    }

    deactivate(){
        super.deactivate()
        this.cursorVisible = false
    }

    refresh(){
        if(this.canRefresh){
            super.refresh()
            this.refreshPieceContainersVisibility()
        }
    }

    refreshPieceContainersVisibility(){
        for(let i = 0; i < this.pieceTypeContainers.length; i++){
            if(this.pieceTypeContainers[i]){
                this.pieceTypeContainers[i].visible = i === this.commandWindow.currentExt()
            }
        }
    }

    addCommandAt(index, cmd) {
        Eli.Array.insertElement(this._list, index, cmd)
    }

    makeCommandList(){
        super.makeCommandList()
        const piece = this.getCurrentPiece()

        for(let i = 0; i < piece.files.length; i++){
            const file = piece.files[i]
            this.addCommand("", file, true, i)
        }

        let firstIndex = 0
        let lastIndex = 0

        for(const symbol of this.getParameters().generalCommands){
            const image = this.getGeneralCommandImage(symbol)
            const cmdData = {name: "", symbol: symbol, enabled: true, ext: image}

            if(this.getParameters().generalCommandIndex === "First"){
                this.addCommandAt(firstIndex, cmdData)
                firstIndex++
            }else{
                this.addCommandAt(this._list.length - lastIndex, cmdData)
                lastIndex++
            }
        }

        if(!this.pieceTypeContainers[piece.visibleIndex]){
            this.createPieceContainer(piece)
        }
    }

    getGeneralCommandImage(symbol){
        const generator = Plugin.getSelectedGenerator()

        return {
            random: generator[`${this.getType()}RandomPiece`],
            clear: generator[`${this.getType()}ClearPiece`],
        }[symbol]
    }

    createPieceContainer(piece){
        const container = {
            face: new Container_GeneratorFacePiece(piece, this),
            walk: new Container_GeneratorWalkPiece(piece, this),
            battler: new Container_GeneratorBattlerPiece(piece, this),
        }[piece.type]

        this.pieceTypeContainers[piece.visibleIndex] = container
        this.addInnerChild(container)
    }

    getCurrentPiece(){
        return this.commandWindow.getCurrentPiece()
    }

    drawItem(index){}

    getUrl(piece, index){
        const path = piece.folder
        const file = piece.files[index]

        return `img/generator/${path}${file}`
    }

    getFile(index){
        return this.getCurrentPiece().files[index]
    }

    getPath(index){
        return this.getCurrentPiece().paths[index]
    }

    lineHeight(){
        return this.getPieceHeight()
    }

    maxCols(){
        return this.getParameters().maxCols
    }

    getPieceWidth(){
        return Plugin.getSelectedGenerator()[`${this.getType()}Size`][0]
    }

    getPieceHeight(){
        return Plugin.getSelectedGenerator()[`${this.getType()}Size`][1]
    }

    getType(){
        return ""
    }

    getCurrentPieceTypeContainer(){
        return this.pieceTypeContainers[this.getCurrentPiece().visibleIndex]
    }
}

class Window_GeneratorFacePiecesSelect extends Window_GeneratorPiecesSelect{

    getType(){
        return "face"
    }

}

class Window_GeneratorWalkPiecesSelect extends Window_GeneratorPiecesSelect{

    getType(){
        return "walk"
    }
}

class Window_GeneratorBattlerPiecesSelect extends Window_GeneratorPiecesSelect{

    getType(){
        return "battler"
    }
}

/**
 * Holds all the piece files of a specific group.
 * Creates a sprite for each one of them, and display them all on the Piece Window.
 * It simulates the Window_GeneratorPiece contents, instead of letting the window draw on a regular .content.
 */
class Container_GeneratorBasePiece extends PIXI.Container{

    constructor(piece, window){
        super()
        this.initialize(piece, window)
    }

    initialize(piece, window){
        this.initMembers(piece, window)
        this.createColorFilter()
        this.refreshHueColor()
        this.createMainPieceSprite()
        this.sortChildren()
    }

    initMembers(piece, window){
        this.piece = piece
        this.pieceSelectWindow = window
        this.pieceSpriteList = []
        this._colorFilter = null
        this._hue = 0
        this._blendColor = [0, 0, 0, 0]
        this._colorTone = [0, 0, 0, 0]
    }

    refreshHueColor(){
        const visibleIndex = this.piece.visibleIndex
        const hue = Plugin.settings.visiblePiecesSelected[visibleIndex].hue
        
        this.changeHueColor(hue)
    }

    createMainPieceSprite(){
        const sprite = this.createSpritePieceGroup(this.piece)

        for(let i = 0; i < this.pieceSelectWindow._list.length; i++){
            const cmd = this.pieceSelectWindow._list[i]

            if(isNaN(cmd.ext)){
                const index = i
                const bitmap = ImageManager.loadGeneratorBitmap("img/generator/", `${cmd.ext}.png`)

                bitmap.addLoadListener(() => {
                    this.drawGeneralCommandImage(bitmap, sprite.bitmap, index)
                })
            }else{

                const bitmap = ImageManager.loadTempGeneratorPiece(this.piece, cmd.ext)
                
                bitmap.addLoadListener(() => {
                    this.drawPiece(bitmap, sprite.bitmap, i, this.piece)
                })
            }
        }
    }

    drawGeneralCommandImage(bitmap, spriteBitmap, index){
        const rect = this.pieceSelectWindow.itemRect(index)

        const sw = this.pieceSelectWindow.getPieceWidth()
        const sh = this.pieceSelectWindow.getPieceHeight()
        const sx = 0
        const sy = 0

        const dw = sw
        const dh = sh
        const dx = rect.x + (rect.width-sw)/2
        const dy = rect.y + (rect.height-sh)/2
   
        spriteBitmap.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh)
    }

    createSubPieceSprites(){
        const subPieces = this.piece.subParts[this.pieceSelectWindow.getType()]

        for(const subPiece of subPieces){
            const sprite = this.createSpritePieceGroup(subPiece)

            for(let i = 0; i < subPiece.files.length; i++){
                const bitmap = ImageManager.loadTempGeneratorPiece(subPiece, i)

                bitmap.addLoadListener(() => {
                    const index = this.pieceSelectWindow._list.findIndex(cmd => cmd.symbol === subPiece.files[i])
                    
                    if(index > -1){
                        this.drawPiece(bitmap, sprite.bitmap, index, subPiece)
                    }
                })
            }
        }
    }

    createSpritePieceGroup(piece){
        const mainBitmap = this.createSpriteBitmap(piece)
        const zIndex = piece.layerIndex
        const sprite = new Sprite_GeneratorFilePiece(mainBitmap, zIndex)

        this.pieceSpriteList[zIndex] = sprite
        this.addChild(sprite)

        return sprite
    }

    createSpriteBitmap(piece){
        const maxItems = this.pieceSelectWindow._list.length
        const width = this.pieceSelectWindow.contents.width
        const itemHeight = this.pieceSelectWindow.itemHeight()
        const height = Math.ceil(maxItems / this.pieceSelectWindow.maxCols()) * itemHeight

        return new Bitmap(width, height)
    }

    drawPiece(bitmap, spriteBitmap, index, piece){
        const rect = this.pieceSelectWindow.itemRect(index)

        const sw = this.pieceSelectWindow.getPieceWidth()
        const sh = this.pieceSelectWindow.getPieceHeight()
        const sx = sw * piece.frameIndex[0]
        const sy = sh * piece.frameIndex[1]

        const dw = sw
        const dh = sh
        const dx = rect.x + (rect.width-sw)/2
        const dy = rect.y + (rect.height-sh)/2
   
        spriteBitmap.blt(bitmap, sx, sy, sw, sh, dx, dy, dw, dh)
    }

    createColorFilter() {
        if(!this._colorFilter){
            this._colorFilter = new ColorFilter()
            this.filters = this.filters || []
            this.filters.push(this._colorFilter)
        }
    }

    getType(){
        return this.piece.type
    }

    changeHueColor(value){
        this._hue = value
        this._colorFilter.setHue(this._hue)
    }

    changeBlendColor(r, g, b, a){
        this._blendColor = [r, g, b, a]
        this._colorFilter.setBlendColor(this._blendColor)
    }

    changeColorTone(r, g, b, gray){
        this._colorTone = [r, g, b, gray]
        this._colorFilter.setColorTone(this._colorTone)
    }

    refreshPreviewPieceFilters(){
        const previewWindow = SceneManager._scene.previewWindows[this.piece.type]
        const spritePreview = previewWindow.spriteLayer[this.piece.layerIndex]
        spritePreview.filters = this.filters

        for(const type in this.piece.subParts){
            const subPieces = this.piece.subParts[type]

            for(const piece of subPieces){
                const previewWindow = SceneManager._scene.previewWindows[piece.type]
                const spritePreview = previewWindow.spriteLayer[piece.layerIndex]

                spritePreview.filters = this.filters
            }
        }
    }
}

class Container_GeneratorFacePiece extends Container_GeneratorBasePiece{

    createMainPieceSprite(){
        super.createMainPieceSprite()
        this.createSubPieceSprites()
    }

    drawPiece(bitmap, spriteBitmap, index, piece){
        const rect = this.pieceSelectWindow.itemRect(index)
        
        const sw = bitmap.width
        const sh = bitmap.height
        const sx = sw * piece.frameIndex[0]
        const sy = sh * piece.frameIndex[1]

        const dw = rect.width
        const dh = rect.height
        const dx = rect.x + (rect.width-sw)/2
        const dy = rect.y + (rect.height-sh)/2

        spriteBitmap.blt(bitmap, sx, sy, sw, sh, dx, dy)
    }

}

class Container_GeneratorWalkPiece extends Container_GeneratorBasePiece{}
class Container_GeneratorBattlerPiece extends Container_GeneratorBasePiece{}

class Sprite_GeneratorFilePiece extends Sprite{

    initialize(bitmap, zIndex){
        super.initialize(bitmap)
        this.initMembers(zIndex)
    }

    initMembers(zIndex){
        this._zIndex = zIndex
    }
}

/* --------------------------------- PREVIEW -------------------------------- */

class Window_GeneratorPreview extends Window_Base{

    _createAllParts() {
        super._createAllParts()
        this.moveFrameSpriteToTop()
    }

    moveFrameSpriteToTop(){
        const index = this._container.getChildIndex(this._frameSprite)

        this._container.removeChildAt(index)
        this.addChild(this._frameSprite)
    }

    initialize(commandWindow){
        this.initMembers(commandWindow)
        super.initialize(new Rectangle())
        this.initSize()
        this.createSpriteLayer()
    }

    drawBackgroundRect(rect) {
        const c1 = ColorManager.itemBackColor1()
        const c2 = ColorManager.itemBackColor2()
        const x = rect.x
        const y = rect.y
        const w = rect.width
        const h = rect.height

        this.contents.gradientFillRect(x, y, w, h, c1, c2, true)
        this.contents.strokeRect(x, y, w, h, c1)
    }

    initMembers(commandWindow){
        this.commandWindow = commandWindow
        this.spriteLayer = []
    }

    initSize(){
        const [x, y, width, height] = this.createSizeRect()

        this.move(x, y, width, height)
        this.createContents()
        this.drawBackgroundRect(new Rectangle(0, 0, width, height))
    }

    createSizeRect(){
        const width = this.getPieceWidth() + this.padding*2
        const height = this.getPieceHeight() + this.padding*2
        const [x, y] = Plugin.createPosition(width, height, this.getParameters().position.initial)

        return [x, y, width, height]
    }

    getParameters(){
        return Plugin.getParam().previewWindows[this.getType()]
    }

    getPieceWidth(){
        return Plugin.getSelectedGenerator()[`${this.getType()}Size`][0]
    }

    getPieceHeight(){
        return Plugin.getSelectedGenerator()[`${this.getType()}Size`][1]
    }

    createSpriteLayer(){
        const pieces = this.getPieceList()
        const SpritePreview = {
            face: Sprite_GeneratorFacePreview,
            walk: Sprite_GeneratorWalkPreview,
            battler: Sprite_GeneratorBattlerPreview,
        }[this.getType()]

        for(const piece of pieces){
            const bitmap = new Bitmap(this.getPieceWidth(), this.getPieceHeight())
            const sprite = new SpritePreview(bitmap, this.getParameters(), piece)
 
            this.spriteLayer.push(sprite)
            this.addInnerChild(sprite)
        }
    }

    getPieceList(){
        return Plugin.getSelectedGenerator().pieces[this.getType()]
    }

    getUrl(piece, index){
        const path = piece.paths[index]
        const file = piece.files[index]

        return `img/generator/${path}${file}`
    }

    contentsHeight(){
        return this.getPieceHeight()
    }

    contentsWidth(){
        return this.getPieceHeight()
    }

    startDrawing(piece, pieceIndex){
        const layerIndex = piece.layerIndex
        const sprite = this.spriteLayer[layerIndex]
        const bitmap = ImageManager.loadTempGeneratorPiece(piece, pieceIndex)

        this.drawSprite(sprite, bitmap)
    }

    drawSprite(sprite, bitmap){
        sprite.bitmap = bitmap
        sprite.setDefaultFrame()
    }

    clearSprite(piece){
        const layerIndex = this.getPieceList().indexOf(piece)
        const sprite = this.spriteLayer[layerIndex]

        sprite.bitmap = new Bitmap(this.getPieceWidth(), this.getPieceHeight())
        sprite.setDefaultFrame()
    }

    getType(){
        return ""
    }
}

class Window_GeneratorFacePreview extends Window_GeneratorPreview{

    getType(){
        return "face"
    }

    drawSprite(sprite, bitmap){
        super.drawSprite(sprite, bitmap)
        bitmap.addLoadListener(() => {
            sprite.x = (this.getPieceWidth() - bitmap.width)/2
            sprite.y = (this.getPieceHeight() - bitmap.height)/2
        })
    }
}

class Window_GeneratorWalkPreview extends Window_GeneratorPreview{

    getType(){
        return "walk"
    }
}

class Window_GeneratorBattlerPreview extends Window_GeneratorPreview{

    getType(){
        return "battler"
    }
}

class Sprite_GeneratorPreview extends Sprite{

    initialize(bitmap, parameters, piece){
        this.initMembers(parameters, piece)
        super.initialize(bitmap)
        this._createColorFilter()
        this.initHue()
        this.setDefaultFrame()
    }

    initMembers(parameters, piece){
        this.rowOrder = parameters.rowOrder
        this.piece = piece
        this.maxFrames = this.getFrameOrder().length - 1
        this.frameIndex = 0
        this.rowIndex = 0
        this.frameCount = 0
    }

    initHue(){
        const visibleIndex = this.piece.visibleIndex
        const hue = Plugin.settings.visiblePiecesSelected[visibleIndex].hue
        
        this.changeHueColor(hue)
    }

    changeHueColor(value){
        this._hue = value
        this._colorFilter.setHue(this._hue)
    }

    setDefaultFrame(){
        this.setFrame(...this.createFrame())
    }

    createFrame(){
        const width = this.getFrameWidth()
        const height = this.getFrameHeight()
        const x = this.getCurrentFrame() * width
        const y = this.getCurrentDirection() * height

        return [x, y, width, height]
    }

    getFrameWidth(){
        return Plugin.getSelectedGenerator()[`${this.getType()}Size`][0]
    }

    getFrameHeight(){
        return Plugin.getSelectedGenerator()[`${this.getType()}Size`][1]
    }

    getFrameOrder(){
        return Plugin.getSelectedGenerator()[`${this.getType()}FrameOrder`]
    }

    getCurrentFrame(){
        return this.getFrameOrder()[this.frameIndex]
    }

    getCurrentDirection(){
        return this.rowOrder[this.rowIndex]
    }

    changeRowIndex(){
        if(this.rowIndex === this.rowOrder.length-1){
            this.rowIndex = 0
        }else{
            this.rowIndex++
        }
    }

    update(){
        super.update()
        this.updateFrames()
    }

    updateFrames(){
        this.frameCount++
        
        if(this.frameCount >= Plugin.settings.character.animationWait()){
            this.changeFrameIndex()
            this.setFrame(...this.createFrame())
            this.frameCount = 0
        }
    }

    changeFrameIndex(){
        if(this.frameIndex === this.maxFrames){
            this.frameIndex = 0
            this.changeRowIndex()
        }else{
            this.frameIndex++
        }
    }

    changeBlendColor(r, g, b, a){
        this._blendColor = [r, g, b, a]
        this._colorFilter.setBlendColor(this._blendColor)
    }

    changeColorTone(r, g, b, gray){
        this._colorTone = [r, g, b, gray]
        this._colorFilter.setColorTone(this._colorTone)
    }

    getType(){
        return ""
    }
}

class Sprite_GeneratorFacePreview extends Sprite_GeneratorPreview{

    getCurrentFrame(){
        return 0
    }

    getFrameOrder(){
        return []
    }

    updateFrames(){
        // No frames update for the face image
    }

    getType(){
        return "face"
    }
}

class Sprite_GeneratorWalkPreview extends Sprite_GeneratorPreview{

    initMembers(parameters, piece){
        super.initMembers(parameters, piece)

        if(!Plugin.getSelectedGenerator().diagonal){
            this.rowOrder = this.rowOrder.filter(row => row % 2 === 0)
        }

        this.directionTable = {
            1: 0,
            2: 0,
            3: 1,
            4: 1,
            6: 2,
            7: 2,
            8: 3,
            9: 3,
        }
    }

    createFrame(){
        const direction = this.getCurrentDirection()
        const isDiagonal = direction % 2 === 1
        const extraWidth = isDiagonal ? this.bitmap.width/2 : 0
        const width = this.getFrameWidth()
        const height = this.getFrameHeight()
        const x = (this.getCurrentFrame() * width) + extraWidth
        const y = this.directionTable[direction] * height

        return [x, y, width, height]
    }

    getType(){
        return "walk"
    }
}

class Sprite_GeneratorBattlerPreview extends Sprite_GeneratorPreview{

    getType(){
        return "battler"
    }

    updateFrames(){
        this.frameCount++
        
        if(this.frameCount >= 16){
            this.changeFrameIndex()
            this.setFrame(...this.createFrame())
            this.frameCount = 0
        }
    }
}

/* ---------------------------------- COLOR --------------------------------- */

class Window_GeneratorColorBase extends Window_NumberInput{

    initialize(maxDigits){
        Window_Selectable.prototype.initialize.call(this, new Rectangle())
        this.initMembers(maxDigits)
        
        if(ConfigManager.touchUI){
            this.createAllUIButtons()
            this.setUIButtonHandlers()
        }

        this.setInputHandlers()

        this.initSize()
        this.refresh()
        this.open()
        this.deactivate()
    }

    initMembers(maxDigits){
        this._number = new Array(maxDigits).fill(0)
        this._maxDigits = maxDigits
        this._canRepeat = false
        this._buttons = []
    }

    createAllUIButtons() {
        const allUIButtons = this.getAllUIButtons()

        for(const type of allUIButtons){
            this.createUIButton(type)
        }
    }

    getAllUIButtons(){
        return ["down", "up", "ok"]
    }

    createUIButton(type){
        const button = new Sprite_GeneratorColorButton(type, this)

        button.x = this.getNextButtonX()
        button.y = this.getButtonY()
        this._buttons.push(button)
        this.addInnerChild(button)
    }

    getNextButtonX(){
        const prevButton = this._buttons[this._buttons.length-1]
        return prevButton ? prevButton.x + prevButton.width + this.buttonSpacing() : 0
    }

    getButtonY() {
        const lines = this.hasTitle() ? 2 : 1
        return this.itemHeight() * lines + this.buttonSpacing()
    }

    setUIButtonHandlers(){
        this._buttons[0].setClickHandler(this.onButtonDown.bind(this))
        this._buttons[1].setClickHandler(this.onButtonUp.bind(this))
        this._buttons[2].setClickHandler(this.onButtonOk.bind(this))
    }

    onButtonDown(){
        if(this.active){
            super.onButtonDown()
        }
    }

    onButtonUp(){
        if(this.active){
            super.onButtonUp()
        }
    }

    onButtonOk(){
        if(this.active){
            super.onButtonOk()
        }
    }

    setInputHandlers(){
        this.setHandler("cancel", this.onCancel.bind(this))
        this.setHandler("ok", this.processOk.bind(this))
    }

    onCancel(){
        this.deactivate()
        this.cursorVisible = false
        SceneManager._scene.commandWindow.activate()
    }

    processOk(){
        this.playOkSound()
        this.updateInputData()
        this.changePieceColorFilter()
    }

    initSize(){
        this.move(...this.createWindowSize())
        this.createContents()
    }

    createWindowSize(){
        const width = this.windowWidth()
        const height = this.windowHeight()
        const [x, y] = Plugin.createPosition(width, height, this.getParameters().position.initial)

        return [x, y, width, height]
    }

    windowHeight() {
        const lines = this.hasTitle() ? 2 : 1

        if(ConfigManager.touchUI){
            return this.fittingHeight(lines) + this.buttonSpacing() + 48
        }else{
            return this.fittingHeight(lines)
        }
    }

    refresh(){
        super.refresh()

        if(this.hasTitle()){
            this.drawTitle()
        }
    }

    hasTitle(){
        return this.getParameters().title.length > 0
    }

    drawTitle(){
        this.drawText(this.getParameters().title, 0, 0, this.contentsWidth(), "center")
    }

    start(){
        this.activate()
        this.select(0)
    }

    isCancelEnabled(){
        return true
    }

    changeDigit(direction){
        this.setDigit(this.index(), this.makeNewDigit(this.index(), direction))
        this.playCursorSound()

        if(this.getParameters().autoUpdate){
            this.changePieceColorFilter()
        }
    }

    setDigit(index, value){
        this._number[index] = value
        this.digitTo360()
        this.refresh()
    }

    digitTo360(){
        if(this._number[0] === 3){

            if(this._number[1] >= 6){
                this._number[1] = 6
                this._number[2] = 0
            }
        }
    }

    makeNewDigit(index, direction){
        const value = direction ? 1 : -1
        const number = this._number[index] + value
        
        return {
            0: number.clamp(0, 3),
            1: number.clamp(0, 9),
            2: number.clamp(0, 9),
        }[index]
    }

    getCurrentPieceTypeContainer(){
        return SceneManager._scene.getCurrentPieceTypeContainer()
    }

    changePieceColorFilter(){}

    changePieceHueColor(container){
        const hueValue = Number(this._number.join(""))
        const piece = container.piece

        Plugin.settings.visiblePiecesSelected[piece.visibleIndex].hue = hueValue
        container.changeHueColor(hueValue)
        this.refreshPreviewHueFilters(piece)
    }

    refreshPreviewHueFilters(mainPiece){
        const previewWindow = SceneManager._scene.previewWindows[mainPiece.type]
        const spritePreview = previewWindow.spriteLayer[mainPiece.layerIndex]
        const hue = Plugin.settings.visiblePiecesSelected[mainPiece.visibleIndex].hue
        
        spritePreview.changeHueColor(hue)

        for(const piece of mainPiece.subParts.all){
            const previewWindow = SceneManager._scene.previewWindows[piece.type]
            const spritePreview = previewWindow.spriteLayer[piece.layerIndex]
            
            spritePreview.changeHueColor(hue)
        }
        
    }

    changeContainerBlendColor(){

    }

    changeContainerColorTone(){

    }

    itemRect(index){
        const plus = this.hasTitle() ? 3 : 0

        return super.itemRect(index + plus)
    }

    drawItem(index){
        const rect = this.itemLineRect(index)
        const align = "center"
        const text = this._number[index]

        this.resetTextColor()
        this.drawText(text, rect.x, rect.y, rect.width, align)
    }

    getParameters(){
        return Plugin.getParam().colorWindows[this.getType()]
    }

    getType(){
        return ""
    }

}

class Window_GeneratorHueColor extends Window_GeneratorColorBase{

    getType(){
        return "hue"
    }

    changePieceColorFilter(){
        const container = this.getCurrentPieceTypeContainer()
        this.changePieceHueColor(container)
    }
}

class Window_GeneratorBlendColor extends Window_GeneratorColorBase{

    getType(){
        return "blend"
    }

    changePieceColorFilter(){
        this.changeContainerBlendColor()
    }
}

class Window_GeneratorColorTone extends Window_GeneratorColorBase{

    getType(){
        return "tone"
    }

    changePieceColorFilter(){
        this.changeContainerColorTone()
    }
}

class Sprite_GeneratorColorButton extends Sprite_Button{

    constructor(type, colorWindow){
        super(type)
        this.colorWindow = colorWindow
    }

    processTouch(){
        if(this.colorWindow.active){
            super.processTouch()
        }
    }
}

class Parameters_CharacterGenerator {

    constructor(parameters){
        this.buildJSON = parameters.buildJSON === "true"

        if(this.buildJSON && Utils.isOptionValid("test")){
            this.generatorList = this.parseGeneratorListParams(JSON.parse(parameters.generatorList))
            this.createCharacterGeneratorDataFolder()
            this.buildGeneratorListJSON()
        }else{
            this.requestGeneratorList()
        }

        this.commandWindow = this.parseCommandWindowParams(parameters.commandWindow)
        this.categoryWindow = this.parseCategoryWindowParams(parameters.categoryWindow)

        this.colorWindows = {
            hue: this.parseHueWindowParams(parameters.hueWindow)
        }

        this.pieceSelectWindows = {
            face: this.parsePieceSelectWindow(parameters.faceCommandWindow),
            walk: this.parsePieceSelectWindow(parameters.walkCommandWindow),
            battler: this.parsePieceSelectWindow(parameters.battlerCommandWindow)
        }

        this.previewWindows = {
            face: this.parsePiecePreviewWindow(parameters.facePreviewWindow),
            walk: this.parsePiecePreviewWindow(parameters.walkPreviewWindow),
            battler: this.parsePiecePreviewWindow(parameters.battlerPreviewWindow)
        }
    }

    parseGeneratorListParams(parameters){
        const genList = []

        for(const param of parameters){
            const gen = {}
            const rawGen = JSON.parse(param)

            gen.id = rawGen.id
            gen.faceSize = rawGen.faceSize.split(",").map(item => Number(item)),
            gen.faceRandomPiece = rawGen.faceRandomPiece,
            gen.faceClearPiece = rawGen.faceClearPiece,

            gen.walkSize = rawGen.walkSize.split(",").map(item => Number(item)),
            gen.walkRandomPiece = rawGen.walkRandomPiece,
            gen.walkClearPiece = rawGen.walkClearPiece,
            gen.walkFrameOrder = rawGen.walkFrameOrder.split(",").map(item => Number(item)),

            gen.battlerSize = rawGen.battlerSize.split(",").map(item => Number(item)),
            gen.battlerRandomPiece = rawGen.battlerRandomPiece,
            gen.battlerClearPiece = rawGen.battlerClearPiece,
            gen.battlerFrameOrder = rawGen.battlerFrameOrder.split(",").map(item => Number(item)),
            
            gen.customFrameKey = rawGen.customFrameKey || null
            gen.diagonal = rawGen.diagonal === "true"
            gen.commandOrder = rawGen.commandOrder
            gen.pieceTypeOrder = this.parsePieceTypeOrder(rawGen.pieceTypeOrder)
            gen.defaultPiecesList = []
            gen.pieces = {
                face: this.parsePieces(rawGen.facePieces, "face"),
                walk: this.parsePieces(rawGen.walkPieces, "walk"),
                battler: this.parsePieces(rawGen.battlerPieces, "battler"),
            }

            genList.push(gen)
        }

        return genList
    }

    parsePieceTypeOrder(rawParam){
        const [type1, type2, type3] = JSON.parse(rawParam)
        const typeOrder = {}

        typeOrder[type1] = 1
        typeOrder[type2] = 2
        typeOrder[type3] = 3

        return typeOrder
    }

    parsePieces(rawParam, type){
        const all = []
        const parameters = JSON.parse(rawParam)

        for(let i = 0; i < parameters.length; i++){
            const param = parameters[i]
            const piece = JSON.parse(param)

            piece.folder = piece.folder
            piece.visible = piece.visible === "true"
            piece.frameIndex = (piece.frameIndex || "0,0").split(",").map(item => Number(item))
            piece.files = this.readFiles(piece.folder)
            piece.type = type
            piece.defaultPieceIndex = Number(piece.defaultPieceIndex) ?? -1
            piece.layerIndex = i
            piece.allowRandomAll = (piece.allowRandomAll || "true") === "true"
            piece.randomHue = (piece.randomHue || "false") === "true"
            piece.subParts = {
                face: [],
                walk: [],
                battler: [],
                all: [],
            }
            
            all.push(piece)
        }

        return all
    }

    readFiles(dir){
        const fs = require("fs")
        const files = fs.readdirSync(`./img/generator/${dir}`)

        return files
    }

    createCharacterGeneratorDataFolder(){
        const fs = require("fs")
        
        if(!fs.existsSync("data/CharacterGenerator")){
            fs.mkdirSync("data/CharacterGenerator")
        }
    }

    buildGeneratorListJSON(){
        const fs = require('fs')
        const data = JSON.stringify(this.generatorList)
        const filename = `data/CharacterGenerator/generatorList.json`

        fs.writeFile(filename, data, "utf8", (err) => {
            if(err){
                console.log("An error occured while writing JSON Object to File.")
                console.log(err)
            }else{
                this.onGeneratorListReady()
            }
        })
    }

    requestGeneratorList(){
        const xhr = new XMLHttpRequest()
        const filename = "generatorList"
        const folderName = "data/CharacterGenerator"
        const url = `${folderName}/${filename}.json`

        xhr.open("GET", url)
        xhr.overrideMimeType("application/json")
        xhr.onload = () => {

            if(xhr.status < 400){
                this.generatorList = JSON.parse(xhr.responseText) 
                this.onGeneratorListReady()
            }else{
                console.log("error")
            }
        }

        xhr.onerror = () => {}
        xhr.send()
    }

    onGeneratorListReady(){
        for(const gen of this.generatorList){
            const {face, battler, walk} = gen.pieces
            let visibleIndex = 0

            gen.pieces.all = [...face, ...walk, ...battler]
            gen.pieces.visible = []
            
            for(let i = 0; i < gen.pieces.all.length; i++){
                const piece = gen.pieces.all[i]
                
                if(!piece.visible) continue

                gen.pieces.visible.push(piece)
                gen.defaultPiecesList.push(piece.defaultPieceIndex)
                piece.visibleIndex = visibleIndex
                piece.subParts.face.push(...this.findSubParts(piece, face, "face"))
                piece.subParts.walk.push(...this.findSubParts(piece, walk, "walk"))
                piece.subParts.battler.push(...this.findSubParts(piece, battler, "battler"))
                piece.subParts.all = [...piece.subParts.face, ...piece.subParts.walk, ...piece.subParts.battler]
                visibleIndex++
            }
        }
    }

    findSubParts(mainPiece, pieceList){
        const arr = []

        for(const piece of pieceList){

            if(this.isSubPart(mainPiece, piece)){
                arr.push(piece)
                piece.visibleIndex = mainPiece.visibleIndex
            }
        }

        return arr
    }

    isSubPart(mainPiece, piece){
        return piece !== mainPiece && piece.files.some(file => mainPiece.files.includes(file))
    }

    parseCommandWindowParams(rawParam){
        const param = JSON.parse(rawParam)

        return {
            width: new Function(`return ${param.width}`),
            maxCols: Number(param.maxCols) || 1,
            numVisibleRows: Number(param.numVisibleRows) || 1,
            commandList: JSON.parse(param.commandList).map(cmd => JSON.parse(cmd)),
            position: this.parsePosition(param.position),
        }
    }

    parsePosition(rawParam){
        const position = JSON.parse(rawParam)

        return {
            initial: {
                alignX: position.initialAlignX,
                offsetX: Number(position.initialOffsetX),
                alignY: position.initialAlignY,
                offsetY: Number(position.initialOffsetY),
            }
        }
    }

    parseCategoryWindowParams(rawParam){
        const param = JSON.parse(rawParam)

        return {
            width: new Function(`return ${param.width}`),
            maxCols: Number(param.maxCols) || 1,
            numVisibleRows: Number(param.numVisibleRows) || 1,
            finish: param.finish,
            position: this.parsePosition(param.position),
        }
    }

    parseHueWindowParams(rawParam){
        const param = JSON.parse(rawParam)

        return {
            title: param.title || "",
            position: this.parsePosition(param.position),
            autoUpdate: param.autoUpdate === "true",
        }
    }

    parsePieceSelectCommands(commands){
        const parsedCommands = []

        for(const cmd of commands){
            parsedCommands.push({
                symbol: cmd.symbol,
                name: cmd.name,
                index: cmd.index,
                image: cmd.image,
            })
        }

        return parsedCommands
    }

    parsePieceSelectWindow(rawParam){
        const param = JSON.parse(rawParam)

        return {
            maxCols: Number(param.maxCols),
            numVisibleRows: Number(param.numVisibleRows),
            position: this.parsePosition(param.position),
            generalCommands: JSON.parse(param.generalCommands || "[]"),
            generalCommandIndex: param.generalCommandIndex || "First",
        }
    }

    parsePiecePreviewWindow(rawParam){
        const param = JSON.parse(rawParam)
        
        return {
            rowOrder: param.rowOrder.split(",").map(item => Number(item)),
            position: this.parsePosition(param.position),
        }
    }

}

Eli.CharacterGenerator = {

    Scene_CharacterGenerator: Scene_CharacterGenerator,
    Window_GeneratorCommand: Window_GeneratorCommand,
    Window_GeneratorCategoryCommand: Window_GeneratorCategoryCommand,

    Window_GeneratorPiecesSelect: Window_GeneratorPiecesSelect,
    Window_GeneratorFacePiecesSelect: Window_GeneratorFacePiecesSelect,
    Window_GeneratorWalkPiecesSelect: Window_GeneratorWalkPiecesSelect,
    Window_GeneratorBattlerPiecesSelect: Window_GeneratorBattlerPiecesSelect,

    Container_GeneratorBasePiece: Container_GeneratorBasePiece,
    Container_GeneratorFacePiece: Container_GeneratorFacePiece,
    Container_GeneratorWalkPiece: Container_GeneratorWalkPiece,
    Container_GeneratorBattlerPiece: Container_GeneratorBattlerPiece,
    Sprite_GeneratorFilePiece: Sprite_GeneratorFilePiece,

    Window_GeneratorPreview: Window_GeneratorPreview,
    Window_GeneratorFacePreview: Window_GeneratorFacePreview,
    Window_GeneratorWalkPreview: Window_GeneratorWalkPreview,
    Window_GeneratorBattlerPreview: Window_GeneratorBattlerPreview,
    Sprite_GeneratorPreview: Sprite_GeneratorPreview,
    Sprite_GeneratorWalkPreview: Sprite_GeneratorWalkPreview,

    Window_GeneratorColorBase: Window_GeneratorColorBase,
    Window_GeneratorHueColor: Window_GeneratorHueColor,
    
    Parameters: Parameters_CharacterGenerator,
    parameters: new Parameters_CharacterGenerator(PluginManager.parameters(Eli.PluginManager.getPluginName())),

    settings: {
        index: 0,
        character: null,
        drawCharacterPieces: true,
        backupCustomFrameKey: null,
        visiblePiecesSelected: [
            {index: 0, hue: 0}
        ],
    },
    generatedCharacters: {},
    tempGeneratedCharacters: [],
    tempPiecesBitmap: [],
    loadedCharactersIds: {},
    
    initialize(){
        this.registerPluginCommands()
    },

    registerPluginCommands(){
        const commands = ["cmd_openGenerator", "cmd_changeCharacter"]
        Eli.PluginManager.registerCommands(this, commands)
    },

    getParam(){
        return this.parameters
    },

    createPosition(width, height, position){
        const {alignX, alignY, offsetX, offsetY} = position

        const x = {
            left: offsetX,
            center: (Graphics.boxWidth/2 - width/2) + offsetX,
            right: (Graphics.boxWidth - width) + offsetX,
        }[alignX]

        const y = {
            top: offsetY,
            center: (Graphics.boxHeight/2 - height/2) + offsetY,
            bottom: (Graphics.boxHeight - height) + offsetY,
        }[alignY]
        
        return [Math.round(x), Math.round(y)]
    },

    getSelectedGenerator(){
        return this.getParam().generatorList[this.settings.index]
    },

    getVisiblePiece(visibleIndex){
        return this.getSelectedGenerator().pieces.visible[visibleIndex]
    },

    cmd_openGenerator(args){
        const character = Eli.Utils.getMapCharacter(args.subjectId)
        const genIndex = this.findGeneratorIndex(args)

        if(character && genIndex > -1){
            const charGen = character.getCurrentGeneratedCharacter()

            this.settings.character = character
            this.settings.index = genIndex
            this.settings.drawCharacterPieces = args.drawCharPieces === "true"
            this.settings.charId = Eli.String.removeSpaces(args.characterId.toLowerCase())

            if(this.getSelectedGenerator().customFrameKey && Imported.Eli_CharacterFrames){
                this.settings.backupCustomFrameKey = character._customFrameKey
                character._customFrameKey = Eli.CharacterFrames.createCustomFrameKey(this.getSelectedGenerator().customFrameKey)
            }
            
            this.setDefaultSelectedPieces(charGen)

            SceneManager.push(Scene_CharacterGenerator)
        }else{
            console.log("The Subject ID or the Generator argument are not valid.")
            this.settings.character = null
        }
    },

    findGeneratorIndex(args){
        const genIndex = Number(args.genIndex)

        if(isNaN(genIndex)){
            const list = this.getParam().generatorList
            return list.findIndex(item => item.id.toLowerCase() === args.genIndex.toLowerCase())
        }else{
            return genIndex
        }
    },

    setDefaultSelectedPieces(characterGenerator){
        this.settings.visiblePiecesSelected = []

        if(this.canSetCharacterDefaultPieces(characterGenerator)){
            this.settings.visiblePiecesSelected = [...characterGenerator.pieces]
        }else{

            for(const index of this.getSelectedGenerator().defaultPiecesList){
                this.settings.visiblePiecesSelected.push({index: index, hue: 0})
            }
        }
    },

    canSetCharacterDefaultPieces(characterGenerator){
        const charGenIndex = this.settings.character.getCurrentGeneratedCharacter()?.generatorIndex
        const currentGenIndex = this.settings.index

        return charGenIndex === currentGenIndex && this.settings.drawCharacterPieces && characterGenerator
    },

    cmd_changeCharacter(args){
        const ids = Eli.PluginManager.createIdList(args.subjectId)
        const generatedCharacterId = args.characterId.toLowerCase()
        
        for(const id of ids){
            const subject = Eli.Utils.getMapCharacter(id)

            if(subject){
                subject.changeGeneratorCharacter(generatedCharacterId)
            }else{
                console.log(`The subject with character id ${args.characterId} does not exist.`)
            }
            
        }
    },

    getAllGeneratedCharacters(){
        return this.generatedCharacters
    },

    getGeneratedCharacter(id){
        if(SceneManager._scene instanceof Scene_File){
            return this.tempGeneratedCharacters[id]
        }else{
            return this.getAllGeneratedCharacters()[id]
        }
    },

    isAllGeneratedCharactersLoaded(){
        for(const id in this.getAllGeneratedCharacters()){

            if(!this.isGeneratedCharacterLoaded(id)){
                ImageManager.preloadGeneratedCharacter(id)
            }
        }
    
        return ImageManager._generatorPiecesCacheArray.every(bitmap => bitmap.isReady())
    },

    isGeneratedCharacterLoaded(id){
        return this.loadedCharactersIds[id]
    },

    refreshCharactersIdLoaded(){
        for(const id in this.getAllGeneratedCharacters()){
            Plugin.loadedCharactersIds[id] = true
        }
    },

    getAllSubjectSaveData(){
        return $eliData.characterGenerator
    },

    getSubjectSaveData(generatorKey){
        return $eliData.characterGenerator[generatorKey]
    },

    deleteSubjectSaveData(generatorKey){
        delete $eliData.characterGenerator[generatorKey]
    },

    setSaveDataOnSubject(subject, charGenId){
        const generatorKey = subject.getCharGeneratorKey()
        const data = $eliData.characterGenerator[generatorKey]

        if(data?.id in this.getAllGeneratedCharacters()){
            data.id = charGenId

        }else{
            $eliData.characterGenerator[generatorKey] = this.createSubjectSaveData(charGenId, subject)
        }
    },

    subjectHasSaveData(generatorKey){
        return $eliData.characterGenerator[generatorKey]?.id
    },

    createSubjectSaveData(genId, subject){
        return {
            id: genId,
            characterName: subject.characterName(),
            characterIndex: subject.characterIndex(),
            faceName: subject._faceName || "",
            faceIndex: subject._faceIndex || 0,
            battlerName: subject._battlerName || "",
        }
    },

}

const Plugin = Eli.CharacterGenerator
const Alias = {}

Plugin.initialize()

/* -------------------------------- SAVE DATA ------------------------------- */
Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function(){
    Alias.Eli_SavedContents_initialize.call(this)
    this.characterGenerator = {}
}

/* -------------------------------- SCENE MAP ------------------------------- */
Alias.Scene_Map_isReady = Scene_Map.prototype.isReady
Scene_Map.prototype.isReady = function() {
    if(Plugin.isAllGeneratedCharactersLoaded()){
        Plugin.refreshCharactersIdLoaded()
        return Alias.Scene_Map_isReady.call(this)
    }else{
        return false
    }
}

/* ------------------------------- SCENE FILE ------------------------------- */
Alias.Scene_File_isReady = Scene_File.prototype.isReady
Scene_File.prototype.isReady = function(){
    if(!Plugin.tempPiecesBitmap.every(bitmap => bitmap.isReady())){
        return false
    }

    return Alias.Scene_File_isReady.call(this)
}

Alias.Scene_File_terminate = Scene_File.prototype.terminate
Scene_File.prototype.terminate = function() {
    Alias.Scene_File_terminate.call(this)
    Plugin.tempPiecesBitmap = []
    DataManager.restoreGeneratedCharacters()
}

/* ------------------------------ DATA MANAGER ------------------------------ */
Alias.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo
DataManager.makeSavefileInfo = function(){
    const info = Alias.DataManager_makeSavefileInfo.call(this)
    
    info.saveFileId = $gameSystem.savefileId()
    info.generatorCharacterList = JSON.parse(JSON.stringify(Plugin.generatedCharacters))

    return info
}

Alias.DataManager_loadSavefileImages = DataManager.loadSavefileImages
DataManager.loadSavefileImages = function(info){
    if(info.generatorCharacterList){
        Plugin.tempGeneratedCharacters = JSON.parse(JSON.stringify(info.generatorCharacterList))
    }
    
    Alias.DataManager_loadSavefileImages.call(this, info)
}

DataManager.restoreGeneratedCharacters = function(){
    const info = this._globalInfo[$gameSystem.savefileId()]

    if(info){
        Plugin.generatedCharacters = JSON.parse(JSON.stringify(info.generatorCharacterList))
    }
}

/* ------------------------------ IMAGE MANAGER ----------------------------- */
ImageManager._generatorPiecesCache = {}
ImageManager._generatorPiecesCacheArray = []
ImageManager._tempGeneratorPiecesCache = {}
ImageManager._generatorCharactersCache = {}

ImageManager.isCharacterGeneratorFile = function(filename){
    return filename.includes("$gen_")
}

Alias.ImageManager_loadCharacter = ImageManager.loadCharacter
ImageManager.loadCharacter = function(filename){
    if(this.isCharacterGeneratorFile(filename)){
        return this.buildGeneratedCharacterBitmaps(filename, "walk")
    }else{
        return Alias.ImageManager_loadCharacter.call(this, filename)
    }
}

Alias.ImageManager_loadFace = ImageManager.loadFace
ImageManager.loadFace = function(filename){
    if(this.isCharacterGeneratorFile(filename)){
        return this.buildGeneratedCharacterBitmaps(filename, "face")
    }else{
        return Alias.ImageManager_loadFace.call(this, filename)
    }
}

Alias.ImageManager_loadSvActor = ImageManager.loadSvActor
ImageManager.loadSvActor = function(filename){
    if(this.isCharacterGeneratorFile(filename)){
        return this.buildGeneratedCharacterBitmaps(filename, "battler")
    }else{
        return Alias.ImageManager_loadSvActor.call(this, filename)
    }
}

/* ----------------------------- TEMP GENERATOR ----------------------------- */
ImageManager.preloadTempPiece = function(piece, loadSubPieces){
    const bitmaps = []

    for(let index = 0; index < piece.files.length; index++){
        bitmaps.push(this.loadTempGeneratorPiece(piece, index))
    }

    if(loadSubPieces){

        for(const subPiece of piece.subParts.all){

            for(let index = 0; index < subPiece.files.length; index++){
                bitmaps.push(this.loadTempGeneratorPiece(subPiece, index))
            }
        }
    }

    return bitmaps
}

ImageManager.loadTempGeneratorPiece = function(piece, index){
    const folder = `img/generator/${piece.folder}`
    const filename = `${piece.files[index]}`

    return this.loadTempGeneratorBitmap(folder, filename)
}

ImageManager.loadTempGeneratorBitmap = function(folder, filename) {
    if(filename){
        const url = folder + Utils.encodeURI(filename)
        return this.loadBitmapToTempGeneratorCache(url)
    }else{
        return this._emptyBitmap
    }
}

ImageManager.loadBitmapToTempGeneratorCache = function(url) {
    if(!this._tempGeneratorPiecesCache[url]){
        this._tempGeneratorPiecesCache[url] = Bitmap.load(url)
    }

    return this._tempGeneratorPiecesCache[url]
}

ImageManager.clearTempGeneratorCache = function() {
    for(const url in this._tempGeneratorPiecesCache){
        this._tempGeneratorPiecesCache[url].destroy()
    }

    this._tempGeneratorPiecesCache = {}
}

/* -------------------------------- GENERATOR ------------------------------- */
ImageManager.buildGeneratedCharacterBitmaps = function(filename, type){
    const id = filename.substring(5, filename.indexOf("_gen"))
    const character = Plugin.getGeneratedCharacter(id)
    const generator = Plugin.getParam().generatorList[character.generatorIndex]
    const visiblePieces = generator.pieces.visible
    const bitmaps = this.buildPieceBitmaps(visiblePieces, character, type)
    const sortedBitmaps = bitmaps.sort((a, b) => a.layer - b.layer)
    const container = this.createGeneratorContainerBitmap(sortedBitmaps)

    if(SceneManager._scene instanceof Scene_File){
        Plugin.tempPiecesBitmap.push(...sortedBitmaps.map(item => item.bitmap))
    }

    return this.extractGeneratorContainerBitmap(container)
}

ImageManager.buildPieceBitmaps = function(visiblePieces, character, type){
    const bitmaps = []

    for(let i = 0; i < visiblePieces.length; i++){
        const piece = visiblePieces[i]
        const {index, hue} = character.pieces[i]
        
        if(index > -1){
            
            if(piece.type === type){
                const layerIndex = piece.layerIndex
                bitmaps.push(this.createBitmapData(piece, index, hue, layerIndex))
            }

            for(const subPiece of piece.subParts[type]){      
                const layerIndex = subPiece.layerIndex
                const subIndex = subPiece.files.indexOf(piece.files[index])

                if(subIndex > -1){
                    bitmaps.push(this.createBitmapData(subPiece, subIndex, hue, layerIndex))
                }
            }
        }
    }

    return bitmaps
}

ImageManager.createBitmapData = function(piece, index, hue, layer){
    return {
        bitmap: this.loadGeneratorPiece(piece, index),
        hue: hue,
        layer: layer,
    }
}

ImageManager.createGeneratorContainerBitmap = function(bitmaps){
    const container = new PIXI.Container()

    for(const {bitmap, hue} of bitmaps){

        //bitmap.addLoadListener(() => {
            const spr = new Sprite(bitmap)
            spr.setHue(hue)
            container.addChild(spr)
        //})
    }

    return container
}

ImageManager.extractGeneratorContainerBitmap = function(container){
    const bitmap = new Bitmap(container.width, container.height)
    const canvas = Graphics.app.renderer.extract.canvas(container)

    bitmap.context.drawImage(canvas, 0, 0)
    bitmap.baseTexture.update()

    return bitmap
}

ImageManager.preloadGeneratedCharacter = function(id){
    const character = Plugin.getGeneratedCharacter(id)
    const generator = Plugin.getParam().generatorList[character.generatorIndex]
    const visiblePieces = generator.pieces.visible

    for(let i = 0; i < visiblePieces.length; i++){
        const piece = visiblePieces[i]
        const index = character.pieces[i].index

        if(index > -1){
            this.loadGeneratorPiece(piece, index)

            for(const subPiece of piece.subParts.all){
                const filename = piece.files[index]
                const subIndex = subPiece.files.indexOf(filename)
                
                if(subIndex > -1){
                    this.loadGeneratorPiece(subPiece, subIndex)
                }
            }
        }
    }
}

ImageManager.loadGeneratorPiece = function(piece, index){
    const folder = `img/generator/${piece.folder}`
    const file = `${piece.files[index]}`

    return this.loadGeneratorBitmap(folder, file)
}

ImageManager.loadGeneratorBitmap = function(folder, filename) {
    if(filename){
        const url = folder + Utils.encodeURI(filename)
        return this.loadBitmapToGeneratorCache(url)
    }else{
        return this._emptyBitmap
    }
}

ImageManager.loadBitmapToGeneratorCache = function(url){
    if(!this._generatorPiecesCache[url]){
        this._generatorPiecesCache[url] = Bitmap.load(url)
        this._generatorPiecesCacheArray.push(this._generatorPiecesCache[url])
    }

    return this._generatorPiecesCache[url]
}

ImageManager.clearGeneratorCache = function() {
    for(const url in this._generatorPiecesCache){
        this._generatorPiecesCache[url].destroy()
    }

    this._generatorPiecesCacheArray = []
    this._generatorPiecesCache = {}
}

/* ------------------------------- GAME SYSTEM ------------------------------ */
Alias.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad
Game_System.prototype.onAfterLoad = function() {
    DataManager.restoreGeneratedCharacters()
    Alias.Game_System_onAfterLoad.call(this)
}

/* ------------------------------- GAME ACTOR ------------------------------- */
Alias.Game_Actor_initImages = Game_Actor.prototype.initImages
Game_Actor.prototype.initImages = function() {
    Alias.Game_Actor_initImages.call(this)
    this.initCharacterGenerator()
}

Game_Actor.prototype.initCharacterGenerator = function() {
    Plugin.setSaveDataOnSubject(this, "")
}

Game_Actor.prototype.getCharGeneratorKey = function(){
    return `Actor_${this.actorId()}`
}

Game_Actor.prototype.getCharGeneratorData = function(){
    return Plugin.getSubjectSaveData(this.getCharGeneratorKey())
}

Game_Actor.prototype.getGeneratedCharId = function(){
    return this.getCharGeneratorData().id
}

Alias.Game_Actor_setCharacterImage = Game_Actor.prototype.setCharacterImage
Game_Actor.prototype.setCharacterImage = function(characterName, characterIndex){
    Alias.Game_Actor_setCharacterImage.call(this, characterName, characterIndex)
    this.getCharGeneratorData().characterName = this.characterName()
    this.getCharGeneratorData().characterIndex = this.characterIndex()
}

Alias.Game_Actor_setFaceImage = Game_Actor.prototype.setFaceImage
Game_Actor.prototype.setFaceImage = function(faceName, faceIndex){
    Alias.Game_Actor_setFaceImage.call(this, faceName, faceIndex)
    this.getCharGeneratorData().faceName = this.faceName()
    this.getCharGeneratorData().faceIndex = this.faceIndex()
}

Alias.Game_Actor_setBattlerImage = Game_Actor.prototype.setBattlerImage
Game_Actor.prototype.setBattlerImage = function(battlerName){
    Alias.Game_Actor_setBattlerImage.call(this, battlerName)
    this.getCharGeneratorData().battlerName = this.battlerName()
}

Game_Actor.prototype.applyGeneratorWalkFilename = function(genFilename){
    this._characterName = genFilename
    this._characterIndex = 0
}

Game_Actor.prototype.applyFaceGeneratorFilename = function(genFilename){
    this._faceName = genFilename
    this._faceIndex = 0
    $gameTemp.requestBattleRefresh()
}

Game_Actor.prototype.applyBattlerGeneratorFilename = function(genFilename){
    this._battlerName = genFilename
    $gameTemp.requestBattleRefresh()
}

Game_Actor.prototype.restoreWalkNonGeneratorFilename = function(){
    const {characterName, characterIndex} = this.getCharGeneratorData()

    this.setCharacterImage(characterName, characterIndex)
}

Game_Actor.prototype.restoreFaceNonGeneratorFilename = function(){
    const {faceName, faceIndex} = this.getCharGeneratorData()
    this.setFaceImage(faceName, faceIndex)
}

Game_Actor.prototype.restoreBattlerNonGeneratorFilename = function(){
    this.setBattlerImage(this.getCharGeneratorData().battlerName)
}

/* --------------------------- GAME CHARACTER BASE -------------------------- */
Game_CharacterBase.prototype.backupNonGeneratorFilenames = function(name, index){
    const data = Plugin.getSubjectSaveData(this.getCharGeneratorKey())
    data.characterName = name
    data.characterIndex = index
}

Game_CharacterBase.prototype.getCharGeneratorFilename = function(){
    return `$gen_${this.getGeneratedCharacterId()}_gen`
}

Game_CharacterBase.prototype.getGeneratedCharacterId = function(){
    return this.getCharGeneratorData()?.id
}

Game_CharacterBase.prototype.getCharGeneratorData = function(){
    return Plugin.getSubjectSaveData(this.getCharGeneratorKey())
}

Game_CharacterBase.prototype.getCharGeneratorKey = function(){
    return ""
}

Game_CharacterBase.prototype.getCurrentGeneratedCharacter = function(){
    const charGenId = this.getGeneratedCharacterId()

    return Plugin.getAllGeneratedCharacters()[charGenId]
}

Game_CharacterBase.prototype.setGeneratorCharacterId = function(charGenId){
    Plugin.setSaveDataOnSubject(this, charGenId)
}

Game_CharacterBase.prototype.changeGeneratorCharacter = function(genCharacterId){
    if(Plugin.getGeneratedCharacter(genCharacterId)){
        this.setGeneratorCharacterId(genCharacterId)
        this.applyGeneratedCharacter()

    }else if(genCharacterId === "original"){
        this.restoreNonGeneratorFilenames()
        this.removeGeneratedCharacter()
        
    }else{
        console.log(`The Generator Character Id ${genCharacterId} does not exist.`)
    }
}

Game_CharacterBase.prototype.removeGeneratedCharacter = function(){
    Plugin.deleteSubjectSaveData(this.getCharGeneratorKey())
}

Game_CharacterBase.prototype.applyGeneratedCharacter = function(){
    const charGen = this.getCurrentGeneratedCharacter()

    if(charGen.hasWalk){
        this.applyGeneratorWalkFilename()
    }
}

Game_CharacterBase.prototype.applyGeneratorWalkFilename = function(){
    this._characterName = this.getCharGeneratorFilename()
    this._characterIndex = 0

    if(Imported.Eli_CharacterFrames){
        this.refreshCustomFrameKeyOnSetImage()
    }

    if(Imported.Eli_DiagonalCharacters){
        this.refreshDiagonalDataByFilename(this._characterName)
    }
}

Game_CharacterBase.prototype.applyGeneratedActor = function(){
    const charGen = this.getCurrentGeneratedCharacter()
    const actor = this.getCurrentBattler()

    if(charGen.hasFace){
        actor.applyFaceGeneratorFilename(this.getCharGeneratorFilename())
    }

    if(charGen.hasBattler){
        actor.applyBattlerGeneratorFilename(this.getCharGeneratorFilename())
    }
}

Game_CharacterBase.prototype.restoreNonGeneratorFilenames = function(){
    this.restoreWalkNonGeneratorFilename()
}

Game_CharacterBase.prototype.restoreWalkNonGeneratorFilename = function(){
    const {characterName, characterIndex} = this.getCharGeneratorData()
    this.setImage(characterName, characterIndex)
}

Game_CharacterBase.prototype.restoreFaceNonGeneratorFilename = function(){
    const actor = this.getCurrentBattler()
    actor.restoreFaceNonGeneratorFilename()
}

Game_CharacterBase.prototype.restoreBattlerNonGeneratorFilename = function(){
    const actor = this.getCurrentBattler()
    actor.restoreBattlerNonGeneratorFilename()
}

Game_CharacterBase.prototype.checkForGeneratedCharacter = function(){
    if(this.needRefreshGeneratorCharacter()){
        this.refreshGeneratorCharacter()
    }
}

Game_CharacterBase.prototype.needRefreshGeneratorCharacter = function(){
    return Plugin.subjectHasSaveData(this.getCharGeneratorKey()) && this._characterName !== this.getCharGeneratorFilename()
}

Game_CharacterBase.prototype.refreshGeneratorCharacter = function(){
    this.applyGeneratedCharacter()

    if(!Plugin.isGeneratedCharacterLoaded(this.getGeneratedCharacterId())){
        ImageManager.preloadGeneratedCharacter(this.getGeneratedCharacterId())
    }
}

/* ------------------------------- GAME PLAYER ------------------------------ */
Alias.Game_Player_needRefreshGeneratorCharacter = Game_Player.prototype.needRefreshGeneratorCharacter
Game_Player.prototype.needRefreshGeneratorCharacter = function(){
    return this.getCurrentBattler() && Alias.Game_Player_needRefreshGeneratorCharacter.call(this)
}

Game_Player.prototype.getCharGeneratorKey = function(){
    return `Actor_${this.getCurrentBattler().actorId()}`
}

Game_Player.prototype.setGeneratorCharacterId = function(charGenId){
    Plugin.setSaveDataOnSubject(this.getCurrentBattler(), charGenId)
}

Game_Player.prototype.removeGeneratedCharacter = function(){
    Plugin.getSubjectSaveData(this.getCharGeneratorKey()).id = ""
}

Alias.Game_Player_restoreNonGeneratorFilenames = Game_Player.prototype.restoreNonGeneratorFilenames
Game_Player.prototype.restoreNonGeneratorFilenames = function(){
    Alias.Game_Player_restoreNonGeneratorFilenames.call(this)
    this.restoreFaceNonGeneratorFilename()
    this.restoreBattlerNonGeneratorFilename()
}

Game_Player.prototype.applyGeneratorWalkFilename = function(){
    const actor = this.getCurrentBattler()

    actor.applyGeneratorWalkFilename(this.getCharGeneratorFilename())
    this._characterName = actor.characterName()
    this._characterIndex = actor.characterIndex()

    if(Imported.Eli_CharacterFrames){
        this.refreshCustomFrameKeyOnSetImage()
    }

    if(Imported.Eli_DiagonalCharacters){
        this.refreshDiagonalDataByFilename(this._characterName)
    }
}

Alias.Game_Player_applyGeneratedCharacter = Game_Player.prototype.applyGeneratedCharacter
Game_Player.prototype.applyGeneratedCharacter = function(){
    Alias.Game_Player_applyGeneratedCharacter.call(this)
    this.applyGeneratedActor()
}

Game_Player.prototype.restoreWalkNonGeneratorFilename = function(){
    const actor = this.getCurrentBattler()

    actor.restoreWalkNonGeneratorFilename()
    this.setImage(actor.characterName(), actor.characterIndex())
}

Alias.Game_Player_refresh = Game_Player.prototype.refresh
Game_Player.prototype.refresh = function() {
    Alias.Game_Player_refresh.call(this)
    this.checkForGeneratedCharacter()
}

Game_Player.prototype.getGeneratedCharacterId = function(){
    return this.getCurrentBattler().getGeneratedCharId()
}

/* ------------------------------ GAME FOLLOWER ----------------------------- */
Alias.Game_Follower_needRefreshGeneratorCharacter = Game_Follower.prototype.needRefreshGeneratorCharacter
Game_Follower.prototype.needRefreshGeneratorCharacter = function(){
    return this.getCurrentBattler() && Alias.Game_Follower_needRefreshGeneratorCharacter.call(this)
}

Game_Follower.prototype.getCharGeneratorKey = function(){
    return `Actor_${this.getCurrentBattler().actorId()}`
}

Game_Follower.prototype.setGeneratorCharacterId = function(charGenId){
    Plugin.setSaveDataOnSubject(this.getCurrentBattler(), charGenId)
}

Game_Follower.prototype.removeGeneratedCharacter = function(){
    Plugin.getSubjectSaveData(this.getCharGeneratorKey()).id = ""
}

Alias.Game_Follower_restoreNonGeneratorFilenames = Game_Follower.prototype.restoreNonGeneratorFilenames
Game_Follower.prototype.restoreNonGeneratorFilenames = function(){
    Alias.Game_Follower_restoreNonGeneratorFilenames.call(this)
    this.restoreFaceNonGeneratorFilename()
    this.restoreBattlerNonGeneratorFilename()
}

Game_Follower.prototype.applyGeneratorWalkFilename = function(){
    const actor = this.getCurrentBattler()

    actor.applyGeneratorWalkFilename(this.getCharGeneratorFilename())
    this._characterName = actor.characterName()
    this._characterIndex = actor.characterIndex()

    if(Imported.Eli_CharacterFrames){
        this.refreshCustomFrameKeyOnSetImage()
    }

    if(Imported.Eli_DiagonalCharacters){
        this.refreshDiagonalDataByFilename(this._characterName)
    }

}

Alias.Game_Follower_applyGeneratedCharacter = Game_Follower.prototype.applyGeneratedCharacter
Game_Follower.prototype.applyGeneratedCharacter = function(){
    Alias.Game_Follower_applyGeneratedCharacter.call(this)
    this.applyGeneratedActor()
}

Game_Follower.prototype.restoreWalkNonGeneratorFilename = function(){
    const actor = this.getCurrentBattler()
    
    actor.restoreWalkNonGeneratorFilename()
    this.setImage(actor.characterName(), actor.characterIndex())
}

Alias.Game_Follower_refresh = Game_Follower.prototype.refresh
Game_Follower.prototype.refresh = function() {
    Alias.Game_Follower_refresh.call(this)
    this.checkForGeneratedCharacter()
}

Game_Follower.prototype.getGeneratedCharacterId = function(){
    return this.getCurrentBattler().getGeneratedCharId()
}

/* ------------------------------ GAME VEHICLE ------------------------------ */
Game_Vehicle.prototype.getCharGeneratorKey = function(){
    return `Vehicle_${this._type}`
}

Alias.Game_Vehicle_setImage = Game_Vehicle.prototype.setImage
Game_Vehicle.prototype.setImage = function(characterName, characterIndex){
    Alias.Game_Vehicle_setImage.call(this, characterName, characterIndex)

    if(Plugin.subjectHasSaveData(this.getCharGeneratorKey())){
        this.backupNonGeneratorFilenames(this.characterName(), this.characterIndex())
    }
}

Alias.Game_Vehicle_refresh = Game_Vehicle.prototype.refresh
Game_Vehicle.prototype.refresh = function() {
    Alias.Game_Vehicle_refresh.call(this)
    this.checkForGeneratedCharacter()
}

/* ------------------------------- GAME EVENT ------------------------------- */
Game_Event.prototype.getCharGeneratorKey = function(){
    return `Map_${$gameMap.mapId()}_Event_${this.eventId()}`
}

Alias.Game_Event_setImage = Game_Event.prototype.setImage
Game_Event.prototype.setImage = function(characterName, characterIndex){
    Alias.Game_Event_setImage.call(this, characterName, characterIndex)

    if(Plugin.subjectHasSaveData(this.getCharGeneratorKey())){
        this.backupNonGeneratorFilenames(this.characterName(), this.characterIndex())
    }
}

Alias.Game_Event_refresh = Game_Event.prototype.refresh
Game_Event.prototype.refresh = function() {
    Alias.Game_Event_refresh.call(this)
    this.checkForGeneratedCharacter()
}

/* --------------------------- WINDOW_SAVEFILELIST -------------------------- */
Alias.Window_SavefileList_drawPartyCharacters = Window_SavefileList.prototype.drawPartyCharacters
Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y){
    if(info.generatorCharacterList){
        Plugin.tempGeneratedCharacters = JSON.parse(JSON.stringify(info.generatorCharacterList))
    }
    
    Alias.Window_SavefileList_drawPartyCharacters.call(this, info, x, y)
}

}