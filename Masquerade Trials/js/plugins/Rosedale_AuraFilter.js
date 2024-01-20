/*:============================================================================
*
* @target MZ
*
* @author Chaucer
*
* @plugindesc | Aura Filter : Version - 1.1.2 | This plugin adds an aura filter to characters.
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

*   This plugin allows you to setup character/enemy auras via note tags,
* comments, states, and plugin commands! Aura's are an effect, that
* can be used to enhance your games visuals! Below is the necessary
* information to get started!

*  Below are note tags for actors, and enemies, which can be used to apply
* aura's to battlers,( and party members! ).

*  ╔════════════╦══════════════════════╗
*  ║ Note Tag :             ║ <aura:NAME>                                ║
*  ╠════════════╬══════════════════════╣
*  ║                        ║ Apply to actor, or enemy in database. Any  ║
*  ║                        ║ actor or enemy in battle's will have an    ║
*  ║ Description :          ║ aura applied as soon as the battle begins! ║
*  ║                        ║ Also actors in the party with this note    ║
*  ║                        ║ tag, will have aura's applied on maps!     ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ NAME: The name of the aura in the plugin manager.                    ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <aura:blue>                                                          ║
*  ╚═══════════════════════════════════╝

*  Aura's can also be applied to event pages, by using the comment listed
* below, this is a per page setting.

*  ╔════════════╦══════════════════════╗
*  ║ Comment :              ║ <aura:NAME>                                ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ Add to event page to apply aura for that.  ║
*  ║ Description :          ║ specific page!                             ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ NAME: The name of the aura in the plugin manager.                    ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ <aura:yellow>                                                        ║
*  ╚═══════════════════════════════════╝

*  On top of this, aura effects can also be applied to enemies/actors/events
* via plugin commands. Below are the plugin commands for MV, as plugin
* commands in MZ are more simplified.

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ event_aura id ID aura NAME                 ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ change the aura of an event.               ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ ID: The id of the event.                                             ║
*  ║                                                                      ║
*  ║ NAME: the name of the aura to apply.                                 ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ event_aura id 1 aura red                                             ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ actor_aura id ID aura NAME                 ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ change the aura of an actor.               ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ ID: The id of the actor in the database.                             ║
*  ║                                                                      ║
*  ║ NAME: the name of the aura to apply.                                 ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ actor_aura id 1 aura red                                             ║
*  ╚═══════════════════════════════════╝

*  ╔════════════╦══════════════════════╗
*  ║ Plugin Command :       ║ enemy_aura id ID aura NAME                 ║
*  ╠════════════╬══════════════════════╣
*  ║ Description :          ║ change the aura of an enemy.               ║
*  ╠════════════╩══════════════════════╣
*  ║ Arguments :                                                          ║
*  ╠═══════════════════════════════════╣
*  ║                                                                      ║
*  ║ ID: The id of the enemy in the database.                             ║
*  ║                                                                      ║
*  ║ NAME: the name of the aura to apply.                                 ║
*  ║                                                                      ║
*  ╠═══════════════════════════════════╣
*  ║ Examples :                                                           ║
*  ╠═══════════════════════════════════╣
*  ║ enemy_aura id 1 aura red                                             ║
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
*  ● Date : 29/07/2023
*    ★ Release.

* ● Version : 1.1.0
* ● Date : 07/01/2024
*   ★ Add - Toggle to prevent auras on maps
*   ✩ Fix - Crash in MV from improper vertex shader.

* ● Version : 1.1.1
* ● Date : 13/01/2024
*   ✩ Fix - Incompatibility with Alpha_ABS
*   ✩ Fix - change param "white" to "name" as it should be.

* ● Version : 1.1.2
* ● Date : 13/01/2024
*   ✩ Fix - handling of semi-transparent pixels is handled better.
*   ✩ Fix - maximum stack error after version 1.1.1.


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

* @command event_aura
* @text Event Aura
* @desc Modify the aura of an event.

* @arg id
* @text Event ID
* @desc The id of the event on the map to change the aura of.
* @default 0
* @type number
* @min 1
* @max 10000

* @arg aura
* @text Aura Name
* @desc The name of the aura to use.
* @default
* @type text

* @command actor_aura
* @text Actor Aura
* @desc Modify the aura of an actor( this will affect them on map as well! ).

* @arg id
* @text Actor ID
* @desc The id of the actor in the database to change the aura of.
* @default 0
* @type number
* @min 1
* @max 10000

* @arg aura
* @text Aura Name
* @desc The name of the aura to use.
* @default
* @type text

* @command enemy_aura
* @text Enemy Aura
* @desc Modify the aura of an enemy in the current troop.

* @arg id
* @text Enemy Index
* @desc The index of the enemy in the troop to change the aura of.
* @default 0
* @type number
* @min 1
* @max 10000

* @arg aura
* @text Aura Name
* @desc The name of the aura to use.
* @default
* @type text

* @param auras
* @text Auras
* @desc Deffine auras here( they are expensive to calcuulate on the fly, so they are cached here instead ).
* @default ["{\"name\":\"red\",\"r\":\"1.00\",\"g\":\"0.00\",\"b\":\"0.00\",\"a\":\"0.50\"}","{\"name\":\"yellow\",\"r\":\"1.00\",\"g\":\"1.00\",\"b\":\"0.00\",\"a\":\"0.50\"}","{\"name\":\"green\",\"r\":\"0.00\",\"g\":\"1.00\",\"b\":\"0.00\",\"a\":\"0.50\"}","{\"name\":\"cyan\",\"r\":\"0.00\",\"g\":\"1.00\",\"b\":\"1.00\",\"a\":\"0.50\"}","{\"name\":\"blue\",\"r\":\"0.00\",\"g\":\"0.00\",\"b\":\"1.00\",\"a\":\"0.50\"}","{\"name\":\"purple\",\"r\":\"1.00\",\"g\":\"0.00\",\"b\":\"1.00\",\"a\":\"0.50\"}","{\"name\":\"pink\",\"r\":\"1.00\",\"g\":\"0.50\",\"b\":\"0.50\",\"a\":\"0.50\"}","{\"name\":\"white\",\"r\":\"1.00\",\"g\":\"1.00\",\"b\":\"1.00\",\"a\":\"0.50\"}"]
* @type struct<Aura>[]

* @param showOnMap
* @text Show Aura's on map
* @desc Should actor auras be shown on map.
* @default true
* @type boolean

*/

