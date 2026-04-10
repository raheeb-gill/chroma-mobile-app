import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';

interface CustomCalendarProps {
  visible: boolean;
  title: string;
  selectedDate: string; // YYYY-MM-DD
  onSelect: (date: string) => void;
  onClose: () => void;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CustomCalendar = ({
  visible,
  title,
  selectedDate,
  onSelect,
  onClose,
}: CustomCalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate && !isNaN(Date.parse(selectedDate))) {
      return new Date(selectedDate);
    }
    return new Date();
  });

  const [mode, setMode] = useState<'calendar' | 'month' | 'year'>('calendar');
  const [yearGridStart, setYearGridStart] = useState(() => {
    const d = selectedDate && !isNaN(Date.parse(selectedDate)) ? new Date(selectedDate) : new Date();
    return d.getFullYear() - (d.getFullYear() % 12);
  });

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    if (mode === 'year') {
      setYearGridStart(prev => prev - 12);
    } else if (mode === 'month') {
      setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1));
    } else {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    }
  };

  const nextMonth = () => {
    if (mode === 'year') {
      setYearGridStart(prev => prev + 12);
    } else if (mode === 'month') {
      setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1));
    } else {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    }
  };

  const handleDayPress = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayString = String(day).padStart(2, '0');
    const newDateStr = `${year}-${month}-${dayString}`;
    onSelect(newDateStr);
    onClose();
  };

  const handleMonthPress = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setMode('calendar');
  };

  const handleYearPress = (selectedYear: number) => {
    setCurrentMonth(new Date(selectedYear, currentMonth.getMonth(), 1));
    setMode('month');
  };

  const handleHeaderPress = () => {
    if (mode === 'calendar') {
      setMode('month');
    } else if (mode === 'month') {
      setMode('year');
      setYearGridStart(currentMonth.getFullYear() - (currentMonth.getFullYear() % 12));
    }
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.centerModal}>
          <View style={styles.headerRow}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <X size={20} color="#555" />
            </Pressable>
          </View>

          <View style={styles.calendarHeader}>
            <Pressable onPress={prevMonth} style={styles.navButton}>
              <ChevronLeft size={24} color="#1C9EF4" />
            </Pressable>
            <Pressable onPress={handleHeaderPress}>
              <Text style={styles.monthYearText}>
                {mode === 'calendar' && `${monthNames[month]} ${year}`}
                {mode === 'month' && `${year}`}
                {mode === 'year' && `${yearGridStart} - ${yearGridStart + 11}`}
              </Text>
            </Pressable>
            <Pressable onPress={nextMonth} style={styles.navButton}>
              <ChevronRight size={24} color="#1C9EF4" />
            </Pressable>
          </View>

          {mode === 'calendar' && (
            <>
              <View style={styles.weekDaysRow}>
                {DAYS_OF_WEEK.map((d, i) => (
                  <Text key={i} style={styles.weekDayText}>{d}</Text>
                ))}
              </View>

              <View style={styles.daysGrid}>
                {days.map((day, index) => {
                  if (day === null) {
                    return <View key={`empty-${index}`} style={styles.dayCellContainer} />;
                  }
                  const isSelected = selectedDate === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  
                  return (
                    <Pressable
                      key={`day-${day}`}
                      style={styles.dayCellContainer}
                      onPress={() => handleDayPress(day)}
                    >
                      <View style={[styles.dayCell, isSelected && styles.dayCellSelected]}>
                        <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                          {day}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </>
          )}

          {mode === 'month' && (
            <View style={styles.selectionGrid}>
              {monthNames.map((m, index) => {
                const isSelected = month === index;
                return (
                  <Pressable
                    key={m}
                    style={[styles.selectionCell, isSelected && styles.selectionCellSelected]}
                    onPress={() => handleMonthPress(index)}
                  >
                    <Text style={[styles.selectionText, isSelected && styles.selectionTextSelected]}>
                      {m.substring(0, 3)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {mode === 'year' && (
            <View style={styles.selectionGrid}>
              {Array.from({ length: 12 }).map((_, index) => {
                const yearItem = yearGridStart + index;
                const isSelected = year === yearItem;
                return (
                  <Pressable
                    key={yearItem}
                    style={[styles.selectionCell, isSelected && styles.selectionCellSelected]}
                    onPress={() => handleYearPress(yearItem)}
                  >
                    <Text style={[styles.selectionText, isSelected && styles.selectionTextSelected]}>
                      {yearItem}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  closeButton: {
    padding: 4,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navButton: {
    padding: 8,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDayText: {
    width: '14%',
    textAlign: 'center',
    fontSize: 12,
    color: '#888888',
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCellContainer: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCell: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  dayCellSelected: {
    backgroundColor: '#1C9EF4',
  },
  dayText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  selectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
    rowGap: 16,
  },
  selectionCell: {
    width: '30%',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  selectionCellSelected: {
    backgroundColor: '#1C9EF4',
  },
  selectionText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  selectionTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});