"use client"

import Card from "@/components/ui/card";
import { useRef, useState } from "react";
import { MouseEvent } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    if (!scrollRef.current) return;
    
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (!scrollRef.current) return;
    
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad del scroll
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-16 bg-white flex flex-col items-center py-6 space-y-6">
      
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className=" w-[720px] h-[720px]">
          {/* Greeting Section */}
          <div className=" mb-8">
            <h1 className="text-4xl font-bold mb-4">
            Hola soy Matias Retamozo
            <br/>
            Desarrollador Fullstack
            </h1>
            <p className="text-gray-600 text-lg">
              Podes consultar acerca de mi experiencia y proyectos actualizados
            </p>
          </div>
              {/* Cards container with drag to scroll */}
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 mb-8 pb-2 cursor-grab select-none"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="proyecto"
                  enProgreso={true}
                  nombre="Portfolio Personal"
                  descripcion="Desarrollo de un portfolio personal moderno con Next.js y Tailwind CSS"
                  tecnologias={["Next.js", "React", "Tailwind"]}
                  fechaInicio="2024"
                  onClick={() => console.log("Portfolio clicked")}
                />
              </div>
              
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="trabajo"
                  enProgreso={false}
                  nombre="Desarrollador Frontend"
                  empresa="TechCorp"
                  descripcion="Desarrollo de aplicaciones web responsivas y optimización de rendimiento"
                  tecnologias={["React", "TypeScript", "Node.js"]}
                  fechaInicio="2023"
                  fechaFin="2024"
                  onClick={() => console.log("Trabajo clicked")}
                />
              </div>
              
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="proyecto"
                  enProgreso={false}
                  nombre="E-commerce Platform"
                  descripcion="Plataforma completa de comercio electrónico con sistema de pagos"
                  tecnologias={["Vue.js", "Laravel", "MySQL"]}
                  fechaInicio="2023"
                  fechaFin="2024"
                  onClick={() => console.log("E-commerce clicked")}
                />
              </div>
              
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="trabajo"
                  enProgreso={true}
                  nombre="Senior Developer"
                  empresa="StartupXYZ"
                  descripcion="Liderazgo técnico y desarrollo de arquitecturas escalables"
                  tecnologias={["Python", "Django", "AWS"]}
                  fechaInicio="2024"
                  onClick={() => console.log("Senior Dev clicked")}
                />
              </div>
              
              {/* Puedes agregar más cards aquí para probar el scroll */}
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="proyecto"
                  enProgreso={false}
                  nombre="App Mobile"
                  descripcion="Aplicación móvil para gestión de tareas"
                  tecnologias={["React Native", "Firebase"]}
                  fechaInicio="2023"
                  fechaFin="2023"
                  onClick={() => console.log("Mobile App clicked")}
                />
              </div>
              
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="trabajo"
                  enProgreso={false}
                  nombre="Full Stack Developer"
                  empresa="Agency Co"
                  descripcion="Desarrollo completo de aplicaciones web"
                  tecnologias={["Angular", "Node.js", "MongoDB"]}
                  fechaInicio="2022"
                  fechaFin="2023"
                  onClick={() => console.log("Full Stack clicked")}
                />
              </div>
            </div>

          {/* Input Section */}
          <div className="space-y-4">
            {/* Main Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Ask whatever you want...."
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg text-sm flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>All Web</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-sm">Add Attachment</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Use Image</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">0/1000</span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}