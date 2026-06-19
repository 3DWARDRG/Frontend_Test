import { Paper, Typography } from '@mui/material';

const COLORS = {
  driving: '#2E7D32',
  on_duty: '#E65100',
  sleeper: '#1565C0',
  off_duty: '#9E9E9E',
};

const LABELS = ['Off Duty', 'Sleeper', 'Driving', 'On Duty'];
const TYPES = ['off_duty', 'sleeper', 'driving', 'on_duty'];

export default function DailyLogs({ logs }) {
  if (!logs || logs.length === 0) return null;

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Daily Logs</Typography>
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
        {logs.map((log) => (
          <Paper key={log.day} elevation={2} sx={{ minWidth: 280, p: 2, borderRadius: 3, flexShrink: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Día {log.day} — {log.date}
            </Typography>
            {LABELS.map((label, idx) => {
              const type = TYPES[idx];
              const totalHours = log.activities
                .filter(a => a.type === type)
                .reduce((sum, a) => sum + (a.end_hour - a.start_hour), 0);
              const widthPercent = Math.min((totalHours / 24) * 100, 100);
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 60, fontSize: 11, color: '#555' }}>{label}</span>
                  <div style={{ flex: 1, backgroundColor: '#f0f0f0', borderRadius: 4, height: 12 }}>
                    <div style={{
                      width: `${widthPercent}%`,
                      height: '100%',
                      backgroundColor: COLORS[type],
                      borderRadius: 4,
                    }} />
                  </div>
                  <span style={{ fontSize: 11, minWidth: 40, textAlign: 'right' }}>
                    {totalHours.toFixed(1)}h
                  </span>
                </div>
              );
            })}
          </Paper>
        ))}
      </div>
    </div>
  );
}