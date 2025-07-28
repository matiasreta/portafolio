import React, { memo } from 'react';

interface CardProps {
  tipo: 'proyecto' | 'trabajo';
  enProgreso: boolean;
  nombre: string;
  empresa?: string;
  descripcion: string;
  tecnologias: string[];
  fechaInicio: string;
  fechaFin?: string;
  onClick: () => void;
}

const Card = memo<CardProps>(({
  tipo,
  enProgreso,
  nombre,
  empresa,
  descripcion,
  tecnologias,
  fechaInicio,
  fechaFin,
  onClick
}) => {
  const fechaTexto = `${fechaInicio} - ${fechaFin || 'En curso'}`;
  const tituloCompleto = nombre + (empresa ? ` at ${empresa}` : '');

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer py-3 pl-3 pr-1 w-[210px] h-[140px]"
      onClick={onClick}
    >
      {/* Header con badge y estado */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {enProgreso && (
            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          )}
          <span className="text-xs font-medium text-gray-600 lowercase tracking-wide leading-none">
            {tipo}
          </span>
        </div>
      </div>

      {/* Título y empresa */}
      <div className="mb-1">
        <h3 className="font-semibold text-gray-900 leading-tight truncate text-xs">
          {tituloCompleto}
        </h3>
      </div>

      {/* Descripción con fechas */}
      <p className="text-xs text-gray-700 leading-4 mb-3 line-clamp-3">
        <span className="text-gray-500">{fechaTexto}</span><br />
        {descripcion}
      </p>

      {/* Tecnologías como tags */}
      <div className="mb-1 relative h-5">
        <div className="flex gap-1 absolute top-0 left-0 w-full overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,black_85%,transparent)]">
          {tecnologias.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex-shrink-0"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;