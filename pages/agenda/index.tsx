import React, { useEffect, useState } from "react";
import $ from "./agenda.module.scss";
import cs from "classnames";
import Button from "@/src/components/Button/Button";
import AgendaNote from "@/src/components/agendaNote/AgendaNote";
import { PlantType } from "@/ts/types";
import { useAccount } from "@/src/contexts/account/accountContext";

const monthesArray = [
  "Januari",
  "Februari",
  "Maart",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Augustus",
  "September",
  "Oktober",
  "November",
  "December",
];

const daysNamesArray = [
  "Zondag",
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
];

const Agenda = () => {
  // Huidige datum
  const { account } = useAccount();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  const currentMonth = monthesArray[currentDate.getMonth()];
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  // Huidige maand (0-indexed, dus januari is 0)
  const [usedMonthIndex, setUsedMonthIndex] = useState<number>(
    currentDate.getMonth()
  );
  const [daysDatesArray, setDaysDatesArray] = useState<number[]>([]);
  const [gridView, setGridView] = useState<boolean>(true);
  const [userPlants, setUserPlants] = useState<PlantType[]>([]);

  useEffect(() => {
    const database: {
      [key: string]: { plants: PlantType[] };
    } = require("@/data/database.json");
    if (account === undefined) return () => {};
    const userPlants = database[account.id].plants;
    setUserPlants(userPlants);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMonthData(usedMonthIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedMonthIndex]);

  const getMonthData = (usedMonthIndex: number) => {
    // Aantal dagen in de huidige maand
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      usedMonthIndex + 1,
      0
    ).getDate();

    // Array van de dagen in de huidige maand
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );

    setDaysDatesArray(daysArray);
  };

  const handleNextMonth = () => {
    if (usedMonthIndex < 11) {
      setUsedMonthIndex(usedMonthIndex + 1);
    } else {
      setUsedMonthIndex(0);
    }
  };

  const handlePreviousMonth = () => {
    if (usedMonthIndex > 0) {
      setUsedMonthIndex(usedMonthIndex - 1);
    } else {
      setUsedMonthIndex(11);
    }
  };

  return (
    <div className={$.container}>
      <h1 className={$.pageTitle}>Mijn agenda</h1>

      <div className={$.monthTitle}>
        <p className={$.monthName}>
          {monthesArray[usedMonthIndex]} {currentYear}
        </p>
      </div>

      <div className={$.xSignal}>
        <Button
          icon="Xsignal"
          color="transparent"
          onClick={() => console.log("back")}
        />
      </div>

      <div className={$.viewButtons}>
        <div className={$.columnsView}>
          <Button
            icon="columnsview"
            color="transparent"
            onClick={() => console.log("column")}
          />
        </div>
        <label className={cs($.checkbox, { [$.checked]: !gridView })}>
          <input
            type="checkbox"
            className={$.input}
            onChange={() => setGridView(!gridView)}
          />
        </label>
        <div className={$.gridView}>
          <Button
            icon="gridview"
            color="transparent"
            onClick={() => console.log("list")}
          />
        </div>
      </div>

      <ul className={$.filterButtons}>
        <li
          className={cs($.filterItem, {
            [selectedFilter === "all" ? $.selectedFilter : ""]: true,
          })}
        >
          <button
            className={cs($.filterButton)}
            onClick={() => setSelectedFilter("all")}
          >
            All
          </button>
        </li>
        <li
          className={cs($.filterItem, {
            [selectedFilter === "digital" ? $.selectedFilter : ""]: true,
          })}
        >
          <button
            className={cs($.filterButton)}
            onClick={() => setSelectedFilter("digital")}
          >
            Digital
          </button>
        </li>
        <li
          className={cs($.filterItem, {
            [selectedFilter === "echt" ? $.selectedFilter : ""]: true,
          })}
        >
          <button
            className={cs($.filterButton)}
            onClick={() => setSelectedFilter("echt")}
          >
            Echt
          </button>
        </li>
      </ul>

      <div className={$.gridContainer}>
        <ul className={$.daysCells}>
          {daysNamesArray.map((day, index) => (
            <li key={index} className={$.dayItem}>
              {day}
            </li>
          ))}
        </ul>
        {gridView ? (
          <ul className={$.datesCells}>
            {daysDatesArray.map((date, index) => (
              <li
                key={index}
                className={$.dateItem}
                onClick={() => setUsedMonthIndex(index)}
                style={{
                  borderBottom:
                    date > currentDay
                      ? "none"
                      : "solid 0.5px var(--secondary-brown)",
                  width: date === 31 ? "99%" : "100%",
                  backgroundColor:
                    date === currentDay &&
                    currentMonth === monthesArray[usedMonthIndex]
                      ? "var(--tertiary-brown)"
                      : "",
                }}
              >
                <p
                  className={$.dateNumber}
                  style={{
                    color:
                      date === currentDay &&
                      currentMonth === monthesArray[usedMonthIndex]
                        ? "white"
                        : "",
                  }}
                >
                  {date}

                  {userPlants.map((plant) => (
                    <AgendaNote
                      key={plant.id}
                      plantName={plant.plantName}
                      plantType={plant.type}
                      careType="watering"
                      currentDay={
                        date === currentDay
                        // &&                 currentMonth === monthesArray[usedMonthIndex]
                      }
                      careDone={
                        date < currentDay &&
                        currentMonth === monthesArray[usedMonthIndex]
                      }
                    />
                  ))}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className={$.weekView}>
            <ul className={$.datesCells}>
              {daysDatesArray.map((date, index) => (
                <li key={index} className={$.dateItem}>
                  <p
                    className={$.dateNumber}
                    style={{
                      color:
                        date === currentDay &&
                        currentMonth === monthesArray[usedMonthIndex]
                          ? "white"
                          : "",
                    }}
                  >
                    {date}

                    {/* {userPlants.map((plant) => (
                      <AgendaNote
                        key={plant.id}
                        plantName={plant.plantName}
                        plantType={plant.type}
                        careType="watering"
                        currentDay={
                          date === currentDay
                          // &&                 currentMonth === monthesArray[usedMonthIndex]
                        }
                        careDone={
                          date < currentDay &&
                          currentMonth === monthesArray[usedMonthIndex]
                        }
                      />
                    ))} */}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={$.nextMonthButton}>
        <Button icon="Arrow" color="transparent" onClick={handleNextMonth} />
      </div>

      <div className={$.backMonthButton}>
        <Button
          icon="Arrow"
          color="transparent"
          onClick={handlePreviousMonth}
        />
      </div>
    </div>
  );
};

export default Agenda;