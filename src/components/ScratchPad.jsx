import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Eraser, Pencil, Send, X } from "lucide-react";
import { EMAIL } from "@/content";

// Submissions go to a Google Doc via an Apps Script Web App (not the FastAPI
// backend — this needs to work from the static GitHub Pages build with no
// server of our own). Set VITE_SCRATCHPAD_ENDPOINT to that Web App's /exec
// URL once it's deployed; until then the widget just downloads the drawing
// to the visitor's device instead of pretending it was sent anywhere.
const SCRATCHPAD_ENDPOINT = import.meta.env.VITE_SCRATCHPAD_ENDPOINT ?? "";
const SEND_ENABLED = Boolean(SCRATCHPAD_ENDPOINT);

const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 190;
const CANVAS_BG = "#f4f0ea";

const STROKES = [
  { id: "fine", label: "Fine", width: 2 },
  { id: "medium", label: "Medium", width: 5 },
  { id: "bold", label: "Bold", width: 9 },
  { id: "marker", label: "Marker", width: 16 },
];

const SOLID_COLORS = [
  { id: "ink", label: "Ink", value: "#0a0a0a" },
  { id: "vermilion", label: "Vermilion", value: "#d94a38" },
  { id: "teal", label: "Teal", value: "#1f7a6c" },
  { id: "gold", label: "Gold", value: "#c9992b" },
];

