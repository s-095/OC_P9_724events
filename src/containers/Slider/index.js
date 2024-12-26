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

  const changeSlide = (radioIdx) => {
    setIndex(radioIdx);
  };

  const nextCard = () => {
    setIndex((previousIndex) => (previousIndex < byDateDesc.length - 1 ? previousIndex + 1 : 0));
  };

  useEffect(() => {
    const timeout = setTimeout(nextCard, 5000);
    return () => clearTimeout(timeout);
  }, [index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (

        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img src={event.cover} alt={event.description} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((e, radioIdx) => (

            <input
              key={e.title}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => changeSlide(radioIdx)}

            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
