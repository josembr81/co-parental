import React, { useState } from 'react';
import { Camera, Calendar, MessageCircle, DollarSign, Clock, FileText, AlertCircle, File } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const CoParentingApp = () => {
  const [activeTab, setActiveTab] = useState('tareas');
  const [showAlert, setShowAlert] = useState(false);

  // Datos de gastos mensuales para los gráficos
  const gastosHistoricos = [
    { mes: 'Ene', manutención: 500, gastosExtra: 200, gastosMédicos: 100 },
    { mes: 'Feb', manutención: 500, gastosExtra: 150, gastosMédicos: 50 },
    { mes: 'Mar', manutención: 500, gastosExtra: 300, gastosMédicos: 200 },
    { mes: 'Abr', manutención: 500, gastosExtra: 250, gastosMédicos: 150 },
  ];

  const [documentos, setDocumentos] = useState([
    {
      id: 1,
      nombre: 'Cartilla de vacunación',
      tipo: 'médico',
      fecha: '2024-10-15',
      estado: 'actualizado'
    },
    {
      id: 2,
      nombre: 'Boletín escolar',
      tipo: 'escolar',
      fecha: '2024-11-01',
      estado: 'pendiente de firma'
    },
    {
      id: 3,
      nombre: 'Acuerdo de custodia',
      tipo: 'legal',
      fecha: '2024-01-15',
      estado: 'vigente'
    }
  ]);

  const [alertas, setAlertas] = useState([
    {
      id: 1,
      tipo: 'pago',
      mensaje: 'Pago de manutención pendiente para Noviembre',
      urgencia: 'alta',
      fecha: '2024-11-04'
    },
    {
      id: 2,
      tipo: 'documento',
      mensaje: 'Renovar autorización médica',
      urgencia: 'media',
      fecha: '2024-11-10'
    }
  ]);

  const [pagos, setPagos] = useState([
    { 
      id: 1, 
      tipo: 'Manutención',
      monto: 500,
      fecha: '2024-11-01',
      estado: 'Pagado',
      comprobante: 'recibo-001.pdf'
    },
    {
      id: 2,
      tipo: 'Gastos Escolares',
      monto: 200,
      fecha: '2024-11-03',
      estado: 'Pendiente',
      descripcion: 'Libros y uniformes',
      vencimiento: '2024-11-10'
    }
  ]);

  const TabButton = ({ label, tab, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-2 rounded-lg space-x-2 ${
        activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  const AlertaBadge = ({ urgencia }) => (
    <span className={`px-2 py-1 rounded-full text-xs ${
      urgencia === 'alta' ? 'bg-red-100 text-red-800' :
      urgencia === 'media' ? 'bg-yellow-100 text-yellow-800' :
      'bg-blue-100 text-blue-800'
    }`}>
      {urgencia}
    </span>
  );

  const DocumentoBadge = ({ tipo }) => (
    <span className={`px-2 py-1 rounded-full text-xs ${
      tipo === 'médico' ? 'bg-green-100 text-green-800' :
      tipo === 'escolar' ? 'bg-blue-100 text-blue-800' :
      'bg-purple-100 text-purple-800'
    }`}>
      {tipo}
    </span>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">CoParenting App</h1>
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">Coordinación para el cuidado de Juan</p>
          {alertas.length > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {alertas.length} alertas
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        <TabButton label="Tareas" tab="tareas" icon={Clock} />
        <TabButton label="Calendario" tab="calendario" icon={Calendar} />
        <TabButton label="Pagos" tab="pagos" icon={DollarSign} />
        <TabButton label="Alertas" tab="alertas" icon={AlertCircle} />
        <TabButton label="Documentos" tab="documentos" icon={File} />
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {activeTab === 'pagos' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Gastos Mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <BarChart width={600} height={200} data={gastosHistoricos}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="manutención" fill="#8884d8" />
                    <Bar dataKey="gastosExtra" fill="#82ca9d" />
                    <Bar dataKey="gastosMédicos" fill="#ffc658" />
                  </BarChart>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pagos Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pagos
                    .filter(pago => pago.estado === 'Pendiente')
                    .map(pago => (
                      <div key={pago.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{pago.tipo}</h3>
                            <p className="text-sm text-gray-600">
                              Vencimiento: {pago.vencimiento}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">€{pago.monto}</p>
                            <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                              Pagar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'alertas' && (
          <Card>
            <CardHeader>
              <CardTitle>Alertas y Notificaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertas.map(alerta => (
                  <div key={alerta.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <AlertaBadge urgencia={alerta.urgencia} />
                          <h3 className="font-medium">{alerta.mensaje}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Fecha límite: {alerta.fecha}
                        </p>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Clock className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'documentos' && (
          <Card>
            <CardHeader>
              <CardTitle>Documentos Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentos.map(documento => (
                  <div key={documento.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <DocumentoBadge tipo={documento.tipo} />
                          <h3 className="font-medium">{documento.nombre}</h3>
                        </div>
                        <p className="text-sm text-gray-600">
                          Actualizado: {documento.fecha}
                        </p>
                        <p className="text-sm text-gray-600">
                          Estado: {documento.estado}
                        </p>
                      </div>
                      <button className="text-blue-500 hover:text-blue-700">
                        <FileText className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Subir Nuevo Documento
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoParentingApp;
