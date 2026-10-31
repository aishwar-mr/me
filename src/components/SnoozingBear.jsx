import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic } from "lucide-react";
import { BEAR, EMAIL } from "@/content";
import { EASE } from "@/motion";

// Poonie's chat needs a server to reach OpenRouter; GitHub Pages is static,
// so the URL is configured per-deploy and the chat only offers itself when
// one is set. Everything else about the bear — roaming, sleeping, the spoken
// greeting — runs entirely in the browser and works with no backend at all.
const BACKEND = import.meta.env.VITE_BACKEND_URL ?? "";
const API = `${BACKEND}/api`;
const CHAT_ENABLED = Boolean(BACKEND);
const SPEED = 232;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Poonie speaks through the browser's own voice — no TTS service, no key.
// Canned lines and chat answers both run through here so the bear keeps one
// voice throughout. Voice lists load asynchronously, so an early call can see
// an empty list; that just means the browser default is used.
const VOICE_RATE = 0.85;
const VOICE_PITCH = 1.05;

function poonieVoice() {
  const voices = window.speechSynthesis?.getVoices?.() ?? [];
  if (!voices.length) return undefined;
  const english = voices.filter((v) => /^en/i.test(v.lang));
  const pool = english.length ? english : voices;
  return (
    pool.find((v) => /natural|premium|enhanced|neural/i.test(v.name)) ??
    pool.find((v) => /^en-(US|GB)/i.test(v.lang)) ??
    pool[0]
  );
}

function utter(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.rate = VOICE_RATE;
  u.pitch = VOICE_PITCH;
  const v = poonieVoice();
  if (v) u.voice = v;
  return u;
}

const POSES = {
  sleep: { rotY: 2.4, rotZ: -1.02, headRotX: 0.85, headY: 0.98, armX: -1.95, armZ: 0.35, legX: -1.75, mouth: 0.01, eyeOpen: 0, rootY: 0.22 },
  awake: { rotY: 2.4, rotZ: 0, headRotX: -0.05, headY: 1.45, armX: -0.15, armZ: 0.2, legX: 0, mouth: 0.01, eyeOpen: 1, rootY: 0.05 },
  turned: { rotY: 0, rotZ: 0, headRotX: -0.02, headY: 1.45, armX: -0.15, armZ: 0.2, legX: 0, mouth: 0.01, eyeOpen: 1, rootY: 0 },
  walkFace: { rotY: 1.25, rotZ: 0, headRotX: 0.02, headY: 1.45, armX: -0.15, armZ: 0.2, legX: 0, mouth: 0.01, eyeOpen: 1, rootY: 0 },
  walkFaceL: { rotY: 1.89, rotZ: 0, headRotX: 0.02, headY: 1.45, armX: -0.15, armZ: 0.2, legX: 0, mouth: 0.01, eyeOpen: 1, rootY: 0 },
  yawn: { rotY: 0, rotZ: 0, headRotX: -0.28, headY: 1.42, armX: -2.75, armZ: 0.95, legX: 0, mouth: 1.25, eyeOpen: 0.35, rootY: 0.05 },
};

const easeInOut = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const easeSine = (k) => -(Math.cos(Math.PI * k) - 1) / 2;

