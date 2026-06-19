import { useState } from 'react';
import { Container, Grid, Alert, Typography } from '@mui/material';
import axios from 'axios';
import Navbar from './components/Navbar';
import TripForm from './components/TripForm';
import MapView from './components/MapView';
import DailyLogs from './components/DailyLogs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/trip/';

function App() {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_URL, formData);
      setTripData(response.data);
    } catch (err) {
      console.error(err);
      setError('Error al calcular la ruta. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} margin bottom={2}>
          {/* Formulario (izquierda) */}
          <Grid item xs={12} md={4}>
            <TripForm onSubmit={handleSubmit} loading={loading} />
          </Grid>

          {/* Mapa (derecha) */}
          <div  style={{ position: 'relative', width: '100%' , shadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: 12, overflow: 'hidden' }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {tripData ? (
              <>
                <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                  Distancia total: {tripData.distance_miles} mi &nbsp;|&nbsp; 
                  Tiempo estimado: {tripData.estimated_time_hours} h
                </Typography>
                <MapView
                  routeGeometry={tripData.route}
                  stops={tripData.stops}
                  distance={tripData.distance_miles}
                  time={tripData.estimated_time_hours}
                />
              </>
            ) : (
              <div style={{ height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                Ingresa los datos y presiona "Calcular ruta"
              </div>
            )}
          </div>

          {/* Logs (abajo) */}
          <Grid item xs={12}>
            {tripData && <DailyLogs logs={tripData.daily_logs} />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;