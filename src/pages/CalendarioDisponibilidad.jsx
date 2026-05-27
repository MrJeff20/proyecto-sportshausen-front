import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CalendlyEmbed from '../components/CalendlyEmbed';

export const CalendarioDisponibilidad = () => {
  const [currentMonth, setCurrentMonth] = useState(4); // Mayo
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDates, setSelectedDates] = useState([
    { date: 5, reason: '' },
    { date: 12, reason: '' },
    { date: 15, reason: '' },
    { date: 22, reason: '' },
    { date: 29, reason: '' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalReason, setModalReason] = useState('');
  const [viewMode, setViewMode] = useState('calendly'); // 'calendly' o 'custom'
  const [calendlyUrl, setCalendlyUrl] = useState('https://calendly.com/roberto-jara-de-la-barra'); // Cambiar por tu URL de Calendly

  // Cargar fechas guardadas del localStorage
  useEffect(() => {
    const savedDates = localStorage.getItem('occupiedDates');
    if (savedDates) {
      setSelectedDates(JSON.parse(savedDates));
    }
  }, []);

  // Guardar fechas en localStorage cuando cambien
  const updateOccupiedDates = (newDates) => {
    setSelectedDates(newDates);
    localStorage.setItem('occupiedDates', JSON.stringify(newDates));
  };

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Buscar si la fecha tiene un motivo guardado y cargarlo en el modal
    const occupiedDate = selectedDates.find(d => d.date === date);
    setModalReason(occupiedDate?.reason || '');
    setShowModal(true);
  };

  const daysArray = Array.from({ length: firstDay }, (_, i) => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const toggleDate = (isOccupied) => {
    if (isOccupied) {
      // Si está ocupado, lo marcamos como disponible (lo removemos)
      updateOccupiedDates(selectedDates.filter(d => d.date !== selectedDate));
    } else {
      // Si está disponible, lo marcamos como ocupado (lo añadimos)
      updateOccupiedDates([...selectedDates, { date: selectedDate, reason: modalReason }]);
    }
    setModalReason('');
    setShowModal(false);
  };

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="luchador" />

      <div className="max-w-6xl mx-auto px-4 py-12 pt-24">
        <div className="card-shadow bg-white rounded-2xl p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-2">Mi Calendario de Disponibilidad</h1>
              <p className="text-gray-600">Gestiona tus fechas de disponibilidad y reservas</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('calendly')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === 'calendly'
                    ? 'bg-sportshausen-red text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Calendly
              </button>
              <button
                onClick={() => setViewMode('custom')}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  viewMode === 'custom'
                    ? 'bg-sportshausen-red text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Personalizado
              </button>
            </div>
          </div>

          {/* Vista de Calendly */}
          {viewMode === 'calendly' && (
            <div className="mb-8 w-full">
              <div className="bg-white rounded-lg p-0 overflow-hidden">
                <CalendlyEmbed calendlyUrl={calendlyUrl} />
              </div>
              <p className="text-sm text-gray-600 mt-4">
                💡 Para configurar tu URL de Calendly, reemplaza la URL en el componente con tu enlace personal de Calendly.
              </p>
            </div>
          )}

          {/* Vista Personalizada */}
          {viewMode === 'custom' && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-sportshausen-dark">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={24} className="text-sportshausen-red" />
                </button>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={24} className="text-sportshausen-red" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'].map((day) => (
                <div key={day} className="text-center font-bold text-gray-600 py-3">
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {daysArray.map((date, idx) => {
                const isOccupied = date && selectedDates.some(d => d.date === date);
                const isPast = date && new Date(currentYear, currentMonth, date) < new Date();

                return (
                  <div
                    key={idx}
                    onClick={() => date && !isPast && handleDateClick(date)}
                    className={`p-4 rounded-lg text-center font-semibold h-16 flex items-center justify-center cursor-pointer transition-all ${
                      !date
                        ? ''
                        : isPast
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : isOccupied
                        ? 'bg-sportshausen-red text-white hover:shadow-lg'
                        : 'bg-green-100 text-green-700 border-2 border-green-500 hover:shadow-lg'
                    }`}
                  >
                    {date}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-col md:flex-row gap-8 mt-8 p-4 bg-sportshausen-light rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-100 border-2 border-green-500 rounded"></div>
                <span className="text-sm text-gray-600"><strong>Verde:</strong> Disponible</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-sportshausen-red rounded"></div>
                <span className="text-sm text-gray-600"><strong>Rojo:</strong> Ocupado</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <span className="text-sm text-gray-600"><strong>Gris:</strong> Pasado (no editable)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <button 
                onClick={() => {
                  // Recargar las fechas guardadas del localStorage
                  const savedDates = localStorage.getItem('occupiedDates');
                  if (savedDates) {
                    setSelectedDates(JSON.parse(savedDates));
                  } else {
                    // Si no hay nada guardado, resetear a valores iniciales
                    setSelectedDates([
                      { date: 5, reason: '' },
                      { date: 12, reason: '' },
                      { date: 15, reason: '' },
                      { date: 22, reason: '' },
                      { date: 29, reason: '' }
                    ]);
                  }
                }}
                className="btn-secondary px-8 py-3">
                Descartar Cambios
              </button>
              <button 
                onClick={() => alert('✅ Cambios guardados exitosamente')}
                className="btn-primary px-8 py-3">
                Guardar Cambios
              </button>
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-sportshausen-dark mb-6">
              {selectedDate} de {monthNames[currentMonth]}
            </h3>

            <div className="space-y-4 mb-6">
              <p className="text-gray-600">¿Estás disponible este día?</p>
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Motivo (opcional)
                </label>
                <textarea
                  value={modalReason}
                  onChange={(e) => setModalReason(e.target.value)}
                  placeholder="Ej: Evento especial, viaje, descanso..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none text-sm"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setModalReason('');
                }}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => toggleDate(selectedDates.some(d => d.date === selectedDate))}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  selectedDates.some(d => d.date === selectedDate)
                    ? 'btn-outline'
                    : 'btn-primary'
                }`}
              >
                {selectedDates.some(d => d.date === selectedDate) ? (
                  <>
                    <X size={18} />
                    Marcar Disponible
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Marcar Ocupado
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CalendarioDisponibilidad;

