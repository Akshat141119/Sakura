import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/"); // Redirect to home after 5s
    }, 5000);
    animatePetals();
  }, []);

  const animatePetals = () => {
    const canvas = document.getElementById("sakuraCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals = Array.from({ length: 35 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 6 + 4,
      speed: Math.random() + 0.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.y += p.speed;
        p.x += Math.sin(p.y * 0.01);
        if (p.y > canvas.height) p.y = 0;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#f9d5e5";
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    draw();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-blossom">
      <canvas id="sakuraCanvas" className="absolute top-0 left-0 z-0"></canvas>
      <div className="z-10 text-center px-4">
        <h1 className="text-5xl text-sakura font-bold mb-4 animate-fade">
          Blossoms of Bond 🌸
        </h1>
        <p className="text-xl text-white animate-fade">
          Under the cherry blossoms, friendships bloom eternal...
        </p>
        <audio autoPlay>
          <source src="/sounds/intro_theme.mp3" type="audio/mp3" />
        </audio>
      </div>
    </div>
  );
}