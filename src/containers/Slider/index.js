import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {/* ***** */
    const interval = setInterval(() => {
      setIndex((prevIndex) =>/* élément actuel  */
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0 /* Boucle, il revient à zéro */
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [byDateDesc]);
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        < div key={event.id}> {/* ajout d'une clef unique pour chaque élément */}
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          {index === idx && ( /* Puce */
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((paginationEvent, radioIdx) => (
                <input
                  key={paginationEvent.id} /* assigne une clé unique à chaque bouton */
                  type="radio"
                  name="radio-button" 
                  checked={index === radioIdx}
                  readOnly 
                />
              ))}
            </div>
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
