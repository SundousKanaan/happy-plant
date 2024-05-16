const texts = {
  cameraNote_1:
    "Laten we een foto maken van de plek waar je jouw plant wilt verzorgen.",
  cameraNote_2:
    "Let op: Voor een nauwkeuriger beoordeling kunt u de foto 's middags en zonder gebruik van kamerlicht maken.",

  backgroundShotNote:
    "Maak een foto van het kamer waar je jouw plant wil verzorgen",

  budCloud: (plantName?: string) => [
    "Laat ons eerst jouw zorglocatie kiezen!",
    "Wat een prachtige plek om je plant te verzorgen",
    "Kies je eerste plant!",
    `Je schattige plant heet "${plantName}" en heeft gedeeltelijke zon (max 3 tot 4 uur) nodig! Trek je plant en kijk waar hij het beste staat`,
    "Deze plek is Slecht voor je plant.",
    "Deze plek is Goed voor je plant.",
    "Laten we jouw plant nu voor het eerst keer water geven!",
    "Je zaden beginnen te groeien, gefeliciteerd! Morgen moeten we weer water geven.",
  ],
};

export default texts;
