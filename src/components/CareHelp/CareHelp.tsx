import React, { use, useEffect, useState } from "react";
import $ from "./CareHelp.module.scss";
import Button from "@/src/components/Button/Button";
import { useRouter } from "next/router";
import cs from "classnames";
import plantsDataBase from "@/data/plantsDatabase.json";
import careInfoDatabase from "@/data/careInfoDatabase.json";

interface CareHelpProps {
  currentPath?: string | undefined;
  openCareHelp?: boolean;
}

const filterItems = [
  "Tips",
  "Hele plant",
  "Plagen",
  "Bloem",
  "Fruit",
  "Wortels",
  "Bladeren",
  "Stam",
];

const CareHelp: React.FC<CareHelpProps> = ({
  currentPath,
  openCareHelp = false,
}) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>("");
  const [plantIndex, setPlantIndex] = useState<number>(-1);
  const [careInfo, setCareInfo] = useState<any>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterInfo, setFilterInfo] = useState<any>();

  // Haal de opgeslagen informatie op
  useEffect(() => {
    if (currentPath) localStorage.setItem("currentPath", currentPath);
    if (openCareHelp) {
      localStorage.setItem("openCareHelp", "true");
    } else {
      localStorage.setItem("openCareHelp", "false");
    }
  });

  // get the plant information from the database
  useEffect(() => {
    setCareInfo(plantsDataBase[plantIndex]?.diseases);
  }, [plantIndex]);

  // search the plant in the database
  const searchPlants = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearching(true);
    setFilterInfo(undefined);
    const searchValue = e.target.value;
    if (searchValue === "") {
      setSearching(false);
      setLoading(false);
      setSearchValue("");
    }
    setSearchValue(searchValue);
    const valueDataIndex = plantsDataBase.findIndex(
      (plant) => plant.name === searchValue
    );

    // get the plant index
    const plantIndex = plantsDataBase.findIndex(
      (plant) => plant.name === searchValue
    );

    setPlantIndex(plantIndex);

    if (valueDataIndex === -1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

  // Filter the information based on the filter index
  const handelFilter = (filterIndex: number) => () => {
    const data = careInfoDatabase.filter((info) => info.id === filterIndex);
    setFilterInfo(data[0].category.info);
  };

  return (
    <div className={$.container}>
      <section className={$.buttonsContainer}>
        <div className={$.buttonItem}>
          <Button
            color="green"
            icon="camera"
            text="Maak een foto en ontdek het probleem"
            onClick={() => router.push("/careHelp/camera")}
            rowDirection
            minpadding
          />
        </div>
        <div className={cs($.buttonItem, $.disabled)}>
          <Button
            color="white"
            icon="house"
            text="Kies uit je echte planten"
            rowDirection
            minpadding
            disabled
          />
        </div>
        <p className={$.note}>Of informatie bladeren</p>
        <label className={$.searchVield}>
          <input
            type="search"
            name="search"
            placeholder="Zoek een plant naam ..."
            className={$.search}
            onChange={searchPlants}
          />
        </label>

        <ul className={$.mainFilters}>
          {filterItems.map((item, index) => {
            const disabled = careInfoDatabase.some((info) => info.id === index);
            return (
              <li className={$.filterItem} key={index}>
                <Button
                  color="white"
                  text={item}
                  onClick={handelFilter(index)}
                  minpadding
                  textSize=".65rem"
                  disabled={!disabled}
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section className={$.reviewContainer}>
        <div className={$.info}>
          {!searching && !filterInfo && (
            <>
              <h3 className={$.infoTitle}>Wat kun je hier vinden?</h3>
              <p className={$.infoItem}>
                Hier kunt u hulp krijgen met betrekking tot:
              </p>
              <ol className={$.infoList}>
                <li className={$.infoItem}>
                  Identificeer het probleem waar uw plant last van heeft en hoe
                  u deze kunt behandelen door er een foto van te maken.
                </li>
                <li className={$.infoItem}>
                  Identificeer de problemen die uw plant kunnen beïnvloeden, hoe
                  u ze kunt vermijden en behandelen.
                </li>
                <li className={$.infoItem}>
                  Identificeer veelvoorkomende problemen die planten aantasten,
                  hoe u ze kunt vermijden en behandelen.
                </li>
              </ol>
            </>
          )}

          {searching && loading && !filterInfo && (
            <h3 className={$.infoTitle}>Er wordt gezocht naar resultaten...</h3>
          )}

          {Array.isArray(careInfo) && searching && !loading && !filterInfo && (
            <>
              <h3 className={cs($.infoTitle, $.colorGreen)}>
                Gevonden informatie over &quot;{searchValue}&quot;
              </h3>
              <h4 className={$.subInfoTitle}>Mogelijke ziekten:</h4>
              {careInfo.map(
                (
                  item: {
                    name: string;
                    analysis: string;
                    treatmentStaps: string[];
                    treatmentToolsImagesPerStap: string[];
                  },
                  index: number
                ) => (
                  <div className={$.ziekteBlock} key={item.name}>
                    <p className={cs($.infoItem, $.colorGreen)} key={index}>
                      <strong>{item.name}</strong>
                    </p>
                    <p className={$.infoItem} key={index}>
                      {item.analysis}
                    </p>
                    <h4 className={cs($.subInfoTitle, $.marginTop)}>
                      Behandeling:
                    </h4>
                    <ol className={$.list}>
                      {item.treatmentStaps.map(
                        (step: string, index: number) => (
                          <li className={$.infoItem} key={index}>
                            {step}
                          </li>
                        )
                      )}
                    </ol>
                    <h4 className={cs($.subInfoTitle, $.marginTop)}>
                      Benodigde hulpmiddelen:
                    </h4>
                    <ol className={$.list}>
                      {item.treatmentToolsImagesPerStap.map(
                        (tool: string, index: number) => (
                          <li className={$.infoItem} key={index}>
                            {tool}
                          </li>
                        )
                      )}
                    </ol>
                  </div>
                )
              )}
            </>
          )}

          {Array.isArray(filterInfo) && filterInfo && (
            <>
              {filterInfo.map(
                (item: { title: string; text: string[] }, index: number) => (
                  <React.Fragment key={index}>
                    <div className={$.infoContainer}>
                      <h3 className={cs($.infoTitle, $.colorGreen)}>
                        {item.title}
                      </h3>
                      {item.text.map((text, index) => (
                        <p className={$.infoItem} key={index}>
                          {text}
                        </p>
                      ))}
                    </div>
                  </React.Fragment>
                )
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CareHelp;
