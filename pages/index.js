
import { useEffect, useMemo, useRef, useState } from "react";

const proyectosBase = [
  {
    id: "1",
    titulo: "Marcapáginas con acuarelas",
    desc: "Crea un marcapáginas usando acuarelas y sal para un efecto mágico.",
    edad: "8-12",
    dificultad: "Fácil",
    tiempo: 25,
    etiquetas: ["papel", "pintura", "regalo"],
    materiales: ["Cartulina blanca", "Acuarelas", "Pincel", "Sal fina", "Cuerda o lazo"],
    pasos: [
      "Corta una tira de cartulina (5×15 cm).",
      "Pinta con acuarelas y espolvorea sal cuando aún esté húmedo.",
      "Deja secar y retira la sal para ver las texturas.",
      "Haz un agujerito y añade el lazo.",
    ],
    portada:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23f8fafc'/><circle cx='100' cy='100' r='60' fill='%23a78bfa'/><rect x='220' y='120' width='260' height='160' fill='%23f472b6' rx='18'/><text x='50%' y='90%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='26' fill='%239ca3af'>Marcapáginas acuarela</text></svg>",
    destacado: true,
  },
  {
    id: "2",
    titulo: "Tarjeta pop-up de cumpleaños",
    desc: "Sorprende con una tarjeta que se abre en 3D.",
    edad: "9-12",
    dificultad: "Media",
    tiempo: 40,
    etiquetas: ["papel", "corte", "cumpleaños"],
    materiales: ["Cartulina de colores", "Tijeras", "Pegamento en barra", "Rotuladores"],
    pasos: [
      "Dobla una cartulina por la mitad.",
      "Corta dos líneas paralelas en el doblez y empuja hacia dentro para crear el escalón.",
      "Decora con figuras y mensajes.",
    ],
    portada:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23fff7ed'/><circle cx='460' cy='110' r='70' fill='%23fbbf24'/><rect x='60' y='180' width='280' height='140' fill='%2393c5fd' rx='18'/><text x='50%' y='86%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='26' fill='%239ca3af'>Tarjeta Pop-up</text></svg>",
    destacado: false,
  },
  {
    id: "3",
    titulo: "Atrapasueños con lana",
    desc: "Un clásico decorativo con aro, lana y plumas.",
    edad: "8-13",
    dificultad: "Media",
    tiempo: 50,
    etiquetas: ["decoración", "lana", "nudos"],
    materiales: ["Aro de bordado", "Lana o hilo", "Plumas", "Cuentas"],
    pasos: [
      "Envuelve el aro con lana.",
      "Teje una red simple cruzando el hilo.",
      "Añade plumas y cuentas en la parte inferior.",
    ],
    portada:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23ecfeff'/><circle cx='160' cy='200' r='80' fill='%236ee7b7'/><rect x='300' y='90' width='240' height='220' fill='%23fca5a5' rx='18'/><text x='50%' y='86%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='26' fill='%239ca3af'>Atrapasueños</text></svg>",
    destacado: true,
  },
  {
    id: "4",
    titulo: "Collar de cuentas de papel",
    desc: "Convierte papel reciclado en cuentas enrolladas.",
    edad: "10-13",
    dificultad: "Fácil",
    tiempo: 35,
    etiquetas: ["reciclaje", "joyería", "papel"],
    materiales: ["Revistas viejas", "Palillo", "Pegamento", "Hilo elástico"],
    pasos: [
      "Corta triángulos largos de papel.",
      "Enróllalos en el palillo y pega el final.",
      "Barniza si quieres y ensarta en el hilo.",
    ],
    portada:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23f0fdf4'/><circle cx='480' cy='250' r='90' fill='%23fde047'/><rect x='60' y='90' width='240' height='220' fill='%23a5b4fc' rx='18'/><text x='50%' y='86%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='26' fill='%239ca3af'>Collar de papel</text></svg>",
    destacado: false,
  },
];

const STORAGE_KEY = "latiendadeclaudia.proyectos.v1";

