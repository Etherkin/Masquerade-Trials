//==========================================================================
// EliMZ_PictureManager.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc ♦1.1.1♦ Implements a new and powerful picture system!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-picture-manager-for-rpg-maker-mz/rate?source=game

@help
★★★★★ Rate the plugin by clicking on the link above!
Please, is very important to me ^^

● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

● Show and Move pictures at the same time!
● Show pictures on different layers:
    • Default
    • Below Weather
    • Below Windows
    • Above Windows
    • Above Everything
● You can Bind pictures to the map or to the screen!
● Apply Mask images or shapes to the pictures!
● Show pictures positions relative to another game object!
● Plays a common event when clicking/touching a picture, enters the mouse 
above a picture, leaves the mouse out of a picture!
● Change all these picture settings, using easing animations:
● Anchor, Blend mode, X, Y, Opacity, Scale, Skew, Angle and Rotation, 
Tone Color, Blend Color, and Hue.
● You can make picture animations loop from initial to target values!
● Set Breath, Float, Shake, and Card effects to the pictures!
● Move and change settings for multiple pictures at the same time!
● Erase one or more pictures at the same time!
● You can use variables to set values on the arguments of almost all 
plugin commands!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1c3RTP3-L57nTEmnxpWtmxRH7RaeLSWlB9KiaJ9s_njU/edit?usp=sharing

============================================================================

@param clickVariable
@text Clicked Picture Id
@type variable
@desc This variable will store the last clicked picture id.
@default 0

@param mouseEnterVariable
@text Mouse Enter Picture Id
@type variable
@desc This variable will store the picture id when the mouse starts hovering the picture.
@default 0

@param mouseExitVariable
@text Mouse Exit Picture Id
@type variable
@desc This variable will store the picture id when the mouse stops hovering the picture
@default 0

@command cmd_fullShow
@text Full Show Picture
@desc A complete command to show a picture on the screen.

    @arg filename
    @text Filename
    @type file
    @dir img/pictures
    @desc The filename of the picture. Accept \v[id]
    @default

    @arg id
    @text ID
    @type text
    @desc The id of the picture. Can be a number or text. Is case-sensitive. Accept \v[id]
    @default 1

    @arg mainSettings
    @text Main Settings
    @type struct<mainSt>
    @desc The main settings of the picture, like coordinates, opacity, etc.
    @default {"duration":"1","easing":"linear","separator1":"","initialAlignX":"left","initialOffsetX":"0","initialAlignY":"top","initialOffsetY":"0","initialAlpha":"0","initialScale":"1, 1","initialSkew":"0, 0","initialAngleRotation":"0, 0","separator2":"","targetAlignX":"left","targetOffsetX":"0","targetAlignY":"top","targetOffsetY":"0","targetAlpha":"1","targetScale":"1, 1","targetSkew":"0, 0","targetAngleRotation":"0, 0"}

    @arg mask
    @text Mask
    @type struct<maskSt>
    @desc A mask image or shape to be on the picture.
    @default {"type":"none","image":"","alignX":"left","alignY":"top","offsetX":"0","offsetY":"0","size":"200, 200","circleRadius":"90","roundedRectBorder":"20","starEdges":"5","starOuterRadius":"90","starInnerRadius":"90"}

    @arg container
    @text Picture Container
    @type combo
    @option Default 
    @option Tilemap 
    @option Below Weather
    @option Below Window
    @option Above Window
    @option Above Everything
    @desc On what container the picture will be put on.
    @default Above Everything

    @arg zIndex
    @text Layer Index
    @type text
    @desc The index of this picture inside the choosen container.
    @default 0
    @parent container

    @arg fixedPosition
    @text Bind to the Map
    @type boolean
    @desc If true, the picture will be bind to the map instead of the screen.
    @default false

    @arg relativeObject
    @text Relative Object
    @type combo
    @option none
    @desc Any object that has .x and .y properties. See help file.
    @default none

    @arg refreshOnSceneChange
    @text Refresh On Scene Change
    @type boolean
    @desc If true, when changing scenes the pictures will play their animation again.
    @default false

    @arg clickCommonEventId
    @text Click Common Event Id
    @type common_event
    @desc A common event to play when clicking on this picture.
    @default 0

    @arg hoverCommonEventId
    @text Mouse Enter Common Event Id
    @type common_event
    @desc A common event to play when the mouse starts hovering the picture.
    @default 0

    @arg unhoverCommonEventId
    @text Mouse Exit Common Event Id
    @type common_event
    @desc A common event to play when the mouse stops hovering the picture.
    @default 0

    @arg wait
    @text Wait
    @type boolean
    @desc If the current event will wait the picture finish his movement.
    @default false

@command cmd_movePicture
@text Move Picture
@desc Move/Change all the picture properties at once.

    @arg id
    @text Picture Id
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg wait
    @text Wait
    @type boolean
    @desc If the current event will wait the picture finish his movement.
    @default false

    @arg operationType
    @text Operation Type
    @type select
    @option Add
    @option Set
    @desc If Add, the values will be increased from the current ones.
    @default Add

    @arg settings
    @text Picture Settings
    @type struct<moveSt>
    @desc The picture properties.
    @default

@command cmd_advancedMovePicture
@text Advanced Move Picture
@desc An advanced way to change one or more picture properties.

    @arg id
    @text ID
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg wait
    @text Wait
    @type boolean
    @desc If the current event will wait the picture finish his movement.
    @default false

    @arg animeSettings
    @text Anime Settings
    @type struct<animeSt>[]
    @desc Advanced and individual anime settings to each property of the picture.
    @default []

@command cmd_advancedMoveProp
@text Advanced Move Prop
@desc Change a single prop.

    @arg id
    @text ID
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg prop
    @text Property
    @type select
    @option x @option y @option alpha @option scaleX @option scaleY @option skewX @option skewY @option angle @option rotationSpeed @option toneRed @option toneGreen @option toneBlue @option toneGray @option blendRed @option blendGreen @option blendBlue @option blendAlpha @option hue
    @desc The property to apply the changes.
    @default x

    @arg operationType
    @text Operation Type
    @type select
    @option Set
    @option Add
    @desc The type of operation.
    @default Add

    @arg value
    @text Values
    @type multiline_text
    @desc The initial and target value. Separate each one by comma.
    @default 0, 0

    @arg duration
    @text Duration
    @type text
    @desc The duration of the transition from initial to target properties.
    @default 1

    @arg easing
    @text Easing
    @type combo
    @option --- Default --- @option linear @option slowStart @option slowEnd @option slowStartEnd @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic
    @desc The ease animation that will be used.
    @default linear
    @parent Static Settings

    @arg loop
    @text Loop
    @type text
    @option true
    @desc Set to -1, to loop infinitely. Or put a number to set the amount of times the loop will happen.
    @default 0

    @arg direction
    @text Direction
    @type select
    @option normal
    @option alternate
    @desc Choose the direction the animation will play.
    @default normal

    @arg wait
    @text Wait
    @type boolean
    @desc If the current event will wait the picture finish his movement.
    @default false

@command cmd_changeSettings
@text Change Settings
@desc Change some picture settings that are not animated.

    @arg id
    @text Picture Id
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg filename
    @text Filename
    @type file
    @dir img/pictures
    @desc The filename of the picture. Accept \v[id]
    @default

    @arg relativeObject
    @text Relative Object
    @type combo
    @option none
    @option same
    @desc Any object that has .x and .y properties. 
    @default none

    @arg refreshOnSceneChange
    @text Refresh On Scene Change
    @type boolean
    @desc If true, when changing scenes the pictures will play the animation again.
    @default

    @arg clickCommonEventId
    @text Click Common Event Id
    @type common_event
    @desc A common event to play when clicking on this picture.
    @default

    @arg hoverCommonEventId
    @text Mouse Enter Common Event Id
    @type common_event
    @desc A common event to play when the mouse starts hovering the picture.
    @default

    @arg unhoverCommonEventId
    @text Mouse Exit Common Event Id
    @type common_event
    @desc A common event to play when the mouse stops hovering the picture.
    @default

@command cmd_breathEffect
@text Breath Effect
@desc Applies a breath effect into the picture.

    @arg id
    @text ID
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg power
    @text Power
    @type text
    @desc The power of the effect.
    @default 0.0001

    @arg maxValue
    @text Max Power value %
    @type text
    @desc How much the power can raise.
    @default 0.5

    @arg vertical
    @text Vertical
    @type boolean
    @desc If true, the effect will be applied vertically.
    @default true

    @arg horizontal
    @text Horizontal
    @type boolean
    @desc If true, the effect will be applied horizontally.
    @default false

@command cmd_floatEffect
@text Float Effect
@desc Applies a float effect into the picture.

    @arg id
    @text ID
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg power
    @text Y Power
    @type text
    @desc How higher the picture will float from it's original position Y.
    @default 0.1

    @arg maxY
    @text Max Y
    @type text
    @desc The maximum value the picture will float to.
    @default 10

