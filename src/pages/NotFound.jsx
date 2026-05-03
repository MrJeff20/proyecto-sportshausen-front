import React from 'react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sportshausen-light p-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow p-8 text-center">
        <h1 className="text-4xl font-bold text-sportshausen-dark mb-4">Error 404</h1>
        <p className="text-gray-600 mb-6">La página no está disponible o se encuentra en mantenimiento.</p>
        <p className="text-sm text-gray-500">Vuelve al inicio o intenta más tarde.</p>
      </div>
    </div>
  );
};

export default NotFound;
