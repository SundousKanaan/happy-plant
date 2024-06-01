import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/src/components/User/User";
import { Icon } from "@/src/components/Icon/Icon";
import cs from "classnames";
import $ from "./problem.module.scss";
import { useRouter } from "next/router";
import PopUP from "@/src/components/PopUp/PopUp";
import CareHelp from "@/src/components/CareHelp/CareHelp";
import Menulist from "@/src/components/menuList/MenuList";
import { PlantPosition } from "@/ts/types";
// import dataBase from "@/data/database.json";
import Input from "@/src/components/Input/Input";
import Button from "@/src/components/Button/Button";
import { BudCloud } from "@/src/components/BudCloud/BudCloud";
import Dialog from "@/src/components/Dialog/Dialog";
import { useDialog } from "@/src/contexts/dialogContext/dialogContext";
import Draggable from "react-draggable";
import { Award } from "@/src/components/Award/Award";

const tasks = [
  {
    type: "doel",
    text: "Voltooi de tutorial",
    doen: true,
  },
  {
    type: "step",
    text: "Geef je plant een naam",
    doen: true,
  },
  {
    type: "step",
    text: "2 dagen achter elkaar water geven",
    doen: false,
  },
  {
    type: "step",
    text: "3 dagen achter elkaar water geven",
    doen: false,
  },
  {
    type: "step",
    text: "7 dagen achter elkaar water geven",
    doen: false,
  },
  {
    type: "doel",
    text: "Gezold plant voor 1 week",
    doen: false,
  },
  {
    type: "Step",
    text: "Gebruik 1 beloning",
    doen: false,
  },
  {
    type: "Step",
    text: "Gebruik 3 beloningen",
    doen: false,
  },
  {
    type: "Step",
    text: "share 1 plant met een vriend",
    doen: false,
  },
  {
    type: "doel",
    text: "zorg 2 planten tegelijkertijd",
    doen: false,
  },
];

