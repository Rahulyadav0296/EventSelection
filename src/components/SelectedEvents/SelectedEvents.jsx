import React from "react";
import Avatar from "react-avatar";
import "./SelectedEvents.css";

function SelectedEvents({ chooseEvent, handleRemoveEvent }) {
  const getTime = (time) => {
    const currentTime = new Date(time);
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const ampm = hours >= 12 ? "PM" : "AM"; // Determine if it's AM or PM
    hours = hours % 12; // Convert 24-hour time to 12-hour format
    hours = hours ? hours : 12; // Handle the case where hour is 0 (midnight should be 12)

    // Format the time as HH:MM AM/PM
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return formattedTime;
  };

  const colorMap = {
    Swimming: "#1E90FF",
    Athletics: "#FF4500",
    Boxing: "#32CD32",
  };

  return (
    <div className="all-events">
      <h1>Selected Events</h1>
      <div className="events-list">
        {chooseEvent &&
          chooseEvent.map((event, index) => (
            <div key={event.id} className="event-item">
              <Avatar
                name={event.event_category}
                size="70"
                round={true}
                color={colorMap[event.event_category] || "#808080"}
              />
              <div className="vertical-line"></div>
              <div className="event-details">
                <h4 className="event-name">{event.event_name}</h4>
                <p className="event-category">({event.event_category})</p>
                <p className="event-time">
                  {getTime(event.start_time)} - {getTime(event.end_time)}
                </p>
                <button
                  className="remove-button"
                  onClick={() => {
                    handleRemoveEvent(index);
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SelectedEvents;
