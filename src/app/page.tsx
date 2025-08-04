"use client"

import Card from "@/components/ui/card";
import Toolbar from "@/components/ui/Toolbar";
import Chat from "@/components/ui/Chat";
import { useRef, useState } from "react";
import { MouseEvent } from "react";
import { useChat } from "@/context/ChatContext";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const { messages } = useChat();

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
    <div className="h-screen bg-gray-100 flex flex-col">
      {messages.length === 0 ? (
        // Layout centrado cuando no hay mensajes
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-[720px] flex flex-col ">
            {/* Título y descripción */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Hola soy Matias Retamozo
                <br/>
                Desarrollador Fullstack
              </h1>
              <p className="text-orange-600 text-base">
                Podes consultar acerca de mi experiencia y proyectos actualizados
              </p>
            </div>
            
            {/* Cards container with drag to scroll */}
            <div 
              ref={scrollRef}
              className="flex overflow-x-auto gap-4 mb-8 pb-2 cursor-grab select-none w-full"
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
                  tipo="proyecto"
                  enProgreso={false}
                  nombre="Brand Color UI generator"
                  empresa=""
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
            
            {/* Toolbar centrado cuando no hay mensajes */}
            <div className="w-full">
              <Toolbar />
            </div>
          </div>
        </div>
      ) : (
        // Layout con toolbar fijo cuando hay mensajes
        <>
          {/* Contenido principal - flexible y scrollable */}
          <div className="flex-1 flex flex-col items-center min-h-0 overflow-y-auto justify-start pt-8">
            <div className="w-[720px] flex flex-col">
              {/* Título y descripción */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-4">
                  Hola soy Matias Retamozo
                  <br/>
                  Desarrollador Fullstack
                </h1>
                <p className="text-orange-600 text-base">
                  Podes consultar acerca de mi experiencia y proyectos actualizados
                </p>
              </div>
              
              {/* Cards container with drag to scroll */}
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 mb-8 pb-2 cursor-grab select-none w-full"
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
                    tipo="proyecto"
                    enProgreso={false}
                    nombre="Brand Color UI generator"
                    empresa=""
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
              
              {/* Chat component */}
              <Chat />
            </div>
          </div>
          
          {/* Toolbar fijo en la parte inferior */}
          <div className="flex-shrink-0 bg-gray-100 p-4 border-t border-gray-200">
            <div className="w-[720px] mx-auto">
              <Toolbar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}