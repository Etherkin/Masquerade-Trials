//==========================================================================
// EliMZ_QOLCommands_2.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦5.0.1♦ Quality of life commands 2!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-qol-commands-2-for-rpg-maker

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
Patreon      → https://www.patreon.com/hakuenstudio
Terms of Use → https://www.hakuenstudio.com/terms-of-use-5-0-0
Facebook     → https://www.facebook.com/hakuenstudio
Instagram    → https://www.instagram.com/hakuenstudio
Twitter      → https://twitter.com/hakuen_studio
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Features
============================================================================

● Current Enhanced Commands:
• Move route for followers and vehicles
• One Move route for multiple characters
• Change Character Location
• Common Event
• Jump to Label
• Erase Event
• Wait
• Show Animation
• Show Balloon Icon
• Fade in/out
• Change Tileset
• Name Input Processing

● New Commands:
• Open Skill, Equip, or Status scene for a specific actor.
• Open Item Scene.(Optionally, on a specific category)
• Open Load Scene

============================================================================
How to use
============================================================================

♦ PLUGIN COMMANDS ♦

● Search Type

Some plugin commands have the argument "Search Type" and "Actor Id".
On the "Search Type" you can set the method that the plugin will use to 
get the "Actor Id" you want to apply the command.
You can choose to find the "Actor Id" by its ID or by their party INDEX.

● Map Characters

Some plugin commands have the argument "Character ID" or "Characters".
This argument is a reference for the map sprites: Events, Vehicles, 
Player and Followers.
Below is how you can identify them:

1, 2, 3... → Event Ids
0 → This event
-1 → Player
-2, → First Follower. -3, Second Follower. Etc...
boat, ship, airship → Vehicles

● Multiple operators

In almost all arguments, you can set the values using either formulas, 
\v[id] or numbers.
You can also set multiple entries separating them by comma(,) or double 
trace(--) when you want to get a range of numbers.

Exemple: Selecting multiple actors/characters:

1, 2, \v[3], 4--8, 9

The command will be applied for actors/characters with ID 1, 2, the value 
of the variable 3, 4, 5, 6, 7, 8, 9.

As you can see the "--" is like a range operator. It will get all numbers 
between(and including) the 4 and 8.

NOTE: If you choose "Index" on a Search Type, you can write "All" to apply 
to all party members.

============================================================================
Update Log
============================================================================

https://tinyurl.com/qolCommands2

============================================================================

@command cmd_moveRouteCharacters
@text Move Route Targets
@desc -2 = First Follower | -1 = Player | 0 = This event 
1 >= Event Id | 'boat', 'ship', 'airship' Vehicle name

    @arg characters
    @text Characters
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

@command cmd_setCharacterLocation
@text Set Character Location
@desc -2 = First Follower | -1 = Player | 0 = This event 
1 >= Event Id | 'boat', 'ship', 'airship' Vehicle name

    @arg targetId
    @text Target Character
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default 0

    @arg direction
    @text Direction
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. 2(Down), 4(Left), 6(Right), 8(Up)
    @default 0
    @parent id

    @arg posType
    @text Position Settings
    @type combo
    @option Coordinates
    @option Another Character
    @default Coordinates
    @desc Select the type of coordinates you want to use to chage the target character location.

    @arg x
    @text Coordinate X
    @type text
    @desc Can use formulas, \v[id] or numbers.
    @default
    @parent posType

    @arg y
    @text Coordinate Y
    @type text
    @desc Can use formulas, \v[id] or numbers.
    @default
    @parent posType

    @arg destinationId
    @text Another Character
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default
    @parent posType

    @arg switchPlace
    @text Switch With Character
    @type boolean
    @desc True, if you want to switch places with another event.
    @default false
    @parent destinationId

@command cmd_callCommonEvent
@text Call Common Event
@desc Call a common event.

    @arg id
    @text Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default 0

@command cmd_jumpToLabel
@text Jump To Label
@desc Jump to a label. You can use formulas and variables to dynamically choose the label to jump.

    @arg id
    @text Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default ""

