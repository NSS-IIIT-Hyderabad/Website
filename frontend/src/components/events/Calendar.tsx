"use client";
import React, { useState, useEffect } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
  const [today, setToday] = useState<{ year: number; month: number; date: number } | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [currentYear, setCurrentYear] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    setToday({ year: now.getFullYear(), month: now.getMonth(), date: now.getDate() });
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, []);

  useEffect(() => {
    setCurrentMonth(selectedDate.getMonth());
    setCurrentYear(selectedDate.getFullYear());
  }, [selectedDate]);

  if (!today) return null;

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    let newMonth = currentMonth - 1;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear = currentYear - 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(new Date(newYear, newMonth, 1));
  };

  const nextMonth = () => {
    let newMonth = currentMonth + 1;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear = currentYear + 1;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(new Date(newYear, newMonth, 1));
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };

  return (
    <div className="bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800 p-6 rounded-xl shadow-sm max-w-sm mx-auto border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={prevMonth} 
          className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg p-2 cursor-pointer transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <span className="text-lg font-merriweather font-bold text-center px-4 text-blue-800">
          {months[currentMonth]} {currentYear}
        </span>
        <button 
          onClick={nextMonth} 
          className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg p-2 cursor-pointer transition-all duration-300 hover:scale-110"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 p-2 text-sm">
            {day}
          </div>
        ))}
        {Array(firstDay).fill(null).map((_, idx) => (
          <div key={"empty-" + idx} className="p-2"></div>
        ))}
        {Array(daysInMonth).fill(null).map((_, idx) => {
          const day = idx + 1;
          const isToday = day === today.date && currentMonth === today.month && currentYear === today.year;
          const isSelected = day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();
          
          let classes = "text-center p-2 rounded-lg cursor-pointer transition-all duration-300 font-medium ";
          
          if (isSelected) {
            classes += "bg-blue-600 text-white shadow-md transform scale-105 border-2 border-blue-400";
          } else if (isToday) {
            classes += "bg-green-500 text-white shadow-sm hover:bg-green-600";
          } else {
            classes += "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:scale-105 border border-gray-200";
          }
          
          return (
            <div
              key={idx}
              onClick={() => handleDateClick(day)}
              className={classes}
            >
              {day}
            </div>
          );
        })}
      </div>
      
      {/* Calendar Legend */}
      <div className="mt-4 pt-4 border-t border-gray-300">
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Today</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-gray-600">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