function initBear(THREE, mount, wrapper, { onReady, onFail, setApi, isStatic }) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    onFail();
    return () => {};
  }
  const W = 250;
  const H = 280;
  renderer.setSize(W, H, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  mount.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, W / H, 0.1, 100);
  camera.position.set(-0.2, 1.35, 5.2);
  camera.lookAt(-0.2, 0.7, 0);

  scene.add(new THREE.HemisphereLight(0xfff6e8, 0xcdbba4, 1.05));
  const dir = new THREE.DirectionalLight(0xffe9cf, 1.7);
  dir.position.set(-3, 5, 3);
  dir.castShadow = true;
  dir.shadow.mapSize.set(1024, 1024);
  dir.shadow.camera.left = -4;
  dir.shadow.camera.right = 4;
  dir.shadow.camera.top = 4;
  dir.shadow.camera.bottom = -4;
  dir.shadow.radius = 6;
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0xd8e6f0, 0.5);
  fill.position.set(3, 2, -2);
  scene.add(fill);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 48),
    new THREE.ShadowMaterial({ opacity: 0.16 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const fur = new THREE.MeshStandardMaterial({ color: 0x8a5a3b, roughness: 0.95 });
  const furDark = new THREE.MeshStandardMaterial({ color: 0x744a30, roughness: 0.95 });
  const muzzleMat = new THREE.MeshStandardMaterial({ color: 0xd9a878, roughness: 0.9 });
  const cream = new THREE.MeshStandardMaterial({ color: 0xe8d3b5, roughness: 0.9 });
  const inkMat = new THREE.MeshStandardMaterial({ color: 0x241a12, roughness: 0.6 });

  const root = new THREE.Group();
  root.rotation.order = "ZYX";
  scene.add(root);
  const breathe = new THREE.Group();
  root.add(breathe);

  const shadowed = (mesh) => {
    mesh.castShadow = true;
    return mesh;
  };

  const body = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.85, 40, 40), fur));
  body.position.set(0, 0.58, 0);
  body.scale.set(0.95, 1.1, 0.9);
  breathe.add(body);

  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.55, 32, 32), cream);
  belly.position.set(0, 0.5, 0.42);
  belly.scale.set(0.85, 0.95, 0.55);
  breathe.add(belly);

  const head = new THREE.Group();
  head.position.set(0, 1.12, 0.12);
  breathe.add(head);
  const skull = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.58, 40, 40), fur));
  skull.position.set(0, 0.15, 0.1);
  head.add(skull);
  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.3, 32, 32), muzzleMat);
  snout.position.set(0, 0.02, 0.5);
  snout.scale.set(1.1, 0.8, 0.85);
  head.add(snout);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.1, 24, 24), inkMat);
  nose.position.set(0, 0.11, 0.74);
  head.add(nose);
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.07, 20, 20), inkMat);
  mouth.position.set(0, -0.14, 0.66);
  head.add(mouth);
  const earL = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.21, 28, 28), fur));
  earL.position.set(-0.4, 0.62, -0.02);
  head.add(earL);
  const earR = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.21, 28, 28), fur));
  earR.position.set(0.4, 0.62, -0.02);
  head.add(earR);
  const earInL = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 20), muzzleMat);
  earInL.position.set(-0.4, 0.62, 0.12);
  head.add(earInL);
  const earInR = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 20), muzzleMat);
  earInR.position.set(0.4, 0.62, 0.12);
  head.add(earInR);

  const eyeGeo = new THREE.SphereGeometry(0.085, 24, 24);
  const eyeL = new THREE.Mesh(eyeGeo, inkMat);
  eyeL.position.set(-0.24, 0.26, 0.58);
  head.add(eyeL);
  const eyeR = new THREE.Mesh(eyeGeo, inkMat);
  eyeR.position.set(0.24, 0.26, 0.58);
  head.add(eyeR);
  const lidGeo = new THREE.TorusGeometry(0.085, 0.018, 12, 24, Math.PI * 0.85);
  const lidL = new THREE.Mesh(lidGeo, inkMat);
  lidL.position.set(-0.24, 0.245, 0.585);
  lidL.rotation.z = Math.PI + (Math.PI - Math.PI * 0.85) / 2;
  head.add(lidL);
  const lidR = new THREE.Mesh(lidGeo, inkMat);
  lidR.position.set(0.24, 0.245, 0.585);
  lidR.rotation.z = Math.PI + (Math.PI - Math.PI * 0.85) / 2;
  head.add(lidR);

  const makeArm = (side) => {
    const g = new THREE.Group();
    g.position.set(0.78 * side, 1.02, 0.05);
    const m = shadowed(new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.5, 8, 16), furDark));
    m.position.set(0, -0.32, 0);
    g.add(m);
    const paw = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.17, 24, 24), muzzleMat));
    paw.position.set(0, -0.62, 0);
    g.add(paw);
    breathe.add(g);
    return g;
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);

  const makeLeg = (side) => {
    const g = new THREE.Group();
    g.position.set(0.36 * side, 0.35, 0.3);
    const m = shadowed(new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.4, 8, 16), furDark));
    m.position.set(0, -0.3, 0);
    g.add(m);
    const foot = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.19, 24, 24), muzzleMat));
    foot.position.set(0, -0.55, 0.05);
    g.add(foot);
    breathe.add(g);
    return g;
  };
  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  const P = {
    rotY: (v) => (root.rotation.y = v),
    rotZ: (v) => (root.rotation.z = v),
    headRotX: (v) => (head.rotation.x = v),
    headY: (v) => (head.position.y = v),
    armX: (v) => {
      armL.rotation.x = v;
      armR.rotation.x = v;
    },
    armZ: (v) => {
      armL.rotation.z = -v;
      armR.rotation.z = v;
    },
    legX: (v) => {
      legL.rotation.x = v;
      legR.rotation.x = v;
    },
    mouth: (v) => mouth.scale.set(Math.max(v, 0.001), Math.max(v, 0.001), Math.max(v, 0.001)),
    eyeOpen: (v) => {
      const s = Math.max(v, 0.001);
      eyeL.scale.setScalar(s);
      eyeR.scale.setScalar(s);
      const l = Math.max(1 - v, 0.001);
      lidL.scale.setScalar(l);
      lidR.scale.setScalar(l);
    },
    rootY: (v) => (root.position.y = v),
  };
  const setTop = (v) => (wrapper.style.top = Math.round(v) + "px");
  let xCur = 0;
  const setX = (v) => {
    xCur = v;
    wrapper.style.transform = `translateX(${Math.round(v)}px)`;
  };

  const state = { isSleeping: true };
  const walk = { active: false, baseY: 0 };
  const talkState = { on: false };
  const lineAudio = { cur: null };
  const cur = { ...POSES.sleep };
  Object.entries(POSES.sleep).forEach(([k, v]) => P[k](v));

  const active = new Set();
  const animate = (setter, from, to, dur, ease = easeInOut) =>
    new Promise((res) => active.add({ t0: performance.now(), dur, from, to, setter, ease, res }));

  const tw = (target, dur) =>
    Promise.all(
      Object.entries(target).map(([k, to]) =>
        animate((v) => {
          cur[k] = v;
          P[k](v);
        }, cur[k], to, dur)
      )
    ).then(() => {
      Object.assign(cur, target);
      state.isSleeping = target === POSES.sleep;
    });

  const cancelAll = () => {
    active.forEach((tw_) => {
      const k = Math.min(1, (performance.now() - tw_.t0) / tw_.dur);
      tw_.setter(tw_.from + (tw_.to - tw_.from) * tw_.ease(k));
      tw_.res();
    });
    active.clear();
  };

  const walkTo = (from, to, dur) => {
    walk.active = true;
    walk.baseY = cur.rootY;
    return Promise.all([
      animate(setTop, from.y, to.y, dur, easeSine),
      animate(setX, from.x, to.x, dur, easeSine),
    ]);
  };

  const stopWalk = () => {
    walk.active = false;
    cur.legX = 0;
    cur.armX = -0.15;
    cur.armZ = 0.2;
    cur.rootY = walk.baseY;
    P.rootY(walk.baseY);
  };

  const stir = async () => {
    await animate((v) => (breathe.rotation.z = 0.05 * Math.sin(v * Math.PI)), 0, 1, 420);
    animate((v) => (earR.rotation.z = -0.45 * Math.sin(v * Math.PI)), 0, 1, 240);
  };

  const playLine = (src, text) =>
    new Promise((resolve) => {
      let done = false;
      let started = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearInterval(flap);
        P.mouth(0.01);
        resolve();
      };
      const flap = setInterval(() => {
        P.mouth(cur.mouth > 0.25 ? 0.12 : 0.5);
      }, 165);
      const startSpeech = () => {
        if (started) {
          setTimeout(finish, 2600);
          return;
        }
        started = true;
        try {
          const u = utter(text);
          u.onend = finish;
          u.onerror = finish;
          window.speechSynthesis.speak(u);
        } catch {
          setTimeout(finish, 2600);
        }
      };
      // No recordings ship today, so src is normally null and the browser
      // voice speaks the line instead. Setting a path in content.js is all it
      // takes to prefer a real recording.
      if (!src) {
        startSpeech();
      } else {
        const audio = new Audio(src);
        lineAudio.cur = audio;
        audio.onended = finish;
        audio.onpause = finish;
        audio.onerror = startSpeech;
        audio.play().catch(startSpeech);
      }
      setTimeout(finish, 11000);
    });

  const setTalking = (on) => {
    talkState.on = !!on;
    if (!on) P.mouth(0.01);
  };
  const stopLine = () => {
    try {
      lineAudio.cur?.pause();
      window.speechSynthesis?.cancel();
    } catch {}
  };

  setApi({
    tw,
    stir,
    playLine,
    walkTo,
    stopWalk,
    cancelAll,
    stopLine,
    setTalking,
    getX: () => xCur,
    setTop,
  });

  const cleanup = () => {
    io.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    if (raf) cancelAnimationFrame(raf);
    active.clear();
    renderer.dispose();
    renderer.domElement.remove();
  };

  if (isStatic) {
    setTop(parseFloat(wrapper.style.top) || 60);
    renderer.render(scene, camera);
    onReady();
    return () => {
      renderer.dispose();
      renderer.domElement.remove();
    };
  }

  let raf = 0;
  let visible = true;
  let pageVisible = true;
  let twitchAt = 2.5;
  let twitchBusy = false;
  const clock = new THREE.Clock();

  const loop = () => {
    const t = clock.getElapsedTime();
    const b = Math.sin(t * 1.9);
    breathe.scale.y = 1 + 0.03 * b;
    breathe.scale.x = breathe.scale.z = 1 - 0.012 * b;
    if (talkState.on) P.mouth(0.22 + 0.28 * Math.abs(Math.sin(t * 9.5)));
    if (walk.active) {
      const s = Math.sin(t * Math.PI * 2 * 1.35);
      legL.rotation.x = 0.55 * s;
      legR.rotation.x = -0.55 * s;
      armL.rotation.x = -0.15 - 0.3 * s;
      armR.rotation.x = -0.15 + 0.3 * s;
      root.position.y = walk.baseY + 0.045 * Math.abs(Math.sin(t * Math.PI * 1.35));
      breathe.rotation.x = 0.06;
    }
    if (t > twitchAt && !twitchBusy && state.isSleeping) {
      twitchBusy = true;
      twitchAt = t + 3.5 + Math.random() * 3.5;
      animate((v) => (earL.rotation.z = 0.45 * Math.sin(v * Math.PI)), 0, 1, 260).then(() => {
        twitchBusy = false;
      });
    }
    const now = performance.now();
    active.forEach((tw_) => {
      const k = Math.min(1, (now - tw_.t0) / tw_.dur);
      tw_.setter(tw_.from + (tw_.to - tw_.from) * tw_.ease(k));
      if (k >= 1) {
        active.delete(tw_);
        tw_.res();
      }
    });
    renderer.render(scene, camera);
    raf = visible && pageVisible ? requestAnimationFrame(loop) : 0;
  };

  const setRunning = () => {
    if (visible && pageVisible && !raf) raf = requestAnimationFrame(loop);
    if ((!visible || !pageVisible) && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
  const io = new IntersectionObserver((e) => {
    visible = e[0].isIntersecting;
    setRunning();
  });
  io.observe(mount);
  const onVis = () => {
    pageVisible = !document.hidden;
    setRunning();
  };
  document.addEventListener("visibilitychange", onVis);

  onReady();
  raf = requestAnimationFrame(loop);

  return cleanup;
}

export function SnoozingBear() {
  const mountRef = useRef(null);
  const anchorRef = useRef(null);
  const apiRef = useRef(null);
  const busy = useRef(false);
  const deepRef = useRef(false);
  const doormanSpoken = useRef(0);
  const stateRef = useRef("sleep");
  const timerRef = useRef(0);
  const walkIdRef = useRef(0);
  const chatOpenRef = useRef(false);
  const wokenRef = useRef(false);
  const checkInRef = useRef(0);
  const lastSettleRef = useRef(-1);
  const msgsRef = useRef(null);
  const speakGenRef = useRef(0);
  const pumpingGenRef = useRef(null);
  const abortsRef = useRef(new Set());
  const queueRef = useRef([]);
  const pendingRef = useRef("");
  const stickToBottomRef = useRef(true);
  const streamingRef = useRef(false);
  const recRef = useRef(null);
  const heardRef = useRef("");
  const sessionRef = useRef(
    Math.random().toString(36).slice(2) + Date.now().toString(36)
  );
  const msgsBoxRef = useRef(null);
  const [ready3d, setReady3d] = useState(false);
  const [glFailed, setGlFailed] = useState(false);
  const [cozyText, setCozyText] = useState("");
  const [deep, setDeep] = useState(false);
  const [sleeping, setSleeping] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const [msgs, setMsgs] = useState([
    { role: "bear", content: BEAR.lines.doorman },
  ]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [recording, setRecording] = useState(false);
  const [micNote, setMicNote] = useState("");
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
  if (msgsRef.current === null) msgsRef.current = msgs;

  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    const start = async () => {
      try {
        const THREE = await import("three");
        if (cancelled || !mountRef.current || !anchorRef.current) return;
        cleanup = initBear(THREE, mountRef.current, anchorRef.current, {
          onReady: () => setReady3d(true),
          onFail: () => setGlFailed(true),
          setApi: (api) => (apiRef.current = api),
          isStatic: reduced,
        });
      } catch {
        setGlFailed(true);
      }
    };
    const t = window.setTimeout(() => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 2500 });
      else start();
    }, 1200);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
      cleanup();
    };
  }, [reduced]);

  // Leaving the page mid-sentence shouldn't leave the mic hot or the voice
  // still running.
  useEffect(
    () => () => {
      try {
        recRef.current?.abort?.();
      } catch {}
      try {
        window.speechSynthesis?.cancel();
      } catch {}
    },
    []
  );

  const usableApi = useCallback(() => (reduced ? null : apiRef.current), [reduced]);

  const currentTop = useCallback(
    () => (anchorRef.current ? parseFloat(anchorRef.current.style.top) || 60 : 60),
    []
  );

  const maxTop = useCallback(() => {
    const host = anchorRef.current?.parentElement;
    const h = host ? host.clientHeight : 4000;
    return Math.max(300, h - 300);
  }, []);

  const planWalk = useCallback(
    (D) => {
      const anchor = anchorRef.current;
      const vw = window.innerWidth;
      const wW = anchor?.offsetWidth || 250;
      const hRoom = Math.max(0, Math.min(vw - wW - 40, 480));
      const y0 = currentTop();
      const x0 = usableApi()?.getX() ?? 0;
      const roomDown = maxTop() - y0;
      const dy = roomDown > 40 ? Math.min(D, roomDown) : -Math.min(D, y0 - 60);
      const rem = Math.max(0, D - Math.abs(dy));
      const pats = hRoom > 40 ? ["down", "across", "diag", "zig"] : ["down"];
      const pat = pats[Math.floor(Math.random() * pats.length)];
      const clampX = (x) => Math.max(-hRoom, Math.min(0, x));
      const clampY = (y) => Math.max(60, Math.min(maxTop(), y));
      let wps;
      if (pat === "down") {
        wps = [{ x: x0, y: clampY(y0 + dy) }];
      } else if (pat === "across") {
        const dirX = x0 < -8 ? 1 : -1;
        wps = [
          {
            x: clampX(x0 + dirX * Math.min(hRoom, rem + Math.abs(x0))),
            y: clampY(y0 + dy * 0.2),
          },
        ];
      } else if (pat === "diag") {
        const dirX = x0 < -hRoom * 0.5 ? 1 : -1;
        wps = [{ x: clampX(x0 + dirX * hRoom * 0.6), y: clampY(y0 + dy * 0.8) }];
      } else {
        const dirX = x0 < -hRoom * 0.5 ? 1 : -1;
        wps = [
          { x: clampX(x0 + dirX * hRoom * 0.4), y: clampY(y0 + dy * 0.35) },
          { x: clampX(x0 - dirX * hRoom * 0.1), y: clampY(y0 + dy * 0.7) },
          { x: clampX(x0 + dirX * hRoom * 0.45), y: clampY(y0 + dy) },
        ];
      }
      return wps;
    },
    [currentTop, maxTop, usableApi]
  );

  const scheduleNextWalk = useCallback(() => {
    if (reduced || chatOpenRef.current) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => runWalkRef.current(), 15000);
  }, [reduced]);

  const armCheckIn = useCallback(() => {
    window.clearTimeout(checkInRef.current);
    checkInRef.current = window.setTimeout(() => setCheckIn(true), 5000);
  }, []);

  const clearCheckIn = useCallback(() => {
    window.clearTimeout(checkInRef.current);
    setCheckIn(false);
  }, []);

  const pickSettles = useCallback(() => {
    const n = BEAR.settles.length;
    const pickDiff = (exclude) => {
      let i;
      do {
        i = Math.floor(Math.random() * n);
      } while (i === exclude && n > 1);
      return i;
    };
    const idxs = [pickDiff(lastSettleRef.current)];
    if (Math.random() < 0.15) idxs.push(pickDiff(idxs[0]));
    lastSettleRef.current = idxs[idxs.length - 1];
    return idxs.map((i) => BEAR.settles[i]);
  }, []);

  const settleAndSleep = useCallback(async () => {
    const api = usableApi();
    stateRef.current = "settling";
    if (api) {
      await api.tw({ rotY: 0, rotZ: 0, headRotX: -0.02, headY: 1.45, armX: -0.15, armZ: 0.2, legX: 0, mouth: 0.01, eyeOpen: 1, rootY: 0 }, 500);
      if (!deepRef.current && !chatOpenRef.current) {
        const picks = pickSettles();
        setCozyText(picks.map((p) => p.text).join(" "));
        for (const p of picks) {
          await api.playLine(p.audio, p.text);
        }
        await wait(1000);
        setCozyText("");
      }
      await api.tw(POSES.sleep, 1100);
    }
    setSleeping(true);
    stateRef.current = "sleep";
  }, [usableApi, pickSettles]);

  const runWalk = useCallback(async () => {
    if (busy.current) {
      scheduleNextWalk();
      return;
    }
    const api = usableApi();
    busy.current = true;
    const id = ++walkIdRef.current;
    try {
      const span = maxTop() - 60;
      const D = span / 4;
      stateRef.current = "walking";
      setSleeping(false);
      if (api) {
        await api.tw(POSES.walkFace, 800);
        if (id !== walkIdRef.current) return;
        const wps = planWalk(D);
        for (const wp of wps) {
          const from = { y: currentTop(), x: api.getX() };
          const dist = Math.hypot(wp.x - from.x, wp.y - from.y);
          if (dist < 8) continue;
          if (wp.x < from.x - 8) await api.tw(POSES.walkFaceL, 350);
          else if (wp.x > from.x + 8) await api.tw(POSES.walkFace, 350);
          if (id !== walkIdRef.current) return;
          await api.walkTo(from, wp, Math.max(600, (dist / SPEED) * 1000));
          if (id !== walkIdRef.current) return;
        }
        api.stopWalk();
        await settleAndSleep();
      } else {
        const wps = planWalk(D);
        const last = wps[wps.length - 1];
        if (anchorRef.current) {
          anchorRef.current.style.top = Math.round(last.y) + "px";
          anchorRef.current.style.transform = `translateX(${Math.round(last.x)}px)`;
        }
        await settleAndSleep();
      }
    } finally {
      if (id === walkIdRef.current) busy.current = false;
      scheduleNextWalk();
    }
  }, [usableApi, maxTop, planWalk, currentTop, settleAndSleep, scheduleNextWalk]);

  const runWalkRef = useRef(runWalk);
  useEffect(() => {
    runWalkRef.current = runWalk;
  }, [runWalk]);

  const stopSpeaking = useCallback(() => {
    // Bump the generation first: in-flight utterances fire onerror when the
    // synth is cancelled, and the guard keeps that from starting the next one.
    speakGenRef.current += 1;
    abortsRef.current.forEach((c) => c.abort());
    abortsRef.current.clear();
    queueRef.current = [];
    pendingRef.current = "";
    try {
      window.speechSynthesis?.cancel();
    } catch {}
    apiRef.current?.stopLine?.();
    apiRef.current?.setTalking?.(false);
    setSpeaking(false);
    if (streamingRef.current) {
      const next = [...msgsRef.current];
      const last = next[next.length - 1];
      if (last && last.role === "bear" && !last.content.trim()) {
        next.pop();
        msgsRef.current = next;
        setMsgs(next);
      }
    }
    streamingRef.current = false;
    setStreaming(false);
  }, []);

  const openChat = useCallback(() => {
    window.clearTimeout(timerRef.current);
    setChatOpen(true);
    chatOpenRef.current = true;
    setSleeping(false);
    clearCheckIn();
    if (reduced) {
      armCheckIn();
      return;
    }
    if (deepRef.current || doormanSpoken.current >= 2) {
      setDeep(true);
      armCheckIn();
      return;
    }
    doormanSpoken.current += 1;
    busy.current = true;
    wokenRef.current = true;
    (async () => {
      const api = usableApi();
      if (api) {
        await api.tw(POSES.awake, 800);
        await api.tw(POSES.turned, 700);
        await api.playLine(BEAR.audio.doorman, BEAR.lines.doorman);
      }
      busy.current = false;
      if (doormanSpoken.current >= 2) setDeep(true);
      armCheckIn();
    })();
  }, [reduced, usableApi, clearCheckIn, armCheckIn]);

  const sleepAndClose = useCallback(() => {
    stopSpeaking();
    clearCheckIn();
    setChatOpen(false);
    chatOpenRef.current = false;
    setSleeping(true);
    stateRef.current = "sleep";
    const api = usableApi();
    if (api && wokenRef.current) {
      busy.current = true;
      (async () => {
        await api.tw(POSES.yawn, 950);
        await api.tw(POSES.awake, 450);
        await api.tw(POSES.sleep, 1100);
        wokenRef.current = false;
        busy.current = false;
      })();
    } else {
      wokenRef.current = false;
    }
    scheduleNextWalk();
  }, [clearCheckIn, usableApi, scheduleNextWalk, stopSpeaking]);

  const closeChat = useCallback(() => {
    sleepAndClose();
  }, [sleepAndClose]);

  const poke = useCallback(() => {
    if (busy.current) return;
    if (stateRef.current === "walking") {
      walkIdRef.current += 1;
      busy.current = true;
      const api = usableApi();
      if (api) {
        api.cancelAll();
        api.stopWalk();
      }
      settleAndSleep().finally(() => {
        busy.current = false;
        scheduleNextWalk();
      });
      return;
    }
    if (chatOpenRef.current) return;
    openChat();
  }, [settleAndSleep, scheduleNextWalk, usableApi, openChat]);

  useEffect(() => {
    if (reduced || !ready3d) return;
    scheduleNextWalk();
    return () => window.clearTimeout(timerRef.current);
  }, [ready3d, reduced, scheduleNextWalk]);

  // Speaks the queued sentences one at a time. setTalking drives the mouth in
  // the render loop, so the bear's face moves for as long as it has something
  // left to say.
  const pump = useCallback(() => {
    const gen = speakGenRef.current;
    if (pumpingGenRef.current === gen) return;
    pumpingGenRef.current = gen;
    const next = () => {
      if (speakGenRef.current !== gen) return;
      const text = queueRef.current.shift();
      if (!text) {
        pumpingGenRef.current = null;
        apiRef.current?.setTalking?.(false);
        setSpeaking(false);
        return;
      }
      apiRef.current?.setTalking?.(true);
      let advanced = false;
      let guard = 0;
      const done = () => {
        if (advanced) return;
        advanced = true;
        window.clearTimeout(guard);
        next();
      };
      try {
        const u = utter(text);
        u.onend = done;
        u.onerror = done;
        window.speechSynthesis.speak(u);
        // Chrome sometimes never fires onend (backgrounded tabs, some voices).
        // Without this the queue stalls with the mouth still flapping.
        guard = window.setTimeout(done, Math.min(20000, 2500 + text.length * 140));
      } catch {
        done();
      }
    };
    next();
  }, []);

  const speakLine = useCallback(
    (text) => {
      if (deepRef.current) return;
      queueRef.current.push(text);
      setSpeaking(true);
      pump();
    },
    [pump]
  );

  const drainSentences = useCallback(
    (final = false) => {
      const s = pendingRef.current;
      if (!s.trim()) {
        pendingRef.current = "";
        return;
      }
      let cut = 0;
      if (final) {
        cut = s.length;
      } else {
        const re = /[.!?…]+["')\]]*\s+/g;
        let m;
        while ((m = re.exec(s))) cut = m.index + m[0].length;
      }
      const head = s.slice(0, cut).trim();
      pendingRef.current = s.slice(cut);
      if (head) speakLine(head);
    },
    [speakLine]
  );

  const appendDelta = useCallback((delta) => {
    const next = [...msgsRef.current];
    const last = next[next.length - 1];
    next[next.length - 1] = { ...last, content: last.content + delta };
    msgsRef.current = next;
    setMsgs(next);
  }, []);

  const ask = useCallback(
    async (q) => {
      if (streamingRef.current) return;
      clearCheckIn();
      apiRef.current?.stopLine?.();
      stickToBottomRef.current = true;
      speakGenRef.current += 1;
      const gen = speakGenRef.current;
      const askCtl = new AbortController();
      abortsRef.current.add(askCtl);
      const base = msgsRef.current.slice(-6).map((m) => ({ role: m.role, content: m.content }));
      const withQ = [
        ...msgsRef.current,
        { role: "visitor", content: q },
        { role: "bear", content: "" },
      ];
      msgsRef.current = withQ;
      setMsgs(withQ);
      setStreaming(true);
      streamingRef.current = true;
      pendingRef.current = "";
      let full = "";
      try {
        const res = await fetch(`${API}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: q, history: base, session_id: sessionRef.current }),
          signal: askCtl.signal,
        });
        const reader = res.body.getReader();
        const dec = new TextDecoder();
        let buf = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += dec.decode(value, { stream: true });
          const parts = buf.split("\n\n");
          buf = parts.pop();
          for (const p of parts) {
            const line = p.trim();
            if (!line.startsWith("data:")) continue;
            let payload;
            try {
              payload = JSON.parse(line.slice(5));
            } catch {
              continue;
            }
            if (payload.delta) {
              appendDelta(payload.delta);
              full += payload.delta;
              pendingRef.current += payload.delta;
              drainSentences();
            }
            if (payload.error) {
              appendDelta("");
              appendDelta(" …the bear lost the thread there. Try once more?");
            }
          }
        }
      } catch {
        if (speakGenRef.current === gen) {
          appendDelta(" …the bear dozed off mid-thought. Try once more?");
        }
      } finally {
        abortsRef.current.delete(askCtl);
        if (speakGenRef.current === gen) {
          drainSentences(true);
        }
        streamingRef.current = false;
        setStreaming(false);
        armCheckIn();
      }
    },
    [clearCheckIn, appendDelta, drainSentences, armCheckIn]
  );

  const note = useCallback((msg) => {
    setMicNote(msg);
    window.setTimeout(() => setMicNote(""), 4000);
  }, []);

  // Listens through the browser's own recogniser — same trade as Poonie's
  // voice: no speech service, no key, and it still works once this is a
  // static site. The transcript fills the input live, then asks on its own
  // once you stop talking.
  const startRecording = useCallback(() => {
    if (recording || streaming) return;
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      note("This browser can't listen — type instead.");
      return;
    }
    // Poonie's own voice would otherwise be transcribed back as the question.
    stopSpeaking();
    let rec;
    try {
      rec = new Recognition();
    } catch {
      note("Mic unavailable here — type instead.");
      return;
    }
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;
    heardRef.current = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i += 1) {
        const r = e.results[i];
        if (r.isFinal) heardRef.current += r[0].transcript;
        else interim += r[0].transcript;
      }
      setDraft((heardRef.current + interim).trim());
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        note("Mic permission blocked — allow it, or type instead.");
      } else if (e.error === "no-speech") {
        note("Heard nothing — try again or type.");
      } else if (e.error !== "aborted") {
        note("That didn't come through — type instead.");
      }
    };
    rec.onend = () => {
      recRef.current = null;
      setRecording(false);
      const q = heardRef.current.trim();
      heardRef.current = "";
      if (q) {
        setDraft("");
        ask(q);
      }
    };
    recRef.current = rec;
    try {
      rec.start();
      setRecording(true);
    } catch {
      note("Mic unavailable here — type instead.");
    }
  }, [recording, streaming, ask, stopSpeaking, note]);

  const stopRecording = useCallback(() => {
    try {
      recRef.current?.stop();
    } catch {}
    setRecording(false);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const q = draft.trim();
    if (!q || streaming) return;
    setDraft("");
    ask(q);
  };

  // Follow the newest message, unless the visitor has scrolled up to read
  // back — streaming deltas land every few hundred ms and would otherwise
  // drag the view back down mid-read.
  const onMsgsScroll = useCallback(() => {
    const box = msgsBoxRef.current;
    if (!box) return;
    stickToBottomRef.current = box.scrollHeight - box.scrollTop - box.clientHeight < 24;
  }, []);

  useEffect(() => {
    const box = msgsBoxRef.current;
    if (box && stickToBottomRef.current) box.scrollTop = box.scrollHeight;
  }, [msgs, checkIn]);

  const show3d = ready3d && !glFailed;

  return (
    <div className="bear-anchor" ref={anchorRef} data-testid="bear-anchor">
      <div className="bear-widget" data-testid="bear-widget">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              key="chat"
              className={`bear-chat ${
                chatOpen &&
                anchorRef.current &&
                (parseFloat(anchorRef.current.style.top) || 60) < 420
                  ? "bear-chat-below"
                  : ""
              }`}
              data-testid="bear-chat"
              initial={{ opacity: 0, y: 14, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.94 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="bear-chat-head">
                <span className="bear-chat-title" data-testid="poonie-chat-title">
                  Poonie
                </span>
                <button
                  className="bear-chat-close"
                  data-testid="bear-chat-close"
                  onClick={closeChat}
                  aria-label="Close chat"
                >
                  &times;
                </button>
              </div>
              <div
                className="bear-chat-msgs"
                data-testid="bear-chat-msgs"
                ref={msgsBoxRef}
                onScroll={onMsgsScroll}
              >
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={`bear-chat-msg ${m.role === "visitor" ? "visitor" : "bear"}`}
                    data-testid={m.role === "visitor" ? "bear-chat-msg-visitor" : "bear-chat-msg-bear"}
                  >
                    {m.content
                      ? m.content
                      : i === msgs.length - 1 && streaming
                        ? "…"
                        : m.content}
                  </div>
                ))}
              </div>
              {checkIn && !streaming && (
                <motion.div
                  className="bear-checkin"
                  data-testid="poonie-checkin"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p>Would you like to know anything else?</p>
                  <div className="bear-checkin-btns">
                    <button
                      data-testid="poonie-ask-more"
                      onClick={() => {
                        setCheckIn(false);
                        armCheckIn();
                      }}
                    >
                      Ask more
                    </button>
                    <button data-testid="poonie-no-sleep" onClick={sleepAndClose}>
                      No — sleep
                    </button>
                  </div>
                </motion.div>
              )}
              {micNote && (
                <p className="mic-note" data-testid="bear-chat-mic-note">
                  {micNote}
                </p>
              )}
              {!CHAT_ENABLED && (
                <p className="mic-note" data-testid="bear-chat-offline">
                  Poonie can only chat where there's a server to think on — for
                  now, write to{" "}
                  <a href={`mailto:${EMAIL}`} className="underline">
                    {EMAIL}
                  </a>
                  .
                </p>
              )}
              {CHAT_ENABLED && (
              <form className="bear-chat-form" onSubmit={submit}>
                <button
                  type="button"
                  className={`bear-chat-mic ${recording ? "rec" : ""}`}
                  data-testid="bear-chat-mic"
                  onClick={recording ? stopRecording : startRecording}
                  disabled={streaming}
                  aria-label={recording ? "Stop listening" : "Ask by voice"}
                  title={recording ? "Stop listening" : "Ask by voice"}
                >
                  <Mic size={15} />
                </button>
                <input
                  data-testid="bear-chat-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={recording ? "Listening…" : "Ask Poonie about Aishwar…"}
                  aria-label="Ask Poonie about Aishwar"
                />
                {streaming || speaking ? (
                  <button
                    type="button"
                    className="bear-chat-send stop"
                    data-testid="bear-chat-stop"
                    onClick={stopSpeaking}
                  >
                    Stop
                  </button>
                ) : (
                  <button
                    data-testid="bear-chat-send"
                    className="bear-chat-send"
                    disabled={recording || !draft.trim()}
                  >
                    Ask
                  </button>
                )}
              </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {cozyText && (
            <motion.div
              key="cozy"
              data-testid="bear-bubble-cozy"
              className="bear-cloud"
              initial={{ opacity: 0, y: 12, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span className="bear-tail" aria-hidden="true" />
              <span className="bear-tail2" aria-hidden="true" />
              <p className="text-[15px] leading-snug text-ink">{cozyText}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {deep && !chatOpen && (
          <div className="bear-deep" data-testid="bear-deep-note">
            Zzz — deep asleep
          </div>
        )}
        {sleeping && !cozyText && !chatOpen && (
          <div className="bear-zzz" aria-hidden="true">
            <span>Z</span>
            <span>Z</span>
            <span>Z</span>
          </div>
        )}

        <div
          ref={mountRef}
          data-testid="bear-canvas"
          className={`bear-stage ${show3d ? "on" : ""}`}
        />
        <div
          className="bear-hit"
          data-testid="bear-hit"
          onClick={poke}
          role="button"
          aria-label="Poke the sleeping bear"
        />
        <p className="talk-label" data-testid="talk-to-poonie">
          Talk to Poonie
        </p>
      </div>
    </div>
  );
}
