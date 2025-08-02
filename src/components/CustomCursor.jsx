import { useRef, useEffect } from "react";

const params = {
  pointsNumber: 25,     
  widthFactor: 0.15,     
  mouseThreshold: 0.6,  
  spring: 0.1,           
  friction: 0.7,       
};

const CanvasCursor = () => {
  const canvasRef = useRef(null);
  const pointer = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const mouseMoved = useRef(false);
  const trail = useRef(
    Array.from({ length: params.pointsNumber }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      dx: 0,
      dy: 0,
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function setupCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function updateMousePosition(x, y) {
      pointer.current.x = x;
      pointer.current.y = y;
    }

    function update(t) {
      // Intro motion if mouse hasn't moved
      if (!mouseMoved.current) {
        pointer.current.x =
          (0.5 +
            0.3 *
              Math.cos(0.002 * t) *
              Math.sin(0.005 * t)) *
          window.innerWidth;
        pointer.current.y =
          (0.5 +
            0.2 * Math.cos(0.005 * t) +
            0.1 * Math.cos(0.01 * t)) *
          window.innerHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.current.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer.current : trail.current[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trail.current[0].x, trail.current[0].y);

      for (let i = 1; i < trail.current.length - 1; i++) {
        const xc =
          0.5 * (trail.current[i].x + trail.current[i + 1].x);
        const yc =
          0.5 * (trail.current[i].y + trail.current[i + 1].y);
        ctx.quadraticCurveTo(
          trail.current[i].x,
          trail.current[i].y,
          xc,
          yc
        );
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);
        ctx.strokeStyle = "#6366f1"; // Indigo color
        ctx.stroke();
      }
      ctx.lineTo(
        trail.current[trail.current.length - 1].x,
        trail.current[trail.current.length - 1].y
      );
      ctx.stroke();

      window.requestAnimationFrame(update);
    }

    setupCanvas();
    update(0);

    window.addEventListener("resize", setupCanvas);

    const mouseMove = (e) => {
      mouseMoved.current = true;
      updateMousePosition(e.pageX, e.pageY);
    };
    const touchMove = (e) => {
      mouseMoved.current = true;
      updateMousePosition(
        e.targetTouches[0].pageX,
        e.targetTouches[0].pageY
      );
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("touchmove", touchMove);

    return () => {
      window.removeEventListener("resize", setupCanvas);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("touchmove", touchMove);
    };
  }, []);

useEffect(() => {
  const style = document.createElement("style");
  // Use 'pointer', 'crosshair', or a custom image URL below
  style.innerHTML = `body, * { cursor: pointer !important; }`;
  // Example for custom image:
  // style.innerHTML = `body, * { cursor: url('/cursor.png'), auto !important; }`;
  document.head.appendChild(style);
  return () => {
    document.head.removeChild(style);
  };
}, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default CanvasCursor;