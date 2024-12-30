import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredEvents = (
    (!type
      ? data?.events
      : data?.events.filter((event) => event.type === type)) || []
  ).filter((_events, index) => {/*  garde seulement ceux qui doivent être affichés */
    if (
      (currentPage - 1) * PER_PAGE <= index &&
      PER_PAGE * currentPage > index
    ) {
      return true;
    }
    return false;
  });
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const totalEvents =/*  calcul nombres total d'événements */
    data?.events.filter((event) => (type ? event.type === type : true))
      .length || 0; /* combien d'événements restent */
      const pageNumber = Math.ceil(totalEvents / PER_PAGE);
      const typeList = Array.from(new Set(data?.events.map((event) => event.type)));/* Crée une liste unique des types d'événements */
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select /* menu déroulant */
             selection={typeList}
             onChange={(value) => changeType(value)}
             titleEmpty={false}/*  pour dire qu'il n'aura pas de texte avec aucun filtre */
             label="Type d'événement"
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
          {Array.from({ length: pageNumber }, (_, n) => (<a/*  création d'un identifiant unique */
                key={`page-${n + 1}`}/*  ****** */
              href="#events" 
              onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
