"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Spark = {
  x: number;
  y: number;
  r: number;
  drift: number;
  shine: number;
};

const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
const RECORD_DURATION_MS = 16000;

export function VideoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>(
    "Previewing cinematic loop. Record to export the video."
  );

  const sparks = useMemo<Spark[]>(
    () =>
      Array.from({ length: 85 }, (_, idx) => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.002 + Math.random() * 0.02,
        drift: 0.0003 + Math.random() * 0.0006,
        shine: 0.2 + Math.random() * 0.8
      })),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;
    let startTime = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    const drawSpark = (spark: Spark, time: number) => {
      const shimmer = Math.sin(time * 0.002 + spark.shine) * 0.5 + 0.5;
      const size = spark.r * canvas.clientWidth;
      const gradient = ctx.createRadialGradient(
        spark.x * canvas.clientWidth,
        spark.y * canvas.clientHeight,
        0,
        spark.x * canvas.clientWidth,
        spark.y * canvas.clientHeight,
        size * 6
      );
      gradient.addColorStop(0, `rgba(255, 240, 200, ${0.85 * shimmer})`);
      gradient.addColorStop(0.4, `rgba(248, 211, 125, ${0.32 * shimmer})`);
      gradient.addColorStop(1, "rgba(15, 11, 20, 0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(
        spark.x * canvas.clientWidth,
        spark.y * canvas.clientHeight,
        size * 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    };

    const drawBeams = (time: number) => {
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const centerX = canvas.clientWidth / 2;
      const centerY = canvas.clientHeight / 2;
      const beamCount = 6;

      for (let i = 0; i < beamCount; i++) {
        const progress = (time * 0.00005 + i / beamCount) % 1;
        const angle = progress * Math.PI * 2;
        const gradient = ctx.createLinearGradient(
          centerX,
          centerY,
          centerX + Math.cos(angle) * canvas.clientWidth,
          centerY + Math.sin(angle) * canvas.clientHeight
        );
        gradient.addColorStop(0, "rgba(255, 248, 231, 0.04)");
        gradient.addColorStop(0.4, "rgba(255, 216, 158, 0.09)");
        gradient.addColorStop(1, "rgba(30, 26, 41, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle - 0.04) * canvas.clientWidth,
          centerY + Math.sin(angle - 0.04) * canvas.clientHeight
        );
        ctx.lineTo(
          centerX + Math.cos(angle + 0.04) * canvas.clientWidth,
          centerY + Math.sin(angle + 0.04) * canvas.clientHeight
        );
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    };

    const drawText = (time: number) => {
      ctx.save();
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(245, 236, 215, 0.92)";
      ctx.font = "700 96px 'Cinzel', serif";
      ctx.fillText("LUEUR ATELIER", canvas.clientWidth / 2, canvas.clientHeight * 0.42);

      ctx.fillStyle = "rgba(245, 221, 183, 0.8)";
      ctx.font = "400 32px 'Inter', sans-serif";
      const tagline = "New artefacts arriving soon";
      ctx.fillText(tagline.toUpperCase(), canvas.clientWidth / 2, canvas.clientHeight * 0.5);

      const reveal = Math.min(1, Math.max(0, (time % 16000) / 16000));
      ctx.font = "400 26px 'Inter', sans-serif";
      ctx.fillStyle = `rgba(220, 210, 199, ${reveal})`;
      ctx.fillText("Reserve your first glimpse", canvas.clientWidth / 2, canvas.clientHeight * 0.58);
      ctx.restore();
    };

    const render = (time: number) => {
      const elapsed = time - startTime;

      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      const gradientBackground = ctx.createLinearGradient(0, 0, canvas.clientWidth, canvas.clientHeight);
      gradientBackground.addColorStop(0, "#09070c");
      gradientBackground.addColorStop(0.4, "#13101c");
      gradientBackground.addColorStop(1, "#1e1a2b");

      ctx.fillStyle = gradientBackground;
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      drawBeams(elapsed);

      sparks.forEach((spark) => {
        spark.x += Math.cos(elapsed * spark.drift) * 0.0002;
        spark.y += Math.sin(elapsed * spark.drift) * 0.0002;

        if (spark.x < -0.1) spark.x = 1.1;
        if (spark.x > 1.1) spark.x = -0.1;
        if (spark.y < -0.1) spark.y = 1.1;
        if (spark.y > 1.1) spark.y = -0.1;

        drawSpark(spark, elapsed);
      });

      ctx.save();
      ctx.globalCompositeOperation = "soft-light";
      const halo = ctx.createRadialGradient(
        canvas.clientWidth / 2,
        canvas.clientHeight * 0.36,
        80,
        canvas.clientWidth / 2,
        canvas.clientHeight * 0.4,
        canvas.clientWidth * 0.45
      );
      halo.addColorStop(0, "rgba(255, 240, 214, 0.15)");
      halo.addColorStop(1, "rgba(12, 10, 18, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(canvas.clientWidth / 2, canvas.clientHeight * 0.4, canvas.clientWidth * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      drawText(elapsed);

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    startTime = performance.now();
    animationFrame = requestAnimationFrame(render);

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, [sparks]);

  const recordVideo = useCallback(() => {
    if (isRecording) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (typeof MediaRecorder === "undefined" || !canvas.captureStream) {
      setStatus("MediaRecorder not supported in this browser.");
      return;
    }

    const stream = canvas.captureStream(60);
    const chunks: BlobPart[] = [];

    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9"
    });

    recorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setIsRecording(false);
      setStatus("Recording complete. Download your launch film.");
      stream.getTracks().forEach((track) => track.stop());
    };

    recorder.start();
    setIsRecording(true);
    setStatus("Recording in progress…");

    setTimeout(() => {
      recorder.stop();
    }, RECORD_DURATION_MS);
  }, [isRecording]);

  return (
    <div className="w-full">
      <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-midnight shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <button
          onClick={recordVideo}
          disabled={isRecording}
          className="rounded-full border border-aurum/50 bg-gradient-to-r from-aurum/90 to-aurum/70 px-6 py-2 text-sm font-medium uppercase tracking-[0.3em] text-obsidian transition hover:from-aurum hover:to-aurum disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isRecording ? "Capturing…" : "Record 16s Video"}
        </button>
        {downloadUrl ? (
          <a
            href={downloadUrl}
            download="lueur-atelier-coming-soon.webm"
            className="rounded-full border border-white/20 px-5 py-2 text-sm uppercase tracking-[0.2em] text-platinum transition hover:border-aurum/60 hover:text-aurum"
          >
            Download Launch Film
          </a>
        ) : null}
        <p className="text-xs font-light uppercase tracking-[0.35em] text-white/50">
          {status}
        </p>
      </div>
    </div>
  );
}