/*~struct~Aura:

* @param name
* @text name
* @desc The name of the aura, used to set this aura via plugin command.
* @default Value
* @type text

* @param r
* @text Red
* @desc The red color of the aura.
* @default 1.00
* @type number
* @decimals 2
* @min 0.00
* @max 5.00

* @param g
* @text Green
* @desc The green color of the aura.
* @default 1.00
* @type number
* @decimals 2
* @min 0.00
* @max 5.00

* @param b
* @text Blue
* @desc The blue color of the aura.
* @default 1.00
* @type number
* @decimals 2
* @min 0.00
* @max 5.00

* @param a
* @text Intensity
* @desc Howw large will the aura be.
* @default Value
* @default 1.00
* @type number
* @decimals 2
* @min 0.00
* @max 5.00

*/

//=============================================================================
// Filter_Aura :
//=============================================================================

//=============================================================================
class Filter_Aura extends PIXI.Filter
{ // Filter_Aura

//=============================================================================
  static get vertexSrc()
  { // return the vertex src.
//=============================================================================

    if ( Utils.RPGMAKER_NAME == 'MV' ) {
      `
      attribute vec2 aVertexPosition;
      attribute vec2 aTextureCoord;
      uniform mat3 projectionMatrix;
      uniform mat3 filterMatrix;
      varying vec2 vTextureCoord;
      varying vec2 vFilterCoord;

      void main(void){
         gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
         vFilterCoord = ( filterMatrix * vec3( aTextureCoord, 1.0)  ).xy;
         vTextureCoord = aTextureCoord ;
      }
      `
    } else {
      return `
      precision mediump float;
      attribute vec2 aVertexPosition;

      uniform mat3 projectionMatrix;

      varying vec2 vTextureCoord;
      varying vec2 fTextureCoord;

      uniform vec4 inputSize;
      uniform vec4 outputFrame;
      uniform vec4 filterArea;
      uniform vec2 dimensions;
      uniform vec3 zoom;

      vec4 filterVertexPosition( void )
      {
        vec2 position = aVertexPosition * outputFrame.zw + outputFrame.xy;

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

        vec2 z = ( zoom.xy * filterArea.xy ) / dimensions;
        fTextureCoord = ( vTextureCoord.xy + z / 2.0 ) * ( 1.0 / zoom.z );

      }
      `;

    }

  }

//=============================================================================
  static get fragmentSrc()
  { // return the vertex src.
//=============================================================================
    return `
    precision mediump float;
    varying vec2 vTextureCoord;
    varying vec2 fTextureCoord;

    uniform vec4 filterArea;
    uniform sampler2D uSampler;
    uniform vec4 glowColor;
    uniform vec2 dimensions;
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 scroll;
    uniform vec3 zoom;

//-----------------------------------------------------------------------------
        float rand ( vec2 coord ) {
//-----------------------------------------------------------------------------

          float r1 = 15.0 + ${Math.random()} * 60.0;
          float r2 = 15.0 + ${Math.random()} * 60.0;
          float r3 = 4000.0 + ${Math.random()} * 1000.0;
          return fract( sin( dot( coord, vec2( r1, r2 ) ) * 1000.0 ) * r3 );

        }


//-----------------------------------------------------------------------------
        float noise( vec2 coord ) {
//-----------------------------------------------------------------------------

          vec2 i = floor( coord );
          vec2 f = fract( coord );

          float a = rand( i );
          float b = rand( i + vec2( 1.0, 0.0 ) );
          float c = rand( i + vec2( 0.0, 1.0 ) );
          float d = rand( i + vec2( 1.0, 1.0 ) );

          vec2 u = f * f * ( 3.0 - 2.0 * f );

          return ( mix( a, b, u.x )  + ( c -a ) * u.y * ( 1.0 - u.x ) + ( d - b ) * u.x * u.y );

        }

//-----------------------------------------------------------------------------
        float fbm ( vec2 coord )
        { // return fractal brownian motion value.
//-----------------------------------------------------------------------------

          float value = 0.0;
          float amplitude = 0.9;
          float frequency = 0.7;
          const int octaves = 2;

          for ( int i = 0; i < octaves; i++ ) {
            value += amplitude * noise( coord * ( 2.25 ) );
            coord *= 2.0;
            amplitude *= frequency;
          }

          return value;

        }

//-----------------------------------------------------------------------------
    vec4 getFog( float alpha )
    {
//-----------------------------------------------------------------------------

    vec4 fog = vec4( 0.0, 0.0, 0.0, 0.0 );

      if ( alpha > 0.0 ) {
        vec3 color = glowColor.rgb * ( 1.0 + glowColor.a * 2.0 );
        float density = 1.5;
        // float twoPi = 6.283185307179586;
        // float v = sin( mod( time, 100.0 ) * twoPi / 100.0 ) * 200.0;
        float v = time * 10.0;

        vec2 coord = ( vTextureCoord + vec2( 0.5 ) ) / ( vec2( 128.0, 128.0 ) / 500.0 );
        coord = coord + scroll;

        vec2 q = vec2(
          fbm( coord + 0.0 * v ), fbm( coord + vec2( 1.0 ) )
        );

        vec2 r = vec2(
          fbm( coord + 1.0 * q + vec2( 2.7,7.2 ) + 0.15 * v ),
          fbm( coord + 1.0 * q + vec2( 5.3,2.8 ) + 0.126 * v )
        );

        float f = fbm( coord / 1.0 + r );
        float alpha0 = max( 0.5 - abs( vTextureCoord.x - 0.4 ) - 0.3, 0.0 ) ;
        float alpha1 = max( alpha - 0.5, 0.0 );
        vec3 fColor = ( color * alpha ) * length( vec3( 1, 1, 1 ) );
        fog = vec4( ( f * f * f + 0.3 * f * f + 0.25 * f ) * vec3( 1.0, 1.0, 1.0 ), 0.0 );
        fog.rgb += vec3( alpha1, alpha1, alpha1 );
        fog.rgb += vec3( alpha0, alpha0, alpha0 );

        // fog.rgb = ( vec3( 1.0, 1.0, 1.0 ) - fog.rgb ) * ( fColor );
        fog.rgb = fog.rgb * fColor;

      }

      fog.a += fog.a;

      return fog;

    }

//-----------------------------------------------------------------------------
    float glowAlpha()
    { // return the glow alpha.
//-----------------------------------------------------------------------------
      vec4 centerPixel = texture2D(uSampler, vTextureCoord);
      float oy = abs( ( vTextureCoord.x - ( resolution.x / 2.0 ) ) / ( resolution.x / 2.0 ) ) * 2.0;
      const float outlineWidthX = 5.0;
      const float outlineWidthY = 7.0;
      float totalAlpha = 0.0;
      float min = 0.001;
      float max = 0.025;
      float value = min + glowColor.a * ( max - min );
      if ( centerPixel.a >= 1.0 ) value = min + 0.006 * 0.01;

      for ( float i = -outlineWidthY; i <= outlineWidthY; i ++ ) {
       for ( float j = -outlineWidthX; j <= outlineWidthY; j++ ) {
         // if ( j <= outlineWidthY + oy || j >= outlineWidthY + oy ) continue;
         vec2 offset = vTextureCoord + ( vec2( i, j ) * value );
         vec4 surroundingPixel = texture2D( uSampler, offset );
         if ( length( surroundingPixel.rgb ) < 0.2 ) continue;
         if ( surroundingPixel.rgb == vec3( 0.0, 0.0, 0.0 ) ) continue;
         totalAlpha += abs( surroundingPixel.a - centerPixel.a );
       }
      }
      totalAlpha /= ( ( outlineWidthX * 2.0 + 1.0 ) * ( outlineWidthY * 2.0 + 1.0 ) * 1.0 );

      return totalAlpha;

    }

    void main(void){

      vec4 texel = texture2D(uSampler, vTextureCoord);
     float alpha = glowAlpha();
     if ( texel.a >= 0.1 ) alpha *= 0.6;
     vec4 fog = getFog( alpha );
     gl_FragColor = texel + vec4( fog.rgb * alpha, alpha * fog.a );

    }
    `;
  }

//=============================================================================
  static reset()
  { // update all filters.
//=============================================================================

    for ( const key in Chaucer.auraFilter.auras ) {
      Chaucer.auraFilter.auras[key].uniforms.time = 0;
    }

  }

//=============================================================================
  static update()
  { // update all filters.
//=============================================================================

    for ( const key in Chaucer.auraFilter.auras ) {
      Chaucer.auraFilter.auras[key].update();
    }

  }

//=============================================================================
  static get uniforms()
  { // return a uniform object.
//=============================================================================

    if ( Utils.RPGMAKER_NAME == 'MV' ) {

      return {
        glowColor: { type: 'v4', value: [0.0, 0.0, 1.0, 1.0] },
        dimensions: { type: 'v2', value: [0.0, 0.0] },
        scroll: { type: 'v2', value: [0.0, 0.0] },
        zoom: { type: 'v3', value: [0.0, 0.0, 0.0] },
        time: { type: 'f', value: 0.0 },
      }

    } else {

      return {
        glowColor: new Float32Array( [1, 0, 0, 1] ),
        dimensions: new Float32Array( [0, 0] ),
        scroll: new Float32Array( [0, 0] ),
        zoom: new Float32Array( [0, 0, 0] ),
        time: 0.0
      }

    }

  }

//=============================================================================
  static isFilterInUse( filter )
  { // return if the provided filter is being used.
//=============================================================================

    if ( filter._character ) {
      return !filter._character.getSprite();
    }

    return false;

  }

//=============================================================================
  static getFilter()
  { // Definition.
//=============================================================================

    return Chaucer.auraFilter._cache[0] || new Filter_Aura();

  }

//=============================================================================
  constructor( character )
  { // Called on object creation.
//=============================================================================

    super( Filter_Aura.vertexSrc, Filter_Aura.fragmentSrc, Filter_Aura.uniforms );
    this.autoFit = false;

  }

//=============================================================================
  setTarget( target )
  { // set the target that this aura will apply to.
//=============================================================================

    return this._target = target;

  }

//=============================================================================
  apply( filterManager, input, output, clearMode, _currentState )
  { // write a new apply method.
//=============================================================================

    if ( this.uniforms.dimensions ) {

      const size = Math.max( input.width, input.height );
      this.uniforms.dimensions[0] = size / 2;
      this.uniforms.dimensions[1] = size;

    }

    super.apply( filterManager, input, output, clearMode, _currentState );

  }

//=============================================================================
  update()
  { // update the filter.
//=============================================================================

      this.updateTime();

  }

//=============================================================================
  updateTime()
  { // update the time of the aura effect.
//=============================================================================

    this.uniforms.time += 0.01;

  }

}

