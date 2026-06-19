import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1A237E', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: -0.5 }}>
          TripLogger
        </Typography>
        <Button
          color="inherit"
          startIcon={<Add />}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Nuevo viaje
        </Button>
      </Toolbar>
    </AppBar>
  );
}