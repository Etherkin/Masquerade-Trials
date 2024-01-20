//==========================================================================
// EliMZ_QOLCommands_1.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderAfter TinyGetInfoWndMZ

@plugindesc ♦2.2.1♦ Quality of life commands 1!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/eli-qol-commands-1-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin by clicking on the link above!
Please, is very important to me ^^

● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
FEATURES
============================================================================

● Current Enhanced Commands:

• Change Item
• Change Weapon
• Change Armor
• Change Party Member
• Change State
• Change Skill
• Change Equipment
• Change Name
• Change Class
• Change Nickname
• Change Profile
• Change Actor Images

● New Commands:
• Change Party Formation on Map
• Change formation forward, backward, and random!

============================================================================
HOW TO USE
============================================================================

https://docs.google.com/document/d/1bfRIfWix9kn2ZTchjnPkA1yT8sPFf-RagP4dhrPq5zk/edit?usp=sharing

============================================================================

@command cmd_changeItem
@text Change Item
@desc Receive or lose item from inventory

    @arg id
    @text Item Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default

    @arg amount
    @text Item Amount
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default

@command cmd_changeWeapon
@text Change Weapon
@desc Receive or lose weapon from inventory

    @arg id
    @text Weapon Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default

    @arg amount
    @text Weapon Amount
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default

    @arg includeEquip
    @text Include Equip
    @type boolean
    @desc Set to true if you want to remove equipments that are being used by party members.
    @default false

@command cmd_changeArmor
@text Change Armor
@desc Receive or lose armor from inventory

    @arg id
    @text Armor Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default

    @arg amount
    @text Armor Amount
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default

    @arg includeEquip
    @text Include Equip
    @type boolean
    @desc Set to true if you want to remove equipments that are being used by party members.
    @default false

@command cmd_changePartyMember
@text Change Party Member
@desc Add or remove a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default

    @arg operation
    @text Add
    @type boolean
    @on Add
    @off Remove
    @desc Choose to add or remove the selected actor.
    @default true

    @arg initialize
    @text Initialize
    @type boolean
    @desc When adding, reverts to the starting state as specified in the database.
    @default false

@command cmd_changeState
@text Change State
@desc Add or remove a State from a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

    @arg operation
    @text Add
    @type boolean
    @on Add
    @off Remove
    @desc Choose to add or remove the selected actor.
    @default true

    @arg id2
    @text State Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Separate each one with a comma.
    @default 0

@command cmd_changeSkill
@text Change Skill
@desc Add or remove a Skill from a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

    @arg operation
    @text Learn
    @type boolean
    @on Learn
    @off Forget
    @desc Choose to add or remove the selected actor.
    @default true

    @arg id2
    @text Skill Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

@command cmd_changeEquipment
@text Change Actor Equipment
@desc Change Equipment of a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default

    @arg slot
    @text Equip Type/Slot
    @type multiline_string
    @desc Can use formulas or \v[id]. Starts at 1. Allow multiple entries, if you want to unequip a slot.
    @default

    @arg id2
    @text Equip Item
    @type multiline_string
    @desc Can use formulas or \v[id]. Leave empty to unequip the slot.
    @default

@command cmd_changeClass
@text Change Class
@desc Change Class of a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default

    @arg id2
    @text Class Id
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default

    @arg saveExp
    @text Save Exp
    @type boolean
    @desc
    @default false

@command cmd_changeFormation
@text Change Formation
@desc Swap party members using actor id or member index.

    @arg separator1
    @text Set the first Member
    
    @arg searchType1
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Index
    @parent separator1

    @arg actor1
    @text Actor
    @type actor
    @desc Can use formulas, \v[id] or numbers.
    @default
    @parent separator1

    @arg separator2
    @text Set the second Member 

    @arg searchType2
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id
    @parent separator2

    @arg actor2
    @text Actor
    @type actor
    @desc Can use formulas, \v[id] or numbers.
    @default
    @parent separator2

@command cmd_changeName
@text Change Name
@desc Change the Name of a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

    @arg name
    @text Name
    @type multiline_string
    @desc Can use formulas or \v[id].
    @default ""

@command cmd_changeNickname
@text Change Nickname
@desc Change the Nickname of a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

    @arg nickname
    @text Nickname
    @type multiline_string
    @desc Can use formulas or \v[id].
    @default ""

@command cmd_changeProfile
@text Change Profile
@desc Change the Profile of a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

    @arg profile
    @text Profile
    @type multiline_string
    @desc Can use formulas or \v[id].
    @default ""

