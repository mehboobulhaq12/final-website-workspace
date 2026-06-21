import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 aPos;
  varying vec2 vUv;

  void main() {
    vUv = aPos * 0.5 + 0.5;
    gl_Position = vec4(aPos, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float iTime;
  uniform vec2 iResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.02 + vec2(7.3, 1.1);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = iResolution.x / max(iResolution.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y);
    float t = iTime * 0.06;

    vec2 w = vec2(
      fbm(p * 2.0 + vec2(0.0, t * 1.3)),
      fbm(p * 2.0 + vec2(t, 4.0))
    );
    float f = fbm(p * 2.6 + w * 1.9 + vec2(t * 0.5, 0.0));

    vec2 cc = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
    float d = length(cc);
    float falloff = smoothstep(1.55, 0.05, d);
    falloff = pow(falloff, 1.05);
    float beams = pow(f * falloff, 1.35) * 2.3;

    vec3 purple = vec3(0.46, 0.18, 0.86);
    vec3 indigo = vec3(0.22, 0.30, 0.96);
    vec3 magenta = vec3(0.74, 0.26, 0.96);

    vec3 col = vec3(0.0);
    col += purple * beams;
    col += indigo * pow(f * falloff, 2.0) * 1.25;
    col += magenta * pow(max(f - 0.5, 0.0) * falloff, 1.4) * 1.6;

    float streak = smoothstep(0.7, 0.0, d) * (0.55 + 0.7 * f);
    col += vec3(0.6, 0.45, 1.0) * streak * falloff * 0.55;
    col *= smoothstep(1.7, 0.2, d);
    col = col / (1.0 + col);
    col = pow(col, vec3(0.86));

    gl_FragColor = vec4(col, 1.0);
  }
`;

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

export default function AeoShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      canvas.style.background = "#0a0414";
      return undefined;
    }

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return undefined;

    const program = gl.createProgram();
    if (!program) return undefined;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return undefined;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, "iTime");
    const resolutionUniform = gl.getUniformLocation(program, "iResolution");
    const isMobile = window.matchMedia("(max-width: 640px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.25);

    const resize = () => {
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(canvas);
    window.addEventListener("resize", resize, { passive: true });
    resize();

    const startedAt = performance.now();
    let frame = 0;

    const render = (now: number) => {
      resize();
      if (visible) {
        gl.uniform1f(timeUniform, reduceMotion ? 1.2 : (now - startedAt) / 1000);
        gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      frame = window.requestAnimationFrame(render);
    };

    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return <canvas ref={canvasRef} className="aeo-shader-canvas" aria-hidden="true" />;
}
