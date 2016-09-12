var baseVert = "attribute vec2 p;\nattribute vec2 uv;\nattribute vec4 c;\nvarying vec2 vuv;\nvarying vec4 vc;\nvoid main() {\n  gl_Position = vec4(p, 1, 1);\n  vuv = uv;\n  vc = c;\n}\n";
var blurFrag = "precision mediump float;\nuniform sampler2D t;\nuniform vec2 dir;\nvarying vec2 vuv;\nvoid main() {\n  vec2 d = vec2(480, 640);\n  vec2 o1 = vec2(1.385) * dir / d;\n  vec2 o2 = vec2(3.23) * dir / d;\n  gl_FragColor = texture2D(t, vuv) * 0.22704 +\n    texture2D(t, vuv + o1) * 0.31621 +\n    texture2D(t, vuv - o1) * 0.31621 +\n    texture2D(t, vuv + o2) * 0.07027 +\n    texture2D(t, vuv - o2) * 0.07027;\n}\n";
var copyFrag = "precision mediump float;\nuniform sampler2D t;\nvarying vec2 vuv;\nvoid main() {\n  gl_FragColor = texture2D(t, vuv);\n}\n";
var mixFrag = "precision mediump float;\nuniform sampler2D base;\nuniform sampler2D blur;\nuniform sampler2D trail;\nvarying vec2 vuv;\nvoid main() {\n    vec4 color = texture2D(base, vuv) +  texture2D(blur, vuv) + texture2D(trail, vuv) * 0.5;\n    gl_FragColor = vec4(vec3(1.0) - exp(-color.rgb * 1.0), color.a);\n}\n";
var staticVert = "attribute vec2 p;\nvarying vec2 vuv;\nvoid main() {\n  gl_Position = vec4(p, 1, 1);\n  vuv = 0.5 * (p + 1.0);\n}\n";
var textureFrag = "precision mediump float;\nuniform sampler2D t;\nvarying vec2 vuv;\nvarying vec4 vc;\nvoid main() {\n  vec4 color = texture2D(t, vuv);\n  if (color.r == color.g && color.g == color.b) {\n    gl_FragColor = color * vc;\n  } else {\n    gl_FragColor = color;\n  }\n}\n";
var thresholdFrag = "precision mediump float;\nuniform sampler2D t;\nvarying vec2 vuv;\nvoid main() {\n    vec3 c = texture2D(t, vuv).rgb;\n    float b = dot(c, vec3(1, 1, 1));\n    if (b > 0.65) {\n      gl_FragColor = vec4(c, 1);\n    } else {\n      gl_FragColor = vec4(0, 0, 0, 1);\n    }\n}\n";
var trailFrag = "precision mediump float;\nuniform sampler2D t;\nuniform sampler2D old;\nvarying vec2 vuv;\nvoid main() {\n  gl_FragColor = texture2D(t, vuv) + texture2D(old, vuv) * 0.6;\n}\n";
