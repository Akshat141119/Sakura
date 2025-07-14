useEffect(() => {
  const canvas = document.getElementById("petals");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const petals = Array.from({ length: 30 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 5 + 5,
    speed: Math.random() + 0.5,
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach((p) => {
      p.y += p.speed;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = "#f9d5e5";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();
}, []);S