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
            <div className="mb-4">
              <h1 className="text-5xl font-bold mb-6">
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
                  tecnologias={["Python","AI","Next.js", "React", "Tailwind", "Typescript","Axios","FastAPI"]}
                  fechaInicio="Agosto 2025"
                  onClick={() => console.log("Portfolio Personal")}
                />
              </div>
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="proyecto"
                  enProgreso={false}
                  nombre="Web scraping"
                  
                  descripcion="Este proyecto realiza scraping, procesamiento de PDFs y OCR"
                  tecnologias={["Node", "Javascript", "playwright", "Axios"]}
                  fechaInicio="Jun"
                  fechaFin="2025"
                  onClick={() => console.log("Web scraping")}
                />
              </div>
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="proyecto"
                  enProgreso={false}
                  nombre=" Metaroad"
                  descripcion="Aplicacion de gestion de habitos y tareas diarias, inicialmente desarrollada con V0"
                  tecnologias={["React", "Next.js", "Supabase", "Axios"]}
                  fechaInicio="Dic"
                  fechaFin="2024"
                  onClick={() => console.log("Senior Dev clicked")}
                />
              </div>
              
              {/* Puedes agregar más cards aquí para probar el scroll */}
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="trabajo"
                  enProgreso={false}
                  nombre="FrontEnd Developer"
                  empresa="Lilab"
                  descripcion="Combiné habilidades técnicas y creativas para desarrollar soluciones
                  innovadoras que mejoran la experiencia del usuario. Trabajé en colaboración
                  con equipos para crear prototipos interactivos y aplicar tecnologías emergentes."
                  tecnologias={["NPM", "Storybook","React","CssModule","CSS","GIT","Python","Figma"]}
                  fechaInicio="Ene 2024"
                  fechaFin="Jun 2024"
                  onClick={() => console.log("Front-End Developer")}
                />
              </div>
              
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="trabajo"
                  enProgreso={false}
                  nombre="FullStack Junior"
                  empresa="Lilab"
                  descripcion="Participé en el desarrollo de la plataforma Viuty, centrada en la gestión de
                  productos para salones de belleza. Colaboré estrechamente con un equipo de
                  diseñadores en la implementación de soluciones front-end"
                  tecnologias={["React","Node.js","Redux","CSS"]}
                  fechaInicio="Dic 2022"
                  fechaFin="Ene 2024"
                  onClick={() => console.log("FullStack Junior")}
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
              <div className="mb-4">
                <h1 className="text-5xl font-bold mb-6">
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
                  tecnologias={["Python","AI","Next.js", "React", "Tailwind", "Typescript","Axios","FastAPI"]}
                  fechaInicio="Agosto 2025"
                  onClick={() => console.log("Portfolio Personal")}
                />
              </div>
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="proyecto"
                  enProgreso={false}
                  nombre="Web scraping"
                  
                  descripcion="Este proyecto realiza scraping, procesamiento de PDFs y OCR"
                  tecnologias={["Node", "Javascript", "playwright", "Axios"]}
                  fechaInicio="Jun"
                  fechaFin="2025"
                  onClick={() => console.log("Web scraping")}
                />
              </div>
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="proyecto"
                  enProgreso={false}
                  nombre=" Metaroad"
                  descripcion="Aplicacion de gestion de habitos y tareas diarias, inicialmente desarrollada con V0"
                  tecnologias={["React", "Next.js", "Supabase", "Axios"]}
                  fechaInicio="Dic"
                  fechaFin="2024"
                  onClick={() => console.log("Senior Dev clicked")}
                />
              </div>
              
              {/* Puedes agregar más cards aquí para probar el scroll */}
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="trabajo"
                  enProgreso={false}
                  nombre="FrontEnd Developer"
                  empresa="Lilab"
                  descripcion="Combiné habilidades técnicas y creativas para desarrollar soluciones
                  innovadoras que mejoran la experiencia del usuario. Trabajé en colaboración
                  con equipos para crear prototipos interactivos y aplicar tecnologías emergentes."
                  tecnologias={["NPM", "Storybook","React","CssModule","CSS","GIT","Python","Figma"]}
                  fechaInicio="Ene 2024"
                  fechaFin="Jun 2024"
                  onClick={() => console.log("Front-End Developer")}
                />
              </div>
              
              <div className="flex-shrink-0 pointer-events-auto">
                <Card
                  tipo="trabajo"
                  enProgreso={false}
                  nombre="FullStack Junior"
                  empresa="Lilab"
                  descripcion="Participé en el desarrollo de la plataforma Viuty, centrada en la gestión de
                  productos para salones de belleza. Colaboré estrechamente con un equipo de
                  diseñadores en la implementación de soluciones front-end"
                  tecnologias={["React","Node.js","Redux","CSS"]}
                  fechaInicio="Dic 2022"
                  fechaFin="Ene 2024"
                  onClick={() => console.log("FullStack Junior")}
                />
              </div>
 
              </div>
              
              {/* Chat component */}
              <Chat />
            </div>
          </div>
          
          {/* Toolbar fijo en la parte inferior */}
          <div className="flex-shrink-0 bg-gray-100 p-4">
            <div className="w-[720px] mx-auto">
              <Toolbar />
            </div>
          </div>
        </>
      )}
    </div>
  );
}