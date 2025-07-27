"use client"

import Card from "@/components/ui/card";

export default function Home() {
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
            Consulta acerca mi experiencia y proyectos
            </h1>
            <p className="text-gray-600 text-lg">
              Use one of the most common prompts below or use your own to begin
            </p>
          </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card
                tipo="proyecto"
                enProgreso={true}
                nombre="Portfolio Personal"
                descripcion="Desarrollo de un portfolio personal moderno con Next.js y Tailwind CSS"
                tecnologias={["Next.js", "React", "Tailwind"]}
                fechaInicio="2024"
                onClick={() => console.log("Portfolio clicked")}
              />
              
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

          {/* Refresh Prompts */}
          <div className="text-center mb-8">
            <button className="text-purple-600 hover:text-purple-700 flex items-center justify-center mx-auto space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh Prompts</span>
            </button>
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