@command cmd_changeActorImages
@text Change Actor Images
@desc Change the image of a member by its actor id or index.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

    @arg face
    @text Face Image
    @type file
    @dir img/faces
    @desc Select an image, or go to the text field where you can use formulas, \v[id] or numbers.
    @default

    @arg faceIndex
    @text Face Index
    @type multiline_string
    @desc Select a index for the image.
    @default 0
    @parent face

    @arg character
    @text Character Image
    @type file
    @dir img/characters
    @desc Select an image, or go to the text field where you can use formulas, \v[id] or numbers.
    @default

    @arg charIndex
    @text Character Index
    @type multiline_string
    @desc Select a index for the image.
    @default 0
    @parent character

    @arg battler
    @text Sv Battler Image
    @type file
    @dir img/sv_actors
    @desc Select an image, or go to the text field where you can use formulas, \v[id] or numbers.
    @default

@command cmd_quickFormation
@text Formation Forward/Backward
@desc Quickly change formation forward/backward.

    @arg type
    @text Operation Type
    @type select
    @option forward
    @option backward
    @option random
    @desc The type of formation change.
    @default forward

    @arg members
    @text Members
    @type select
    @option All
    @option Active Only
    @desc What party members will be used on the quick formation.
    @default All

@command cmd_changeExp
@text Change Exp
@desc Change one or multiple actors Exp.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

    @arg exp
    @text Exp Value
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default 0

    @arg showLevelUp
    @text Show Level Up
    @type boolean
    @desc Set true to show level up message.
    @default false

@command cmd_changeLevel
@text Change Level
@desc Change one or multiple actors Levels.

    @arg searchType
    @text Search Type
    @type select
    @option Id
    @option Index
    @desc Choose if you want to select an actor by its id or party index.
    @default Id

    @arg id
    @text Actor
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers. Allow multiple entries.
    @default 0

    @arg operation
    @text Operation Type
    @type select
    @option Set Level
    @option Increase/Decrease Level
    @desc Choose to set a level to the actor or increase/decrease.
    @default true

    @arg level
    @text Level
    @type multiline_string
    @desc Can use formulas, \v[id] or numbers.
    @default 0

    @arg showLevelUp
    @text Show Level Up
    @type boolean
    @desc Set true to show level up message.
    @default false

*/

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_QOLCommands_1 = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