@command cmd_shakeEffect
@text Shake Effect
@desc Applies a shake effect on the picture.

    @arg id
    @text Picture Id
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg power
    @text Power
    @type text
    @desc The shake power. A positive and negative range will be created with this value.
    @default 5

    @arg duration
    @text Duration
    @type text
    @desc How much time in frames the skae will last.
    @default 30

    @arg vertical
    @text Vertical
    @type boolean
    @desc If true, the effect will be applied vertically.
    @default true

    @arg horizontal
    @text Horizontal
    @type boolean
    @desc If true, the effect will be applied horizontally.
    @default false

@command cmd_cardEffect
@text Card Effect
@desc Can flip a picture like a card. This command cannot be used by himself. Read help file.

    @arg id
    @text Picture Id
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg frontFilename
    @text Front Filename
    @type file
    @dir img/pictures
    @desc The filename of the picture, when the scale is positive.
    @default

    @arg backFilename
    @text Back Filename
    @type file
    @dir img/pictures
    @desc The filename of the picture, when the scale is negative.
    @default

    @arg flipType
    @text Flip Type
    @type select
    @option horizontal
    @option vertical
    @option both
    @desc The orientation of the flip.
    @default horizontal

@command cmd_changeMask
@text Change Mask
@desc Changes or apply a new mask to the picture.

    @arg id
    @text Picture Id
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

    @arg type
    @text Type
    @type select
    @option rect
    @option circle
    @option roundedRect
    @option star
    @option none
    @desc The type of the mask. 
    If circle, the width and height must always be the same value.
    @default none

    @arg image
    @text Mask Image
    @type file
    @dir img/pictures
    @desc The image used as a mask. If set, it will ignore the Type argument.
    @default

    @arg alignX
    @text Align X
    @type select
    @option left
    @option center
    @option right
    @desc Select left to only use offset value.
    @default left

    @arg alignY
    @text Align Y
    @type select
    @option top
    @option center
    @option bottom
    @desc Select top to only use offset value.
    @default top

    @arg offsetX
    @text Offset X
    @type text
    @desc The Offset X position.
    @default 0

    @arg offsetY
    @text Offset Y
    @type text
    @desc The offset Y position.
    @default 0

    @arg - Only Works for Type Masks -

    @arg size
    @text Size
    @type text
    @desc The width and height of the mask.
    @default 200, 200

    @arg circleRadius
    @text Circle radius
    @type text
    @desc The radius of the circle. This value must be always less than the height/width.
    @default 90

    @arg roundedRectBorder
    @text Rounded Rect Border
    @type text
    @desc The size of the rounded borders.
    @default 20

    @arg starEdges
    @text Star Edges
    @type text
    @desc How much points the star will have.
    @default 5

    @arg starOuterRadius
    @text Star Radius
    @type text
    @desc The outer radius of the star.
    @default 90

    @arg starInnerRadius
    @text Star Inner Radius
    @type text
    @desc The inner radius of the star.
    @default 90

@command cmd_erase
@text Erase Picture
@desc Erase one or more pictures.

    @arg id
    @text Picture Id
    @type text
    @desc The id of the pictures. Can be a number or text. Accept \v[id] and multiple ids.
    @default 1

*/

/* ------------------------------ MAIN SETTINGS ----------------------------- */
{
/*~struct~mainSt:

    @param anchor
    @text Origin (Anchor)
    @type select
    @option UpperLeft @option UpperCenter @option UpperRight @option CenterLeft @option Center @option CenterRight @option LowLeft @option LowCenter @option LowRight
    @desc Choose the origin of the picture.
    @default UpperLeft

    @param blendMode
    @text Blend Mode
    @type combo
    @option Normal @option Additive @option Multiply @option Screen
    @desc The blend mode of the picture.
    @default Normal

    @param Default Anime Settings

    @param duration
    @text Duration
    @type text
    @desc The duration of the transition from initial to target properties.
    @default 1
    @parent Default Anime Settings

    @param easing
    @text Easing
    @type combo
    @option --- Default --- @option linear @option slowStart @option slowEnd @option slowStartEnd @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic
    @desc The ease animation that will be used.
    @default linear
    @parent Default Anime Settings

    @param loop
    @text Loop
    @type text
    @option true
    @desc Set to -1, to loop infinitely. Or put a number to set the amount of times the loop will happen.
    @default 0
    @parent Default Anime Settings

    @param direction
    @text Direction
    @type select
    @option normal
    @option alternate
    @desc Choose the direction the animation will play.
    @default normal
    @parent Default Anime Settings

    @param separator1
    @text Initial

    @param initialAlignX
    @text Align X
    @type select
    @option left
    @option center
    @option right
    @option left_offScreen
    @option right_offScreen
    @desc Select left to only use offset value.
    @default left
    @parent separator1

    @param initialOffsetX
    @text Offset X
    @type text
    @desc The Offset X position.
    @default 0
    @parent separator1

    @param initialAlignY
    @text Align Y
    @type select
    @option top
    @option center
    @option bottom
    @option top_offScreen
    @option bottom_offScreen
    @desc Select top to only use offset value.
    @default top
    @parent separator1

    @param initialOffsetY
    @text Offset Y
    @type text
    @desc The offset Y position.
    @default 0
    @parent separator1

    @param initialAlpha
    @text Alpha (Opacity)
    @type text
    @desc The alpha value. From 0 to 1. Can use decimals.
    @default 0
    @parent separator1

    @param initialScale
    @text Scale X Y
    @type text
    @desc The scale values. From 0 to 1. Can use decimals.
    @default 1, 1
    @parent separator1

    @param initialSkew
    @text Skew X Y
    @type text
    @desc The skew values. Can use decimals.
    @default 0, 0
    @parent separator1

    @param initialAngleRotation
    @text Angle & Rotation
    @type text
    @desc The angle value from 0 to 360. If Rotation is set, it will ignore the angle.
    @default 0, 0
    @parent separator1

    @param initialTone
    @text Tone Color(Tint)
    @type text
    @desc Red, Green, Blue, Gray → All on RGB format. From -255 to 255.
    @default 0, 0, 0, 0
    @parent separator1

    @param initialBlendColor
    @text Blend Color
    @type text
    @desc Red, Green, Blue, Alpha → ALL ON RGB format. From -255 to 255. Alpha from 0 to 1.
    @default 0, 0, 0, 0
    @parent separator1

    @param initialHue
    @text Hue Color
    @type text
    @desc The hue number. From 0 to 360.
    @default 0
    @parent separator1

    @param enableTarget
    @text Enable Target
    @type boolean
    @desc If true, it will use target values.
    @default true

    @param targetAlignX
    @text Align X
    @type select
    @option left
    @option center
    @option right
    @desc Select left to only use offset value.
    @default left
    @parent enableTarget

    @param targetOffsetX
    @text Offset X
    @type text
    @desc The Offset X position.
    @default 0
    @parent enableTarget

    @param targetAlignY
    @text Align Y
    @type select
    @option top
    @option center
    @option bottom
    @desc Select top to only use offset value.
    @default top
    @parent enableTarget

    @param targetOffsetY
    @text Offset Y
    @type text
    @desc The offset Y position.
    @default 0
    @parent enableTarget

    @param targetAlpha
    @text Alpha (Opacity)
    @type text
    @desc The alpha value. From 0 to 1. Can use decimals.
    @default 1
    @parent enableTarget

    @param targetScale
    @text Scale X Y
    @type text
    @desc The scale values. From 0 to 1. Can use decimals.
    @default 1, 1
    @parent enableTarget

    @param targetSkew
    @text Skew X Y
    @type text
    @desc The skew values. Can use decimals.
    @default 0, 0
    @parent enableTarget

    @param targetAngleRotation
    @text Angle & Rotation
    @type text
    @desc The angle value from 0 to 360. If Rotation is set, it will ignore the angle.
    @default 0, 0
    @parent enableTarget

    @param targetTone
    @text Tone Color(Tint)
    @type text
    @desc Red, Green, Blue, Gray → All on RGB format. From -255 to 255.
    @default 0, 0, 0, 0
    @parent enableTarget

    @param targetBlendColor
    @text Blend Color
    @type text
    @desc Red, Green, Blue, Alpha → ALL ON RGB format. From -255 to 255. Alpha from 0 to 1.
    @default 0, 0, 0, 0
    @parent enableTarget

    @param targetHue
    @text Hue Color
    @type text
    @desc The hue number. From 0 to 360.
    @default 0
    @parent enableTarget

*/
}