@command cmd_eraseEvent
@text Erase Event
@desc 0 = This event | 1 >= event id

    @arg id
    @text Event Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default ""

@command cmd_wait
@text Wait
@desc Wait

    @arg duration
    @text Duration
    @type text
    @desc Can use formulas, \v[id] or numbers.
    @default 0

    @arg unit
    @text Unit
    @type select
    @option frames
    @option seconds
    @desc Select a unit to apply to the value.
    @default frames

@command cmd_showAnimation
@text Show Animation
@desc -2 = First Follower | -1 = Player | 0 = This event 
1 >= Event Id | 'boat', 'ship', 'airship' Vehicle name

    @arg id
    @text Character Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default

    @arg id2
    @text Animation Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default

    @arg wait
    @text Wait for Completion
    @type boolean
    @desc True to wait for completion.
    @default false

@command cmd_showBalloonIcon
@text Show Balloon Icon
@desc -2 = First Follower | -1 = Player | 0 = This event 
1 >= Event Id | 'boat', 'ship', 'airship' Vehicle name

    @arg id
    @text Character Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default

    @arg id2
    @text Balloon Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default

    @arg wait
    @text Wait for Completion
    @type boolean
    @desc True to wait for completion.
    @default false

@command cmd_fade
@text Transfer Player
@desc 

    @arg type
    @text Fade Duration
    @type select
    @option Out
    @option In
    @desc Select the fade type.
    @default Out

    @arg frames
    @text Fade Duration
    @type text
    @desc Set the fade the time in frames. Default is 24.
    @default 24

@command cmd_changeTileset
@text Change Tileset
@desc 

    @arg id
    @text Tileset Id
    @type text
    @desc Starts at 1.
    @default  
    
    @arg name
    @text Tileset Name
    @type text
    @desc Find the tileset id using the name. Is case sensitive.
    @default   

@command cmd_nameInputProcessing
@text Name Input Processing
@desc Set a name for a single actor.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default
    @parent searchType

    @arg maxCharacters
    @text Max Characters
    @type text
    @desc The max number of letters the name can have.
    @default 8

@command cmd_actorScene
@text Open Actor Scene
@desc Open one of the selected scenes with an specific actor.

    @arg scene
    @text Scene
    @type select
    @option Scene_Status
    @option Scene_Equip
    @option Scene_Skill
    @desc Choose if you want to select an actor by its id or party index.
    @default Scene_Status

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default
    @parent searchType

@command cmd_itemScene
@text Open Item Scene
@desc Open the item scene. Optionally on a specific category.

    @arg category
    @text Category
    @type combo
    @option item
    @option weapon
    @option armor
    @option keyItem
    @desc Can use formulas, \v[id] or numbers.
    @default item

@command cmd_loadScene
@text Open Load Scene
@desc Open the Load Scene.

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_QOLCommands_2 = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

