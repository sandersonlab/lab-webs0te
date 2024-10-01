import React, { useEffect, useRef, useState, useCallback } from 'react';

const InteractiveBackground = ({ setX, setY, hidden }) => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springPositionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMousePosition({ x: setX, y: setY });
  }, [setX, setY]);

  const getColor = useCallback((depth, maxDepth, x, y) => {
    return `hsl(200, 100%, 30%)`;
  }, []);

  const drawBranch = useCallback((ctx, startX, startY, length, angle, depth, maxDepth, canvasWidth, canvasHeight) => {
    if (depth === 0) return;

    const endX = startX + length * Math.cos(angle);
    const endY = startY + length * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = getColor(maxDepth - depth, maxDepth, endX, endY);
    ctx.lineWidth = (maxDepth - depth + 1) * 0.5;
    ctx.stroke();

    const horizontalInfluence = (springPositionRef.current.x - canvasWidth / 2) / (canvasWidth / 2) * 0.15;
    const verticalInfluence = (canvasHeight - springPositionRef.current.y) / canvasHeight * 0.2;
    const newLength = length * (.56 - verticalInfluence * 0.01);
    const spread = 0.5 + verticalInfluence;

    drawBranch(ctx, endX, endY, newLength, angle - spread + horizontalInfluence, depth - 1, maxDepth, canvasWidth, canvasHeight);
    drawBranch(ctx, endX, endY, newLength, angle + spread + horizontalInfluence, depth - 1, maxDepth, canvasWidth, canvasHeight);
  }, [getColor]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const baseAngle = -Math.PI / 2;
    const horizontalInfluence = (springPositionRef.current.x - canvas.width / 2) / (canvas.width / 2) * 0.05;
    const verticalInfluence = (canvas.height - springPositionRef.current.y) / canvas.height * 0.2;
    const maxDepth = 8;
    drawBranch(ctx, canvas.width / 2, canvas.height, 300 * (1 - 3 * verticalInfluence), baseAngle + horizontalInfluence, maxDepth, maxDepth, canvas.width, canvas.height);
  }, [drawBranch]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const renderLoop = () => {
      animate();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    renderLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animate]);

  useEffect(() => {
    let animationFrameId;

    const updateSpringPosition = () => {
      const springStrength = 0.05;
      const damping = 0.75;
      const mass = 3;

      const dx = mousePosition.x - springPositionRef.current.x;
      const dy = mousePosition.y - springPositionRef.current.y;

      const ax = (dx * springStrength) / mass;
      const ay = (dy * springStrength) / mass;

      velocityRef.current.x = (velocityRef.current.x + ax) * damping;
      velocityRef.current.y = (velocityRef.current.y + ay) * damping;

      springPositionRef.current.x += velocityRef.current.x;
      springPositionRef.current.y += velocityRef.current.y;

      animationFrameId = requestAnimationFrame(updateSpringPosition);
    };

    updateSpringPosition();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition]);

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 ${hidden ? 'hidden' : ''}`}
      onMouseMove={handleMouseMove}
    />
  );
};

export default InteractiveBackground;