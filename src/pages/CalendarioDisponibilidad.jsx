import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const CalendarioDisponibilidad = () => {
  const [currentMonth, setCurrentMonth] = useState(4); // Mayo
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDates, setSelectedDates] = useState([5, 12, 15, 22, 29]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalReason, setModalReason] = useState('');

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const toggleDate = (isOccupied) => {
    if (isOccupied) {
      setSelectedDates(selectedDates.filter(d => d !== selectedDate));
    } else {
      setSelectedDates([...selectedDates, selectedDate]);
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

  const daysArray = Array.from({ length: firstDay }, (_, i) => null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="luchador" />

      <div className="max-w-4xl mx-auto px-4 py-12 pt-24">
        <div className="card-shadow bg-white rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-sportshausen-dark mb-2">Mi Calendario de Disponibilidad</h1>
          <p className="text-gray-600 mb-8">Gestiona tus fechas de disponibilidad. Los días en rojo indican que estás ocupado.</p>

          {/* Calendar */}
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
                const isOccupied = date && selectedDates.includes(date);
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
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="btn-secondary px-8 py-3">Descartar Cambios</button>
            <button className="btn-primary px-8 py-3">Guardar Cambios</button>
          </div>
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
                onClick={() => toggleDate(!selectedDates.includes(selectedDate))}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  selectedDates.includes(selectedDate)
                    ? 'btn-outline'
                    : 'btn-primary'
                }`}
              >
                {selectedDates.includes(selectedDate) ? (
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

