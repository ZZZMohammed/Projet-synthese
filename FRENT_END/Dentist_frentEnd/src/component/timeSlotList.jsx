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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  CircularProgress,
  Alert,
  AlertTitle,
  Typography,
  Divider
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import {
  CalendarToday,
  AccessTime,
  Bookmark,
  CheckCircle,
  Warning,
  Info
} from '@mui/icons-material';

const TimeSlotList = () => {
  const dispatch = useDispatch();
  const [bookingInProgress, setBookingInProgress] = useState(null);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [filteredSlots, setFilteredSlots] = useState([]);

  const { slots, loading, error } = useSelector((state) => state.timeSlots);
  const { success, error: bookingError, loading: bookingLoading } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    dispatch(fetchTimeSlots());
  }, [dispatch]);

  useEffect(() => {
    if (slots) {
      const filtered = slots.filter(slot => 
        !slot.is_booked && 
        moment(slot.date).isSame(selectedDate, 'day')
      );
      setFilteredSlots(filtered);
    }
  }, [slots, selectedDate]);

  const handleBook = async (id) => {
    setBookingInProgress(id);
    const result = await dispatch(bookAppointment(id));
    setBookingInProgress(null);
  };

  const renderDay = (day, _selectedDays, pickersDayProps) => {
    const dateStr = day.format('YYYY-MM-DD');
    const slotsForDay = slots?.filter(slot => 
      slot.date === dateStr && !slot.is_booked
    ) || [];
    
    return (
      <Box
        {...pickersDayProps}
        sx={{
          position: 'relative',
          ...(slotsForDay.length > 0 && {
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: 4,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'primary.main'
            }
          })
        }}
      />
    );
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
                  renderDay={renderDay}
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

                {filteredSlots.length === 0 && !loading && (
                  <Alert icon={<Info />} severity="warning" sx={{ mb: 2 }}>
                    No available time slots for this date
                  </Alert>
                )}

                <List dense>
                  {filteredSlots.map((slot) => (
                    <React.Fragment key={slot.id}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <Chip
                                icon={<CalendarToday fontSize="small" />}
                                label={moment(slot.date).format('MMM D, YYYY')}
                                size="small"
                                variant="outlined"
                              />
                              <Chip
                                icon={<AccessTime fontSize="small" />}
                                label={slot.time.substring(0, 5)}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={
                              bookingInProgress === slot.id ? (
                                <CircularProgress size={16} color="inherit" />
                              ) : (
                                <Bookmark fontSize="small" />
                              )
                            }
                            onClick={() => handleBook(slot.id)}
                            disabled={bookingLoading || bookingInProgress === slot.id}
                            sx={{ minWidth: 100 }}
                          >
                            {bookingInProgress === slot.id ? 'Booking...' : 'Book'}
                          </Button>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Box>
          </CardContent>
          
          <CardActions sx={{ bgcolor: 'action.hover', p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Select a date and available time slot to book your appointment
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default TimeSlotList;