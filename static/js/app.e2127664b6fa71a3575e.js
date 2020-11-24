webpackJsonp([2],{"14gb":function(n,e,t){var r=t("puH/");n.exports=r({})},"26+/":function(n,e){n.exports="// based on https://github.com/rust-num/num-complex/blob/master/src/lib.rs\n// Copyright 2013 The Rust Project Developers. MIT license\n// Ported to GLSL by Andrei Kashcha (github.com/anvaka), available under MIT license as well.\nfloat cosh(float val) {\n  float tmp = exp(val);\n  return (tmp + 1.0 / tmp) / 2.0;\n}\n \nfloat tanh(float val) {\n  float tmp = exp(val);\n  return (tmp - 1.0 / tmp) / (tmp + 1.0 / tmp);\n}\n \nfloat sinh(float val) {\n  float tmp = exp(val);\n  return (tmp - 1.0 / tmp) / 2.0;\n}\n\nvec2 cosh(vec2 val) {\n  vec2 tmp = exp(val);\n  return(tmp + 1.0 / tmp) / 2.0;\n}\n \nvec2 tanh(vec2 val) {\n  vec2 tmp = exp(val);\n  return (tmp - 1.0 / tmp) / (tmp + 1.0 / tmp);\n}\n \nvec2 sinh(vec2 val) {\n  vec2 tmp = exp(val);\n  return (tmp - 1.0 / tmp) / 2.0;\n}\n\nvec2 c_one() { return vec2(1., 0.); }\nvec2 c_i() { return vec2(0., 1.); }\n\nfloat arg(vec2 c) {\n  return atan(c.y, c.x);\n}\n\nvec2 c_conj(vec2 c) {\n  return vec2(c.x, -c.y);\n}\n\nvec2 c_from_polar(float r, float theta) {\n  return vec2(r * cos(theta), r * sin(theta));\n}\n\nvec2 c_to_polar(vec2 c) {\n  return vec2(length(c), atan(c.y, c.x));\n}\n\n/// Computes `e^(c)`, where `e` is the base of the natural logarithm.\nvec2 c_exp(vec2 c) {\n  return c_from_polar(exp(c.x), c.y);\n}\n\n\n/// Raises a floating point number to the complex power `c`.\nvec2 c_exp(float base, vec2 c) {\n  return c_from_polar(pow(base, c.x), c.y * log(base));\n}\n\n/// Computes the principal value of natural logarithm of `c`.\nvec2 c_ln(vec2 c) {\n  vec2 polar = c_to_polar(c);\n  return vec2(log(polar.x), polar.y);\n}\n\n/// Returns the logarithm of `c` with respect to an arbitrary base.\nvec2 c_log(vec2 c, float base) {\n  vec2 polar = c_to_polar(c);\n  return vec2(log(polar.r), polar.y) / log(base);\n}\n\nvec2 c_sqrt(vec2 c) {\n  vec2 p = c_to_polar(c);\n  return c_from_polar(sqrt(p.x), p.y/2.);\n}\n\n/// Raises `c` to a floating point power `e`.\nvec2 c_pow(vec2 c, float e) {\n  vec2 p = c_to_polar(c);\n  return c_from_polar(pow(p.x, e), p.y*e);\n}\n\n/// Raises `c` to a complex power `e`.\nvec2 c_pow(vec2 c, vec2 e) {\n  vec2 polar = c_to_polar(c);\n  return c_from_polar(\n     pow(polar.x, e.x) * exp(-e.y * polar.y),\n     e.x * polar.y + e.y * log(polar.x)\n  );\n}\n\nvec2 c_mul(vec2 self, vec2 other) {\n    return vec2(self.x * other.x - self.y * other.y, \n                self.x * other.y + self.y * other.x);\n}\n\nvec2 c_div(vec2 self, vec2 other) {\n    float norm = length(other);\n    return vec2(self.x * other.x + self.y * other.y,\n                self.y * other.x - self.x * other.y)/(norm * norm);\n}\n\nvec2 c_sin(vec2 c) {\n  return vec2(sin(c.x) * cosh(c.y), cos(c.x) * sinh(c.y));\n}\n\nvec2 c_cos(vec2 c) {\n  // formula: cos(a + bi) = cos(a)cosh(b) - i*sin(a)sinh(b)\n  return vec2(cos(c.x) * cosh(c.y), -sin(c.x) * sinh(c.y));\n}\n\nvec2 c_tan(vec2 c) {\n  vec2 c2 = 2. * c;\n  return vec2(sin(c2.x), sinh(c2.y))/(cos(c2.x) + cosh(c2.y));\n}\n\nvec2 c_atan(vec2 c) {\n  // formula: arctan(z) = (ln(1+iz) - ln(1-iz))/(2i)\n  vec2 i = c_i();\n  vec2 one = c_one();\n  vec2 two = one + one;\n  if (c == i) {\n    return vec2(0., 1./0.0);\n  } else if (c == -i) {\n    return vec2(0., -1./0.0);\n  }\n\n  return c_div(\n    c_ln(one + c_mul(i, c)) - c_ln(one - c_mul(i, c)),\n    c_mul(two, i)\n  );\n}\n\nvec2 c_asin(vec2 c) {\n // formula: arcsin(z) = -i ln(sqrt(1-z^2) + iz)\n  vec2 i = c_i(); vec2 one = c_one();\n  return c_mul(-i, c_ln(\n    c_sqrt(c_one() - c_mul(c, c)) + c_mul(i, c)\n  ));\n}\n\nvec2 c_acos(vec2 c) {\n  // formula: arccos(z) = -i ln(i sqrt(1-z^2) + z)\n  vec2 i = c_i();\n\n  return c_mul(-i, c_ln(\n    c_mul(i, c_sqrt(c_one() - c_mul(c, c))) + c\n  ));\n}\n\nvec2 c_sinh(vec2 c) {\n  return vec2(sinh(c.x) * cos(c.y), cosh(c.x) * sin(c.y));\n}\n\nvec2 c_cosh(vec2 c) {\n  return vec2(cosh(c.x) * cos(c.y), sinh(c.x) * sin(c.y));\n}\n\nvec2 c_tanh(vec2 c) {\n  vec2 c2 = 2. * c;\n  return vec2(sinh(c2.x), sin(c2.y))/(cosh(c2.x) + cos(c2.y));\n}\n\nvec2 c_asinh(vec2 c) {\n  // formula: arcsinh(z) = ln(z + sqrt(1+z^2))\n  vec2 one = c_one();\n  return c_ln(c + c_sqrt(one + c_mul(c, c)));\n}\n\nvec2 c_acosh(vec2 c) {\n  // formula: arccosh(z) = 2 ln(sqrt((z+1)/2) + sqrt((z-1)/2))\n  vec2 one = c_one();\n  vec2 two = one + one;\n  return c_mul(two,\n      c_ln(\n        c_sqrt(c_div((c + one), two)) + c_sqrt(c_div((c - one), two))\n      ));\n}\n\nvec2 c_atanh(vec2 c) {\n  // formula: arctanh(z) = (ln(1+z) - ln(1-z))/2\n  vec2 one = c_one();\n  vec2 two = one + one;\n  if (c == one) {\n      return vec2(1./0., vec2(0.));\n  } else if (c == -one) {\n      return vec2(-1./0., vec2(0.));\n  }\n  return c_div(c_ln(one + c) - c_ln(one - c), two);\n}\n\n// Attempts to identify the gaussian integer whose product with `modulus`\n// is closest to `c`\nvec2 c_rem(vec2 c, vec2 modulus) {\n  vec2 c0 = c_div(c, modulus);\n  // This is the gaussian integer corresponding to the true ratio\n  // rounded towards zero.\n  vec2 c1 = vec2(c0.x - mod(c0.x, 1.), c0.y - mod(c0.y, 1.));\n  return c - c_mul(modulus, c1);\n}\n\nvec2 c_inv(vec2 c) {\n  float norm = length(c);\n\treturn vec2(c.x, -c.y) / (norm * norm);\n}\n"},"2PgA":function(n,e,t){n.exports=function(n,e){if("undefined"==typeof window)return r(n);var t=[],i=e&&e.useSearch,c=i?"?":"#?";e.rewriteHashToSearch&&s();return a=v(),u=!1,"object"==typeof n&&n&&Object.keys(n).forEach(function(e){e in a||(a[e]=n[e],u=!0)}),u&&f(a),{onChanged:function(n){if("function"!=typeof n)throw new Error("changeCallback needs to be a function");0===t.length&&window.addEventListener("hashchange",l,!1),t.push(n)},dispose:function(){0!==t.length&&(t=[],window.removeEventListener("hashchange",l,!1))},set:f,get:v,rewriteHashToSearch:s};var a,u;function s(){var n=Object.create(null),e=window.location.search;e&&(n=Object.assign(n,o.parse(e.substr(1))));var t=window.location.hash;t&&(n=Object.assign(n,o.parse(t.substr(2)))),f(n)}function f(n){var e=c+o.stringify(n);i&&window.location.hash&&(e+=window.location.hash),window.history?window.history.replaceState(void 0,void 0,e):window.location.replace(e)}function l(){var n=v();!function(n){for(var e=0;e<t.length;++e){var r=t[e];r(n)}}(n)}function v(){var n=i?window.location.search:window.location.hash,e=(n||c).substr(c.length);return o.parse(e)}};var r=t("5hi0"),o=t("9XuS")},"5hi0":function(n,e){n.exports=function(n){var e=[],t=n;return{dispose:function(){e=[]},onChanged:function(n){if("function"!=typeof n)throw new Error("changeCallback should be a function");e.push(n)},set:function(n){t=n,setTimeout(function(){var t;t=n,e.forEach(function(n){n(t)})},0)},get:function(){return t}}}},"7UaU":function(n,e,t){n.exports=c;var r,o=t("fkI9"),i=t("2PgA");function c(n,e){var t=(e=e||{}).history||i(n,e);!function(n){if(!n)throw new Error("history is required");if("function"!=typeof n.dispose)throw new Error("dispose is required");if("function"!=typeof n.onChanged)throw new Error("onChanged is required")}(t),t.onChanged(function(n){r=n,a.fire("change",r)});var r=t.get()||Object.create(null),c={get:function(n){return void 0===n?r:r[n]},set:function(n,e){var o=typeof n;"object"===o?Object.keys(n).forEach(function(e){r[e]=n[e]}):"string"===o&&(r[n]=e);return t.set(r),c},unset:function(n){if(!(n in r))return;return delete r[n],t.set(r),c},setIfEmpty:function(n,e){"object"==typeof n&&Object.keys(n).forEach(function(e){e in r||(r[e]=n[e])});if(n in r)return;return r[n]=e,t.set(r),c},dispose:function(){t.dispose(),a.off()},onChange:function(n,e){a.on("change",n,e)},offChange:function(n,e){a.off("change",n,e)},getHistoryObject:function(){return t}},a=o({});return c}c.instance=function(n,e){r?n&&r.setIfEmpty(n):r=c(n,e);return r}},"9Sc3":function(n,e){function t(n,e,t){var r=n.createShader(e);if(n.shaderSource(r,t),n.compileShader(r),!n.getShaderParameter(r,n.COMPILE_STATUS))throw new Error(n.getShaderInfoLog(r));return r}n.exports={bindTexture:function(n,e,t){n.activeTexture(n.TEXTURE0+t),n.bindTexture(n.TEXTURE_2D,e)},createBuffer:function(n,e){var t=n.createBuffer();return n.bindBuffer(n.ARRAY_BUFFER,t),n.bufferData(n.ARRAY_BUFFER,e,n.STATIC_DRAW),t},bindAttribute:function(n,e,t,r){n.bindBuffer(n.ARRAY_BUFFER,e),n.enableVertexAttribArray(t),n.vertexAttribPointer(t,r,n.FLOAT,!1,0,0)},createProgram:function(n,e,r){var o=n.createProgram(),i=t(n,n.VERTEX_SHADER,e),c=t(n,n.FRAGMENT_SHADER,r);if(n.attachShader(o,i),n.attachShader(o,c),n.linkProgram(o),!n.getProgramParameter(o,n.LINK_STATUS))throw new Error(n.getProgramInfoLog(o));var a,u={program:o,unload:function(){n.deleteProgram(o)}},s=n.getProgramParameter(o,n.ACTIVE_ATTRIBUTES);for(a=0;a<s;a++){var f=n.getActiveAttrib(o,a);u[f.name]=n.getAttribLocation(o,f.name)}var l=n.getProgramParameter(o,n.ACTIVE_UNIFORMS);for(a=0;a<l;a++){var v=n.getActiveUniform(o,a);u[v.name]=n.getUniformLocation(o,v.name)}return u},createShader:t,createTexture:function(n,e){var t=n.createTexture(),r=n.RGBA,o=n.RGBA,i=n.UNSIGNED_BYTE;return n.bindTexture(n.TEXTURE_2D,t),n.texImage2D(n.TEXTURE_2D,0,r,o,i,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),t}}},"9SxT":function(n,e,t){var r,o,i=t("7UaU"),c=t("14gb"),a=t("ZwVy"),u=t("oMW9"),s=i({},{useSearch:!0}),f=t("NAGP"),l=f,v=s.get("gist");v?u(v).then(function(n){l=n,d.ready=!0,d.settingsPanel.collapsed=m(),c.fire("appstate-ready")}).catch(function(n){console.error(n),l=f,d.settingsPanel.loadError=n,d.settingsPanel.collapsed=!1,d.ready=!0,c.fire("appstate-ready")}):(r=!0,l=s.get("fc")||f);var d={settingsPanel:{collapsed:m(),codeLimitError:!1,loadError:null,audioWarning:!1},hideUI:void 0!==s.get("hide-ui"),ready:r,saveCode:function(n){n.length>1e3?(d.settingsPanel.codeLimitError=!0,s.unset("fc")):(d.settingsPanel.codeLimitError=!1,s.set({fc:n}),s.unset("gist"));l=n},hasCode:p,getCode:function(){return l},getDefaultCode:function(){return f},saveTransform:function(n,e,t){o&&clearTimeout(o);o=setTimeout(function(){o=0,s.set({tx:n,ty:e,scale:t})},300)},getVisibleRectangle:function(n,e){var t=s.get("tx"),r=s.get("ty"),o=s.get("scale");if(!(Number.isFinite(t)||Number.isFinite(r)||Number.isFinite(o)))return;return{left:-t*n/o,top:-r*e/o,right:-t*n/o+n/o,bottom:-r*e/o+e/o}},addChannel:function(n,e){s.set("i"+n,e)},removeChannel:function(n){s.unset("i"+n)},getActiveChannels:function(){for(var n=[],e=0;e<3;++e){var t=s.get("i"+e);void 0!==t&&n.push({unit:e,src:t})}return n},setSoundIOSWarning:function(n){if(!h)return;d.settingsPanel.audioWarning=n}},h=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;function p(){return l!==f}function m(){return a()||p()}s.onChange(function(){c.fire("scene-ready",window.scene)}),n.exports=d},"9XuS":function(n,e){function t(n){return encodeURIComponent(n).replace(/[()]/g,r)}function r(n){return")"===n?"%29":"("===n?"%28":n}n.exports={parse:function(n){var e=Object.create(null);return n?(n.split("&").forEach(function(n){if(n){var t,r,o,i=n.split("=");e[decodeURIComponent(i[0])]=(t=i[1],""===(t=decodeURIComponent(t))?t:isNaN(t)?"true"===(o=t)||"false"===o?"true"===t:(r=t)&&r.match(/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/)?new Date(t):t:parseFloat(t))}}),e):e},stringify:function(n){return n?Object.keys(n).map(function(e){var r=n[e],o=t(e);return void 0!==r&&(o+="="+function(n){return n instanceof Date&&(n=n.toISOString()),t(n)}(r)),o}).join("&"):""}}},AYEn:function(n,e,t){var r=t("26+/"),o=t("Wirq");n.exports=function(n){return"\nprecision highp float;\nuniform sampler2D iChannel0, iChannel1, iChannel2, iChannel3;\nuniform vec2 iChannel0Res, iChannel1Res, iChannel2Res, iChannel3Res;\nuniform float iFrame;\nuniform float iTime;\nuniform vec4 iOrientation;\nuniform vec4 iMouse;\nuniform vec3 iTransform;\nuniform vec2 iResolution;\nvarying vec2 v_tex_pos;\n\nvec2 screen2scene(vec2 pos) {\n  pos /= iResolution.xy;\n  float ar = (iResolution.x/iResolution.y);\n  vec2 vt = 2.*(pos - iTransform.xy)/iTransform.z;\n  return vec2(ar*(vt.x - 1.), 1. - vt.y);\n}\n\n"+o+"\n"+r+"\n"+n+"\n\nvoid main() {\n  float ar = iResolution.x / iResolution.y;\n  gl_FragColor = get_color(vec2(v_tex_pos.x * ar, v_tex_pos.y));\n}\n"}},C5Nx:function(n,e,t){var r=t("TpfK"),o=t("Gf3G"),i=(t("wnUk"),t("9SxT"));n.exports=function(n,e,t){var c,a,u,s,f,l=1024,v="iChannel"+t,d=v+"Res",h=new Uint8Array(l),p=4,m=512;return Object.freeze({kind:"audio",unit:t,load:function(){if(r(n))return o(n).then(function(n){return f=n}).then(function(){if(i.hideUI){var n=(e=document.querySelector("audio"))||((e=document.createElement("audio")).preload=!0,e.autobuffer=!0,e.constrols="",e.style.visibility="hidden",document.body.appendChild(e),e);return g(n)}var e});throw new Error("non soundcloud files are not supported yet.")},dispose:function(){c&&(e.deleteTexture(c),c=null)},render:function(n,r){if(!c)return;u.getByteFrequencyData(h);for(var o=l/2,i=r%2*o,f=(r+1)%2*o,g=0;g<o;++g){var w=4*(g+f),_=4*(g+i),E=h[g],x=s[_+1],y=s[_+2];s[w]=E,s[w+1]=.5*x+.5*E,s[w+2]=.9*y+.1*E}for(var T=i+2*o,b=f+2*o,g=0;g<o;g+=2){var C=(h[g]+h[g+1])/2,R=4*(g/2+b),A=4*(g/2+T),I=s[A+1],S=s[A+2];s[R]=C,s[R+1]=.5*(I+C),s[R+2]=.9*S+.1*C}for(var P=o/2,g=0;g<o-2;g+=2){var C=.5*(s[4*(g+b)]+s[4*(g+b+1)]),R=4*(P+g/2+b),A=4*(P+g/2+T),I=s[A+1],S=s[A+2];s[R]=C,s[R+1]=.5*(I+C),s[R+2]=.9*S+.1*C}e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,c),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,m,p,0,e.RGBA,e.UNSIGNED_BYTE,s),e.uniform1i(n[v],t),e.uniform2f(n[d],a.currentTime,a.duration)},initPlayer:g});function g(n){(a=n).crossOrigin="anonymous",a.autoplay=!0;var t=new(window.AudioContext||window.webkitAudioContext);(u=t.createAnalyser()).fftSize=l;var r=t.createMediaElementSource(a);r.connect(u),u.connect(t.destination),s=new Uint8Array(m*p*4),c=function(n,t,r,o){var i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n),t instanceof Uint8Array&&e.texImage2D(e.TEXTURE_2D,0,e.RGBA,r,o,0,e.RGBA,e.UNSIGNED_BYTE,t);return i}(e.LINEAR,s,m,p),a.setAttribute("src",f),a.play(),a.removeEventListener("ended",w),a.addEventListener("ended",w),a.removeEventListener("play",_),a.addEventListener("play",_),a.removeEventListener("pause",w),a.addEventListener("pause",w)}function w(){}function _(){}}},CkGf:function(n,e){n.exports=function(n){var e,t,r=new Image;return r.crossOrigin="",r.onload=function(){e(r)},r.onerror=function(n){t(n)},r.src=n,new Promise(function(n,r){e=n,t=r})}},"D/cR":function(n,e){n.exports=function(n,e){return e||(e={}),new Promise(function(t,r){var o=new XMLHttpRequest;"function"==typeof e.progress&&o.addEventListener("progress",function(n){n.lengthComputable&&e.progress({loaded:n.loaded,total:n.total,percent:n.loaded/n.total})},!1);o.addEventListener("load",function(){if(200===o.status){var i=o.response;"json"===e.responseType&&"string"==typeof i&&(i=JSON.parse(i)),t(i)}else r({err:"Unexpected status code "+o.status+" when calling "+n,response:o.response,status:o.status})},!1),o.addEventListener("error",function(){r("Failed to download "+n)},!1),o.addEventListener("abort",function(){r("Cancelled download of "+n)},!1),o.open("GET",n),e.responseType&&(o.responseType=e.responseType);o.send(null)})}},Gf3G:function(n,e){n.exports=function n(e){if("undefined"==typeof SC)return new Promise(function(n,e){var t=document.createElement("script");t.setAttribute("src","//connect.soundcloud.com/sdk.js"),t.onload=n,t.onerror=e,document.head.appendChild(t)}).then(function(){return n(e)});return new Promise(function(n,r){SC.initialize({client_id:t}),SC.get("/resolve",{url:e},function(e){if(e.errors){for(var o="",i=0;i<e.errors.length;i++)o+=e.errors[i].error_message+".";r(o+="Make sure the URL has the correct format: https://soundcloud.com/user/title-of-the-track")}else{var c;if("playlist"===e.kind){c=e.tracks[0].stream_url+"?client_id="+t}else c=e.stream_url+"?client_id="+t;n(c)}})})};var t="oyOHfaO0Xhi6nqwntte71KmwsEQbCmCG"},IO8I:function(n,e,t){var r=t("14gb"),o=t("hj6B"),i=t("AYEn"),c={check:function(n){return{code:n,log:{errorCount:0}}}};function a(n){return new Array(n+1).join(" ")}t.e(1).then(function(){c=t("TFw8"),r.fire("glsl-parser-ready")}.bind(null,t)).catch(t.oe),n.exports=function(n){var e=i(n);return o(e).then(function(e){if(e.error)return e;var t=e.getCode(),r=c.check(t);return r.code=t,r.main=n,r.log.errorCount&&(r.error=function(n){var e=n.diagnostics[0],t=e.range,r=t.lineColumn(),o=t.source,i=o._lineOffsets[r.line],c=o.contents.substr(i,r.column);c+=o.contents.substring(t.start,t.end);var u="Line "+r.line+": ",s=e.text;return{error:u+c+"\n"+a(u.length)+a(r.column)+"^",errorDetail:s,isFloatError:function(n){return n.indexOf('"int"')>-1&&n.indexOf('"float"')>-1}(s)}}(r.log)),r})}},NAGP:function(n,e){n.exports="vec4 get_color(vec2 p) {\n  vec2 z = vec2(0.); float t = 0.;\n\n  for(int i = 0; i < 32; ++i) {\n    if (length(z) > 2.) break;\n    // main fractal loop. Change it:\n    z = c_mul(z, z) + p;\n    t = float(i);\n  }\n\n  return length(z) * vec4(t/64., t/32., t/24., 1.0);\n}"},S0E2:function(n,e,t){var r=t("14gb"),o=t("9SxT"),i=t("IO8I");n.exports=function(n){r.on("glsl-parser-ready",f);var e,t,c=0,a=o.getCode();(t=o.getCode())?l(t).then(function(n){n.error&&(console.error("Failed to restore previous shader code: ",n.error),l(o.getDefaultCode()))}):l(o.getDefaultCode());var u={getCode:function(){return o.getCode()},setCode:function(n){if(n===a)return void(e&&e.error&&f());l(n).then(function(e){if(!e.cancelled){if(e&&e.error)return s(e.error),e;a=n,u.code=n,o.saveCode(n)}})},dispose:function(){r.off("glsl-parser-ready",f)},code:a,error:"",errorDetail:"",isFloatError:!1};return u;function s(n){n&&n.error?(u.error=n.error,u.errorDetail=n.errorDetail,u.isFloatError=n.isFloatError):(u.error="",u.errorDetail="",u.isFloatError=!1)}function f(n){return i(n||a).then(function(n){return s((e=n).error),e})}function l(e){var t=c+=1;return f(e).then(function(e){if(t!==c)return e.cancelled=!0,e;if(e.error)return e;try{return n(e),e}catch(n){return{error:{error:n.message}}}})}}},TpfK:function(n,e){n.exports=function(n){return n.match(/^https?:\/\/soundcloud\.com\//)}},TzId:function(n,e,t){var r=t("yBIK"),o=t("S0E2"),i=t("14gb"),c=t("9Sc3"),a=t("ognG"),u=t("XLwn"),s=t("9SxT"),f=2500;n.exports=function(n){var e,t=n.getContext("webgl")||n.getContext("experimental-webgl");if(!t)throw new Error("WebGL is not available");var l={currentX:0,currentY:0,clickX:0,clickY:0},v=0,d={alpha:0,beta:0,gamma:0,absolute:0},h={x:0,y:0,z:1},p=n.clientWidth,m=n.clientHeight,g=r(t.canvas,{controller:{applyTransform:L,getOwner:function(){return t.canvas}}});U();var w,_,E=!0,x=!0,y=!0,T=new Date;window.addEventListener("resize",B),window.addEventListener("mousemove",X,!0),window.addEventListener("mousedown",G,!0),window.addEventListener("touchstart",z,!0),window.addEventListener("touchmove",N,!0),window.addEventListener("keydown",k,!0),window.addEventListener("deviceorientation",F,!0),s.hasCode()&&O(!0);var b,C,R=a(s.getCode());t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA),t.clearColor(0,0,0,1);var A=u(t),I={isActive:!0,codeEditorState:o(function(n){var r=c.createProgram(t,R.vertexShader,n.code);b&&b.unload();e=window.performance.now(),b=r,C=c.createBuffer(t,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1])),c.bindAttribute(t,C,b.a_pos,2),E=!0,x=!0,P(),i.fire("scene-ready",window.scene)}),channelsState:A,goToOrigin:function(){g.showRectangle({left:0,right:window.innerWidth,top:0,bottom:window.innerHeight}),L(g.getTransform())},setActivityMonitorEnabled:O,dispose:function(){g.dispose(),window.removeEventListener("resize",B),window.removeEventListener("mousemove",X,!0),window.removeEventListener("mousedown",G,!0),window.removeEventListener("touchstart",z,!0),window.removeEventListener("touchmove",N,!0),window.removeEventListener("keydown",k,!0),window.removeEventListener("deviceorientation",F,!0),cancelAnimationFrame(w),O(!1),w=0}};return window.scene=I,I;function S(){t.clear(t.DEPTH_BUFFER_BIT|t.COLOR_BUFFER_BIT),w=0,function(){t.useProgram(b.program),E&&(E=!1,t.viewport(0,0,p,m),t.uniform2f(b.iResolution,p,m));x&&(x=!1,t.uniform3f(b.iTransform,h.x,h.y,h.z));A.render(b,v);var n=window.performance.now()-e;t.uniform1f(b.iTime,n/1e3),t.uniform1f(b.iFrame,v),t.uniform4f(b.iMouse,l.currentX,l.currentY,l.clickX,l.clickY),y&&(y=!1,t.uniform4f(b.iOrientation,d.alpha,d.beta,d.gamma,d.absolute));t.drawArrays(t.TRIANGLES,0,6)}(),v+=1,P()}function P(){w||(w=requestAnimationFrame(S))}function L(n){var e=n.x/p,t=n.y/m,r=n.scale;h.x=e,h.y=t,h.z=r,x=!0,s.saveTransform(e,t,r),P()}function U(){var n=s.getVisibleRectangle(p,m);n&&g.showRectangle(n)}function D(){var n=new Date;n-T>f&&(I.isActive=!1)}function O(n){n?_||(_=setInterval(D,2e3)):(clearInterval(_),_=!1,I.isActive=!0)}function k(){T=new Date,I.isActive=!0}function z(n){k();var e=n.touches[0];e&&(M(e.clientX,e.clientY),j(e.clientX,e.clientY))}function F(n){y=!0,d.absolute=n.absolute,d.alpha=Math.PI*n.alpha/180,d.beta=Math.PI*n.beta/180,d.gamma=Math.PI*n.gamma/180}function N(n){k();var e=n.touches[0];e&&j(e.clientX,e.clientY)}function X(n){j(n.clientX,n.clientY),k()}function G(n){M(n.clientX,n.clientY),k()}function j(n,e){l.currentX=n,l.currentY=e}function M(n,e){l.clickX=n,l.clickY=e}function B(){var e,t;e=window.innerWidth,t=window.innerHeight,n.width=e,n.height=t,p=e,m=t,U(),E=!0,P()}}},Wirq:function(n,e){n.exports="// If you are not familiar with bezier easing, see this\n// http://cubic-bezier.com/#.17,.67,.83,.67\nvec2 bezier(vec2 p0, vec2 p1, vec2 p2, vec2 p3, float t) {\n  float one_minus_t = 1. - t;\n  return one_minus_t * one_minus_t * one_minus_t * p0 + \n    3. * one_minus_t * one_minus_t * t * p1 + \n    3. * one_minus_t * t * t * p2 +\n    t * t * t * p3;\n}\n\n// This one animates t, using control points p1 and p2.\n// It is very similar to CSS based cubic-bezier timing funciton.\nfloat bease(float t, vec2 p1, vec2 p2) {\n  vec2 p0 = vec2(0.);\n  vec2 p3 = vec2(1.);\n  vec2 res = bezier(p0, p1, p2, p3, t);\n  return res.y;\n}\n\n// Produces a uniform value between 0 and 1 over `framesCount` frames\nfloat timef(float framesCount) {\n  return mod(iFrame,framesCount)/framesCount;\n}\n\n// Not sure if I want to keep this.\nfloat bease(float t) {\n  return bease(t, vec2(0.42, 0), vec2(1));\n}"},XLwn:function(n,e,t){var r=t("CkGf"),o=t("9Sc3"),i=t("9SxT"),c=t("C5Nx"),a=t("TpfK");function u(n,e){for(var t=0;t<n.length;++t)if(n[t].unit===e)return t;return-1}n.exports=function(n){var e=new Set,t=8,s=[],f=[],l={list:s,removeChannel:function(n){if(!e.has(n.unit))throw new Error("You are trying delete something that does not exist");var t=u(f,n.unit);if(-1===t)throw new Error("You are trying delete something that does not exist");f[t].dispose(),f.splice(t,1);var r=u(s,n.unit);s.splice(r,1),e.delete(n.unit),i.removeChannel(n.unit);var o=!1;f.forEach(function(n){"audio"===n.kind&&(o=!0)}),i.setSoundIOSWarning(o)},addChannel:v,render:function(n,e){for(var t=0;t<f.length;++t)f[t].render(n,e)}};return function(){var n=i.getActiveChannels();if(!n)return;n.forEach(function(n){v(n.src,n.unit)})}(),l;function v(u,l){if("string"!=typeof u)throw new Error("implement me");if(e.has(l))throw new Error("This channel is already taken");if(void 0===l&&(l=function(){for(var n=0;n<t;++n)if(!e.has(n))return n}()),void 0===l)throw new Error("All channels are busy");var v;if(a(u)?(v=c(u,n,l),i.setSoundIOSWarning(!0)):v=function(n,e,t){var i,c,a,u=!0,s="iChannel"+t,f=s+"Res",l=Object.freeze({kind:"image",unit:t,load:function(){return r(n).then(function(n){return i=o.createTexture(e,n),c=n.width,a=n.height,l})},dispose:function(){i&&(e.deleteTexture(i),i=null)},render:function(n,r){if(!i)return;u&&(u=!1);e.activeTexture(e.TEXTURE0+t),e.bindTexture(e.TEXTURE_2D,i),e.uniform1i(n[s],t),e.uniform2f(n[f],c,a)}});return l}(u,n,l),!v)throw new Error("not implemented");f.push(v),e.add(l);var d={kind:v.kind,name:"iChannel"+l,unit:l,error:null,state:"loading",src:u,model:v};s.push(d),v.load().then(function(){d.state="ready",i.addChannel(l,u)}).catch(function(n){d.state="error",d.error=n})}}},ZwVy:function(n,e){n.exports=function(){return window.innerWidth<600}},fkI9:function(n,e){n.exports=function(n){!function(n){if(!n)throw new Error("Eventify cannot use falsy object as events subject");for(var e=["on","fire","off"],t=0;t<e.length;++t)if(n.hasOwnProperty(e[t]))throw new Error("Subject cannot be eventified, since it already has property '"+e[t]+"'")}(n);var e=function(n){var e=Object.create(null);return{on:function(t,r,o){if("function"!=typeof r)throw new Error("callback is expected to be a function");var i=e[t];return i||(i=e[t]=[]),i.push({callback:r,ctx:o}),n},off:function(t,r){var o=void 0===t;if(o)return e=Object.create(null),n;if(e[t]){var i="function"!=typeof r;if(i)delete e[t];else for(var c=e[t],a=0;a<c.length;++a)c[a].callback===r&&c.splice(a,1)}return n},fire:function(t){var r,o=e[t];if(!o)return n;arguments.length>1&&(r=Array.prototype.splice.call(arguments,1));for(var i=0;i<o.length;++i){var c=o[i];c.callback.apply(c.ctx,r)}return n}}}(n);return n.on=e.on,n.off=e.off,n.fire=e.fire,n}},hj6B:function(n,e,t){var r=t("p0Gt"),o="#include ",i="#define ",c={code:""};n.exports=function(n){if(!n)return new Promise(function(n){return n(c)});var e=function(n){var e=[],t=n.split("\n"),c=[],a=0,u=new Map;return t.forEach(function(n,t){a=t,n&&"#"===n[0]?(c.push(""),function(n){if(0===n.indexOf(o)){var t=n.substr(o.length),s=a;e.push(r(t).then(function(n){c[s]=n}))}else if(0===n.indexOf(i)){var f=n.match(/#define\s+([^\s].+)\s+(.+)$/);u.set(f[1],f[2])}}(n)):(u.size>0&&(n=function(n){return u.forEach(function(e,t){n=n.replace(new RegExp(t,"g"),e)}),n}(n)),c.push(n))}),{getCode:function(){return c.join("\n")},pending:e}}(n);return e.pending.length>0?Promise.all(e.pending).then(function(){return e}).catch(function(n){return{error:{error:n}}}):new Promise(function(n){return n(e)})}},oMW9:function(n,e,t){var r=t("D/cR");function o(n,e){var t=JSON.parse(n),r=e.length>1&&e[1];r||(r=Object.keys(t.files).filter(function(n){return n.match(/\.glsl$/)})[0]);var o=t.files[r];if(!o)throw new Error("Missing gist file "+e[0]+"/"+r);return o.content}n.exports=function(n){var e=n.split("/");return r("https://api.github.com/gists/"+e[0]).then(function(n){return o(n,e)}).catch(function(n){if(n&&n.response&&n.response.match(/rate limit/))return r("https://d2enmttf0dqrei.cloudfront.net/"+e[0]).then(function(n){return o(n,e)})})}},ognG:function(n,e,t){n.exports=function(n){return{fragmentShader:r(n),vertexShader:"\nprecision highp float;\nattribute vec2 a_pos;\nuniform sampler2D iChannel0, iChannel1, iChannel2, iChannel3;\nuniform vec2 iChannel0Res, iChannel1Res, iChannel2Res, iChannel3Res;\nuniform float iFrame;\nuniform float iTime;\nuniform vec4 iMouse;\nuniform vec2 iResolution;\nuniform vec3 iTransform;\nuniform vec4 iOrientation;\n\nvarying vec2 v_tex_pos;\nvarying vec2 vPos;\n\nvoid main() {\n  vec2 vt = 2.*(a_pos - iTransform.xy)/iTransform.z;\n  v_tex_pos = vec2(vt.x - 1., 1. - vt.y);\n  vec2 vv = vec2(2. * a_pos.x - 1., 1. - 2.*a_pos.y);\n  vPos = a_pos;\n  gl_Position = vec4(vv, 0, 1);\n}    \n"}};var r=t("AYEn")},p0Gt:function(n,e,t){var r=new Map,o=t("D/cR");n.exports=function(n){if(!n)return Promise.reject("Missing link");var e=n.trim();if(!e)return Promise.reject("Missing link");var t=r.get(e);return t?Promise.resolve(t):o(n).then(function(e){return r.set(n,e),e})}},viej:function(n,e,t){var r=t("TzId"),o=t("9SxT"),i=t("14gb"),c=document.getElementById("scene-canvas");function a(){var n=r(c);window.scene=n}c&&function(n){var e=window.innerWidth,t=window.innerHeight;n.width=e,n.height=t;var r={antialias:!1};n.getContext("webgl",r)||n.getContext("experimental-webgl",r)?(window.webGLEnabled=!0,o.ready?a():i.on("appstate-ready",a)):window.webGLEnabled=!1}(c),t.e(0).then(function(){t("A/fH")}.bind(null,t)).catch(t.oe)},wnUk:function(n,e){n.exports=function(n){var e=Number.POSITIVE_INFINITY,t=Number.NEGATIVE_INFINITY;n=n||100;var r=new Uint8Array(n),o=-1,i=!0;return{addSample:function(n){(o+=1)===r.length&&(o=0);var c=r[o];c!==e&&c!==t||(i=!0);r[o]=n},getFrequencyRatio:function(o){i&&function(){e=Number.POSITIVE_INFINITY,t=Number.NEGATIVE_INFINITY;for(var o=0;o<n;++o){var c=r[o];c<e&&(e=c),c>t&&(t=c)}i=!1}();return t===e?0:(o-e)/(t-e)}}}}},["viej"]);
//# sourceMappingURL=app.e2127664b6fa71a3575e.js.map