/* ------------------------------ MOVE SETTINGS ----------------------------- */
{
/*~struct~moveSt:

    @param duration
    @text Duration
    @type text
    @desc The duration of the transition from initial to target properties.
    @default 1

    @param easing
    @text Easing
    @type combo
    @option --- Default --- @option linear @option slowStart @option slowEnd @option slowStartEnd @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic
    @desc The ease animation that will be used.
    @default linear

    @param loop
    @text Loop
    @type text
    @option true
    @desc Set to -1, to loop infinitely. Or put a number to set the amount of times the loop will happen.
    @default 0

    @param direction
    @text Direction
    @type select
    @option normal
    @option alternate
    @desc Choose the direction the animation will play.
    @default normal

    @param alignX
    @text Align X
    @type select
    @option left
    @option center
    @option right
    @option left_offScreen
    @option right_offScreen
    @desc Select left to only use offset value.
    @default left

    @param alignY
    @text Align Y
    @type select
    @option top
    @option center
    @option bottom
    @option top_offScreen
    @option bottom_offScreen
    @desc Select top to only use offset value.
    @default top

    @param -------------------

    @param offsetX
    @text Offset X
    @type text
    @desc The Offset X position.
    @default x

    @param offsetY
    @text Offset Y
    @type combo
    @option y
    @desc The offset Y position.
    @default y

    @param alpha
    @text Alpha (Opacity)
    @type combo
    @option alpha
    @desc The alpha value. From 0 to 1. Can use decimals.
    @default alpha

    @param scaleX
    @text Scale X
    @type combo
    @option scaleX
    @desc The scale X value. From 0 to 1.
    @default scaleX

    @param scaleY
    @text Scale Y
    @type combo
    @option scaleY
    @desc The scale Y value. From 0 to 1.
    @default scaleY

    @param anchor
    @text Origin (Anchor)
    @type select
    @option anchor @option UpperLeft @option UpperCenter @option UpperRight @option CenterLeft @option Center @option CenterRight @option LowLeft @option LowCenter @option LowRight
    @desc Choose the origin of the picture.
    @default anchor

    @param blendMode
    @text Blend Mode
    @type combo
    @option blendMode @option Normal @option Additive @option Multiply @option Screen
    @desc The blend mode of the picture.
    @default blendMode

    @param skewX
    @text Skew X
    @type combo
    @option skewX
    @desc
    @default skewX

    @param skewY
    @text Skew Y
    @type combo
    @option skewY
    @desc
    @default skewY

    @param angle
    @text Angle
    @type combo
    @option angle
    @desc
    @default angle

    @param rotationSpeed
    @text Rotation Speed
    @type combo
    @option rotationSpeed
    @desc
    @default rotationSpeed

    @param toneRed
    @text Tone Red (Tint)
    @type combo
    @option toneRed
    @desc Red
    @default toneRed

    @param toneGreen
    @text Tone Green (Tint)
    @type combo
    @option toneGreen
    @desc Green
    @default toneGreen

    @param toneBlue
    @text Tone Blue (Tint)
    @type combo
    @option toneBlue
    @desc Blue
    @default toneBlue

    @param toneGray
    @text Tone Gray (Tint)
    @type combo
    @option toneGray
    @desc Gray
    @default toneGray

    @param blendRed
    @text Blend Red
    @type combo
    @option blendRed
    @desc Red
    @default blendRed

    @param blendGreen
    @text Blend Green
    @type combo
    @option blendGreen
    @desc Green
    @default blendGreen

    @param blendBlue
    @text Blend Blue
    @type combo
    @option blendBlue
    @desc Blue
    @default blendBlue

    @param blendAlpha
    @text Blend Alpha
    @type combo
    @option blendAlpha
    @desc Alpha
    @default blendAlpha

    @param hue
    @text Hue Color
    @type combo
    @option hue
    @desc The hue number. From 0 to 360.
    @default hue

*/
}

/* ----------------------------- ANIME SETTINGS ----------------------------- */
{
/*~struct~animeSt:

    @param prop
    @text Property
    @type select
    @option x
    @option y
    @option alpha
    @option scaleX
    @option scaleY
    @option skewX
    @option skewY
    @option angle
    @option rotationSpeed
    @option toneRed
    @option toneGreen
    @option toneBlue
    @option toneGray
    @option blendRed
    @option blendGreen
    @option blendBlue
    @option blendAlpha
    @option hue
    @desc The property to apply the anime changes.
    @default x

    @param operationType
    @text Operation Type
    @type select
    @option Set
    @option Add
    @desc The type of operation.
    @default Add

    @param value
    @text Values
    @type multiline_text
    @desc The initial and target value. Separate each one by comma.
    @default 0, 0

    @param duration
    @text Duration
    @type text
    @desc The duration of the transition from initial to target properties.
    @default 1

    @param easing
    @text Easing
    @type combo
    @option --- Default --- @option linear @option slowStart @option slowEnd @option slowStartEnd @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic
    @desc The ease animation that will be used.
    @default linear
    @parent Static Settings

    @param loop
    @text Loop
    @type text
    @option true
    @desc Set to -1, to loop infinitely. Or put a number to set the amount of times the loop will happen.
    @default 0

    @param direction
    @text Direction
    @type select
    @option normal
    @option alternate
    @desc Choose the direction the animation will play.
    @default normal

*/
}

/* ---------------------------------- MASK ---------------------------------- */
{
/*~struct~maskSt:

@param type
@text Type
@type select
@option rect
@option circle
@option roundedRect
@option star
@option none
@desc The type of the mask. 
If circle, the width and height must always be the same value.
@default none

@param image
@text Mask Image
@type file
@dir img/pictures
@desc The image used as a mask. If set, it will ignore the Type argument.
@default

@param alignX
@text Align X
@type select
@option left
@option center
@option right
@desc Select left to only use offset value.
@default left

@param alignY
@text Align Y
@type select
@option top
@option center
@option bottom
@desc Select top to only use offset value.
@default top

@param offsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0

@param offsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0

@param - Only Works for Type Masks -

@param size
@text Size
@type text
@desc The width and height of the mask.
@default 200, 200

@param circleRadius
@text Circle radius
@type text
@desc The radius of the circle. This value must be always less than the height/width.
@default 90

@param roundedRectBorder
@text Rounded Rect Border
@type text
@desc The size of the rounded borders.
@default 20

@param starEdges
@text Star Edges
@type text
@desc How much points the star will have.
@default 5

@param starOuterRadius
@text Star Radius
@type text
@desc The outer radius of the star.
@default 90

@param starInnerRadius
@text Star Inner Radius
@type text
@desc The inner radius of the star.
@default 90

*/
}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_PictureManager = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */

/**
 * 
 * @typedef {object} AnimeProp
 * @property {number[]} value - The initial and target value.
 * @property {number} duration - The duration of the animation.
 * @property {number} loop - How many times the animation will play.
 * @property {string} direction - The direction on which the animation values will go. 
 * normal → From Initial to Target. 
 * alternate → To be used when loop is higher than 0.
 * @property {string} easing - The ease type of the animation.
 */

/**
 * 
 * @typedef {object} AnimePropList
 * @property {AnimeProp} x - The x coordinate.
 * @property {AnimeProp} y - The y coordinate.
 * @property {AnimeProp} scaleX - The horizontal scale.
 * @property {AnimeProp} scaleY - The vertical scale.
 * @property {AnimeProp} skewX - The horizontal skew.
 * @property {AnimeProp} skewY - The vertical skew.
 * @property {AnimeProp} alpha - The alpha, transparency value. From 0 to 1.
 * @property {AnimeProp} angle - The angle in degrees. From 0 to 360.
 * @property {AnimeProp} rotationSpeed - How many angles per frame it will rotate.
 * @property {AnimeProp} toneRed - The red value for tone color. From -255 to 255.
 * @property {AnimeProp} toneGreen - The green value for tone color. From -255 to 255.
 * @property {AnimeProp} toneBlue - The blue value for tone color. From -255 to 255.
 * @property {AnimeProp} toneGray - The gray value for tone color. From -255 to 255.
 * @property {AnimeProp} blendRed - The red value for blend color. From -255 to 255.
 * @property {AnimeProp} blendGreen - The red value for blend color. From -255 to 255.
 * @property {AnimeProp} blendBlue - The red value for blend color. From -255 to 255.
 * @property {AnimeProp} blendAlpha - The alpha value for blend color. From 0 to 1.
 * @property {AnimeProp} hue - The hue color value. From 0 to 360.
 */

/**
 * The Picture Manager plugin parameters.
 * @typedef {object} PictureManagerParameters
 * @property {number} clickVariable - The variable Id that holds the picture id when it is clicked/touched.
 * @property {number} mouseEnterVariable The variable Id that holds the picture id when the mouse enter on the picture.
 * @property {number} mouseExitVariable The variable Id that holds the picture id when the mouse leaves the picture.
 */


/**
 * The Super Picture game object. It is saved on the save file.
 * @class 
 * 
 */
function Game_AnimePicture() {
    this.initialize(...arguments)
}