const Problem = () => {
  const router = useRouter();
  const [bg, setBg] = useState("");
  const [plantName, setPlantName] = useState("");
  const { openDialog, closeDialog, isOpen } = useDialog();
  const [countdown, setCountdown] = useState(24 * 60 * 60);
  const [selectedFilter, setSelectedFilter] = useState("Over");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [careHelpIsOpen, setCareHelpIsOpen] = useState(false);
  const [savedPlantPosition, setSavedPlantPosition] = useState<PlantPosition>({
    x: 0,
    y: 0,
  });
  const [tasksListIsOpen, setTasksListIsOpen] = useState(false);
  const [textCloud, setTextCloud] =
    useState(`Ellie is ziek! Wij hebben haar hulp nodig!
  Bekijk haar probleem!`);
  const [darkBg, setDarkBg] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStoped, setDragStoped] = useState(false);
  const [showAward, setShowAward] = useState(false);

  // get the background image from the local storage
  useEffect(() => {
    const storedBg = localStorage.getItem("backgroundImage");
    if (storedBg) {
      setBg(storedBg);
    }
  }, [bg]);

  // get the plant position from the local storage
  useEffect(() => {
    const SavedPlantPosition = localStorage.getItem("plantPosition");
    setSavedPlantPosition(
      SavedPlantPosition ? JSON.parse(SavedPlantPosition) : { x: 0, y: 0 }
    );
  }, []);

  // make a timer to make a countdown for the next watering
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // get the plant name from the local storage
  useEffect(() => {
    const plantName = localStorage.getItem("plantName");
    if (plantName) {
      setPlantName(plantName);
    }
  }, []);

  // format the time to be in the format of HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Dialog functions
  const handelCloseDialog = () => {
    closeDialog();
    setTextCloud(
      "Ik zie dat de verwonding van Ellie mild is, omdat minder dan 50% van de bladeren bruin is"
    );
    setDarkBg(true);
  };

  const plantBehandeling = () => {
    setDarkBg(false);
    setTextCloud("We moeten snoeien om zieke bladeren te verwijderen.");
  };

  const handelDragSchaar = (e: any, data: any) => {
    setDragging(true);
  };

  const handelStopDragSchaar = () => {
    setDragStoped(true);
  };

  // make a timer to set dragStoped false after 5 seconds
  useEffect(() => {
    if (!dragStoped) return;
    const timer = setTimeout(() => {
      setShowAward(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [dragStoped]);

  const handelClaim = () => {
    router.push("/home");
  };

  return (
    <section className={$.container}>
      {showAward && (
        <Award award="shield" text="Radder-badge" handelClaim={handelClaim} />
      )}

      {darkBg && <div className={$.halfDarkBg}></div>}
      <span className={cs($.budCloud)}>
        <BudCloud type="scared" text={textCloud} isOpen />

        {darkBg && (
          <div className={$.budCloudActionButton}>
            <Button
              text="Behandeling"
              color="green"
              onClick={plantBehandeling}
            />
          </div>
        )}
      </span>

      <div className={$.bgContainer}>
        {bg !== "" && (
          <Image
            src={bg}
            alt="background"
            layout="fill"
            className={cs("backgroundPhoto", $.bg)}
            style={{
              objectFit: "cover",
              objectPosition: "bottom",
            }}
          />
        )}
      </div>
      <div className={$.userContainer}>
        <User />
      </div>
      <div className={$.sittingsContainer}>
        <Icon icon="settings" />
      </div>

      <div className={cs($.tasksContainer)}>
        <button
          className={$.tasksButton}
          onClick={() => setTasksListIsOpen(!tasksListIsOpen)}
        >
          Taken
        </button>
        <ul className={$.tasksList}>
          {tasks.map((task, index) => {
            return (
              <li
                key={index}
                className={cs(
                  $.taskItem,
                  { [$.doel]: task.type === "doel" },
                  { [$.doen]: task.doen }
                )}
              >
                {task.text}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={$.nextAward}>
        <div className={$.icon}>
          <Image
            src="/images/icons/shield.svg"
            layout="fill"
            alt="shield icon"
          />
        </div>
        <p className={$.awardText}>Volgende Award</p>
      </div>

      <div className={$.actionButtons}>
        <div className={$.buttonItem}>
          <button className={$.button}>
            <Icon icon="agenda" text="agenda" />
          </button>
        </div>
        <div className={$.buttonItem}>
          <button className={$.button} disabled>
            <div className={$.wateringIcon}>
              <Image
                src="/images/icons/watering.svg"
                layout="fill"
                alt="watering icon"
              />
            </div>
            <p className={$.wateringText}>{`-${formatTime(countdown)}h`}</p>
          </button>
        </div>

        <Draggable
          axis="both"
          handle=".draggableElement"
          onDrag={handelDragSchaar}
          onStop={handelStopDragSchaar}
        >
          <div
            className={cs("draggableElement", $.schaarIcon, {
              [$.stopDrag]: dragStoped,
            })}
            // style={{
            //   transform: dragStoped && {`translate(0px, 0px})`},
            // }}
          >
            <Icon icon="pruningscissors" text={dragging ? "" : "Schaar"} />
          </div>
        </Draggable>
      </div>

      <div className={$.changeButton}>
        <Icon icon="Camelia-plant" />
        <p className={$.changeButtonText}>Hoofdplan veranderen</p>
      </div>

      <div
        className={$.plant}
        style={{
          transform: `translate(${savedPlantPosition.x}px, ${savedPlantPosition.y}px)`,
        }}
      >
        <div
          className={cs($.nameContainer, { [$.careingDoen]: dragStoped })}
          onClick={() => openDialog()}
        >
          <p className={$.plantName}>{plantName}</p>
        </div>
        <div className={cs($.fakePLant)}>
          <div className={cs($.leafRight, { [$.cutLeaf]: dragStoped })}></div>
          <div className={$.leafLeft}></div>
        </div>
        <Image
          src="/images/icons/pot-default.svg"
          alt="pot-default"
          className={$.potImage}
          layout="fill"
        />
      </div>

      {!menuIsOpen && (
        <div className={cs($.buttonItem, $.menuButton)}>
          <button className={$.button}>
            <p className={$.buttonText}>Menu</p>
            <div className={$.menuIcon}>
              <Image
                src="/images/icons/menuGrid.svg"
                layout="fill"
                alt="menu icon"
              />
            </div>
          </button>
        </div>
      )}

      <Dialog
        isOpen={isOpen}
        onClose={closeDialog}
        backgroundColor="transparent"
      >
        <div className={$.dialogContent}>
          <div className={$.inhoud}>
            <h2 className={$.diseaseName}>Dor blad</h2>
            <div className={$.infoContainer}>
              <ul className={$.filterButtons}>
                <li
                  className={cs($.filterItem, {
                    [selectedFilter === "Over" ? $.selectedFilter : ""]: true,
                  })}
                >
                  <button
                    className={cs($.filterButton)}
                    onClick={() => setSelectedFilter("Over")}
                  >
                    Over
                  </button>
                </li>
                <li
                  className={cs($.filterItem, {
                    [selectedFilter === "Voorkomen" ? $.selectedFilter : ""]:
                      true,
                  })}
                >
                  <button
                    className={cs($.filterButton)}
                    onClick={() => setSelectedFilter("Voorkomen")}
                  >
                    Voorkomen
                  </button>
                </li>
                <li
                  className={cs($.filterItem, {
                    [selectedFilter === "Behandeling" ? $.selectedFilter : ""]:
                      true,
                  })}
                >
                  <button
                    className={cs($.filterButton)}
                    onClick={() => setSelectedFilter("Behandeling")}
                  >
                    Behandeling
                  </button>
                </li>
              </ul>
              <div className={$.info}>
                <div className={$.photoBlock}>
                  <Image
                    src="/images/dor-blad.svg"
                    layout="fill"
                    alt="plant photo"
                    className={$.diseasePhoto}
                  />
                </div>
                <div className={$.infoTexts}>
                  {/* Bron: info from sprinklr website: https://sprinklr.co/blogs/kamerplanten-tips/dor-blad */}
                  {selectedFilter === "Over" && (
                    <>
                      <h3 className={$.infoTitle}>
                        Een dor blad! Dit doe je ermee:
                      </h3>
                      <p className={$.text}>
                        {" "}
                        We krijgen nogal vaak de vraag: OH JEE ik zie een kleine
                        bruine vlek, wat nu?! Maar er is echt niet altijd wat
                        aan de hand. Of in elk geval: er is echt niet altijd
                        iets ergs aan de hand. Planten leven, en leven is ook
                        een beetje lijden. Kijk maar naar jezelf. Als je twintig
                        bent zit je lijf al vol verhalen van de littekens. Dat
                        vlekje op je knie van toen je van je skateboard viel,
                        dat plekje bij je wenkbrauw van toen je broer je uit je
                        eetstoel duwde, etc.
                      </p>

                      <p className={$.text}>
                        Een echte plant blijft niet hetzelfde. Die leeft bij
                        jou, die groeit bij jou en die lijdt bij jou. De plant
                        valt een keer om, de kat knabbelt eraan, de lucht was
                        even te droog door de verwarming, de buurvrouw gaf
                        teveel of te weinig water terwijl je op vakantie was (of
                        je deed het zelf)... het hoort erbij. De plant loopt wat
                        schade op, maar heej, hij leeft door met des te meer
                        karakter.
                      </p>

                      <p className={$.text}>
                        Raak dus niet meteen in paniek van een dor of geel blad.
                        Ga wel na of de schade veroorzaakt is door een situatie
                        die voortduurt. Zo ja, stop die situatie.
                      </p>
                    </>
                  )}
                  {selectedFilter === "Voorkomen" && (
                    <>
                      <h3 className={$.infoTitle}>
                        Wanneer hoef je niet in te grijpen?
                      </h3>
                      <h4 className={$.subInfoTitle}>
                        Slechts één blad sterft af.
                      </h4>
                      <p className={$.text}>
                        Sterft er maar één blaadje af en doet de rest van de
                        plant het goed? Dan hoef je niet in te grijpen. Dan
                        heeft je plant een momentje van stress gehad (teveel
                        water, te weinig water, of ander soort stress), dan
                        heeft de plant besloten om één blad te offeren en dan
                        blijft het daarbij. Houd wel je plant in de gaten, als
                        er kort daarop hetzelfde gebeurt met weer een blad, dan
                        moet je op zoek naar een oorzaak.
                      </p>
                      <h4 className={$.subInfoTitle}>
                        Het gaat om een plant die bladeren hoort te verliezen.
                      </h4>
                      <p className={$.text}>
                        Sommige planten groeien zoals bijvoorbeeld een kokospalm
                        ook groeit: er groeien nieuwe bladeren uit de top, en
                        terwijl dat gebeurt sterven de onderste bladeren af. De
                        pannenkoekplant is een goed voorbeeld, die stoot ook de
                        onderste bladeren af, terwijl vanuit de top nieuw blad
                        groeit. De pannenkoekplant heeft uiteindelijk ook een
                        stammetje met ogen waar ooit steeltjes zaten, met een
                        toef aan groen.
                      </p>
                      <p className={$.text}>
                        Maar ook andere planten laten trouwens regelmatig
                        onderste bladeren gaan, dat is een normaal onderdeel van
                        het groeiproces. De bananenplant bijvoorbeeld, doet dat
                        ook.
                      </p>

                      <h3 className={$.infoTitle}>
                        Wanneer moet je wel ingrijpen en wat doe je dan?
                      </h3>
                      <p className={$.text}>
                        Grijp in als je ziet dat er na dat ene vergelende of
                        dorre blad, nòg een blad vergeeld en verdord. En nòg
                        eentje. Want dan is er sprake van iets dat jouw plant
                        permanent dwars zit. Bijvoorbeeld te droge lucht. Of
                        teveel of te weinig water. En dat ga je dan natuurlijk
                        proberen op te lossen.
                      </p>
                      <p className={$.text}>
                        Hieronder een rijtje symptomen met oorzaken.
                      </p>

                      <h4 className={$.subInfoTitle}>
                        Gele en bruine randen of punten
                      </h4>
                      <p className={$.text}>
                        veroorzaakt door droge lucht of door te weinig water.
                        Maak de lucht vochtiger door bakjes water op de
                        verwarming te zetten. Lees hier meer over ingrepen die
                        je kan doen.
                      </p>
                      <h4 className={$.subInfoTitle}>
                        Bladeren verdorren en vallen af in de winter
                      </h4>
                      <p className={$.text}>
                        de plant staat te warm en te donker. Zet him wat dichter
                        bij het raam, en wat verder van de verwarming (als je zo
                        een plek hebt).
                      </p>

                      <h4 className={$.subInfoTitle}>
                        Geel blad aan de onderkant van je plant
                      </h4>
                      <p className={$.text}>
                        teveel water gegeven, wortels zijn aan het rotten. Laat
                        de kluit uitdrogen en geef daarna minder water.
                      </p>

                      <h4 className={$.subInfoTitle}>Bladeren worden geel</h4>
                      <p className={$.text}>
                        de plant staat te licht of te donker (in de winter
                        eerder te donker).
                      </p>

                      <h4 className={$.subInfoTitle}>
                        Bladeren worden slap, gaan hangen
                      </h4>
                      <p className={$.text}>
                        te weinig water of een te koude standplek (bijvoorbeeld
                        in de winter bij enkel glas).
                      </p>

                      <h4 className={$.subInfoTitle}>
                        Bladeren verschrompelen
                      </h4>
                      <p className={$.text}>
                        te heftige temperatuurwisselingen, te koud in combinatie
                        met te natte wortels, te droge lucht.
                      </p>
                    </>
                  )}
                  {selectedFilter === "Behandeling" && (
                    <>
                      <h3 className={$.infoTitle}>
                        Hoe houd je je plant mooi?
                      </h3>
                      <p className={$.text}>
                        Dor blad kun je maar beter verwijderen. Voor je het weet
                        komen er schimmels op of ander gespuis op feesten, en
                        moois is anders. Pak een schone, scherpe snoeischaar en
                        knip het aangetaste blad zo dicht mogelijk bij de aarde
                        of de stengel af.
                      </p>
                      <h4 className={$.subInfoTitle}>Staps:</h4>
                      <p className={cs($.text, $.step)}>
                        1. Neem een schape, schone plantenschaar Snijd het
                      </p>
                      <p className={cs($.text, $.step)}>
                        2. aangetaste blad zo dicht mogelijk bij de grond of
                        stam af
                      </p>

                      <p className={$.text}>
                        Is slechts een deel, bijvoorbeeld de punt of de rand,
                        van het blad verdord, dan kun je beginnen met eerst
                        alleen het lelijke deel weg te knippen. Wie weet blijft
                        de rest van het blad wel mooi!
                      </p>
                      <p className={$.text}>
                        Knip op het stukje gestorven blad vlak naast het nog
                        levende deel van het blad, volg de lijn netjes en je
                        houdt een korter of kleiner maar gezond uitziend blad
                        over.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={$.DialogButtonsContainer}>
            <div className={$.DialogButton}>
              <Button
                text="Behandeling"
                color="green"
                onClick={handelCloseDialog}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default Problem;
