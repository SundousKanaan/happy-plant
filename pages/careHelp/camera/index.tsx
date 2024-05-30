import React, { useEffect, useState } from "react";
import CameraComponent from "@/src/components/CameraComponent/CameraComponent";
import Button from "@/src/components/Button/Button";
import cs from "classnames";
import { useStapper } from "@/src/contexts/tutorialStapper/tutorialStapper";
import useCamera from "@/src/hooks/useCamera";
import { useDialog } from "@/src/contexts/dialogContext/dialogContext";
import PopUp from "@/src/components/PopUp/PopUp";
import { useRouter } from "next/router";
import Image from "next/image";
import Dialog from "@/src/components/Dialog/Dialog";
import $ from "./Camera.module.scss";

const CameraPage = () => {
  const router = useRouter();
  const { openDialog, closeDialog, isOpen } = useDialog();
  const { takePlantImage, plantImage, captureImage, videoRef } = useCamera();
  //photosArray is een array van {plantImage en zijn index}
  const [photosArray, setPhotosArray] = useState<
    { plantImage: string; id: number }[]
  >([]);
  const [cameraButtonDisabled, setCameraButtonDisabled] = useState(false);
  const [correctsignDisabled, setCorrectsignDisabled] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("Over");
  const previusStap =
    typeof window !== "undefined" ? localStorage.getItem("currentPath") : null;

  useEffect(() => {
    captureImage();

    console.log("photosArray", photosArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photosArray]);

  const takeAshot = async () => {
    await takePlantImage();
  };

  useEffect(() => {
    if (plantImage) {
      setPhotosArray([...photosArray, { plantImage, id: photosArray.length }]);
    }

    console.log("photosArray", photosArray.length);

    if (photosArray.length === 2) {
      setCameraButtonDisabled(true);
      setCorrectsignDisabled(false);
    }
  }, [plantImage]);

  const handleBackAction = () => {
    console.log({ previusStap });

    if (previusStap) router.push(previusStap);
  };

  const cameraNotes = [
    "Maak een foto van de hele plant",
    "Maak een foto van de plant vanuit een andere hoek",
  ];

  const handleCorrectsignClick = () => {
    console.log("checkData");
  };

  const removePhoto = (id: number) => () => {
    setPhotosArray(photosArray.filter((photo) => photo.id !== id));
    setCameraButtonDisabled(false);
    setCorrectsignDisabled(true);
  };

  const handlecloseDialog = () => {
    closeDialog();
    setCameraButtonDisabled(false);
    setCorrectsignDisabled(true);
    setPhotosArray([]);
  };

  const handleDoneClick = () => {
    closeDialog();
    setCameraButtonDisabled(false);
    setCorrectsignDisabled(true);
    setPhotosArray([]);
    router.push("/homePage");
  };

  return (
    <>
      <ul className={$.photosList}>
        <li className={$.photoItem}></li>
        <li className={$.photoItem}></li>
        <li className={$.photoItem}></li>
      </ul>
      <ul className={$.photosList}>
        {photosArray.map((photo) => (
          <li key={photo.id} className={$.photoItem}>
            <button className={$.photoButton} onClick={removePhoto(photo.id)}>
              <Image
                src={photo.plantImage}
                layout="fill"
                alt="plant photo"
                className={$.photo}
              />
            </button>
          </li>
        ))}
      </ul>
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
                text="Nieuw schot"
                color="brown"
                onClick={handlecloseDialog}
              />
            </div>
            <div className={$.DialogButton}>
              <Button text="Klaar" color="green" onClick={handleDoneClick} />
            </div>
          </div>
        </div>
      </Dialog>
      <CameraComponent
        text={cameraNotes[0]}
        cameraButton={takeAshot}
        videoRef={videoRef}
        goBack={handleBackAction}
        handleCorrectsignClick={openDialog}
        plantCheck
        correctsignDisabled={correctsignDisabled}
        cameraButtonDisabled={cameraButtonDisabled}
      />
    </>
  );
};

export default CameraPage;