//=============================================================================
window.Filter_Aura = Filter_Aura;
//=============================================================================

//=============================================================================
  var Imported = Imported || {};
  Imported['Aura Filter'.toUpperCase()] = true;
//=============================================================================
  var Chaucer = Chaucer || {};
  Chaucer.auraFilter = {};
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
        $.pluginName = [i].name;
        $.params = Chaucer.parse( $plugins[i].parameters );
        $.commands = {};
        $.alias = {};
        $.auras = {};

      };

      for ( let i = 0, l = $.params.auras.length; i < l; i++ ) {

        let aura = $.params.auras[i];

        $.auras[aura.name] = new Filter_Aura();

        $.auras[aura.name].uniforms.glowColor[0] = aura.r;
        $.auras[aura.name].uniforms.glowColor[1] = aura.g;
        $.auras[aura.name].uniforms.glowColor[2] = aura.b;
        $.auras[aura.name].uniforms.glowColor[3] = aura.a / 5;
      }

    };

  //============================================================================
    //Create plugin information.
  //============================================================================

    const identifier =  /(Aura Filter) : Version - (\d+.\d+.\d+)/;
    // $._nameError = 'Aura Filter was unable to load! Please revert any changes back to normal!';


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
// Game_CharacterBase :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_CharacterBase, 'initMembers', function()
  { // Aliased initMembers of class Game_CharacterBase.
//-----------------------------------------------------------------------------

    $.alias();
    this._aura = '';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'setAura', function( name )
  { // set the aura.
//-----------------------------------------------------------------------------

    if ( $.auras[name] ) this._aura = name;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_CharacterBase, 'aura', function()
  { // return the currently selected aura.
//-----------------------------------------------------------------------------

    return this._aura;

  }, false );

//=============================================================================
// Game_Event :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'setupPageSettings', function()
  { // Aliased setupPageSettings of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    this.setupPageAura();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'setupPageAura', function()
  { // setup aura for page.
//-----------------------------------------------------------------------------

    const list = this.page() ? this.list() : [];
    const rxp = /\s*\<\s*aura\s*:\s*(.*?)\s*\>/;
    let aura = '';

    for ( let i = 0, l = list.length; i < l; i++ ) {

      const { code, parameters } = list[i];
      if ( code != 108 && code != 408 ) continue;

      if ( parameters[0].match( rxp ) ) {
        aura = RegExp.$1;
      }

    };

    this.clearPageAura();
    this.setAura( aura.trim() );

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Event, 'clearPageSettings', function()
  { // Aliased clearPageSettings of class Game_Event.
//-----------------------------------------------------------------------------

    $.alias();
    this.clearPageAura();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Event, 'clearPageAura', function()
  { // raemove the ucrrent aura.
//-----------------------------------------------------------------------------

    this._aura = '';

  }, false );

//=============================================================================
// Game_Battler :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Battler, 'initMembers', function()
  { // Aliased initMembers of class Game_Battler.
//-----------------------------------------------------------------------------

    $.alias();
    this._aura = '';
    this._stateAura = '';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Battler, 'clearAura', function()
  { // clear the aura.
//-----------------------------------------------------------------------------

    this._aura = '';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Battler, 'setAura', function( name )
  { // set the aura.
//-----------------------------------------------------------------------------

    if ( $.auras[name] ) this._aura = name;

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Battler, 'aura', function()
  { // return the currently selected aura.
//-----------------------------------------------------------------------------

    return this._stateAura || this._aura;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Battler, 'addState', function( stateId )
  { // Aliased addState of class Game_Battler.
//-----------------------------------------------------------------------------

    $.alias( stateId );
    this.refreshStateAura();

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Game_Battler, 'removeState', function( stateId )
  { // Aliased removeState of class Game_Battler.
//-----------------------------------------------------------------------------

    $.alias( stateId );
    this.refreshStateAura();


  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Battler, 'refreshStateAura', function()
  { // refresh the state auras.
//-----------------------------------------------------------------------------

    const state = this.states().filter( s => s.meta.aura )
      .sort( ( a, b ) => b.priority - a.priority )[0];

    this.clearStateAura();
    if ( state ) this.setStateAura( ( state.meta.aura || '' ).trim() );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Battler, 'clearStateAura', function()
  { // clear the state aura.
//-----------------------------------------------------------------------------

    this._stateAura = '';

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_BattlerBase, 'setStateAura', function( name )
  { // Definition.
//-----------------------------------------------------------------------------

    if ( $.auras[name] ) this._stateAura = name;

  }, false );

//=============================================================================
// Game_Actor :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Actor, 'setup', function( actorId )
  { // Aliased setup of class Game_Actor.
//-----------------------------------------------------------------------------

    $.alias( actorId );
    this.initAura();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Actor, 'initAura', function()
  { // iniitialize the aura.
//-----------------------------------------------------------------------------

    this.clearAura();
    this.setAura(  ( this.actor().meta.aura || '' ).trim()  );

  }, false );

//=============================================================================
// Game_Enemy :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Game_Enemy, 'setup', function( enemyId, x, y )
  { // Aliased setup of class Game_Enemy.
//-----------------------------------------------------------------------------

    $.alias( enemyId, x, y );
    this.initAura();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Game_Enemy, 'initAura', function()
  { // iniitialize the aura.
//-----------------------------------------------------------------------------

    this.clearAura();
    this.setAura(  ( this.enemy().meta.aura || '' ).trim()  );

  }, false );

//=============================================================================
// Scene_Map :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_Map, 'initialize', function()
  { // Aliased initialize of class Scene_Map.
//-----------------------------------------------------------------------------

    $.alias();
    Filter_Aura.reset();

  }, false );

//-----------------------------------------------------------------------------
$.alias( Scene_Map, 'update', function()
{ // Aliased update of class Scene_Map.
//-----------------------------------------------------------------------------

    $.alias();
    Filter_Aura.update();

  }, false );

//=============================================================================
// Scene_Battle :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Scene_Battle, 'initialize', function()
  { // Aliased initialize of class Scene_Battle.
//-----------------------------------------------------------------------------

    $.alias();
    Filter_Aura.reset();

  }, false );

//-----------------------------------------------------------------------------
$.alias( Scene_Battle, 'update', function()
{ // Aliased update of class Scene_Battle.
//-----------------------------------------------------------------------------

    $.alias();
    Filter_Aura.update();

  }, false );

//=============================================================================
// Sprite :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Sprite, '_createColorFilter', function()
  { // Aliased _createColorFilter of class Sprite_Battler.
//-----------------------------------------------------------------------------

    if ( this.filters ) {
      this._colorFilter = new ColorFilter();
      this.filters.unshift( this._colorFilter );

    } else {
      $.alias();

    }

  }, false );

//=============================================================================
// Sprite_Character :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'initialize', function( character )
  { // Aliased initialize of class Sprite_Character.
//-----------------------------------------------------------------------------

    $.alias( character );
    this._aura = '';
    this._auraFilter = null;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Character, 'update', function()
  { // Aliased update of class Sprite_Character.
//-----------------------------------------------------------------------------

    $.alias();
    this.updateAura();
  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'updateAura', function()
  { // update the aura filter of the character.
//-----------------------------------------------------------------------------

    const character = this._character;

    if ( character && this._aura != character.aura() ) {
      this.setAura( character.aura() )
    }

    if ( this._auraFilter ) {
      this.updateAuraFilterArea();
    }

  }, false );

  //-----------------------------------------------------------------------------
    $.expand( Sprite_Character, 'updateAuraFilterArea', function()
    { // update the filter area.
  //-----------------------------------------------------------------------------

      let p = 32;

      const sx = this.anchor.x * this.width;
      const sy = this.anchor.y * this.height;

      let x = this.x - sx - p;
      let y = this.y - sy - p;
      let width = this.width + p * 2;
      let height = this.height + p * 2;

      this.filterArea = new Rectangle( x, y, width, height )

    }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'removeAuraFilter', function()
  { // remove the aura filter.
//-----------------------------------------------------------------------------

    this.filters = ( this.filters || [] ).filter( n => n != this._auraFilter );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Character, 'setAura', function( name )
  { // set the aura.
//-----------------------------------------------------------------------------

    this.removeAuraFilter();

    this._aura = name;
    this._auraFilter = $.auras[name];
    if ( this._auraFilter )
      this.filters = ( this.filters || [] ).concat( [this._auraFilter] );

  }, false );

//=============================================================================
// Sprite_Battler :
//=============================================================================

//-----------------------------------------------------------------------------
  $.alias( Sprite_Battler, 'initialize', function( character )
  { // Aliased initialize of class Sprite_Battler.
//-----------------------------------------------------------------------------

    $.alias( character );
    this._aura = '';
    this._auraFilter = null;

  }, false );

//-----------------------------------------------------------------------------
  $.alias( Sprite_Battler, 'update', function()
  { // Aliased update of class Sprite_Battler.
//-----------------------------------------------------------------------------

    $.alias();
    this.updateAura();

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Battler, 'updateAura', function()
  { // update the aura filter of the character.
//-----------------------------------------------------------------------------

    const battler = this._battler;

    if ( battler && this._aura != battler.aura() ) {
      this.setAura( battler.aura() )
    }

    if ( this._auraFilter ) {
      this.updateAuraFilterArea();
    }

  }, false );

  //-----------------------------------------------------------------------------
    $.expand( Sprite_Battler, 'updateAuraFilterArea', function()
    { // update the filter area.
  //-----------------------------------------------------------------------------

      let p = 32;

      const sx = this.anchor.x * this.width;
      const sy = this.anchor.y * this.height;
      const oy = this._stateIconSprite ? this._stateIconSprite.y : 0;

      let x = this.x  - sx - p;
      let y = this.y - sy - p + oy;
      let width = this.width + p * 2;
      let height = this.height - oy + p * 2;

      this.filterArea = new Rectangle( x, y, width, height )

    }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Battler, 'removeAuraFilter', function()
  { // remove the aura filter.
//-----------------------------------------------------------------------------

    this.filters = ( this.filters || [] ).filter( n => n != this._auraFilter );

  }, false );

//-----------------------------------------------------------------------------
  $.expand( Sprite_Battler, 'setAura', function( name )
  { // set the aura.
//-----------------------------------------------------------------------------

    this.removeAuraFilter();

    this._aura = name;
    this._auraFilter = $.auras[name];

    if ( this._auraFilter )
      this.filters = ( this.filters || [] ).concat( [this._auraFilter] );


  }, false );

//=============================================================================
// Game_Player :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'actor', function()
  { // return the current actor the player is controlling.
//-----------------------------------------------------------------------------

    return $gameParty.leader();

  }, false );

if ( !Imported.AlphaABS ) {

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'battler', function()
  { // return the battler.
//-----------------------------------------------------------------------------

    return this.actor();

  }, false );

}

//-----------------------------------------------------------------------------
  $.expand( Game_Player, 'aura', function()
  { // return the characters aura.
//-----------------------------------------------------------------------------

    if ( Chaucer.auraFilter.params.showOnMap ) {
      return this.battler() ? this.battler().aura() : this._aura;

    } else {
      return this._aura;

    }

  }, false );

//=============================================================================
// Game_Follower :
//=============================================================================

//-----------------------------------------------------------------------------
  $.expand( Game_Follower, 'battler', function()
  { // return the follower.
//-----------------------------------------------------------------------------

    return this.actor();

  }, false );

  //-----------------------------------------------------------------------------
    $.expand( Game_Follower, 'aura', function()
    { // return the characters aura.
  //-----------------------------------------------------------------------------

      if ( Chaucer.auraFilter.params.showOnMap ) {
        return this.battler() ? this.battler().aura() : this._aura;
      } else {
        return this._aura;
      }

    }, false );

//=============================================================================
// Plugin Commands :
//=============================================================================

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'event_aura', function( args )
  { // register command for event_aura.
//-----------------------------------------------------------------------------

    const { id, aura } = args;
    const event = $gameMap.event( id )

    if ( event ) event.setAura( aura );

  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'actor_aura', function( args )
  { // register command for event_aura.
//-----------------------------------------------------------------------------

    const { id, aura } = args;
    const actor = $gameActors.actor( id );

    if ( actor ) actor.setAura( aura );


  } );

//-----------------------------------------------------------------------------
  $.registerPluginCommand( 'enemy_aura', function( args )
  { // register command for event_aura.
//-----------------------------------------------------------------------------

    const { id, aura } = args;
    const enemy = $gameTroop._enemies[id - 1];

    if ( enemy ) enemy.setAura( aura );


  } );

//=============================================================================
} )( Chaucer.auraFilter );
//=============================================================================

