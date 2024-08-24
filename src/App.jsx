import React, { useEffect, useState } from "react";
import AllEvents from "./components/AllEvents/AllEvents";
import ModalData from "./components/Modal/Modal";
import SelectedEvents from "./components/SelectedEvents/SelectedEvents";
import events from "./utils/events.json";

function App() {
  const [chooseEvent, setChooseEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const savedEvents = localStorage.getItem("chooseEvent");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      setChooseEvent(parsedEvents);
      console.log("Loaded events from localStorage:", parsedEvents);
    }
  }, []);
  useEffect(() => {
    if (chooseEvent.length > 0) {
      localStorage.setItem("chooseEvent", JSON.stringify(chooseEvent));
      console.log("Saving events to localStorage:", chooseEvent);
    }
  }, [chooseEvent]);

  const checkIfEventExists = (id) => {
    return chooseEvent.some((event) => event.id === id);
  };

  const handleSelectEvent = (id) => {
    if (chooseEvent.length >= 3) {
      setOpen(true);
      setErrorMessage("You cannot select more than 3 Events!");
      return;
    }

    const exists = checkIfEventExists(id);
    if (exists) {
      setOpen(true);
      setErrorMessage(`The Event ${id} already exists, please select another!`);
    } else {
      const newEvent = events.find((event) => event.id === id);
      setChooseEvent((prev) => [...prev, newEvent]);
      setOpen(false);
      setErrorMessage("");
    }
  };

  const handleRemoveEvent = (index) => {
    if (index < 0 || index >= chooseEvent.length) {
      console.error("Index Out of Bound!");
      return;
    }

    const filteredEvents = chooseEvent.filter((_, id) => id !== index);
    console.log(filteredEvents);
    setChooseEvent(filteredEvents);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="events-management">
      {/* All Events  */}
      <AllEvents handleSelectEvent={handleSelectEvent} />

      {/* Selected Events  */}
      <SelectedEvents
        chooseEvent={chooseEvent}
        handleRemoveEvent={handleRemoveEvent}
      />

      <ModalData
        handleClose={handleClose}
        errorMessage={errorMessage}
        open={open}
      />
    </div>
  );
}

export default App;
