/** @format */

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  format,
  isSameMonth,
  // isSameDay,
  isToday,
  getISOWeek,
} from "date-fns";
import EventModal from "../Modals/EventModal.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import EventCard from "./EventCard.jsx";

export default function Calendar({ onEventClick, onCreateEvent }) {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentMonth);

  const selectedEvents =
    user.events?.filter(
      (e) =>
        e.date && e.date.split("T")[0] === format(selectedDate, "yyyy-MM-dd")
    ) || [];

  const eventDates = user.events?.map((e) => e.date).filter(Boolean) || [];

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };
  const renderHeader = () => {
    return (
      <div className="flex flex-col justify-center items-center p-4  ">
        <h2 className="text-xl font-bold">{format(currentMonth, "yyyy")}</h2>
        <div className=" flex space-x-2">
          <button
            className="btn btn-sm rounded-full"
            onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </button>
          <div className="text-xl font-bold w-32 text-center">
            {format(currentMonth, "MMMM")}
          </div>
          <button
            className="btn btn-sm rounded-full"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-center font-medium text-neutral-content py-2"
        >
          {format(addDays(startDate, i), "EEEEEE")}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-4 sm:grid-cols-8  ">
        <div className="text-center font-medium text-secondary py-2">Wk</div>
        {days}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      const weekNumber = getISOWeek(day);
      days.push(
        <div
          key={`week-${weekNumber}`}
          className="font-bold text-secondary flex items-center justify-center"
        >
          {weekNumber}
        </div>
      );

      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const hasEvent = eventDates.some(
          (eventDate) =>
            eventDate &&
            format(new Date(eventDate), "yyyy-MM-dd") ===
              format(cloneDay, "yyyy-MM-dd")
        );

        days.push(
          <div
            key={cloneDay}
            className={`w-12 p-2 text-center cursor-pointer rounded-full my-2 mx-auto
              ${!isSameMonth(cloneDay, monthStart) ? "text-gray-400" : ""}
              ${isToday(cloneDay) ? "bg-primary/30 font-bold" : ""}
              ${hasEvent ? "bg-accent/30" : ""}
            `}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span>{format(cloneDay, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-4  sm:grid-cols-8" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const renderSelectedDay = () => {
    const selectedMonth = format(selectedDate, "MMMM");
    const selectedDay = format(selectedDate, "d");
    const selectedYear = format(selectedDate, "yyyy");

    return (
      <div>
        <h3 className="text-lg font-bold">{`${selectedMonth} ${selectedDay}, ${selectedYear}`}</h3>
      </div>
    );
  };

  const handleAddEvent = () => {
    onCreateEvent(format(selectedDate, "yyyy-MM-dd"));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full rounded-xl ">
        <h3 className="text-lg font-bold mb-4">Calendar</h3>
        <div className="w-full flex flex-col rounded-xl shadow-md bg-base-200 px-4">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      </div>

      <div className="flex flex-col bg-base-200 p-4 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          {renderSelectedDay()}

          {/* add new event button */}
          <button
            onClick={handleAddEvent}
            className="btn btn-primary rounded-2xl"
          >
            <span>Add New Event</span>
          </button>
        </div>
        <div className="space-y-4">
          <div className=" p-4 rounded-lg bg-background-light">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 my-4">
              {/* added events here */}
              {selectedEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onEventClick={onEventClick}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
