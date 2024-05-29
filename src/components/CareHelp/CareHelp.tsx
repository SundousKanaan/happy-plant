import React from "react";
import $ from "./CareHelp.module.scss";
import Button from "@/src/components/Button/Button";

const CareHelp = () => {
  return (
    <div className={$.container}>
      <section className={$.buttonsContainer}>
        <div className={$.buttonItem}>
          <Button
            color="green"
            icon="camera"
            text="Maak een foto en ontdek het probleem"
            onClick={() => console.log("camera")}
            rowDirection
            minpadding
          />
        </div>
        <div className={$.buttonItem}>
          <Button
            color="white"
            icon="house"
            text="Kies uit je echte planten"
            onClick={() => console.log("house")}
            rowDirection
            minpadding
          />
        </div>
        <p className={$.note}>Of informatie bladeren</p>
        <label className={$.searchVield}>
          <input
            type="search"
            name="search"
            placeholder="Het plant naam of type ..."
            className={$.search}
          />
        </label>

        <ul className={$.mainFilters}>
          <li className={$.filterItem}>
            <Button
              color="white"
              text="Tips"
              onClick={() => console.log("Ziekten en plagen")}
              minpadding
            />
          </li>
          <li className={$.filterItem}>
            <Button
              color="white"
              text="Tips"
              onClick={() => console.log("Ziekten en plagen")}
              minpadding
            />
          </li>
          <li className={$.filterItem}>
            <Button
              color="white"
              text="Tips"
              onClick={() => console.log("Ziekten en plagen")}
              minpadding
            />
          </li>
          <li className={$.filterItem}>
            <Button
              color="white"
              text="Tips"
              onClick={() => console.log("Ziekten en plagen")}
              minpadding
            />
          </li>
          <li className={$.filterItem}>
            <Button
              color="white"
              text="Tips"
              onClick={() => console.log("Ziekten en plagen")}
              minpadding
            />
          </li>
          <li className={$.filterItem}>
            <Button
              color="white"
              text="Tips"
              onClick={() => console.log("Ziekten en plagen")}
              minpadding
            />
          </li>
          <li className={$.filterItem}>
            <Button
              color="white"
              text="Tips"
              onClick={() => console.log("Ziekten en plagen")}
              minpadding
            />
          </li>
          <li className={$.filterItem}>
            <Button
              color="white"
              text="Tips"
              onClick={() => console.log("Ziekten en plagen")}
              minpadding
            />
          </li>
        </ul>
      </section>
      <section className={$.reviewContainer}>
        <div className={$.info}>
          <h3 className={$.infoTitle}>Wat kun je hier vinden?</h3>
          <p className={$.infoItem}>
            Hier kunt u hulp krijgen met betrekking tot:
          </p>
          <ol className={$.infoList}>
            <li className={$.infoItem}>
              Identificeer het probleem waar uw plant last van heeft en hoe u
              deze kunt behandelen door er een foto van te maken.
            </li>
            <li className={$.infoItem}>
              Identificeer de problemen die uw plant kunnen beïnvloeden, hoe u
              ze kunt vermijden en behandelen.
            </li>
            <li className={$.infoItem}>
              Identificeer veelvoorkomende problemen die planten aantasten, hoe
              u ze kunt vermijden en behandelen.
            </li>
          </ol>
          <p className={$.infoItem}>
            Hier kunt u hulp krijgen met betrekking tot: Identificeer het
            probleem waar uw plant last van heeft en hoe u deze kunt behandelen
            door er een foto van te maken. Identificeer de problemen die uw
            plant kunnen beïnvloeden, hoe u ze kunt vermijden en behandelen.
            Identificeer veelvoorkomende problemen die planten aantasten, hoe u
            ze kunt vermijden en behandelen.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CareHelp;