function Header({ dark, setDark, onExport, onImportClick, onReset, fileInputRef }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <h1 className="font-extrabold text-xl">La Tienda de Claudia</h1>
          <span className="ml-2 text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700">Manualidades para peques</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => onImportClick(String(reader.result || ""));
              reader.readAsText(file);
              e.currentTarget.value = "";
            }}
          />
          <button className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border" onClick={onExport} title="Exportar proyectos a JSON">
            Exportar
          </button>
          <button className="px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 border" onClick={() => fileInputRef.current?.click()} title="Importar proyectos desde JSON">
            Importar
          </button>
          <button className="px-3 py-1.5 rounded-md bg-red-600 text-white" onClick={onReset} title="Borrar todos los proyectos">
            Reset
          </button>
          <div className="flex items-center gap-2 pl-2">
            <span className={`text-sm ${dark ? "opacity-40" : ""}`}>☀️</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={dark} onChange={(e) => setDark(e.target.checked)} />
              <div className="w-10 h-5 bg-neutral-300 peer-checked:bg-neutral-600 rounded-full relative">
                <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${dark ? "right-0.5" : "left-0.5"}`}/>
              </div>
            </label>
            <span className={`text-sm ${dark ? "" : "opacity-40"}`}>🌙</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ onAdd }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-gradient-to-br from-pink-50 via-violet-50 to-amber-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-900">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Manualidades divertidas para niñas y niños de 11 años
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">
            Proyectos paso a paso, plantillas descargables y un espacio seguro para aprender y divertirse creando.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#proyectos"><button className="px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black">Ver proyectos</button></a>
            <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border">Añadir proyecto</button>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-300">
            <span className="inline-flex items-center gap-2">⭐ Para principiantes</span>
            <span className="inline-flex items-center gap-2">⏱️ &lt; 1 hora</span>
            <span className="inline-flex items-center gap-2">❤️ Creatividad en familia</span>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl">
            <img
              alt="Collage de manualidades"
              className="w-full h-full object-cover"
              src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'><defs><linearGradient id='g' x1='0' x2='1'><stop offset='0' stop-color='%23fbcfe8'/><stop offset='1' stop-color='%23bfdbfe'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/><g fill='white' fill-opacity='0.6'><rect x='80' y='80' width='300' height='220' rx='20'/><rect x='420' y='120' width='300' height='220' rx='20'/><rect x='760' y='80' width='300' height='220' rx='20'/><rect x='120' y='360' width='300' height='220' rx='20'/><rect x='460' y='400' width='300' height='220' rx='20'/><rect x='800' y='360' width='300' height='220' rx='20'/></g></svg>"
            />
          </div>
        </div>
      </div>

      {/* Modal simple */}
      {open && <NuevoProyectoModal onClose={() => setOpen(false)} onAdd={onAdd} />}
    </section>
  );
}

function NuevoProyectoModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    titulo: "",
    desc: "",
    edad: "10-12",
    dificultad: "Fácil",
    tiempo: 30,
    etiquetas: "",
    materiales: "",
    pasos: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const nuevo = {
      id: String(Date.now()),
      ...form,
      tiempo: Number(form.tiempo) || 30,
      etiquetas: form.etiquetas.split(",").map((s) => s.trim()).filter(Boolean),
      materiales: form.materiales.split(",").map((s) => s.trim()).filter(Boolean),
      pasos: form.pasos.split("\\n").map((s) => s.trim()).filter(Boolean),
      portada:
        "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='22' fill='%236b7280'>Portada</text></svg>",
      destacado: false,
    };
    onAdd(nuevo);
    onClose();
    alert("¡Proyecto añadido!");
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 rounded-2xl border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Nuevo proyecto</h3>
          <button onClick={onClose} className="text-sm px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border">Cerrar</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full px-3 py-2 rounded-md border bg-white dark:bg-neutral-900" placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
          <textarea className="w-full px-3 py-2 rounded-md border bg-white dark:bg-neutral-900" placeholder="Descripción" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="px-3 py-2 rounded-md border bg-white dark:bg-neutral-900" placeholder="Edad (p. ej. 10-12)" value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} />
            <input className="px-3 py-2 rounded-md border bg-white dark:bg-neutral-900" placeholder="Dificultad (Fácil/Media/Difícil)" value={form.dificultad} onChange={(e) => setForm({ ...form, dificultad: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input type="number" className="px-3 py-2 rounded-md border bg-white dark:bg-neutral-900" placeholder="Tiempo (min)" value={form.tiempo} onChange={(e) => setForm({ ...form, tiempo: e.target.value })} />
            <input className="px-3 py-2 rounded-md border bg-white dark:bg-neutral-900" placeholder="Etiquetas (coma, separadas)" value={form.etiquetas} onChange={(e) => setForm({ ...form, etiquetas: e.target.value })} />
          </div>
          <input className="w-full px-3 py-2 rounded-md border bg-white dark:bg-neutral-900" placeholder="Materiales (coma, separados)" value={form.materiales} onChange={(e) => setForm({ ...form, materiales: e.target.value })} />
          <textarea className="w-full px-3 py-2 rounded-md border bg-white dark:bg-neutral-900" placeholder={"Pasos (uno por línea)"} value={form.pasos} onChange={(e) => setForm({ ...form, pasos: e.target.value })} />
          <button type="submit" className="w-full px-4 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black">Guardar</button>
        </form>
      </div>
    </div>
  );
}

function Filtros({ query, setQuery, dificultad, setDificultad }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
      <div className="relative flex-1">
        <input
          className="w-full px-9 py-2 rounded-md border bg-white dark:bg-neutral-900"
          placeholder="Buscar por título o etiqueta..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2">🔎</span>
      </div>
      <div className="flex border rounded-lg overflow-hidden w-full md:w-auto">
        {["Todas","Fácil","Media","Difícil"].map(val => (
          <button
            key={val}
            onClick={() => setDificultad(val)}
            className={`px-3 py-2 text-sm ${dificultad===val ? "bg-black text-white dark:bg-white dark:text-black" : "bg-neutral-100 dark:bg-neutral-800"}`}
          >{val}</button>
        ))}
      </div>
    </div>
  );
}

function GridProyectos({ proyectos, onVer }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {proyectos.map((p) => (
        <div key={p.id} className="overflow-hidden rounded-2xl border hover:shadow-lg transition-shadow">
          <img src={p.portada} alt={p.titulo} className="w-full aspect-video object-cover" />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold line-clamp-1">{p.titulo}</h4>
              {p.destacado && <span className="text-xs px-2 py-1 rounded-full bg-neutral-200 dark:bg-neutral-700">Destacado</span>}
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{p.desc}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {p.etiquetas.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border">#{t}</span>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="inline-flex items-center gap-1">🎨 {p.dificultad}</span>
              <span className="inline-flex items-center gap-1">⏱️ {p.tiempo} min</span>
            </div>
            <button className="mt-3 w-full px-3 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black" onClick={() => onVer(p)}>
              Ver pasos →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ModalProyecto({ proyecto, onClose }) {
  if (!proyecto) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-2xl border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">📖 {proyecto.titulo}</h3>
          <button onClick={onClose} className="text-sm px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border">Cerrar</button>
        </div>
        <div className="space-y-4">
          <img src={proyecto.portada} alt="Portada" className="w-full rounded-xl"/>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Materiales</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {proyecto.materiales.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Detalles</h4>
              <p className="text-sm">Edad: {proyecto.edad}</p>
              <p className="text-sm">Dificultad: {proyecto.dificultad}</p>
              <p className="text-sm">Tiempo aprox.: {proyecto.tiempo} minutos</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Pasos</h4>
            <ol className="list-decimal list-inside text-sm space-y-2">
              {proyecto.pasos.map((p, i) => <li key={i}>{p}</li>)}
            </ol>
          </div>
          <div className="flex flex-wrap gap-2">
            {proyecto.etiquetas.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full border bg-neutral-50 dark:bg-neutral-800">#{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Descargas() {
  const plantillas = [
    { id: "p1", nombre: "Plantilla marcapáginas (PDF)" },
    { id: "p2", nombre: "Figuras pop-up básicas (PDF)" },
    { id: "p3", nombre: "Patrones atrapasueños (PNG)" },
  ];
  return (
    <section id="descargas" className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <span>⬇️</span>
        <h3 className="text-2xl font-bold">Plantillas para descargar</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plantillas.map((p) => (
          <div key={p.id} className="rounded-2xl border p-4">
            <h4 className="font-semibold">{p.nombre}</h4>
            <button className="mt-3 w-full px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-800 border" onClick={() => alert("Descarga simulada")}>Descargar</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Seguridad() {
  const tips = [
    "Usa tijeras de punta roma para menores de 12 años.",
    "Protege la mesa con mantel o cartón.",
    "Supervisa el uso de pegamentos fuertes o pistolas de silicona.",
    "Lava las manos después de pintar o usar cola.",
  ];
  return (
    <section id="seguridad" className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <span>🛡️</span>
        <h3 className="text-2xl font-bold">Seguridad y consejos</h3>
      </div>
      <ul className="grid md:grid-cols-2 gap-4">
        {tips.map((t, i) => (
          <li key={i} className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border text-sm flex items-start gap-3">
            <span className="mt-1">✅</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Galeria() {
  const mock = new Array(9).fill(0).map((_, i) => `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%23f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%239ca3af'>Foto ${i+1}</text></svg>`);
  return (
    <section id="galeria" className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <span>📷</span>
        <h3 className="text-2xl font-bold">Galería de creaciones</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mock.map((src, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl border">
            <img src={src} alt={`Creación ${i+1}`} className="w-full h-full object-cover"/>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer className="border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2"><span>✨</span><strong>La Tienda de Claudia</strong></div>
          <p className="text-neutral-600 dark:text-neutral-300">Un rincón seguro para crear, aprender y compartir manualidades en familia.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Secciones</h4>
          <ul className="space-y-1">
            <li><a href="#proyectos" className="hover:underline">Proyectos</a></li>
            <li><a href="#descargas" className="hover:underline">Descargas</a></li>
            <li><a href="#seguridad" className="hover:underline">Seguridad</a></li>
            <li><a href="#galeria" className="hover:underline">Galería</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Créditos</h4>
          <p className="text-neutral-600 dark:text-neutral-300">Next.js + Tailwind. Ilustraciones de ejemplo como SVG.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [proyectos, setProyectos] = useState(proyectosBase);
  const [query, setQuery] = useState("");
  const [dificultad, setDificultad] = useState("Todas");
  const [activo, setActivo] = useState(null);
  const fileInputRef = useRef(null);

  // dark mode by class on html
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark"); else root.classList.remove("dark");
  }, [dark]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setProyectos(parsed);
      }
    } catch {}
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(proyectos));
    } catch {}
  }, [proyectos]);

  function handleExport() {
    const blob = new Blob([JSON.stringify(proyectos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "proyectos-claudia.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      if (!Array.isArray(data)) throw new Error("Formato no válido");
      setProyectos(data);
      alert("¡Proyectos importados!");
    } catch (e) {
      alert("No se pudo importar el archivo. Asegúrate de que es un JSON de proyectos.");
    }
  }

  function handleReset() {
    if (confirm("¿Seguro que quieres borrar todos los proyectos?") ) {
      setProyectos(proyectosBase);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const filtrados = useMemo(() => {
    const q = query.toLowerCase();
    return proyectos.filter((p) => {
      const matchTexto =
        p.titulo.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.etiquetas.some((t) => t.toLowerCase().includes(q));
      const matchDif = dificultad === "Todas" || p.dificultad === dificultad;
      return matchTexto && matchDif;
    });
  }, [proyectos, query, dificultad]);

  function handleAdd(nuevo){
    setProyectos((prev) => [nuevo, ...prev]);
  }

  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
        <Header dark={dark} setDark={setDark} onExport={handleExport} onImportClick={handleImport} onReset={handleReset} fileInputRef={fileInputRef} />
        <Hero onAdd={handleAdd} />

        <section id="proyectos" className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span>✂️</span>
              <h3 className="text-2xl font-bold">Proyectos</h3>
            </div>
            <a href="#descargas" className="text-sm inline-flex items-center gap-2 hover:underline">
              Ver plantillas <span>→</span>
            </a>
          </div>

          <Filtros query={query} setQuery={setQuery} dificultad={dificultad} setDificultad={setDificultad} />

          <div className="mt-6">
            <GridProyectos proyectos={filtrados} onVer={setActivo} />
          </div>
        </section>

        <Descargas />
        <Seguridad />
        <Galeria />
        <Footer />

        <ModalProyecto proyecto={activo} onClose={() => setActivo(null)} />
      </div>
    </div>
  );
}
