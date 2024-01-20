// TODO: test woith MV!
/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Rosedale Transition Effects : Version - 1.0.0 | Adds unique transition effects based on noise masks.
*
* @url http://rosedale-studios.com
*
* @help
* ╔════════════════════════════════════╗
* ║ ()()                                                              ()() ║
* ║ (^.^)                    - Rosedale Studios -                    (^.^) ║
* ║c(")(")                                                          (")(")ↄ║
* ╚════════════════════════════════════╝

*============================================================================
*  Requirements :
*============================================================================

*============================================================================
*  Instructions :
*============================================================================
*
*   This plugins allows you to create transition effects that are similar to
* rpg maker XP/VX, battle transitions, however these transitions can be
* applied to anything from the player, battlers, events, actors, pictures,
* and even the entire screen itself! You can even use them for battle
* transitions just like in RPG Maker XP/VX, but that's not it, you can
* also set them as collapse effects for bosses/enemies! This plugin also
* adds the extra feature of colorizing the edges as the picture transitions!
* This cam be used to simulate a page burning for example.
*
*   This plugin works off of transition images/masks. You can easily find lots
* of transition effects in rpg maker forums by searching for battle transition
* resources, one such example is the works of mitchi.exe, from omegadev forums,
* which can be found at the link below.
*
* https://omegadev.forumotion.com/t504-mitchi-s-transition-resources
*
*   These images MUST be placed in the img/system folder! This is the only
* location that transition masks can be loaded from! After placing the images
* in the system folder, you can setup transition effects in the plugin manager.
* You can also play transitions via plugin command on specific things via
* plugin command.
*
*   Below is a list of plugin commands this is largely used for MV users,
* however it may contain some useful information for MZ users as well.
* please be aware there is an optional paramter for transitions called
* "wait" this parameter can be added to any of the below plugin commands
* to make the event wait for the transition to be completed before
* it processes anything else. You can see this in the "Examples" of the
* below plugin commands!
*
*
*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ screen_transition name N type T            ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Perform a transition on the screen itself. ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ N: the name of the transition effect to play on the target           ║
*  ║ "battle_transition", "collapse" and "boss_collapse" are also         ║
*  ║ acceptable.                                                          ║
*  ║                                                                      ║
*  ║ T: Only "fade_in" or "fade_out" are accepted                         ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ screen_transition target 0 name transition_01 type fade_in wait true ║
*  ╚═══════════════════════════════════╝
*
*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ character_transition target I name N type T║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Perform a transition on a character.       ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ I: replace I with the id of the event( 0 for player, -1 and below    ║
*  ║ for followers, 1 or higher for events ), to play a transition on.    ║
*  ║                                                                      ║
*  ║ N: the name of the transition effect to play on the target           ║
*  ║ "battle_transition", "collapse" and "boss_collapse" are also         ║
*  ║ acceptable.                                                          ║
*  ║                                                                      ║
*  ║ T: Only "fade_in" or "fade_out" are accepted                         ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ character_transition target 0 name collapse type fade_in wait false  ║
*  ║ character_transition target 13 name my_transition type fade_out      ║
*  ║ character_transition target -3 name collapse type fade_out wait true ║
*  ╚═══════════════════════════════════╝
*
*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ actor_transition target I name N type T    ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Perform a transition on an actor.          ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ I: replace I with the id of the actor in the party                   ║
*  ║ to play a transition on.                                             ║
*  ║                                                                      ║
*  ║ N: the name of the transition effect to play on the target           ║
*  ║ "battle_transition", "collapse" and "boss_collapse" are also         ║
*  ║ acceptable.                                                          ║
*  ║                                                                      ║
*  ║ T: Only "fade_in" or "fade_out" are accepted                         ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ actor_transition target 2 name collapse type fade_in                 ║
*  ║ actor_transition target 1 name custom_transition type fade_out       ║
*  ║ actor_transition target 3 name collapse type fade_out wait true      ║
*  ╚═══════════════════════════════════╝
*
*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ enemy_transition target I name N type T    ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Perform a transition on an actor.          ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ I: replace I with the id of the enemy in the troop                   ║
*  ║ to play a transition on.                                             ║
*  ║                                                                      ║
*  ║ N: the name of the transition effect to play on the target           ║
*  ║ "battle_transition", "collapse" and "boss_collapse" are also         ║
*  ║ acceptable.                                                          ║
*  ║                                                                      ║
*  ║ T: Only "fade_in" or "fade_out" are accepted                         ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ enemy_transition target 2 name collapse type fade_in                 ║
*  ║ enemy_transition target 1 name boss_collapse type fade_out wait true ║
*  ╚═══════════════════════════════════╝
*
*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ picture_transition target I name N type T  ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Perform a transition on a picture.         ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ I: replace I with the id of the picture to play a transition on.     ║
*  ║                                                                      ║
*  ║ N: the name of the transition effect to play on the target           ║
*  ║ "battle_transition", "collapse" and "boss_collapse" are also         ║
*  ║ acceptable.                                                          ║
*  ║                                                                      ║
*  ║ T: Only "fade_in" or "fade_out" are accepted                         ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ picture_transition target 2 name collapse type fade_in wait true     ║
*  ║ picture_transition target 1 name boss_collapse fade_out fade_out     ║
*  ╚═══════════════════════════════════╝