{

/**
 * @class
 * @extends PIXI.Container
 */
class Container_AnimePicture extends PIXI.Container{

    /**
     * Create a Super Picture Container to hold and sort Super Picture sprites.
     * @constructor
     */
    constructor(){
        super()
        this.initialize()
    }

    initialize(){
        this.width = Graphics.width
        this.height = Graphics.height
    }

    onChildrenChange(){
        this.sortChildren()
    } 

    update(){
        for(const child of this.children){
            child.update()
        }
    }
}

class Sprite_MaskAnimePicture extends Sprite{

    initialize(bitmap, x, y){
        super.initialize(bitmap)
        this.x = x
        this.y = y
        this.mainX = x
        this.mainY = y
    }
}

/**
 * The Sprite for the Super Picture game object.
 * @class
 * @extends Sprite
 */
class Sprite_AnimePicture extends Sprite_Clickable{

    /**
     * @param {Game_AnimePicture} gamePic The Super Picture game object.
     * @returns {void}
     */
    initialize(gamePic){
        super.initialize()
        this.initMembers(gamePic)
        this.updateProps(this.getGamePicture())
        this.refreshMembers()
        this.loadBitmap()
        this.bitmap.addLoadListener(this.onBitmapLoad.bind(this))
    }

    initMembers(gamePic){
        this.gamePicture = gamePic
        this.animeGroup = new Eli.AnimeGroup([], {paused: false})
        this.animeAnimations = []
        this.tileSize = $dataSystem.tileSize
        this.visible = false
        this.maskObject = {x:0, y:0, mainX:0, mainY:0, isSprite: false}
        this.relativeObject = new Function("return {x: 0, y:0}")
    }

    refreshMembers(){
        this.refreshAnchor()
        this.refreshBlendMode()
        this.refreshRelativeObject()
    }

    refreshAnchor(){
        const {x, y} = {
            UpperLeft:  {x: 0,   y:0}, // Default
            UpperCenter:{x: 0.5, y:0},
            UpperRight: {x: 1,   y:0},
    
            CenterLeft: {x: 0,   y:0.5},
            Center:     {x: 0.5, y:0.5}, // Default
            CenterRight:{x: 1,   y:0.5},
            
            LowLeft:    {x: 0,   y:1},
            LowCenter:  {x: 0.5, y:1},
            LowRight:   {x: 1,   y:1},
        }[this.getGamePicture().anchor]
        this.anchor.set(x, y)
    }

    refreshBlendMode(){
        const blendType = {
            Normal:     0,
            Additive:   1,
            Multiply:   2,
            Screen:     3,
        }[this.getGamePicture().blendMode]
        this.blendMode = blendType
    }

    refreshRelativeObject(){
        if(this.getGamePicture().relativeObject === "none"){
            this.relativeObject = new Function("return {x: 0, y:0}")

        }else{
            this.relativeObject = new Function(`return ${this.getGamePicture().relativeObject}`)

            try {
                this.relativeObject().x
            } catch (error) {
                alert(`The object: ${this.getGamePicture().relativeObject}, does not exist or it is not defined yet.`)
                this.relativeObject = new Function("return {x: 0, y:0}")
            }
        }
    }

    /**
     * 
     * @returns {Game_AnimePicture}
     */
    getGamePicture(){
        return this.gamePicture
    }

    loadBitmap(){
        if(this.getGamePicture().backFilename){
            this.backBitmap = ImageManager.loadPicture(this.getGamePicture().backFilename)
        }else{
            this.backBitmap = null
        }
        
        this.frontBitmap = ImageManager.loadPicture(this.getGamePicture().frontFilename)
        this.bitmap = this.frontBitmap
    }

    onBitmapLoad(){
        this.createMask()
        this.createAnimeGroup()
    }

    createMask(){
        const gamePic = this.getGamePicture()
        this.removeMask()
        
        if(gamePic.mask.image){
            const bitmap = ImageManager.loadPicture(gamePic.mask.image)
            bitmap.addLoadListener(this.createSpriteMask.bind(this, gamePic, bitmap))
            
        }else if(gamePic.mask.type !== "none"){
            this.createShapeMask(gamePic)

        }else{
            this.mask = null
        }
    }

    createSpriteMask(gamePic, bitmap){
        const [x, y] = this.createMaskPosition(gamePic.mask, bitmap.width, bitmap.height)
        const sprite = new Sprite_MaskAnimePicture(bitmap, x, y)

        sprite.x = x
        sprite.y = y
        this.maskObject = sprite
        this.mask = this.maskObject
        
        this.addChild(this.maskObject)
    }

    createShapeMask(gamePic){
        const {width, height} = gamePic.mask
        const [x, y] = this.createMaskPosition(gamePic.mask, width, height)
        
        this.maskObject = new PIXI.Graphics().beginFill(0xFF3300)
        this.refreshMaskShape(x, y, width, height)
        this.mask = this.maskObject
        this.addChild(this.mask)
    }

    removeMask(){
        if(this.maskObject){
            this.removeChild(this.maskObject)
            this.mask = null
            this.maskObject = {x:0, y:0, mainX:0, mainY:0, isSprite: false}
        }
    }

    createMaskPosition(position, maskWidth, maskHeight){
        const {alignX, alignY, offsetX, offsetY} = position
        const realOffsetX = new Function(`return ${offsetX}`).bind(this)
        const realOffsetY = new Function(`return ${offsetY}`).bind(this)

        
        const x = {
            left: realOffsetX(),
            center: (this.width/2 - maskWidth/2) + realOffsetX(),
            right: (this.width - maskWidth) + realOffsetX(),
        }[alignX]
    
        const y = {
            top: realOffsetY(),
            center: (this.height/2 - maskHeight/2) + realOffsetY(),
            bottom: (this.height - maskHeight) + realOffsetY(),
        }[alignY]

        return [Math.round(x), Math.round(y)]
    }

    refreshMaskShape(x, y, width, height){
        const {
            type, circleRadius, 
            roundedRectBorder, starEdges,
            starOuterRadius, starInnerRadius
        } = this.getGamePicture().mask

        const position = width/2

        switch(type){
            case "rect":
                this.maskObject.drawRect(x, y, width, height)
                break
            case "circle":
                this.maskObject.drawCircle(position, position, circleRadius)
                break
            case "roundedRect":
                this.maskObject.drawRoundedRect(x, y, width, height, roundedRectBorder)
                break
            case "star":
                this.maskObject.drawStar(position, position, starEdges, starOuterRadius, starInnerRadius, 0)
                break   
        }

        this.maskObject.endFill()
    }

    createAnimeGroup(){
        const gamePic = this.getGamePicture()
        this.refreshXYProps(gamePic)
        this.animeAnimations = Eli.AnimeManager.createAnimations(gamePic, gamePic.getAllAnimeProps(), Eli.AnimeManager.createDefaultData())
        this.animeGroup.setAnimations(this.animeAnimations)
        this.animeGroup.onStart = this.onAnimeStart.bind(this)
        this.animeGroup.onComplete = this.onAnimeComplete.bind(this)
    }

    refreshXYProps(gamePic){
        if(isNaN(gamePic.getAnimeProp("x").value[0])){
            const {x, y} = this.createAnimePositionProps(gamePic.positionPreset)
            gamePic.getAnimeProp("x").value = x
            gamePic.getAnimeProp("y").value = y
        }
    }

    createAnimePositionProps(presetPos){
        const [x1, y1] = this.createPosition(presetPos.initial, presetPos.target.offsetX, presetPos.target.offsetY)
        const [x2, y2] = this.createPosition(presetPos.target)
        
        return {
            x: [x1, x2],
            y: [y1, y2],
        }
    }

    createPosition(position, targetOffsetX = 0, targetOffsetY = 0){
        const {alignX, alignY, offsetX, offsetY} = position
        const realOffsetX = new Function(`return ${offsetX}`).bind(this)
        const realOffsetY = new Function(`return ${offsetY}`).bind(this)
        const realTargetOffsetX = new Function(`return ${targetOffsetX}`).bind(this)
        const realTargetOffsetY = new Function(`return ${targetOffsetY}`).bind(this)

        const x = {
            left: realOffsetX(),
            center: (Graphics.width/2 - this.width/2) + realOffsetX(),
            right: (Graphics.width - this.width) + realOffsetX(),
            left_offScreen: 0 - (Math.abs(realTargetOffsetX()) + this.width),
            right_offScreen: Graphics.width + this.width + Math.abs(realTargetOffsetX()),
        }[alignX]
    
        const y = {
            top: realOffsetY(),
            center: (Graphics.height/2 - this.height/2) + realOffsetY(),
            bottom: (Graphics.height - this.height) + realOffsetY(),
            top_offScreen: 0 - (Math.abs(realTargetOffsetY()) + this.height),
            bottom_offScreen: Graphics.height + this.height + Math.abs(realTargetOffsetY()),
        }[alignY]
        
        return [Math.round(x), Math.round(y)]
    }

    onAnimeStart(anime){
        this.visible = true
    }

    onAnimeComplete(anime){
        const gamePic = this.getGamePicture()
        gamePic.animeRunning = false

        if(!gamePic.refreshOnSceneChange){
            gamePic.reverseAnimePropValues()
        }

        Eli.Array.remove(Plugin.holdInterpreterIds, gamePic.id)
    }

    onMouseEnter(){
        $gameVariables.setValue(Plugin.getParam().mouseEnterVariable, this.getGamePicture().id)
        Plugin.clearDestination = this.getGamePicture().clickCommonEventId > 0
        const ceId = this.getGamePicture().hoverCommonEventId

        if(ceId){
            Plugin.commonEventIds[ceId] = true
            $gameMap._commonEvents.push(new Game_CommonEvent(ceId))
        }
        
    }
    
    onMouseExit(){
        Plugin.clearDestination = false
        $gameVariables.setValue(Plugin.getParam().mouseExitVariable, this.getGamePicture().id)
        const ceId = this.getGamePicture().unhoverCommonEventId

        if(ceId){
            Plugin.commonEventIds[ceId] = true
            $gameMap._commonEvents.push(new Game_CommonEvent(ceId))
        }
    }
    
    onPress(){

    }
    
    onClick(){
        $gameVariables.setValue(Plugin.getParam().clickVariable, this.getGamePicture().id)
        Plugin.clearDestination = this.getGamePicture().clickCommonEventId > 0
        const ceId = this.getGamePicture().clickCommonEventId

        if(ceId){
            Plugin.commonEventIds[ceId] = true
            $gameMap._commonEvents.push(new Game_CommonEvent(ceId))
        }
    }

    update(){
        if(this.isReady()){
            super.update()
            this.updateReady()
        }
    }

    isReady(){
        return this.bitmap && this.bitmap.isReady() && this.visible
    }

    updateReady(){
        const gamePic = this.getGamePicture()

        if(gamePic.animeRunning){
            this.animeGroup.update()
        }
        
        this.updateProps(gamePic)

        if(gamePic.fixedPosition){
            this.updateFixedPosition(gamePic)
        }

        if(gamePic.breath.enable){
            this.updateBreathEffect(gamePic.breath)
        }

        if(gamePic.float.enable){
            this.updateFloatEffect(gamePic.float)
        }

        if(gamePic.shake.duration > 0){
            this.updateShakeEffect(gamePic.shake)
        }

        if(gamePic.card.enable){
            this.updateCardEffect(gamePic.card)
        }
    }

    updateProps(gamePic){
        this.x = this.relativeObject().x + gamePic.x
        this.y = this.relativeObject().y + gamePic.y
        this.alpha = gamePic.alpha
        this.scale.set(gamePic.scaleX, gamePic.scaleY)
        this.skew.set(gamePic.skewX, gamePic.skewY)
        this.z = gamePic.zIndex
        this.setColorTone([gamePic.toneRed, gamePic.toneGreen, gamePic.toneBlue, gamePic.toneGray])
        this.setBlendColor([gamePic.blendRed, gamePic.blendGreen, gamePic.blendBlue, gamePic.blendAlpha])
        this.setHue(gamePic.hue)

        this.updateAngle(gamePic)
    }

    updateAngle(gamePic){
        if(gamePic.rotationSpeed !== 0){
            this.angle += gamePic.rotationSpeed
            gamePic.angle = this.angle
        }else{
            this.angle = gamePic.angle
        }
    }

    updateFixedPosition(gamePic){
        this.x -= $gameMap.displayX() * this.tileSize
        this.y -= $gameMap.displayY() * this.tileSize
    }

    start(){
        this.visible = true
        this.getGamePicture().animeRunning = true
        this.animeGroup.play("normal")
    }

    setBlendColor(color) {
        if(this._blendColor.toString() !== color.toString()){
            this._blendColor = [...color]
            this._updateColorFilter()
        }
    }

    setColorTone(tone){
        if(this._colorTone.toString() !== tone.toString()) {
            this._colorTone = [...tone]
            this._updateColorFilter()
        }
    }

    setHue(hue) {
        if(this._hue !== hue){
            this._hue = hue
            this._updateColorFilter()
        }
    }

    updateBreathEffect(breath){
        if(breath.value >= breath.maxValue){
            breath.powerDirection = -breath.power

        }else if(breath.value <= 0){
            breath.powerDirection = breath.power
        }

        breath.value += breath.powerDirection

        if(breath.horizontal){
            this.anchor.x = 0.5
            
            this.scale.x += breath.value

            if(this.scale.x >= 0){
                this.x += this.bitmap.width/2
                this.maskObject.x = this.maskObject.mainX - (this.bitmap.width/2)
                

            }else{
                this.x -= this.bitmap.width/2
                this.maskObject.x = this.maskObject.mainX + (this.bitmap.width/2)
            }
        }
        
        if(breath.vertical){
            this.anchor.y = 1
            this.y += this.bitmap.height * this.anchor.y
            this.scale.y += breath.value
            this.maskObject.y = this.maskObject.mainY - (this.bitmap.height * this.anchor.y)
        }
    }

    updateFloatEffect(float){
        if(float.y <= 0){
            float.powerDirection = float.power

        }else if(float.y >= float.maxY){
            float.powerDirection = -float.power
        }

        float.y += float.powerDirection
        this.y -= float.y
    }

    updateShakeEffect(shake){
        if(shake.horizontal){
            const value = Math.randomInt(shake.power) * [1,-1][Math.randomInt(2)]
            this.x += value
        }

        if(shake.vertical){
            const value = Math.randomInt(shake.power) * [1,-1][Math.randomInt(2)]
            this.y += value
        }

        shake.duration--
    }

    updateCardEffect(card){
        if(card.flipType === "horizontal"){
            this.updateHorizontalCardFlip()

        }else if(card.flipType === "vertical"){
            this.updateVerticalCardFlip()

        }else{
            this.updateHorizontalCardFlip()
            this.updateVerticalCardFlip()
        }
    }

    updateHorizontalCardFlip(){
        if(this.scale.x < 0){
            
            if(this.backBitmap){
                this.bitmap = this.backBitmap
            }

        }else if(this.scale.x > 0){
            this.bitmap = this.frontBitmap
        }
    }

    updateVerticalCardFlip(){
        if(this.scale.y < 0){
            
            if(this.backBitmap){
                this.bitmap = this.backBitmap
            }

        }else if(this.scale.y > 0){
            this.bitmap = this.frontBitmap
        }
    }
}

/**
 * The Picture Manager plugin namespace.
 * @memberof Eli
 * @namespace PictureManager
 */
Eli.PictureManager = {

    alias: {},
    /**@type {PictureManagerParameters} */
    parameters: {},
    /**@type {string[]} */
    propNameList: ["x", "y", "alpha", "scaleX", "scaleY", "skewX", "skewY", "angle",
    "rotationSpeed", "toneRed", "toneGreen", "toneBlue",
    "toneGray", "blendRed","blendGreen","blendBlue","blendAlpha",
    "hue"],
    sprites: {},
    /**@type {number[]} */
    commonEventIds: [],
    /**@type {boolean} */
    clearDestination: false,
    Container_SuperPicture: Container_AnimePicture,
    Sprite_SuperPicture: Sprite_AnimePicture,
    /**
     * All picture ids that are making the game interpreter wait for them finish theit movements.
     * @type {number[]} 
     * */
    holdInterpreterIds: [],

    initialize(){
        this.parameters = this.createParameters()
        this.registerPluginCommands()
    },

    /**
     * @returns {PictureManagerParameters}
     */
    createParameters(){
        const parameters = PluginManager.parameters("EliMZ_PictureManager")

        return {
            clickVariable: Number(parameters.clickVariable),
            mouseEnterVariable: Number(parameters.mouseEnterVariable),
            mouseExitVariable: Number(parameters.mouseExitVariable),
        }
    },

    /**
     * Register all plugin commands.
     */
    registerPluginCommands(){
        const commands = [
            "cmd_fullShow", "cmd_movePicture", "cmd_advancedMovePicture", 
            "cmd_changeSettings", "cmd_advancedMoveProp", "cmd_cardEffect",
            "cmd_breathEffect", "cmd_floatEffect", "cmd_shakeEffect",
            "cmd_changeMask", "cmd_erase"
        ]
        Eli.PluginManager.registerCommands(this, commands)
    },

    /**
     * Gets the plugin parameters.
     * @returns {PictureManagerParameters}
     */
    getParam(){
        return this.parameters
    },

    /**
     * Gets an object with all the Super Picture game objects
     * @returns {Game_AnimePicture[]}
     */
    getAllGamePictures(){
        return $eliData.superPictures
    },

    /**
     * Gets a Super Picture game object.
     * @param {string|number} id The id of the picture.
     * @returns {Game_AnimePicture}
     */
    getGamePicture(id){
        return $eliData.superPictures[id]
    },

    /**
     * Gets an object with all the Super Picture sprites
     * @returns {Sprite_AnimePicture[]}
     */
    getAllSpritePictures(){
        return this.sprites
    },

    /**
     * Gets a Super Picture sprite.
     * @param {string|number} id The id of the picture.
     * @returns {Sprite_AnimePicture}
     */
    getSpritePicture(id){
        return this.sprites[id]
    },

    /**
     * Returns true if there are any picture holding the interpreter.
     * @returns {boolean}
     */
    isHoldingInterpreter(){
        return this.holdInterpreterIds.length > 0
    },

    cmd_fullShow(args){
        const id = this.parseIdArg(args.id)
        const filename = Eli.PluginManager.parseVariables(args.filename)
        const fixedPosition = args.fixedPosition === "true"
        const refreshOnSceneChange = args.refreshOnSceneChange === "true"

        const mainSettings = JSON.parse(Eli.PluginManager.parseVariables(args.mainSettings))
        const positionPreset = this.createPositionPreset(mainSettings, fixedPosition)
        const anchor = mainSettings.anchor
        const blendMode = mainSettings.blendMode
        const animeData = this.parseShowAndMoveAnime(mainSettings)
        const animeProps = this.createAnimePropList(animeData)
        const mask = this.parseMask(JSON.parse(args.mask))
        const zIndex = Number(Eli.PluginManager.parseVariables(args.zIndex))
        const relativeObject = args.relativeObject
        
        const basicMembers = {
            id, filename, fixedPosition, anchor, blendMode,
            refreshOnSceneChange, positionPreset, zIndex, relativeObject,
            easing: mainSettings.easing,
            duration: Number(mainSettings.duration),
            hoverCommonEventId: Number(args.hoverCommonEventId),
            clickCommonEventId: Number(args.clickCommonEventId),
            unhoverCommonEventId: Number(args.unhoverCommonEventId),
            container: args.container,
        }

        const layerContainer = this.findContainer(args.container)
        const gamePicture = new Game_AnimePicture(basicMembers, animeProps, mask)
        const oldSprite = layerContainer.children.find(child => child.getGamePicture().id === id)

        if(oldSprite){
            layerContainer.removeChild(oldSprite)
        }

        $eliData.superPictures[id] = gamePicture
        this.sprites[id] = new Sprite_AnimePicture(gamePicture)
        layerContainer.addChild(this.getSpritePicture(id))
        
        this.getSpritePicture(id).bitmap.addLoadListener(() => {
            this.getSpritePicture(id).start()
        })
        
        if(args.wait === "true"){
            //Eli.PluginManager.currentInterpreter.wait(basicMembers.duration)
            this.holdInterpreterIds.push(gamePicture.id)
        }
    },

    cmd_movePicture(args){
        const ids = Eli.PluginManager.createIdList(args.id)
        
        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                this.movePicture(gamePic, args.operationType, args.settings)
            }
        }
        
        if(args.wait === "true"){
            this.holdInterpreterIds.push(...ids)
        }
    },

    movePicture(gamePic, operationType, settings){
        const spritePic = this.getSpritePicture(gamePic.id)
        const animeData = this.parseMovePictureAnime(gamePic, settings, operationType)

        gamePic.animeProps = this.createAnimePropList(animeData)
        spritePic.createAnimeGroup()
        spritePic.start() 
    },

    cmd_advancedMovePicture(args){
        const ids = Eli.PluginManager.createIdList(args.id)
        
        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                this.advancedMovePicture(gamePic, args)
            }
        }

        if(args.wait === "true"){
            this.holdInterpreterIds.push(...ids)
        }
    },

    advancedMovePicture(gamePic, args){
        const animeSettings = JSON.parse(Eli.PluginManager.parseVariables(args.animeSettings))

        for(const param of animeSettings){
            const settings = JSON.parse(param)
            const propName = settings.prop
            const animation = this.getPictureAnimation(gamePic.id, propName)

            if(!animation) continue

            const propData = this.parsePropData(settings, gamePic, propName)

            gamePic.setAnimeProp(propName, this.createAnimePropData(...propData)) 
            this.restartAnimation(animation, ...propData)
        }

        gamePic.animeRunning = true
    },

    cmd_advancedMoveProp(args){
        const ids = Eli.PluginManager.createIdList(args.id)
        
        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                this.advancedMoveProp(gamePic, args)
            }
        }

        if(args.wait === "true"){
            this.holdInterpreterIds.push(...ids)
        }
    },

    advancedMoveProp(gamePic, args){
        const propName = args.prop
        const animation = this.getPictureAnimation(gamePic.id, propName)
        const propData = this.parsePropData(args, gamePic, propName)

        gamePic.getAllAnimeProps()[propName] = this.createAnimePropData(...propData)
        this.restartAnimation(animation, ...propData)
        gamePic.animeRunning = true
    },

    cmd_changeSettings(args){
        const ids = Eli.PluginManager.createIdList(args.id)

        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                this.changeSettings(gamePic, args)
            }
        }
    },

    changeSettings(gamePic, args){
        const oldFilename = gamePic.frontFilename
        const spritePic = this.getSpritePicture(gamePic.id)

        gamePic.frontFilename = args.filename || gamePic.frontFilename
        gamePic.refreshOnSceneChange = args.refreshOnSceneChange ? args.refreshOnSceneChange === "true" : gamePic.refreshOnSceneChange
        gamePic.hoverCommonEventId = args.hoverCommonEventId ? Number(args.hoverCommonEventId) : gamePic.hoverCommonEventId
        gamePic.clickCommonEventId = args.clickCommonEventId ? Number(args.clickCommonEventId) : gamePic.clickCommonEventId
        gamePic.unhoverCommonEventId = args.unhoverCommonEventId ? Number(args.unhoverCommonEventId) : gamePic.unhoverCommonEventId

        if(args.relativeObject !== "same"){
            gamePic.relativeObject = args.relativeObject
            spritePic.refreshRelativeObject()
        }

        if(gamePic.frontFilename !== oldFilename){
            spritePic.bitmap = ImageManager.loadPicture(gamePic.frontFilename)
        }
    },

    cmd_breathEffect(args){
        const ids = Eli.PluginManager.createIdList(args.id)
        const breathData = [
            Number(args.power),
            Number(args.maxValue)/100,
            args.horizontal === "true",
            args.vertical === "true",
        ]

        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                gamePic.setBreathEffect(...breathData)
            }
        }
    },

    cmd_floatEffect(args){
        const ids = Eli.PluginManager.createIdList(args.id)

        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                gamePic.setFloatEffect(Number(args.power), Number(args.maxY))
            }
        }
    },

    cmd_shakeEffect(args){
        const ids = Eli.PluginManager.createIdList(args.id)
        const shakeData = [
            Number(args.power),
            Number(args.duration),
            args.horizontal === "true",
            args.vertical === "true",
        ]

        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                gamePic.startShake(...shakeData)
            }
        }
    },

    cmd_cardEffect(args){
        const ids = Eli.PluginManager.createIdList(args.id)

        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                const spritePic = this.getSpritePicture(id)
                gamePic.card.enable = true
                gamePic.card.flipType = args.flipType
                gamePic.anchor = "Center"
                spritePic.refreshAnchor()

                if(args.frontFilename){
                    gamePic.frontFilename = args.frontFilename
                }

                gamePic.backFilename = args.backFilename
                spritePic.loadBitmap()
            }
        }
    },

    cmd_changeMask(args){
        const ids = Eli.PluginManager.createIdList(args.id)

        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                const sprite = this.getSpritePicture(id)
                const maskArg = {...args}
                const mask = this.parseMask(maskArg)
    
                gamePic.mask = mask
                sprite.createMask()
            }
        }
    },

    cmd_erase(args){
        const ids = Eli.PluginManager.createIdList(args.id)

        for(const id of ids){
            const gamePic = this.getGamePicture(id)

            if(gamePic){
                this.erasePicture(gamePic)
            }
        }
    },

    erasePicture(gamePic){
        Eli.Array.remove(Plugin.holdInterpreterIds, gamePic.id)
        this.sprites[gamePic.id].destroy()
        delete $eliData.superPictures[gamePic.id]
    },

    createPositionPreset(param, fixedPosition){
        const positionPreset = {
            initial: {
                alignX: param.initialAlignX,
                alignY: param.initialAlignY,
                offsetX: param.initialOffsetX,
                offsetY: param.initialOffsetY,
            },
            target: {
                alignX: param.targetAlignX,
                alignY: param.targetAlignY,
                offsetX: param.targetOffsetX,
                offsetY: param.targetOffsetY,
            }
        }

        if(param.enableTarget === "false"){
            positionPreset.target = {...positionPreset.initial}
        }

        if(fixedPosition){
            positionPreset.initial.alignX = "left"
            positionPreset.initial.alignY = "top"
            positionPreset.target.alignX = "left"
            positionPreset.target.alignY = "top"
        }

        return positionPreset
    },

    parseShowAndMoveAnime(param){
        const easing = param.easing
        const loop = this.parseLoopArg(param.loop)
        const direction = param.direction
        const initial = this.processInitialAndTarget(param, "initial")
        let duration = Number(param.duration) || 1

        if(param.enableTarget === "true"){
            var target = this.processInitialAndTarget(param, "target")

        }else{
            var target = {...initial}
            duration = 1
        }

        return {initial, target, duration, loop, direction, easing}
    },

    processInitialAndTarget(param, type){
        const [scaleX, scaleY] = param[`${type}Scale`].split(",")
        const [skewX, skewY] = param[`${type}Skew`].split(",")
        const [angle, rotation] = param[`${type}AngleRotation`].split(",")
        const tone = param[`${type}Tone`].split(",")
        const blendColor = param[`${type}BlendColor`].split(",")

        return {
            // x: Number(param.offsetX),
            // y: Number(param.offsetY),
            scaleX: Number(scaleX),
            scaleY: Number(scaleY),
            skewX: Number(skewX),
            skewY: Number(skewY),
            alpha: Number(param[`${type}Alpha`]),
            angle: Number(angle),
            rotationSpeed: Number(rotation),
            toneRed: Number(tone[0]),
            toneGreen: Number(tone[1]),
            toneBlue: Number(tone[2]),
            toneGray: Number(tone[3]),
            blendRed: Number(blendColor[0]),
            blendGreen: Number(blendColor[1]),
            blendBlue: Number(blendColor[2]),
            blendAlpha: Number(blendColor[3]*255),
            hue: Number(param[`${type}Hue`]),
        }
    },

    parseMask(mask){
        const [width, height] = mask.size.split(",")

        return {
            type: mask.type,
            image: Eli.PluginManager.parseVariables(mask.image),
            alignX: mask.alignX,
            alignY: mask.alignY,
            offsetX: Number(mask.offsetX),
            offsetY: Number(mask.offsetY),
            width: Number(width),
            height: Number(height),
            circleRadius: Number(mask.circleRadius),
            roundedRectBorder: Number(mask.roundedRectBorder),
            starEdges: Number(mask.starEdges),
            starOuterRadius: Number(mask.starOuterRadius),
            starInnerRadius: Number(mask.starInnerRadius),
        }
    },

    createAnimePropList(animeData){
        const {initial, target, duration, loop, direction, easing} = animeData
        const animeProps = {}
        
        for(const propName of this.propNameList){
            const value1 = initial[propName]
            const value2 = target[propName]

            animeProps[propName] = this.createAnimePropData(value1, value2, duration, loop, direction, easing)
        }

        return animeProps
    },

    createAnimePropData(initial, target, duration, loop, direction, easing){
        return {
            value: [initial, target], 
            duration: duration, 
            loop: loop, 
            direction: direction, 
            easing: easing
        }
    },

    parseMovePictureAnime(pic, args, operationType){
        const param = JSON.parse(Eli.PluginManager.parseVariables(args))
        const loop = this.parseLoopArg(param.loop)
        const direction = param.direction || "normal"
        const easing = param.easing || "linear"
        const duration = Number(param.duration) || 1
        const isXSame = param.alignX === "left" && param.offsetX === "x"
        const isYSame = param.alignY === "top" && param.offsetY === "y"
        const initial = {}
        const target = {}

        for(const propName of this.propNameList){
            initial[propName] = pic[propName]
        }

        if(operationType === "Add"){
            var valueCallback = this.addPropValueForMovePictureAnime.bind(this)
            var targetX = isXSame ? pic.x : pic.x + this.createPositionX(param.alignX, param.offsetX, pic.id)
            var targetY = isYSame ? pic.y : pic.y + this.createPositionY(param.alignY, param.offsetY, pic.id)
        }else{
            var valueCallback = this.setPropValueForMovePictureAnime.bind(this)
            var targetX = isXSame ? pic.x : this.createPositionX(param.alignX, param.offsetX, pic.id)
            var targetY = isYSame ? pic.y : this.createPositionY(param.alignY, param.offsetY, pic.id)
        }

        for(const propName of this.propNameList){
            target[propName] = valueCallback(pic, param, propName)
        }

        target.x = targetX
        target.y = targetY

        return {initial, target, loop, direction, easing, duration}
    },

    addPropValueForMovePictureAnime(pic, param, propName){
        if(isNaN(param[propName])){
            return pic[propName]
        }else{
            const value = this.valueFunction(param[propName], pic.id)
            return pic[propName] + value
        }
    },

    setPropValueForMovePictureAnime(pic, param, propName){
        if(!isNaN(pic[param[propName]])){
            return pic[param[propName]]
        }else{
            return this.valueFunction(param[propName], pic.id)
        }
    },

    valueFunction(value, id){
        const textFunc = `const spritePic = this.getSpritePicture("${id}");
        const gamePic = this.getGamePicture("${id}")`
        const func = new Function(`${textFunc};return ${value}`).bind(this)

        return func()
    },

    createPositionX(alignX, offsetX, id){
        const realOffsetX = this.valueFunction(offsetX, id)

        const x = {
            left: realOffsetX,
            center: (Graphics.width/2 - this.width/2) + realOffsetX,
            right: (Graphics.width - this.width) + realOffsetX,
            left_offScreen: 0 - this.width,
            right_offScreen: Graphics.width + this.width,
        }[alignX]
        
        return Math.round(x)
        
    },

    createPositionY(alignY, offsetY, id){
        const realOffsetY = this.valueFunction(offsetY, id)
    
        const y = {
            top: realOffsetY,
            center: (Graphics.height/2 - this.height/2) + realOffsetY,
            bottom: (Graphics.height - this.height) + realOffsetY,
            top_offScreen: 0 - this.height,
            bottom_offScreen: Graphics.height + this.height,
        }[alignY]
        
        return Math.round(y)
    },

    getPictureAnimation(id, propName){
        const spritePic = this.getSpritePicture(id)
        const index = this.propNameList.indexOf(propName)

        return spritePic.animeGroup.childrens[index]
    },

    parsePropData(param, gamePic, propName){
        const duration = Number(param.duration)
        const values = param.value.split(",")
        const loop = this.parseLoopArg(param.loop)
        const id = gamePic.id

        if(values.length === 1){
            values.unshift(gamePic[propName])
        }

        values[0] = this.valueFunction(values[0], id)

        if(param.operationType === "Add"){
            values[1] = values[0] + this.valueFunction(values[1], id)
        }else{
            values[1] = this.valueFunction(values[1], id)
        }

        return [...values, duration, loop, param.direction, param.easing]
    },

    restartAnimation(animation, initial, target, duration, loop, direction, easing){
        animation.data.value.start = initial
        animation.data.value.target = target
        animation.data.duration.target = duration
        animation.data.easing = easing
        animation.data.direction.type = direction
        animation.data.loop.target = loop
        animation.data.loop.current = 0
        animation.restart("normal")
    },

    parseIdArg(id){
        const parsedId = Eli.PluginManager.parseVariables(id)
        return isNaN(parsedId) ? parsedId : Number(parsedId)
    },

    parseLoopArg(loop){
        const value = Number(loop)
        return loop < 0 ? Infinity : value
    },

    /**
     * 
     * @param {string} layerPosition 
     * @returns {Container_AnimePicture}
     */
    findContainer(layerPosition){
        switch(layerPosition){
            case "Tilemap":
                return SceneManager._scene._spriteset?._tilemap
            case "Below Weather":
                return SceneManager._scene._spriteset?.belowWeatherSuperPictureContainer
            case "Below Window":
                return SceneManager._scene.belowWindowSuperPictureContainer
            case "Above Window":
                return SceneManager._scene.aboveWindowSuperPictureContainer
            case "Above Everything":
                return SceneManager._scene.topSuperPictureContainer
            default:
                return SceneManager._scene._spriteset?.superPictureContainer
        }
    },

    restoreSuperPictures(){
        for(const id in Plugin.getAllGamePictures()){
            const gamePicture = Plugin.getGamePicture(id)
            const container = Plugin.findContainer(gamePicture.container)

            if(container){
                Plugin.sprites[id] = new Sprite_AnimePicture(gamePicture)
                container.addChild(Plugin.sprites[id])

                if(gamePicture.refreshOnSceneChange){
                    Plugin.sprites[id].bitmap.addLoadListener(Plugin.sprites[id].start.bind(Plugin.sprites[id]))

                }else{
                    Plugin.sprites[id].visible = true
                }
                
            }
        }
    }
}

