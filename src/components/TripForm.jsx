import { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

export default function TripForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    current_location: 'NY',
    pickup_location: 'Chicago',
    dropoff_location: 'LA',
    current_cycle_used: 10,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Detalles del viaje
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ubicación actual"
              name="current_location"
              value={form.current_location}
              onChange={handleChange}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lugar de recogida"
              name="pickup_location"
              value={form.pickup_location}
              onChange={handleChange}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Lugar de entrega"
              name="dropoff_location"
              value={form.dropoff_location}
              onChange={handleChange}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Horas del ciclo usadas"
              name="current_cycle_used"
              value={form.current_cycle_used}
              onChange={handleChange}
              inputProps={{ min: 0, max: 70, step: 0.5 }}
              required
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{
                bgcolor: '#1A237E',
                '&:hover': { bgcolor: '#0D1642' },
                textTransform: 'none',
                fontWeight: 600,
                py: 1.2,
                borderRadius: 2,
              }}
            >
              {loading ? 'Calculando...' : 'Calcular ruta'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}