*============================================================================
*  Terms Of Use :
*============================================================================
*
*   This Plugin may be used commercially, or non commercially. This plugin may
*  be extended upon. This plugin may NOT be shared, or passed to others
*  who have not purchased this product.
*
*============================================================================
*  Version History :
*============================================================================

*  ● Version : 1.0.0
*  ● Date : 05/08/2023
*    ★ Release.

*============================================================================
*  Contact Me :
*============================================================================

*  If you have questions, about this plugin, or commissioning me, or have
*  a bug to report, please feel free to contact me by any of the below
*  methods.

*  website : https://www.rosedale-studios.com
*  rmw : https://forums.rpgmakerweb.com/index.php?members/chaucer.44456
*  youtube : https://www.youtube.com/channel/UCYA4VU5izmbQvnjMINssshQ/videos
*  email : chaucer(at)rosedale-studios(dot)com
*  discord : https://discord.gg/nexQGb65uP

*============================================================================

* @command screen_transition
* @text Screen Transition
* @desc Perform a transition on the screen.

* @arg name
* @text Name
* @desc The name of the transition to play.
* @default
* @type text

* @arg type
* @text Type
* @desc Will the transition be fading in, or fading out.
* @default fade_out
* @type select

* @option fade_out
* @option fade_in

* @arg wait
* @text Wait for Completion
* @desc Should the event wait for the transition effect to complete before proceeding.
* @default true
* @type boolean

* @command character_transition
* @text Character Transition
* @desc Perform a transition effect on a specific character on the map.

* @arg target
* @text Character ID
* @desc The ID of the event( 0 for player, -1 and below for followers ), to perform the animation on.
* @default 0
* @type number
* @min -10
* @max 10000

* @arg name
* @text Name
* @desc The name of the animation effect to play.
* @default
* @type text

* @arg type
* @text Type
* @desc Will the transition be fading in, or fading out.
* @default fade_out
* @type select

* @option fade_out
* @option fade_in

* @arg wait
* @text Wait for Completion
* @desc Should the event wait for the transition effect to complete before proceeding.
* @default true
* @type boolean

* @command enemy_transition
* @text Enemy Transition
* @desc Perform a transition effect on a specific enemy in battle.

* @arg target
* @text Enemy Troop ID
* @desc The ID of the enemy in the troop, to perform the animation on.
* @default 1
* @type number
* @min 1
* @max 100

* @arg name
* @text Name
* @desc The name of the animation effect to play.
* @default
* @type text

* @arg type
* @text Type
* @desc Will the transition be fading in, or fading out.
* @default fade_out
* @type select

* @option fade_out
* @option fade_in

* @arg wait
* @text Wait for Completion
* @desc Should the event wait for the transition effect to complete before proceeding.
* @default true
* @type boolean

* @command actor_transition
* @text Actor Transition
* @desc Perform a transition effect on a specific party member in battle.

* @arg target
* @text Party Member ID
* @desc The ID of the enemy in the troop, to perform the animation on.
* @default 1
* @type number
* @min 1
* @max 100

* @arg name
* @text Name
* @desc The name of the animation effect to play.
* @default
* @type text

* @arg type
* @text Type
* @desc Will the transition be fading in, or fading out.
* @default fade_out
* @type select

* @option fade_out
* @option fade_in

* @arg wait
* @text Wait for Completion
* @desc Should the event wait for the transition effect to complete before proceeding.
* @default true
* @type boolean

* @command picture_transition
* @text Picture Transition
* @desc Perform a transition effect on a specific picture.

* @arg target
* @text Picture ID
* @desc The ID of the picture, to perform the animation on.
* @default 1
* @type number
* @min 1
* @max 100

* @arg name
* @text Name
* @desc The name of the animation effect to play.
* @default
* @type text

* @arg type
* @text Type
* @desc Will the transition be fading in, or fading out.
* @default fade_out
* @type select

* @option fade_out
* @option fade_in

* @arg wait
* @text Wait for Completion
* @desc Should the event wait for the transition effect to complete before proceeding.
* @default true
* @type boolean

* @param battleTransition
* @text Battle Transition
* @desc The transition used when transferring to battle.
* @default {"mask":"","color":"{\"r\":\"0.00\",\"g\":\"0.00\",\"b\":\"0.00\"}","speed":"0.01"}
* @type struct<Transition>

* @param collapse
* @text Colapse Effect
* @desc The transition used for the collapse effect.
* @default {"mask":"","seIn":"{\"name\":\"\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","seOut":"{\"name\":\"Autodoor\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","color":"{\"r\":\"0.00\",\"g\":\"0.00\",\"b\":\"0.00\"}","speed":"0.01"}
* @type struct<Transition>