Eli.QOLCommands_2 = {

    version: 5.01,
    url: "https://hakuenstudio.itch.io/eli-qol-commands-2-for-rpg-maker",
    parameters: {},
    alias: {},
    moveRouteCharacters: [],
    categorySymbol: '',

    initialize(){
        this.initParameters()
        this.initPluginCommands()
    },

    initParameters(){

    },

    initPluginCommands(){
        const commands = [
            "cmd_moveRouteCharacters", "cmd_setCharacterLocation",
            "cmd_callCommonEvent", "cmd_jumpToLabel", "cmd_eraseEvent", "cmd_wait",
            "cmd_showAnimation", "cmd_showBalloonIcon", "cmd_fade", "cmd_changeTileset", 
            "cmd_nameInputProcessing", "cmd_actorScene", "cmd_itemScene", "cmd_loadScene",
        ]
        Eli.PluginManager.registerCommands(this, commands)
    },

    param(){
        return this.parameters
    },

    cmd_moveRouteCharacters(args){
        const charactersId = this.createIdList(args.characters).map(char => {
            if(isNaN(char)){
                const id = Eli.Utils.needEval(char)
                return isNaN(id) ? id.toLowerCase() : Number(id)
            }else{
                return Number(char)
            }
        })

        this.moveRouteCharacters = charactersId
    },

    cmd_setCharacterLocation(args){
        const exchangeWithAnotherEvent = args.switchPlace === "true"
        const direction = Number(Eli.Utils.processEscapeVarOrFormula(args.direction)) || 0
        let id = Eli.Utils.processEscapeVarOrFormula(args.targetId)
        id = isNaN(id) ? id : Number(id)

        if(exchangeWithAnotherEvent){
            let charId = Eli.Utils.processEscapeVarOrFormula(args.destinationId)
            charId = isNaN(charId) ? charId : Number(charId)
            var params = [id, 2, charId, 0, direction]

        }else{

            if(args.x || args.y){
                const x = Number(Eli.Utils.processEscapeVarOrFormula(args.x))
                const y = Number(Eli.Utils.processEscapeVarOrFormula(args.y))
                var params = [id, 0, x, y, direction]

            }else{
                let charId = Eli.Utils.processEscapeVarOrFormula(args.destinationId)
                charId = isNaN(charId) ? charId : Number(charId)
                const character = Eli.Utils.getMapCharacter(charId)
                
                var params = [id, 0, character.x, character.y, direction]
            }
        }

        Eli.PluginManager.currentInterpreter.command203(params)
    },

    cmd_callCommonEvent(args){
        const id = Eli.Utils.processEscapeVarOrFormula(args.id)
        const params = [Number(id)]

        Eli.PluginManager.currentInterpreter.command117(params)
    },

    cmd_jumpToLabel(args){
        const id = Eli.Utils.processEscapeVarOrFormula(args.id)
        const params = [String(id)]

        Eli.PluginManager.currentInterpreter.command119(params)
    },

    cmd_eraseEvent(args){
        const ids = this.createIdList(args.id)

        for(const id of ids){
            const event = $gameMap.event(Number(id))
            if(event) event.erase()
        }
    },

    cmd_wait(args){
        if(args.unit === "seconds"){
            var duration = Eli.Utils.secondsToFrames(Number(Eli.Utils.processEscapeVarOrFormula(args.duration))) 
        }else{
            var duration = Number(Eli.Utils.processEscapeVarOrFormula(args.duration))
        }

        const params = [duration]
        Eli.PluginManager.currentInterpreter.command230(params)
    },

    cmd_showAnimation(args){
        const charactersIds = this.createIdList(args.id)
        const animationId = Number(Eli.Utils.processEscapeVarOrFormula(args.id2))
        
        for(const charId of charactersIds){
            const id = Eli.Utils.needEval(charId)
            const params = [isNaN(id) ? id : Number(id), animationId]
            Eli.PluginManager.currentInterpreter.command212(params)
        }
    },

    cmd_showBalloonIcon(args){
        const charactersIds = this.createIdList(args.id)
        const balloonId = Number(Eli.Utils.processEscapeVarOrFormula(args.id2))

        for(const charId of charactersIds){
            const id = Eli.Utils.needEval(charId)
            const params = [isNaN(id) ? id : Number(id), balloonId]
            Eli.PluginManager.currentInterpreter.command213(params)
        }
    },

    cmd_fade(args){
        if ($gameMessage.isBusy()) return false
        const duration = Number(Eli.Utils.processEscapeVarOrFormula(args.duration))

        if(args.type === "Out"){
            $gameScreen.startFadeOut(duration);
        }else{
            $gameScreen.startFadeIn(duration);
        }

        Eli.PluginManager.currentInterpreter.wait(duration)
    },

    cmd_changeTileset(args){
        if(args.id){
            var tilesetId = Number(Eli.Utils.processEscapeVarOrFormula(args.id))
        }else{
            const name = Eli.Utils.processEscapeVarOrFormula(args.name)
            var tilesetId = $dataTilesets.findIndex(item => item && item.name === name)
        }

        const params = [tilesetId]
        Eli.PluginManager.currentInterpreter.command282(params)
    },

    cmd_nameInputProcessing(args){
        let id = Number(Eli.Utils.processEscapeVarOrFormula(args.id))
        if(args.searchType === "Index"){
            id = $gameParty.members()[id].actorId()
        }

        const maxCharacters = Number(args.maxCharacters)
        const params = [id, maxCharacters]

        Eli.PluginManager.currentInterpreter.command303(params)
    },

    cmd_actorScene(args){
        const actor = this.getMenuActor(args)
        const scene = {
            "Scene_Status": Scene_Status,
            "Scene_Equip": Scene_Equip,
            "Scene_Skill": Scene_Skill,
        }
        if(actor){
            $gameParty.setMenuActor(actor)
            SceneManager.push(scene[args.scene])
        } 
    },

    cmd_itemScene(args){
        Plugin.categorySymbol = args.category

        SceneManager.push(Scene_Item)
    },

    cmd_loadScene(args){
        SceneManager.push(Scene_Load)
    },

    getMenuActor(args){
        let id = Number(Eli.String.removeSpaces(Eli.Utils.processEscapeVarOrFormula(args.id)))
        if(args.searchType === "Index"){
            var member = $gameParty.members()[id]
        }

        const actor = member ?? $gameParty.members().find(item => item.actorId() === id)

        return actor
    },

    findPartyMapCharacter(actor){
        const index = $gameParty.members().findIndex(member => member === actor)

        if(index === 0){
            return $gamePlayer
        }else{
            return $gamePlayer._followers._data[Math.abs(index-1)]
        }
    },

    createIdList(rawId){
        if(rawId.toLowerCase().includes("all")){
            return Array.from({length: $gameParty.size()}, (v, i) => i)
        }else{
            return Eli.PluginManager.createRangeOfNumbers(rawId)
        }
    },
    
    forceMoveRouteForCharacters(moveRoute){
        for(const id of this.moveRouteCharacters){
            const character = Eli.Utils.getMapCharacter(id)

            if(character){
                character.forceMoveRoute(moveRoute)
            }
        }
        this.moveRouteCharacters = []
    },

    createActorsId(searchType, index){
        if(searchType === "Id"){
            return Eli.Utils.convertEscapeVariablesOnly(index).split(",").map(item => Number(Eli.Utils.needEval(item)))

        }else if(index.toLowerCase().includes("all")){
            return $gameParty.members().map(member => member.actorId())

        }else{
            return Eli.Utils.convertEscapeVariablesOnly(index).split(",").map( item => {
                const index = Number(Eli.Utils.needEval(item))
                const member = $gameParty.members()[index]
                if(member){
                    return member.actorId()
                }else{
                    return -1
                }
                
            }).filter(item => item > -1)
        }
    },
}

const Plugin = Eli.QOLCommands_2
const Alias = Eli.QOLCommands_2.alias

Plugin.initialize()



/* ---------------------------- GAME INTERPRETER ---------------------------- */
{

Alias.Game_Interpreter_command205 = Game_Interpreter.prototype.command205
Game_Interpreter.prototype.command205 = function(params) {
    if(Plugin.moveRouteCharacters.length > 0){
        params[0] = Plugin.moveRouteCharacters.pop()
        Plugin.forceMoveRouteForCharacters(params[1])
    }
    return Alias.Game_Interpreter_command205.call(this, params)
}

}

/* -------------------------- WINDOW ITEM CATEGORY -------------------------- */
{

Alias.Window_ItemCategory_initialize = Window_ItemCategory.prototype.initialize
Window_ItemCategory.prototype.initialize = function(rect){
    Alias.Window_ItemCategory_initialize.call(this, rect)
    if(Plugin.categorySymbol) {
        this.selectSymbol(Plugin.categorySymbol)
        Plugin.categorySymbol = ''
    }
}

}

}