const Plugin = Eli.PictureManager
const Alias = Eli.PictureManager.alias

Plugin.initialize()


/* --------------------------------- TILEMAP -------------------------------- */
Tilemap.CombinedLayer.prototype.getGamePicture = function(){
    return {id: null}
}

/* --------------------------------- SPRITE --------------------------------- */
Sprite.prototype.getGamePicture = function(){
    return {id: null}
}

/* -------------------------------- SAVE DATA ------------------------------- */
Alias.Eli_SavedContents_initialize = Eli_SavedContents.prototype.initialize
Eli_SavedContents.prototype.initialize = function() {
    Alias.Eli_SavedContents_initialize.call(this)
    this.superPictures = {}
}

/* ------------------------------- SCENE BASE ------------------------------- */
Scene_Base.prototype.createBelowWindowSuperPictureContainer = function(){
    this.belowWindowSuperPictureContainer = new Container_AnimePicture()
    this.addChild(this.belowWindowSuperPictureContainer)
}

Scene_Base.prototype.createAboveWindowSuperPictureContainer = function(){

    this.aboveWindowSuperPictureContainer = new Container_AnimePicture()
    this.addChild(this.aboveWindowSuperPictureContainer)
}

Alias.Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer
Scene_Base.prototype.createWindowLayer = function() {
    this.createBelowWindowSuperPictureContainer()
    Alias.Scene_Base_createWindowLayer.call(this)
    this.createAboveWindowSuperPictureContainer()
}