* @param bossCollapse
* @text Boss Collapse Effect
* @desc The transition used for the boss collapse effect.
* @default {"mask":"","seIn":"{\"name\":\"\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","seOut":"{\"name\":\"Autodoor\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","color":"{\"r\":\"0.00\",\"g\":\"0.00\",\"b\":\"0.00\"}","speed":"0.01"}
* @type struct<Transition>

* @param customTransitions
* @text Custom Transitions
* @desc This is a list of custom transitions that can easily be applied to pictures, characters, or battlers.
* @default []
* @type struct<CustomTransition>[]

*/

/*~struct~CustomTransition:

* @param name
* @text Name
* @desc The name of the transition, this will be used in plugin commands to add a filter to a sprite.
* @default
* @type text

* @param mask
* @text Transition Mask
* @desc The image used as a mask for the transition effect.
* @default
* @type file
* @dir img/system/

* @param seIn
* @text Fade In Sound Effect
* @desc The sound effect that will play when the transition is fading in.
* @default {"name":"","volume":"90","pitch":"100","pan":"0"}
* @type struct<Audio>

* @param seOut
* @text Fade Out Sound Effect
* @desc The sound effect that will play when fading.
* @default {"name":"","volume":"90","pitch":"100","pan":"0"}
* @type struct<Audio>

* @param color
* @text Edge Color
* @desc The color that will be used as the transition occurs.
* @default {"r":"0.00","g":"0.00","b":"0.00"}
* @type struct<Color>

* @param speed
* @text How fast the transitin will occur.
* @desc Description.
* @default 0.0100
* @type number
* @min 0.0001
* @max 1.0000
* @decimals 4

*/

/*~struct~Transition:

* @param mask
* @text Transition Mask
* @desc The image used as a mask for the transition effect.
* @default
* @type file
* @dir img/system/

* @param seIn
* @text Fade In Sound Effect
* @desc The sound effect that will play when the transition is fading in.
* @default {"name":"","volume":"90","pitch":"100","pan":"0"}
* @type struct<Audio>

* @param seOut
* @text Fade Out Sound Effect
* @desc The sound effect that will play when fading.
* @default {"name":"","volume":"90","pitch":"100","pan":"0"}
* @type struct<Audio>

* @param color
* @text Edge Color
* @desc The color that will be used as the transition occurs.
* @default {"r":"0.00","g":"0.00","b":"0.00"}
* @type struct<Color>

* @param speed
* @text How fast the transitin will occur.
* @desc Description.
* @default 0.0100
* @type number
* @min 0.0001
* @max 1.0000
* @decimals 4

*/

/*~struct~Audio:

* @param name
* @text Name
* @desc The name of the audio file.
* @default
* @type file
* @dir audio/se/
* @require 1

* @param volume
* @text Volume
* @desc The volume level of the sound effect.
* @default 90
* @type number
* @min 0
* @max 100

* @param pitch
* @text Pitch
* @desc The pitch level f the sound effect.
* @default 100
* @type number
* @min 50
* @max 150

* @param pan
* @text Pan
* @desc The pan of the audio file.
* @default 0
* @type number
* @min -100
* @max 100

*/

/*~struct~Color:

* @param r
* @text Red
* @desc The amount of red in the transtion.
* @default 0.00
* @type number
* @min 0.00
* @max 1.00
* @decimals 2

* @param g
* @text Green
* @desc The amount of green in the transtion.
* @default 0.00
* @type number
* @min 0.00
* @max 1.00
* @decimals 2

* @param b
* @text Blue
* @desc The amount of blue in the transtion.
* @default 0.00
* @type number
* @min 0.00
* @max 1.00
* @decimals 2

*/

