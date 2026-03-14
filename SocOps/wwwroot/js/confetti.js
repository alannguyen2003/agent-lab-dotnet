// Lightweight canvas confetti launcher
window.confetti = (function () {
    function launch() {
        try {
            const duration = 3000;
            const count = 120;
            const colors = ['#00f0ff', '#ff3ac6', '#00ff9c', '#ffd25b'];

            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.left = 0;
            canvas.style.top = 0;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.pointerEvents = 'none';
            canvas.style.zIndex = 9999;
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            const DPR = window.devicePixelRatio || 1;
            function resize() {
                canvas.width = window.innerWidth * DPR;
                canvas.height = window.innerHeight * DPR;
                ctx.scale(DPR, DPR);
            }
            resize();
            window.addEventListener('resize', resize);

            const particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * window.innerWidth,
                    y: -10 - Math.random() * 200,
                    vx: (Math.random() - 0.5) * 6,
                    vy: Math.random() * 4 + 2,
                    size: Math.random() * 8 + 4,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    rot: Math.random() * Math.PI * 2,
                    vr: (Math.random() - 0.5) * 0.2
                });
            }

            const start = performance.now();
            function frame(now) {
                const t = now - start;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach((p) => {
                    p.vy += 0.06; // gravity
                    p.x += p.vx;
                    p.y += p.vy;
                    p.rot += p.vr;

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    ctx.restore();
                });

                if (t < duration) requestAnimationFrame(frame);
                else {
                    window.removeEventListener('resize', resize);
                    try { document.body.removeChild(canvas); } catch (e) { }
                }
            }
            requestAnimationFrame(frame);
        } catch (e) {
            // fail silently
        }
    }

    return { launch };
})();