// Gradient "brushes" aren't a real canvas gradient object (that would need a
// bounding box known in advance); instead each stroke segment picks a color
// by interpolating between `from` and `to` based on its x position, which
// reads the same as a gradient brush for anything drawn left-to-right.
const GRADIENT_BRUSHES = [
  { id: "sunset", label: "Sunset", from: "#d94a38", to: "#c9992b", swatch: "linear-gradient(135deg, #d94a38, #c9992b)" },
  { id: "ocean", label: "Ocean", from: "#1f7a6c", to: "#2b5fc9", swatch: "linear-gradient(135deg, #1f7a6c, #2b5fc9)" },
];

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerpColor(hexA, hexB, t) {
  const [ar, ag, ab] = hexToRgb(hexA);
  const [br, bg, bb] = hexToRgb(hexB);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const b = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

export function ScratchPad() {
  const [open, setOpen] = useState(false);
  const [strokeId, setStrokeId] = useState("medium");
  const [brush, setBrush] = useState(SOLID_COLORS[0]);
  const [hasDrawing, setHasDrawing] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);

  // Canvas backing store is sized in real pixels (CSS size * devicePixelRatio)
  // so strokes stay crisp on retina screens; drawing coordinates are then
  // scaled back from screen space into that same logical 300x190 box.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !open) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctxRef.current = ctx;
    setHasDrawing(false);
    setStatus("idle");
  }, [open]);

  const getPos = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const strokeWidth = STROKES.find((s) => s.id === strokeId)?.width ?? 5;

  const colorAt = useCallback(
    (x) => {
      if (brush.value) return brush.value;
      const t = Math.min(1, Math.max(0, x / CANVAS_WIDTH));
      return lerpColor(brush.from, brush.to, t);
    },
    [brush]
  );

  const handlePointerDown = useCallback(
    (e) => {
      e.preventDefault();
      canvasRef.current.setPointerCapture?.(e.pointerId);
      drawingRef.current = true;
      lastPointRef.current = getPos(e);
    },
    [getPos]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!drawingRef.current) return;
      const ctx = ctxRef.current;
      const prev = lastPointRef.current;
      const curr = getPos(e);
      ctx.strokeStyle = colorAt(curr.x);
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(curr.x, curr.y);
      ctx.stroke();
      lastPointRef.current = curr;
      setHasDrawing(true);
    },
    [getPos, colorAt, strokeWidth]
  );

  const endStroke = useCallback(() => {
    drawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  const handleClear = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.fillStyle = CANVAS_BG;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    setHasDrawing(false);
    setStatus("idle");
  }, []);

  const handleSend = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawing) return;
    const dataUrl = canvas.toDataURL("image/png");

    if (!SEND_ENABLED) {
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `note-for-aishwar-${Date.now()}.png`;
      a.click();
      setStatus("sent");
      window.setTimeout(() => setOpen(false), 1800);
      return;
    }

    setStatus("sending");
    try {
      // text/plain avoids a CORS preflight, which Apps Script Web Apps
      // don't handle; the response is opaque under no-cors, so a thrown
      // error (network failure) is the only signal we get back.
      await fetch(SCRATCHPAD_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ image: dataUrl, at: new Date().toISOString() }),
      });
      setStatus("sent");
      window.setTimeout(() => setOpen(false), 1800);
    } catch {
      setStatus("error");
    }
  }, [hasDrawing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="scratch-pad-root">
      {open && (
        <div
          className="scratch-pad-panel"
          data-testid="scratch-pad-panel"
          role="dialog"
          aria-label="Drawing scratch pad"
        >
          <div className="scratch-pad-header">
            <div>
              <p className="scratch-pad-title">Leave your mark.</p>
              <p className="scratch-pad-sub">
                Whatever you write over here or draw over here, it goes
                straight to Aishwar's inbox.
              </p>
            </div>
            <button
              type="button"
              className="scratch-pad-close"
              aria-label="Close scratch pad"
              onClick={() => setOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          <canvas
            ref={canvasRef}
            className="scratch-pad-canvas"
            data-testid="scratch-pad-canvas"
            style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endStroke}
            onPointerLeave={endStroke}
            onPointerCancel={endStroke}
          />

          <div className="scratch-pad-tools">
            <div className="scratch-pad-strokes" role="group" aria-label="Stroke thickness">
              {STROKES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`scratch-pad-stroke-btn ${strokeId === s.id ? "is-active" : ""}`}
                  aria-label={`${s.label} stroke`}
                  aria-pressed={strokeId === s.id}
                  onClick={() => setStrokeId(s.id)}
                >
                  <span
                    className="scratch-pad-stroke-dot"
                    style={{ width: s.width, height: s.width }}
                  />
                </button>
              ))}
            </div>

            <div className="scratch-pad-colors" role="group" aria-label="Brush color">
              {SOLID_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`scratch-pad-swatch ${brush.id === c.id ? "is-active" : ""}`}
                  aria-label={c.label}
                  aria-pressed={brush.id === c.id}
                  style={{ background: c.value }}
                  onClick={() => setBrush(c)}
                />
              ))}
              {GRADIENT_BRUSHES.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`scratch-pad-swatch ${brush.id === g.id ? "is-active" : ""}`}
                  aria-label={g.label}
                  aria-pressed={brush.id === g.id}
                  style={{ background: g.swatch }}
                  onClick={() => setBrush(g)}
                />
              ))}
            </div>
          </div>

          <div className="scratch-pad-actions">
            <button
              type="button"
              className="scratch-pad-clear"
              onClick={handleClear}
              disabled={!hasDrawing}
            >
              <Eraser size={14} />
              Clear
            </button>
            <button
              type="button"
              className="scratch-pad-send"
              onClick={handleSend}
              disabled={!hasDrawing || status === "sending"}
              data-testid="scratch-pad-send"
            >
              {SEND_ENABLED ? <Send size={14} /> : <Download size={14} />}
              {status === "sending"
                ? "Sending…"
                : status === "sent"
                  ? "Sent!"
                  : SEND_ENABLED
                    ? "Send to Aishwar"
                    : "Download drawing"}
            </button>
          </div>

          {status === "error" && (
            <p className="scratch-pad-note scratch-pad-note-error">
              Couldn't send that — try again, or email {EMAIL} directly.
            </p>
          )}
        </div>
      )}

      <button
        type="button"
        className="scratch-pad-toggle"
        data-testid="scratch-pad-toggle"
        aria-label={open ? "Close scratch pad" : "Open scratch pad"}
        onClick={() => setOpen((v) => !v)}
      >
        <Pencil size={20} />
      </button>
    </div>
  );
}
