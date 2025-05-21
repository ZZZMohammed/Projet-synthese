import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeSlots } from '../redux/actions/timeSlotAction';
import { bookAppointment } from '../redux/actions/appointmentAction';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
  AlertTitle,
  Typography,
  Grid
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { AccessTime, Bookmark, CheckCircle, Warning, Info } from '@mui/icons-material';

const FIXED_TIME_SLOTS = [
  '09:00:00',
  '10:00:00',
  '11:00:00',
  '12:00:00',
  '15:00:00',
  '16:00:00',
  '17:00:00',
  '18:00:00'
];

const TimeSlotList = () => {
  const dispatch = useDispatch();
  const [bookingInProgress, setBookingInProgress] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [availableSlots, setAvailableSlots] = useState([]);

  const { slots, loading, error } = useSelector((state) => state.timeSlots);
  const { success, error: bookingError } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  useEffect(() => {
    if (slots) {
      const dateStr = selectedDate.format('YYYY-MM-DD');
      const available = slots.filter(slot =>
        !slot.is_booked && slot.date === dateStr
      );
      setAvailableSlots(available);
    }
  }, [slots, selectedDate]);

  const handleBook = async (slotId) => {
    setBookingInProgress(slotId);
    try {
      await dispatch(bookAppointment(slotId));
      dispatch(fetchTimeSlots());
    } finally {
      setBookingInProgress(null);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Card elevation={3}>
          <CardHeader
            title="Book Appointment"
            titleTypographyProps={{ variant: 'h5' }}
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
          />

          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
              {/* Calendar Section */}
              <Box sx={{ minWidth: 320 }}>
                <DateCalendar
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  disablePast
                />
              </Box>

              {/* Time Slots Section */}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Available Slots for {selectedDate.format('MMMM D, YYYY')}
                </Typography>

                {loading && (
                  <Alert icon={<Info />} severity="info" sx={{ mb: 2 }}>
                    <AlertTitle>Loading</AlertTitle>
                    Fetching available time slots...
                  </Alert>
                )}

                {error && (
                  <Alert icon={<Warning />} severity="error" sx={{ mb: 2 }}>
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                )}

                {bookingError && (
                  <Alert
                    icon={<Warning />}
                    severity="error"
                    sx={{ mb: 2 }}
                    action={
                      <Button
                        color="inherit"
                        size="small"
                        component={Link}
                        to="/login"
                      >
                        Login
                      </Button>
                    }
                  >
                    Please login to book appointments
                  </Alert>
                )}

                {success && (
                  <Alert icon={<CheckCircle />} severity="success" sx={{ mb: 2 }}>
                    <AlertTitle>Success</AlertTitle>
                    Appointment booked successfully!
                  </Alert>
                )}

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {FIXED_TIME_SLOTS.map((time) => {
                    const slot = availableSlots.find(s => s.time === time);
                    const isAvailable = !!slot;
                    const isBooking = bookingInProgress === slot?.id;

                    return (
                      <Grid item xs={6} sm={4} key={time}>
                        <Button
                          fullWidth
                          variant={isAvailable ? "contained" : "outlined"}
                          color={isAvailable ? "primary" : "inherit"}
                          startIcon={<AccessTime />}
                          onClick={() => isAvailable && handleBook(slot.id)}
                          disabled={!isAvailable || isBooking}
                          sx={{
                            height: '100%',
                            py: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1
                          }}
                        >
                          <Typography variant="body1">
                            {moment(time, 'HH:mm:ss').format('h:mm A')}
                          </Typography>
                          {isAvailable && (
                            <>
                              {isBooking ? (
                                <CircularProgress size={20} />
                              ) : (
                                <Bookmark fontSize="small" />
                              )}
                            </>
                          )}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>

                {availableSlots.length === 0 && !loading && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    {slots.some(s => s.date === selectedDate.format('YYYY-MM-DD'))
                      ? 'All slots are booked for this date'
                      : 'No time slots available. Please choose another date.'}
                  </Alert>
                )}
              </Box>
            </Box>
          </CardContent>

          <CardActions sx={{ bgcolor: 'action.hover', p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Select an available time slot to book your appointment
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default TimeSlotList;