/* -------------------------------- SCENE MAP ------------------------------- */
Alias.Scene_Map_create = Scene_Map.prototype.create
Scene_Map.prototype.create = function() {
    Plugin.holdInterpreterIds = []
    Plugin.sprites = []
    Alias.Scene_Map_create.call(this)
    this.topSuperPictureContainer = new Container_AnimePicture()
}

Alias.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects
Scene_Map.prototype.createDisplayObjects = function(){
    Alias.Scene_Map_createDisplayObjects.call(this)
    Plugin.restoreSuperPictures()
}

Alias.Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed
Scene_Map.prototype.isAnyButtonPressed = function() {
    return Alias.Scene_Map_isAnyButtonPressed.call(this) || Plugin.clearDestination
}

Alias.Scene_Map_start = Scene_Map.prototype.start
Scene_Map.prototype.start = function() {
    
    Alias.Scene_Map_start.call(this)
    this.addChild(this.topSuperPictureContainer)
}

/* ------------------------------ SCENE BATTLE ------------------------------ */
Alias.Scene_Battle_create = Scene_Battle.prototype.create
Scene_Battle.prototype.create = function() {
    Alias.Scene_Battle_create.call(this)
    this.topSuperPictureContainer = new Container_AnimePicture()
}

Alias.Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects
Scene_Battle.prototype.createDisplayObjects = function(){
    Alias.Scene_Battle_createDisplayObjects.call(this)
    Plugin.restoreSuperPictures()
}