//=============================================================================
  var Imported = Imported || {};
  Imported['Rosedale Transition Effects'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.rte = {};
//=============================================================================

//=============================================================================
// Transition Filter :
//=============================================================================

//=============================================================================
class Filter_Transition extends PIXI.Filter
{ // Filter_Transition

//=============================================================================
  static get vertexSrc()
  { // return the vertex shader source.
//=============================================================================

    if ( Utils.RPGMAKER_NAME == 'MZ' ) {
      return `
      precision highp float;

      attribute vec2 aVertexPosition;

      uniform mat3 projectionMatrix;
      uniform mat3 maskMatrix;

      varying vec2 vTextureCoord;
      varying vec2 vFilterCoord;

      uniform vec4 inputSize;
      uniform vec4 outputFrame;

      vec4 filterVertexPosition( void )
      {
          vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

          return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
      }

      vec2 filterTextureCoord( void )
      {
          return aVertexPosition * (outputFrame.zw * inputSize.zw);
      }

      void main(void)
      {
          gl_Position = filterVertexPosition();
          vTextureCoord = filterTextureCoord();
          vFilterCoord = ( maskMatrix * vec3( vTextureCoord, 1.0)  ).xy;
      }
`
    }
    return `
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat3 projectionMatrix;
    uniform mat3 maskMatrix;
    varying vec2 vTextureCoord;
    varying vec2 vFilterCoord;

    //=========================================================================
    void main( void )
    { // main.
    //=========================================================================
      gl_Position = vec4( ( projectionMatrix * vec3(aVertexPosition, 1 ) ).xy, 0.0, 1.0 );
      vTextureCoord = aTextureCoord;
      vFilterCoord = ( maskMatrix * vec3( vTextureCoord, 1.0)  ).xy;
    }
    `

  }

//=============================================================================
  static get fragmentSrc()
  { // return the fragment shader source.
//=============================================================================

    return `
    precision mediump float;

    varying vec2 vTextureCoord;
    varying vec2 vFilterCoord;

    uniform sampler2D uSampler;
    uniform vec2 maskDimensions;
    uniform vec2 dimensions;
    uniform vec4 filterArea;
    uniform sampler2D mask;
    uniform float threshold;
    uniform float value;
    uniform vec4 color;

    //=========================================================================
    void main( void )
    { // main.
    //=========================================================================

      if ( value >= 1.0 ) {
        gl_FragColor = texture2D( uSampler, vTextureCoord );

      } else if ( value <= 0.0 ) {
        gl_FragColor = vec4( 0.0, 0.0, 0.0, 0.0 );

      } else {

        vec2 coord = vFilterCoord * maskDimensions / dimensions;
        vec4 noise = texture2D( mask, coord );
        float saturation = ( ( 2.0 * value + noise.r ) - 1.0 ) * threshold;

        gl_FragColor = texture2D( uSampler, vTextureCoord );
        float orgAlpha = gl_FragColor.a;
        gl_FragColor *= min( 1.0, saturation );

        if ( gl_FragColor.a > 0.05  ) {
          float power = 1.0 - abs( 0.5 - ( gl_FragColor.a / orgAlpha ) ) * 2.0;
          gl_FragColor.rgb += ( color * power ).rgb;
        }

      }

    }
    `

  }

//=============================================================================
  static uniforms( bitmap, color )
  { // return the uniforms for this shader.
//=============================================================================


    const threshold = 8.0;

    if ( Utils.RPGMAKER_NAME == 'MV' ) {
      return {
        mask: { type: 'sampler2D', value: new PIXI.Texture( bitmap.baseTexture ) },
        maskDimensions: { type: 'v2', value: [Graphics.width, Graphics.height] },
        dimensions: { type: 'v2', value: [Graphics.width, Graphics.height] },
        color: { type: 'v4', value: [color.r, color.g, color.b, color.a] },
        maskMatrix: { type: 'm3', value: new PIXI.Matrix() },
        threshold: { type: 'f', value: threshold },
        value: { type: 'f', value: 1.0 },
      };

    } else {
      return {
        mask: new PIXI.Texture( bitmap.baseTexture ),
        maskDimensions: new Float32Array( [Graphics.width, Graphics.height] ),
        dimensions: new Float32Array( [Graphics.width, Graphics.height] ),
        color: new Float32Array( [color.r, color.g, color.b, color.a] ),
        maskMatrix: new PIXI.Matrix(),
        threshold: threshold,
        value: 1.0,
      };

    }

  }

//=============================================================================
  static getMinMaxValues( mask )
  { // Definition.
//=============================================================================

    const renderer = Utils.RPGMAKER_NAME == 'MZ' ?
      Graphics._app.renderer : Graphics._renderer;

    const pixels = mask.context.getImageData( 0, 0, mask.width, mask.height ).data;

    let min = 255;
    let max = 0;

    for ( let i = 0, l = pixels.length; i < l; i += 4 ) {
      if ( pixels[i + 1] > max ) max = pixels[i + 1];
      if ( pixels[i + 1] < min ) min = pixels[i + 1];
    };

    min = ( min ).clamp( 0, 255 );
    max = ( max + 20 ).clamp( 0, 255 )
    return [min / 255, max / 255];

  }

//=============================================================================
  static preload()
  { // preload all mask images.
//=============================================================================

    ImageManager.loadSystem( Chaucer.rte.params.battleTransition.mask )
    ImageManager.loadSystem( Chaucer.rte.params.bossCollapse.mask )
    ImageManager.loadSystem( Chaucer.rte.params.collapse.mask )

    const custom = Chaucer.rte.params.customTransitions;

    for ( let i = 0, l = custom.length; i < l; i++ ) {
      ImageManager.loadSystem( custom[i].mask );
    };


  }

//=============================================================================
  constructor( data )
  { // Called on object creation.
//=============================================================================

    const { vertexSrc, fragmentSrc, uniforms } = Filter_Transition;
    const { color, mask, speed } = data;
    const bitmap = ImageManager.loadSystem( mask );
    super( vertexSrc, fragmentSrc, uniforms( bitmap, color ) );
    this._maskMatrix = new PIXI.Matrix();
    this._mask = new Sprite( bitmap );
    this._data = data;
    this.setSpeed( speed );
    this._status = '';
    this.padding = 0;
    this.min = 0;
    this.max = 1;
    bitmap.addLoadListener( function() {
      const [ min, max ] = Filter_Transition.getMinMaxValues( bitmap );
      this.uniforms.maskDimensions[0] = bitmap.width;
      this.uniforms.maskDimensions[1] = bitmap.height;
      this.min = min;
      this.max = max - 0.3;
      this._speed *= ( max - min );
    }.bind( this ) );

  }

//=============================================================================
// DEFINE VARIABLES HERE :
//=============================================================================
  get value() { return this.uniforms.value; };
  set value( value ) { this.uniforms.value = value; };
//=============================================================================

//=============================================================================
  start()
  { // start the transition effect.
//=============================================================================

    this._started = true;

  }

//=============================================================================
  stop()
  { // stop the transition effect.
//=============================================================================

    this._started = false;

  }

//=============================================================================
  reset()
  { // reset the filter.
//=============================================================================

    this.uniforms.value = 1.0;

  }

//=============================================================================
  fadeIn()
  { // start the fade in effect.
//=============================================================================

    if ( !this.isBusy() ) {
      this._status = 'fadein';
      AudioManager.playSe( this._data.seIn );
      this.uniforms.value = 0.0;
      this.start();

    }

  }

//=============================================================================
  fadeOut()
  { // start the fade out effect.
//=============================================================================

    if ( !this.isBusy() ) {
      this._status = 'fadeout';
      AudioManager.playSe( this._data.seOut );
      this.uniforms.value = 1.0;
      this.start();

    }

  }

//=============================================================================
  isBusy()
  { // return if the filter is busy.
//=============================================================================

    return !!this._status;

  }

//=============================================================================
  apply( filterManager, input, output, clearMode, _currentState )
  { // write a new apply method.
//=============================================================================

    if ( this.uniforms.maskMatrix ) {
      this.uniforms.maskMatrix = filterManager.calculateSpriteMatrix( this._maskMatrix, this._mask ).toArray();
    }
    if ( this.uniforms.dimensions ) {
      const frame = input.filterFrame || input.sourceFrame;
      this.uniforms.dimensions[0] = frame.width;
      this.uniforms.dimensions[1] = frame.height;
    }

    filterManager﻿.applyFilter( this, input, output, clearMode, _currentState );

  }

//=============================================================================
  setSpeed( value )
  { // set the speed.
//=============================================================================

    this._speed = value;

  }

//=============================================================================
  update()
  { // update the filter.
//=============================================================================

    if ( this._status === 'fadein' ) this.updateFadeIn();
    if ( this._status === 'fadeout' ) this.updateFadeOut();
    if ( !this.isBusy() ) this.stop();


  }

//=============================================================================
  updateFadeIn()
  { // update the fade in of the filter.()
//=============================================================================

    this.value = ( this.value + this._speed ).clamp( this.min, this.max );
    if ( this.value === this.max ) this._status = '';

  }

//=============================================================================
  updateFadeOut()
  { // update fade in.
//=============================================================================

    this.value = ( this.value - this._speed ).clamp( this.min, this.max );
    if ( this.value === this.min ) this._status = '';

  }

}

//=============================================================================
window.Filter_Transition = Filter_Transition;
//=============================================================================

( function ( $ ) { // CONFIG:


//=============================================================================
// Create functions specific for my code if it does not already exist!
// WARNING: DO NOT EDIT BELOW THIS LINE!!!
//=============================================================================

//-----------------------------------------------------------------------------
  Chaucer.parseArgs = Chaucer.parseArgs || function ( args )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

    const obj = {};
    for ( var i = 0, l = args.length; i < l; i += 2 ) {
      obj[args[i]] = args[i + 1];
    }

    return obj;

  };

//-----------------------------------------------------------------------------
    Chaucer.compareVersion = Chaucer.compareVersion || function ( current, target )
    { // compare the current version with the target version.
//-----------------------------------------------------------------------------

      const v1 = current.split( '.' );
      const v2 = target.split( '.' );
      for ( let i = 0, l = v1.length; i < l; i++ ) {
        if ( v1[i] < v2[i] ) return -1; // version is lower!
        if ( v1[i] > v2[i] ) return 1; // version is higher!
      }
      return 0; // same version!

    };

//-----------------------------------------------------------------------------
    Chaucer.parse = Chaucer.parse || function( data )
    { // recursively parse any data passed in.
//-----------------------------------------------------------------------------
      try {
        data = JSON.parse( data );

      } catch ( err ) {
        data = data;

      } finally {

        if ( typeof data === 'object' ) {

          for ( const key in data ) {
            data[key] = Chaucer.parse( data[key] );
          };

        };

      };

      return data;

    };

//-----------------------------------------------------------------------------
    $.makePluginInfo = function ( $, n )
    { // Create plugin info for the object provided.
//-----------------------------------------------------------------------------

      for ( var i = 0, l = $plugins.length; i < l; i++ ) {

        if ( !$plugins[i].description.match( n ) ) continue;

        $.author = 'Chaucer';
        $.name = RegExp.$1;
        $.version = RegExp.$2;
        $.pluginName = $plugins[i].name;
        $.params = Chaucer.parse( $plugins[i].parameters );
        $.commands = {};
        $.alias = {};

        Filter_Transition.preload();

      };

    };

  //============================================================================
    //Create plugin information.
  //============================================================================

    const identifier =  /(Rosedale Transition Effects) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Rosedale Transition Effects was unable to load! Please revert any changes back to normal!';


    $.makePluginInfo( $, identifier );

    if ( !$.name ) throw new Error( $._nameError );

//=============================================================================

//-----------------------------------------------------------------------------
  $.registerPluginCommand = function ( command, fn )
  { // compare the current version with the target version.
//-----------------------------------------------------------------------------

  if ( Utils.RPGMAKER_NAME === 'MV' )
    $.commands[command] = fn;

  else if ( Utils.RPGMAKER_NAME === 'MZ' )
    PluginManager.registerCommand( $.pluginName, command, fn );

  };

 //-----------------------------------------------------------------------------
  $.alias = function ( className, method, fn, isStatic )
  { // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

    let key = `${className.name}.${( isStatic ? '' : 'prototype.' ) + method}`;
    let object = ( isStatic ? className : className.prototype );

    if ( $.alias[key] ) throw new Error( `${key} already aliased!` );

    $.alias[key] = object[method];

    let fnString = fn.toString();
    let instances = fnString.match( /\$.alias\((.*?)\)/g ) || [];

    for ( let i = 0, len = instances.length; i < len; i++ ) {

      let old = instances[i];
      let args = ['this'].concat( old.match( /\((.*?)\)/ )[1].split( ',' ) );
      args = args.filter( n => !!n );
      let next = `$.alias["${key}"].call(` + args.join( ',' ) + ')';

      fnString = fnString.replace( old, next );

    }

    eval( `${key} = ` + fnString );

  };

//-----------------------------------------------------------------------------
  $.expand = function ( className, method, fn, isStatic )
  { // use this method to quickly alias a method of a particular class.
//-----------------------------------------------------------------------------

    const obj = isStatic ? className : className.prototype;
    obj[method] = fn;

  };

//=============================================================================
  // MV SPECIFIC CODE :
//=============================================================================

    if ( Utils.RPGMAKER_NAME === 'MV' ) {

  //-----------------------------------------------------------------------------
    $.alias( Game_Interpreter, 'pluginCommand', function( command, args ) {
  //-----------------------------------------------------------------------------

        $.alias( command, args );

        command = command.toLowerCase();
        if ( $.commands[command] ) {
          $.commands[command].call( this, Chaucer.parseArgs( args ) );
        }

      } );

    }

//=============================================================================
// ALIASED CODE BELOW THIS LINE!
//=============================================================================

//=============================================================================
// Scene_Base :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Scene_Base, 'isTransitionValid', function( data )
  { // return if the transitin filter data is valid.
//-----------------------------------------------------------------------------

    return data && !!data.mask;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_Base, 'removeTransitionFilter', function()
  { // remove the current transition filter effect.
//-----------------------------------------------------------------------------

    if ( Utils.RPGMAKER_NAME == 'MV' ) {
      const index = this._filters.indexOf( this._transitionFilter );
      this._filters.splice( index, 1 );

    } else {
      this.filters.remove( this._transitionFilter );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_Base, 'createTransitionFilter', function( data )
  { // create transition filter based on the data provided.
//-----------------------------------------------------------------------------

    if ( this.isTransitionValid( data ) ) {
      const bitmap = ImageManager.loadSystem( data.mask );
      if ( this._transitionFilter ) this.removeTransitionFilter();
      bitmap.addLoadListener( function() {
        this._transitionFilter = new Filter_Transition( data );
        this.filters = this.filters || [];
        this.filters = this.filters.concat( [this._transitionFilter] );
      }.bind( this ) );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Scene_Base, 'update', function()
  { // Aliased update of class Scene_Base.
//-----------------------------------------------------------------------------

    $.alias();
    this.updateTransitionFilter();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_Base, 'updateTransitionFilter', function()
  { // update the sprites transition filter if one exists.
//-----------------------------------------------------------------------------

    if ( this._transitionFilter ) {
      this._transitionFilter.uniforms.dimensions[0] = this.width;
      this._transitionFilter.uniforms.dimensions[1] = this.height;
      this._transitionFilter.update();
    }

  }, false );

//=============================================================================
// Scene_Map :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_Map, 'createDisplayObjects', function()
  { // Aliased createDisplayObjects of class Scene_Map.
//-----------------------------------------------------------------------------

    const bitmap = ImageManager.loadSystem( $.params.battleTransition.mask );
    $.alias();

    this.createBattleTransitionFilter();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Scene_Map, 'createBattleTransitionFilter', function()
  { // create filter for battle transitions specifically.
//-----------------------------------------------------------------------------

    const data = $.params.battleTransition

    if ( this.isTransitionValid( data ) ) {
      const bitmap = ImageManager.loadSystem( data.mask );
      bitmap.addLoadListener( function() {
        this._battleTransitionFilter = new Filter_Transition( data );
        this.filters = this.filters || [];
        this.filters = this.filters.concat( [this._battleTransitionFilter] );
      }.bind( this ) );

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Scene_Map, 'startEncounterEffect', function()
  { // Aliased startEncounterEffect of class Scene_Map.
//-----------------------------------------------------------------------------

    $.alias();
    if ( this._battleTransitionFilter ) this._battleTransitionFilter.fadeOut();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Scene_Map, 'updateEncounterEffect', function()
  { // Aliased updateEncounterEffect of class Scene_Map.
//-----------------------------------------------------------------------------

    if ( this._battleTransitionFilter ) {
      if ( !this._battleTransitionFilter.isBusy() ) {
        this._encounterEffectDuration = 0;
        BattleManager.playBattleBgm();

      } else {
        this._battleTransitionFilter.update();

      }

    } else {
      $.alias();

    }

  }, false );

//=============================================================================
// Sprite :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Sprite, 'isTransitionValid', function( data )
  { // return if the transitin filter data is valid.
//-----------------------------------------------------------------------------

    return data && !!data.mask;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite, 'removeTransitionFilter', function()
  { // remove the current transition filter effect.
//-----------------------------------------------------------------------------

    if ( Utils.RPGMAKER_NAME == 'MV' ) {
      const index = this._filters.indexOf( this._transitionFilter );
      this._filters.splice( index, 1 );

    } else {
      this.filters.remove( this._transitionFilter );
    }

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite, 'createTransitionFilter', function( data )
  { // create transition filter based on the data provided.
//-----------------------------------------------------------------------------

    if ( this.isTransitionValid( data ) ) {
      const bitmap = ImageManager.loadSystem( data.mask );
      if ( this._transitionFilter ) this.removeTransitionFilter();
      bitmap.addLoadListener( function() {
        this._transitionFilter = new Filter_Transition( data );
        this.filters = this.filters || [];
        this.filters = this.filters.concat( [this._transitionFilter] );
      }.bind( this ) );
    }

  }, false );
//-----------------------------------------------------------------------------
  $.alias( Sprite, 'update', function()
  { // Aliased update of class Sprite.
//-----------------------------------------------------------------------------

    $.alias();
    this.updateTransitionFilter();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite, 'updateTransitionFilter', function()
  { // update the sprites transition filter if one exists.
//-----------------------------------------------------------------------------

    if ( this._transitionFilter ) {
      this._transitionFilter.uniforms.dimensions[0] = this.width;
      this._transitionFilter.uniforms.dimensions[1] = this.height;
      this._transitionFilter.update();
    }

  }, false );

//=============================================================================
// Sprite_Enemy :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Sprite_Enemy, 'startCollapse', function()
  { // Aliased startCollapse of class Sprite_Enemy.
//-----------------------------------------------------------------------------

    $.alias();
    this.createTransitionFilter( $.params.collapse );
    if ( this._transitionFilter ) this._transitionFilter.fadeOut();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Enemy, 'startBossCollapse', function()
  { // Aliased startBossCollapse of class Sprite_Enemy.
//-----------------------------------------------------------------------------

    $.alias();
    this.createTransitionFilter( $.params.bossCollapse );
    if ( this._transitionFilter ) this._transitionFilter.fadeOut();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Enemy, 'updateCollapse', function()
  { // Aliased updateCollapse of class Sprite_Enemy.
//-----------------------------------------------------------------------------

    if ( this._transitionFilter ) {

      this._effectDuration++;
      if ( !this._transitionFilter.isBusy() ) {
        this._effectDuration = 0;
        this.alpha = 0;
      }
    } else {
      $.alias();

    }

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Enemy, 'updateBossCollapse', function()
  { // Aliased updateCollapse of class Sprite_Enemy.
//-----------------------------------------------------------------------------

    if ( this._transitionFilter ) {

      this._effectDuration++;
      if ( !this._transitionFilter.isBusy() ) {
        this._effectDuration = 0;
        this.alpha = 0;
      }
    } else {
      $.alias();

    }

  }, false );

//=============================================================================
// Scene_Battle :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_Battle, 'initialize', function()
  { // Aliased initialize of class Scene_Battle.
//-----------------------------------------------------------------------------

    $.alias();
    ImageManager.loadSystem( $.params.collapse.mask );
    ImageManager.loadSystem( $.params.bossCollapse.mask );

  }, false );

//=============================================================================
// Game_CharacterBase :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'getSprite', function()
  { // return the sprite that belongs to this character.
//-----------------------------------------------------------------------------

    if ( SceneManager._scene.constructor.name != 'Scene_Map' ) return null;
    const sprites = SceneManager._scene._spriteset._characterSprites;
    if ( sprites ) return sprites.find( s => s._character == this );
    return null;

  }, false );

//=============================================================================
// Game_Actor :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'getSprite', function()
  { // get the actors sprite.
//-----------------------------------------------------------------------------

    if ( SceneManager._scene.constructor.name != 'Scene_Battle' ) return null;
    const sprites = SceneManager._scene._spriteset._actorSprites;
    if ( sprites ) return sprites.find( s => s._battler == this );
    return null;

  }, false );

//=============================================================================
// Game_Enemy
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_Enemy, 'getSprite', function()
  { // return the enemy's sprite.
//-----------------------------------------------------------------------------

    if ( SceneManager._scene.constructor.name != 'Scene_Battle' ) return null;
    const sprites = SceneManager._scene._spriteset._enemySprites;
    if ( sprites ) return sprites.find( s => s._battler == this );
    return null;

  }, false );

//=============================================================================
// Plugin Commands :
//=============================================================================

//-----------------------------------------------------------------------------
  $.transitionFromName = function( name )
  { // register command for character_transition.
//-----------------------------------------------------------------------------

    if ( name == 'battle_transition' ) return $.params.battleTransition;
    if ( name == 'boss_collapse' ) return $.params.bossCollapse;
    if ( name == 'collapse' ) return $.params.collapse;

    return $.params.customTransitions.find( t => t.name == name ) || null;

  };

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'screen_transition', function( args )
  { // register command for screen_transition.
//-----------------------------------------------------------------------------

    const { name, type, wait } = args;
    const sprite = SceneManager._scene;
    const data = $.transitionFromName( name.trim() );

    this.playTransitionOnTarget( sprite, data, type, wait );
  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'character_transition', function( args )
  { // register command for character_transition.
//-----------------------------------------------------------------------------

    const party = [$gamePlayer].concat( $gamePlayer._followers._data );
    const { target, name, type, wait } = args;
    const data = $.transitionFromName( name.trim() );

    let character;

    if ( target > 0 ) character = $gameMap.event( target );
    if ( target <= 0 ) character = party[Math.abs( target )];

    if ( character ) {

      const sprite = character.getSprite();

      if ( sprite ) this.playTransitionOnTarget( sprite, data, type, wait );

    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'actor_transition', function( args )
  { // register command for actor_transition.
//-----------------------------------------------------------------------------

    const party = $gameParty.members();
    const { target, name, type, wait } = args;
    const data = $.transitionFromName( name );
    let character = party[target - 1];

    if ( character ) {

      const sprite = character.getSprite();

      if ( sprite ) this.playTransitionOnTarget( sprite, data, type, wait );

    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'enemy_transition', function( args )
  { // register command for actor_transition.
//-----------------------------------------------------------------------------

    const party = $gameTroop.members();
    const { target, name, type, wait } = args;
    const data = $.transitionFromName( name );
    let character = party[target - 1];

    if ( character ) {

      const sprite = character.getSprite();

      if ( sprite ) this.playTransitionOnTarget( sprite, data, type, wait );

    }

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'picture_transition', function( args )
  { // register command for picture_transition.
//-----------------------------------------------------------------------------

    const sprites = SceneManager._scene._spriteset._pictureContainer.children;
    const { target, name, type, wait } = args;
    const data = $.transitionFromName( name );

    const sprite = sprites[target - 1];

    if ( sprite ) this.playTransitionOnTarget( sprite, data, type, wait );

  } );

//=============================================================================
// Game_Interpreter :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_Interpreter, 'playTransitionOnTarget', function( target, data, type, wait )
  { // start a transition on the target provided.
//-----------------------------------------------------------------------------

    target.createTransitionFilter( data );

    const bitmap = this._transitionMask = ImageManager.loadSystem( data.mask );

    if ( wait ) {
      this._transitionTarget = target;
      this._waitMode = 'transition';
    }

    this._transitionMask.addLoadListener( function() {

      if ( target._transitionFilter ) {

        if ( type == 'fade_in' ) {
          target._transitionFilter.fadeIn();

        } else if ( type == 'fade_out' ) {
          target._transitionFilter.fadeOut();

        }


      }

    }.bind( this ) );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Interpreter, 'updateWaitMode', function()
  { // Aliased updateWaitMode of class Game_Interpreter.
//-----------------------------------------------------------------------------

    if ( this._waitMode == 'transition' ) {
      if ( !this._transitionMask.isReady() ) return true;
      if ( !this._transitionTarget._transitionFilter ) return true;
      if ( this._transitionTarget._transitionFilter.isBusy() ) {
        return true;
      } else {
        this._transitionTarget = null;
      }
    }

    return $.alias();

  }, false );

//=============================================================================
} )( Chaucer.rte );
//=============================================================================
