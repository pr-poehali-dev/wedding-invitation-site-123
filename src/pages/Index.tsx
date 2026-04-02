import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE =
  "https://cdn.poehali.dev/projects/8d1aa7c1-2a9b-4125-baff-22def0545274/files/1aa2728a-14ab-4964-9d6e-f7047bb45b34.jpg";

const TIMELINE = [
  { time: "14:00", title: "Сбор гостей", desc: "Встречаем вас в фойе ресторана", icon: "Users" },
  { time: "15:00", title: "Церемония", desc: "Торжественная регистрация брака", icon: "Heart" },
  { time: "16:00", title: "Фотосессия", desc: "В саду у фонтана", icon: "Camera" },
  { time: "17:00", title: "Банкет", desc: "Торжественный ужин и танцы", icon: "Music" },
  { time: "23:00", title: "Торт", desc: "Разрезаем свадебный торт", icon: "Star" },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function Petal({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: 6,
        height: 10,
        borderRadius: "50% 0 50% 0",
        background: "linear-gradient(135deg, #e8c87a44, #c9a84c22)",
        border: "1px solid #c9a84c33",
        ...style,
      }}
    />
  );
}

function TimelineItem({
  item,
  index,
  isVisible,
}: {
  item: (typeof TIMELINE)[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="relative flex gap-6 pb-12 last:pb-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-30px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      <div className="relative z-10 flex-shrink-0">
        <div className="w-14 h-14 rounded-full bg-[#0d1520] border border-[#c9a84c55] flex items-center justify-center">
          <Icon name={item.icon} fallback="Star" size={18} className="text-[#c9a84c]" />
        </div>
      </div>
      <div className="pt-3 flex-1">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-[#c9a84c] font-display text-2xl font-light">{item.time}</span>
          <span className="text-white/20 text-xs">·</span>
          <span className="text-white font-display text-xl font-light">{item.title}</span>
        </div>
        <p className="text-white/45 text-sm">{item.desc}</p>
      </div>
    </div>
  );
}

export default function Index() {
  const [scrollY, setScrollY] = useState(0);
  const timelineRef = useInView(0.1);
  const locationRef = useInView(0.1);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const petals = Array.from({ length: 16 }, (_, i) => {
    const seed = i * 137.5;
    return {
      top: `${(seed * 0.7) % 90}%`,
      left: `${(seed * 0.5) % 95}%`,
      opacity: 0.25 + (i % 5) * 0.1,
      transform: `rotate(${seed % 360}deg) scale(${0.7 + (i % 3) * 0.3})`,
      animationDelay: `${(i % 4) * 1.2}s`,
      animationDuration: `${5 + (i % 4)}s`,
    };
  });

  return (
    <div className="min-h-screen bg-[#0d1520] font-body noise-overlay">

      {/* ─── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${BG_IMAGE})`,
            transform: `translateY(${scrollY * 0.28}px) scale(1.15)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d152099] via-[#0d152055] to-[#0d1520]" />

        {petals.map((p, i) => (
          <Petal
            key={i}
            style={{
              top: p.top,
              left: p.left,
              opacity: p.opacity,
              transform: p.transform,
              animation: `float ${p.animationDuration} ease-in-out infinite`,
              animationDelay: p.animationDelay,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center text-center px-6">

          <div
            className="flex items-center gap-4 mb-8"
            style={{
              opacity: 0,
              animation: "fade-up 1s ease-out 0.3s forwards",
            }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <span className="text-[#c9a84c] font-display text-sm tracking-[0.4em] uppercase">
              Приглашение
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>

          <h1
            className="font-display leading-none font-light text-white"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              opacity: 0,
              animation: "fade-up 1s ease-out 0.5s forwards",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #c9a84c 0%, #e8c87a 30%, #fff9e6 50%, #e8c87a 70%, #c9a84c 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite",
              }}
            >
              Анна
            </span>
            <span className="text-[#c9a84c] mx-4 font-light" style={{ fontSize: "0.6em" }}>&</span>
            <span
              style={{
                background: "linear-gradient(90deg, #c9a84c 0%, #e8c87a 30%, #fff9e6 50%, #e8c87a 70%, #c9a84c 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 4s linear infinite 0.5s",
              }}
            >
              Михаил
            </span>
          </h1>

          <div
            className="my-8 text-[#c9a84c] text-3xl"
            style={{
              opacity: 0,
              animation: "fade-in 1.5s ease-out 0.8s forwards, float 6s ease-in-out 0.8s infinite",
            }}
          >
            ✦
          </div>

          <div
            className="font-display italic text-[#e8c87a] font-light tracking-wider mb-4"
            style={{
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              opacity: 0,
              animation: "fade-up 1s ease-out 0.9s forwards",
            }}
          >
            14 июня 2026 года
          </div>

          <p
            className="text-white/50 text-sm tracking-[0.3em] uppercase font-light"
            style={{
              opacity: 0,
              animation: "fade-in 1.5s ease-out 1.1s forwards",
            }}
          >
            Москва
          </p>

          <div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
            style={{ opacity: 0, animation: "fade-in 1.5s ease-out 2s forwards" }}
          >
            <span className="text-xs tracking-widest uppercase">Листайте</span>
            <Icon name="ChevronDown" size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ─── QUOTE ─────────────────────────────── */}
      <section className="relative py-24 px-6 flex justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1520] via-[#111d2c] to-[#0d1520]" />
        <div className="absolute top-8 left-8 text-[#c9a84c] opacity-20 font-display text-5xl select-none">❝</div>
        <div className="absolute bottom-8 right-8 text-[#c9a84c] opacity-20 font-display text-5xl rotate-180 select-none">❝</div>

        <div className="relative max-w-2xl text-center">
          <p className="font-display italic text-white/75 leading-relaxed font-light" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}>
            Любовь — это не смотреть друг на друга,<br />
            а смотреть вместе в одном направлении.
          </p>
          <div className="h-px w-32 mx-auto mt-8 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
          <p className="text-[#c9a84c] text-xs tracking-[0.35em] uppercase mt-4">Антуан де Сент-Экзюпери</p>
        </div>
      </section>

      {/* ─── TIMELINE ──────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="max-w-2xl mx-auto">

          <div ref={timelineRef.ref} className="text-center mb-20">
            <span className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase block mb-4">Программа дня</span>
            <h2
              className="font-display font-light text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Тайминг
            </h2>
            <div className="h-px w-24 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
          </div>

          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a84c33] to-transparent" />
            <div className="space-y-0">
              {TIMELINE.map((item, i) => (
                <TimelineItem
                  key={i}
                  item={item}
                  index={i}
                  isVisible={timelineRef.inView}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOCATION ──────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1520] via-[#0e1e30] to-[#0d1520]" />

        <div className="relative max-w-3xl mx-auto">
          <div ref={locationRef.ref} className="text-center mb-16">
            <span className="text-[#c9a84c] text-xs tracking-[0.5em] uppercase block mb-4">Где нас найти</span>
            <h2
              className="font-display font-light text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Локация
            </h2>
            <div className="h-px w-24 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />
          </div>

          <div
            className="relative rounded-2xl overflow-hidden border border-[#c9a84c22]"
            style={{
              opacity: locationRef.inView ? 1 : 0,
              transform: locationRef.inView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="relative h-[340px] bg-[#111d2c]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.617635%2C55.755814&z=15&pt=37.617635,55.755814,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
                className="absolute inset-0 w-full h-full opacity-80"
                title="Карта"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0d1520] to-transparent opacity-60" />
            </div>

            <div className="bg-[#111d2c] border-t border-[#c9a84c22] p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c15] border border-[#c9a84c33] flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="MapPin" size={16} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-1">Адрес</p>
                    <p className="text-white/90 font-display text-xl font-light">Банкетный зал «Усадьба»</p>
                    <p className="text-white/50 text-sm mt-1">ул. Арбат, 12, Москва</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c15] border border-[#c9a84c33] flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Car" size={16} className="text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-1">Как добраться</p>
                    <p className="text-white/90 font-display text-xl font-light">Метро «Арбатская»</p>
                    <p className="text-white/50 text-sm mt-1">5 минут пешком, есть парковка</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────── */}
      <footer className="relative py-20 px-6 text-center overflow-hidden">
        <div className="h-px w-48 mx-auto mb-12 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

        <div className="text-[#c9a84c] text-4xl mb-6" style={{ animation: "float 6s ease-in-out infinite" }}>
          ✦
        </div>

        <p className="font-display italic text-white/40 text-lg font-light mb-2">
          Ждём вас с нетерпением
        </p>
        <p className="font-display text-[#c9a84c] text-2xl font-light tracking-wider">
          Анна & Михаил
        </p>

        <div className="h-px w-48 mx-auto mt-12 bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

        <p className="text-white/20 text-xs tracking-widest uppercase mt-8">
          14 · 06 · 2026
        </p>
      </footer>
    </div>
  );
}