Alias.Scene_Battle_start = Scene_Battle.prototype.start
Scene_Battle.prototype.start = function() {
    Alias.Scene_Battle_start.call(this)
    this.addChild(this.topSuperPictureContainer)
}

/* ----------------------------- SPRITESET BASE ----------------------------- */
Alias.Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer
Spriteset_Base.prototype.createUpperLayer = function() {
    this.createSuperPictureContainer()
    Alias.Spriteset_Base_createUpperLayer.call(this)
}

Spriteset_Base.prototype.createSuperPictureContainer = function() {
    this.superPictureContainer = new Container_AnimePicture()
    this.addChild(this.superPictureContainer)
}

/* ------------------------------ SPRITESET MAP ----------------------------- */
Spriteset_Map.prototype.createBelowWeatherSuperPictureContainer = function() {
    this.belowWeatherSuperPictureContainer = new Container_AnimePicture()
    this.addChild(this.belowWeatherSuperPictureContainer)
}

Alias.Spriteset_Map_createWeather = Spriteset_Map.prototype.createWeather
Spriteset_Map.prototype.createWeather = function() {
    this.createBelowWeatherSuperPictureContainer()
    Alias.Spriteset_Map_createWeather.call(this)
}

/* ---------------------------- GAME COMMON EVENT --------------------------- */
Alias.Game_CommonEvent_isActive = Game_CommonEvent.prototype.isActive
Game_CommonEvent.prototype.isActive = function() {
    return Plugin.commonEventIds[this._commonEventId] || Alias.Game_CommonEvent_isActive.call(this)
}