Eli.QOLCommands_1 = {

    TinyGetInfoWndMZ: $plugins.some(item => item.name === "TinyGetInfoWndMZ"),

    initialize(){
        this.initPluginCommands()
    },

    initPluginCommands(){
        const commands = [
            "cmd_changeItem", "cmd_changeWeapon", "cmd_changeArmor", "cmd_changePartyMember", 
            "cmd_changeState", "cmd_changeSkill", "cmd_changeEquipment", "cmd_changeClass", 
            "cmd_changeFormation", "cmd_changeName", "cmd_changeNickname", "cmd_changeProfile", 
            "cmd_changeActorImages", "cmd_quickFormation", "cmd_changeExp", "cmd_changeLevel"
        ]
        Eli.PluginManager.registerCommands(this, commands)
    },

    createMultipleEntries(entryString){
        if(entryString.toLowerCase() === "all"){
            return Eli.Array.createProgressiveNumbers(0, $gameParty.size()-1)
        }else{
            return Eli.PluginManager.createIdList(entryString).map(id => new Function(`return ${id}`)())
        }
    },

    cmd_changeItem(args){
        this.changeAnyItemType(args, $dataItems, "item")
    },

    cmd_changeWeapon(args){
        this.changeAnyItemType(args, $dataWeapons, "weapon")
    },

    cmd_changeArmor(args){
        this.changeAnyItemType(args, $dataArmors, "armor")
    },

    cmd_changePartyMember(args){
        const add = args.operation === "true"
        const initialize = args.initialize === "true"
        const getActor = this.getActorMethod(args.searchType)
        const changeMethod = (add ? $gameParty.addActor : $gameParty.removeActor).bind($gameParty)
        let multipleEntries = this.createMultipleEntries(args.id)

        if(args.searchType === "Index"){
            multipleEntries = multipleEntries.sort((a, b) => a-b).reverse()
        }

        for(const entry of multipleEntries){
            const actor = getActor(entry)

            if(actor){

                if(initialize){
                    actor.setup(actor.actorId())
                }
    
                changeMethod(actor.actorId())
            }
        }
    },

    cmd_changeState(args){
        const stateIds = this.createMultipleEntries(args.id2)
        const stateOperation = args.operation === "true" ? "addState" : "removeState"
        const multipleEntries = this.createMultipleEntries(args.id)
        const getActor = this.getActorMethod(args.searchType)

        for(const entry of multipleEntries){
            const actor = getActor(entry)

            if(actor){
                const alreadyDead = actor.isDead()

                for(const id of stateIds){
                    actor[stateOperation](id)
                }

                if(actor.isDead() && !alreadyDead){
                    actor.performCollapse()
                }

                actor.clearResult()
            }
        }
    },

    cmd_changeSkill(args){
        const skillIds = this.createMultipleEntries(args.id2)
        const skillOperation = args.operation === "true" ? "learnSkill" : "forgetSkill"
        const multipleEntries = this.createMultipleEntries(args.id)
        const getActor = this.getActorMethod(args.searchType)

        for(const entry of multipleEntries){
            const actor = getActor(entry)

            if(actor){

                for(const id of skillIds){
                    actor[skillOperation](id)
                }
            }
        }
    },

    cmd_changeEquipment(args){
        const equipTypeIds = this.createMultipleEntries(args.slot)
        const equipId = new Function(`return ${args.id2 ? Eli.PluginManager.parseVariables(args.id2) : 0}`)()
        const multipleEntries = this.createMultipleEntries(args.id)
        const getActor = this.getActorMethod(args.searchType)

        for(const entry of multipleEntries){
            const actor = getActor(entry)

            if(actor){
                
                for(const typeId of equipTypeIds){
                    actor.changeEquipById(typeId, equipId)
                }
            }
        }
    }, 
    
    cmd_changeName(args){
        const id = new Function(`return ${Eli.PluginManager.parseVariables(args.id)}`)()
        const getActor = this.getActorMethod(args.searchType)
        const actor = getActor(id)
        
        if(actor){
            const name = Function(`return "${Eli.PluginManager.parseVariables(args.name)}"`)()
            actor.setName(name)
        }
    }, 

    cmd_changeClass(args){
        const getActor = this.getActorMethod(args.searchType)
        const multipleEntries = this.createMultipleEntries(args.id)
        const classId = new Function(`return ${Eli.PluginManager.parseVariables(args.id2)}`)()
        const keepExp = args.saveExp === "true"
        
        for(const entry of multipleEntries){
            const actor = getActor(entry)

            if(actor){
                actor.changeClass(classId, keepExp)
            }
        }
    },

    cmd_changeFormation(args){
        const actors = Eli.PluginManager.parseVariables(`${args.actor1},${args.actor2}`).split(",")
        let index1 = new Function(`return ${Eli.PluginManager.parseVariables(actors[0])}`)()
        let index2 = new Function(`return ${Eli.PluginManager.parseVariables(actors[1])}`)()
        
        if(args.searchType1 === "Id"){
            index1 = $gameParty.findIndex(member => member.actorId() === index1)
        }

        if(args.searchType2 === "Id"){
            index2 = $gameParty.findIndex(member => member.actorId() === index2)
        }

        if(index1 > -1 && index2 > -1){
            $gameParty.swapOrder(index1, index2)
        }
    },

    cmd_changeNickname(args){
        const id = new Function(`return ${Eli.PluginManager.parseVariables(args.id)}`)()
        const getActor = this.getActorMethod(args.searchType)
        const actor = getActor(id)
        
        if(actor){
            const nickName = new Function(`return "${Eli.PluginManager.parseVariables(args.nickname)}"`)()
            actor.setNickname(String(nickName))
        }
    }, 

    cmd_changeProfile(args){
        const id = new Function(`return ${Eli.PluginManager.parseVariables(args.id)}`)()
        const getActor = this.getActorMethod(args.searchType)
        const actor = getActor(id)
        
        if(actor){
            const nickName = new Function(`return "${Eli.PluginManager.parseVariables(args.profile)}"`)()
            actor.setProfile(String(nickName))
        }
    },

    cmd_changeActorImages(args){
        const multipleEntries = Eli.PluginManager.createIdList(args.id).map(id => new Function(`return ${id}`)())
        const getActor = this.getActorMethod(args.searchType)

        for(const entry of multipleEntries){
            const actor = getActor(entry)

            if(!actor) continue

            if(args.character){
                const image = new Function(`return "${Eli.PluginManager.parseVariables(args.character)}"`)()
                let index = actor.characterIndex()

                if(args.charIndex){
                    index = new Function(`return ${Eli.PluginManager.parseVariables(args.charIndex)}`)()
                }

                actor.setCharacterImage(image, index)
            }

            if(args.face){
                const image = new Function(`return "${Eli.PluginManager.parseVariables(args.face)}"`)()
                let index = actor.faceIndex()

                if(args.faceIndex){
                    index = new Function(`return ${Eli.PluginManager.parseVariables(args.faceIndex)}`)()
                }

                actor.setFaceImage(image, index)
            }

            if(args.battler){
                const image = new Function(`return "${Eli.PluginManager.parseVariables(args.battler)}"`)()
                actor.setBattlerImage(image)
            }
            
        }

        $gamePlayer.refresh()
    },

    cmd_quickFormation(args){
        if(this.canChangeFormation()){
            const funcs = {
                forward: this.changeFormationForward,
                backward: this.changeFormationBackward,
                random: this.changeFormationRandom,
            }
            const members = args.members === "Active Only" ? $gameParty.battleMembers() : $gameParty.members()
            funcs[args.type](members)
        }
    },

    cmd_changeExp(args){
        const expValue = new Function(`return ${Eli.PluginManager.parseVariables(args.exp)}`)()
        const showLevelUp = args.showLevelUp === "true"
        const multipleEntries = this.createMultipleEntries(args.id)
        const getActor = this.getActorMethod(args.searchType)

        for(const entry of multipleEntries){
            const actor = getActor(entry)
            const params = [0, actor.actorId(), 0, 0, expValue, showLevelUp]
            Eli.PluginManager.currentInterpreter.command315(params)
        }
    },

    cmd_changeLevel(args){
        const multipleEntries = this.createMultipleEntries(args.id)
        const showLevelUp = args.showLevelUp === "true"
        const getActor = this.getActorMethod(args.searchType)
        const level = new Function(`return ${Eli.PluginManager.parseVariables(args.level)}`)()
        const isSetOperation = args.operation === "Set Level"

        for(const entry of multipleEntries){
            const actor = getActor(entry)

            if(actor){

                if(isSetOperation){
                    actor.changeLevel(level, showLevelUp)
                }else{
                    actor.changeLevel(actor.level + level, showLevelUp)
                }
            }
        }
    },

    getActorMethod(searchType){
        if(searchType === "Id"){
            return this.getActorById
        }else{
            return this.getActorByIndex
        }
    },

    getActorById(id){
        return $gameActors.actor(id)
    },

    getActorByIndex(index){
        return $gameParty.members()[index]
    },

    getSearchMethod(searchType){
        const func = {
            Id: id => Number(Eli.Utils.needEval(id)),
            Index: index => {
                index = Number(Eli.Utils.needEval(index))
                return $gameParty.members()[index]?.actorId()
            },
        }
        return func[searchType]
    },

    changeAnyItemType(args, dataObject, type){
        const ids = this.createMultipleEntries(args.id)
        const amount = new Function(`return ${Eli.PluginManager.parseVariables(args.amount)}`)()
        const includeEquip = args.includeEquip === "true"
        
        if(this.TinyGetInfoWndMZ){
            const cmdNumber = {item:126, weapon:127, armor:128}[type]

            for(const id of ids){
                const params = [id, amount > 0 ? 0 : 1, 0, Math.abs(amount)]
                Eli.PluginManager.currentInterpreter[`command${cmdNumber}`](params)
            }

        }else{

            for(const id of ids){
                const item = dataObject[id]
                $gameParty.gainItem(item, amount, includeEquip)
            }
        }

    },

    changeFormationForward(members){
        for(let i = 1; i < members.length; i++){
            $gameParty.swapOrder(i-1, i)
        } 
    },

    changeFormationBackward(members){
        for(let i = 0; i < members.length; i++){
            $gameParty.swapOrder(members.length-1, i)
        }
    },

    changeFormationRandom(members){
        const oldFormation = $gameParty._actors.map(actorId => actorId).slice(members.length)
        const newFormation = Eli.Array.shuffle(members.map(member => member.actorId()))

        $gameParty._actors = [...newFormation, ...oldFormation]
        $gamePlayer.refresh()
    },

    canChangeFormation(){
        return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled()
    },
}

Eli.QOLCommands_1.initialize()