/* ---------------------------- GAME_INTERPRETER ---------------------------- */
Alias.Game_Interpreter_initialize = Game_Interpreter.prototype.initialize
Game_Interpreter.prototype.initialize = function(){
    Alias.Game_Interpreter_initialize.call(this)
    this.superPictureId = undefined
}

Alias.Game_Interpreter_updateWait = Game_Interpreter.prototype.updateWait
Game_Interpreter.prototype.updateWait = function() {
    return Alias.Game_Interpreter_updateWait.call(this) || Plugin.isHoldingInterpreter()
}

Alias.Game_Interpreter_onCommonEventEnd = Game_Interpreter.prototype.onCommonEventEnd
Game_Interpreter.prototype.onCommonEventEnd = function(){
    Alias.Game_Interpreter_onCommonEventEnd.call(this)
    if(this.isAnimePictureCommonEvent()){
        this.endAnimePictureCommonEvent()
    }
}

Game_Interpreter.prototype.isAnimePictureCommonEvent = function(){
    return Plugin.commonEventIds[this._commonEventId]
}

Game_Interpreter.prototype.endAnimePictureCommonEvent = function(){
    const id = this._commonEventId
    const index = $gameMap._commonEvents.findIndex(item => item._commonEventId === id)
    $gameMap._commonEvents.splice(index, 1)
    Plugin.commonEventIds[this._commonEventId] = false 
}

/* --------------------------- SUPER GAME PICTURE --------------------------- */
/**
 * 
 * @param {*} basicMembers 
 * @param {*} animeProps 
 * @param {*} mask 
 */
Game_AnimePicture.prototype.initialize = function(basicMembers, animeProps, mask){
    this.initBasicMembers(basicMembers)
    this.initAnimeProps(animeProps)
    this.initMask(mask)
    this.initCurrentMembers()
    this.initSpecialMembers()
}

Game_AnimePicture.prototype.initBasicMembers = function(data){
    this.id = data.id
    this.frontFilename = data.filename
    this.backFilename = data.backFilename || ""
    this.easing = data.easing
    this.duration = data.duration
    this.anchor = data.anchor
    this.blendMode = data.blendMode
    this.fixedPosition = data.fixedPosition
    this.refreshOnSceneChange = data.refreshOnSceneChange
    this.hoverCommonEventId = data.hoverCommonEventId
    this.clickCommonEventId = data.clickCommonEventId
    this.unhoverCommonEventId = data.unhoverCommonEventId
    this.positionPreset = data.positionPreset
    this.container = data.container
    this.zIndex = data.zIndex
    this.relativeObject = data.relativeObject
    this.animeRunning = true
}

Game_AnimePicture.prototype.initAnimeProps = function(animeProps){
    this.animeProps = animeProps
}

Game_AnimePicture.prototype.initMask = function(mask){
    this.mask = mask
}

Game_AnimePicture.prototype.initCurrentMembers = function(){
    this.x = -1000
    this.y = -1000
    this.alpha = 1
    this.scaleX = 1
    this.scaleY = 1
    this.skewX = 0
    this.skewY = 0
    this.angle = 0
    this.rotationSpeed = 0
    this.toneRed = 0
    this.toneGreen = 0
    this.toneBlue = 0
    this.toneGray = 0
    this.blendRed = 0
    this.blendGreen = 0
    this.blendBlue = 0
    this.blendAlpha = 0
    this.hue = 0
}

Game_AnimePicture.prototype.initSpecialMembers = function(){
    this.initBreathEffect()
    this.initFloatEffect()
    this.initShakeEffect()
    this.initCardEffect()
}

Game_AnimePicture.prototype.initBreathEffect = function(){
    this.breath = {
        enable: false,
        powerDirection: 0,
        power: 0,
        maxValue: 0,
        value: 0,
        horizontal: false,
        vertical: false,
    }
}

Game_AnimePicture.prototype.initFloatEffect = function(){
    this.float = {
        enable: false,
        powerDirection: 0,
        y: 0,
        maxY: 0,
        power: 0,
    }
}

Game_AnimePicture.prototype.initShakeEffect = function(){
    this.shake = {
        duration: 0,
        power: 0,
        horizontal: false,
        vertical: false,
    }
}

Game_AnimePicture.prototype.initCardEffect = function(){
    this.card = {
        enable: false,
        flipType: "horizontal"
    }
}

Game_AnimePicture.prototype.setBreathEffect = function(power, maxValue, horizontal, vertical){
    this.breath.powerDirection = 0
    this.breath.value = 0
    this.breath.power = power
    this.breath.maxValue = maxValue
    this.breath.horizontal = horizontal
    this.breath.vertical = vertical
    this.enableBreathEffect(true)
}

Game_AnimePicture.prototype.enableBreathEffect = function(enable){
    this.breath.enable = enable
}

Game_AnimePicture.prototype.setFloatEffect = function(power, maxY){
    this.float.powerDirection = 0
    this.float.y = 0
    this.float.power = power
    this.float.maxY = maxY
    this.enableFloatEffect(true)
}

Game_AnimePicture.prototype.enableFloatEffect = function(enable){
    this.float.enable = enable
}

/**
 * Get all the anime props of the picture.
 * @returns {AnimePropList} Cola
 */
Game_AnimePicture.prototype.getAllAnimeProps = function(){
    return this.animeProps
}

/**
 * 
 * @param {string} propName The name of the property to get: x, y, alpha, scaleX, scaleY, skewX, skewY, angle, rotationSpeed, toneRed, toneGreen, toneBlue, toneGray, blendRed, blendGreen, blendBlue, blendAlpha, hue 
 * @returns {AnimeProp} The anime data of a property.
 */
Game_AnimePicture.prototype.getAnimeProp = function(propName){
    return this.getAllAnimeProps()[propName]
}

/**
 * 
 * @param {string} propName The name of the property you want to change.
 * @param {AnimeProp} propData The data that will be set into the anime property.
 */
Game_AnimePicture.prototype.setAnimeProp = function(propName, propData){
    this.getAllAnimeProps()[propName] = propData
}

/**
 * 
 * @param {number} power 
 * @param {number} duration 
 * @param {boolean} horizontal 
 * @param {boolean} vertical 
 */
Game_AnimePicture.prototype.startShake = function(power, duration, horizontal, vertical){
    this.shake.power = power
    this.shake.duration = duration
    this.shake.horizontal = horizontal
    this.shake.vertical = vertical
}

Game_AnimePicture.prototype.reverseAnimePropValues = function(){
    for(const prop in this.animeProps){
        this.getAnimeProp(prop).value.reverse()
    }
}

}