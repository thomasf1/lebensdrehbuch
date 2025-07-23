// Guided interview topics and questions for the chat interview flow
// German guided interview structure with topics, subtopics, and questions
export interface GuidedQuestion {
  [key: string]: string;
}

export interface GuidedSubtopic {
  id: string;
  title: string;
  questions: GuidedQuestion; // Changed to GuidedQuestion object
}

// Define a type for a dictionary where keys are strings and values are GuidedSubtopic
export type GuidedSubtopicsMap = {
  [key: string]: GuidedSubtopic;
};

export interface GuidedTopic {
  id: string;
  title: string;
  subtopics: GuidedSubtopicsMap; // Changed to a map
}

// Define a type for the top-level dictionary where keys are strings and values are GuidedTopic
export type GuidedTopicsMap = {
  [key: string]: GuidedTopic;
};

export const guidedTopics: GuidedTopicsMap = {
  standortbestimmung: {
    id: 'standortbestimmung',
    title: 'Standortbestimmung: Wo stehst du heute?',
    subtopics: {
      rollen: {
        id: 'rollen',
        title:
          'Welche Rollen füllst du aktuell aus (Unternehmer, Partner, Elternteil)?',
        questions: {
          q1: 'In welchen Rollen fühlst du dich authentisch und lebendig - in welchen spielst du nur Theater?',
          q2: 'Welche deiner Rollen sind aus innerer Überzeugung entstanden und welche aus äußeren Erwartungen?',
          q3: 'Wo erlebst du Rollenkonflikte oder das Gefühl, zwischen verschiedenen Identitäten hin- und hergerissen zu sein?',
        },
      },
      funktionierendes: {
        id: 'funktionierendes',
        title:
          'Was funktioniert gut in deinem Leben? Wo erlebst du Energie, Sinn, Freude?',
        questions: {
          q1: 'In welchen Momenten des letzten Monats hast du dich am lebendigsten und erfülltesten gefühlt?',
          q2: 'Welche Tätigkeiten oder Begegnungen geben dir so viel Energie, dass du dabei die Zeit vergisst?',
          q3: 'Woran merkst du körperlich und emotional, dass etwas "richtig" für dich ist?',
        },
      },
      mangel: {
        id: 'mangel',
        title:
          'Wo spürst du Mangel, Unzufriedenheit oder unerfüllte Sehnsüchte?',
        questions: {
          q1: 'Welche wiederkehrenden Gedanken oder Gefühle signalisieren dir, dass etwas fehlt oder nicht stimmt?',
          q2: 'Wovon träumst du heimlich, traust dich aber nicht, es auszusprechen oder anzugehen?',
          q3: 'Welche Bereiche deines Lebens fühlen sich wie ein ständiger Kompromiss oder Verzicht an?',
        },
      },
      erfolge: {
        id: 'erfolge',
        title: 'Was hast du bisher erreicht, worauf bist du stolz?',
        questions: {
          q1: 'Welche Herausforderungen hast du gemeistert, die dich heute zu dem Menschen gemacht haben, der du bist?',
          q2: 'Was würde dein jüngeres Ich über dein heutiges Leben denken - womit wäre es beeindruckt?',
          q3: 'Welche deiner Erfolge entstanden aus deiner authentischen Natur heraus, nicht aus Anpassung?',
        },
      },
      belastungen: {
        id: 'belastungen',
        title: 'Was ist ungelöst oder belastend?',
        questions: {
          q1: 'Welche alten Wunden oder unausgesprochenen Konflikte trägst du noch mit dir herum?',
          q2: 'Was beschäftigt dich nachts, wenn du nicht schlafen kannst oder morgens beim Aufwachen?',
          q3: 'Welche Situationen oder Menschen lösen in dir regelmäßig Stress, Ärger oder Traurigkeit aus?',
        },
      },
    },
  },
  vision_zielbild: {
    id: 'vision_zielbild',
    title: 'Vision & Zielbild: Wo willst du hin?',
    subtopics: {
      ideales_leben: {
        id: 'ideales_leben',
        title:
          'Wie sieht dein ideales Leben in 3-5 Jahren aus - beruflich, privat, seelisch?',
        questions: {
          q1: 'Wenn du dir dein Leben in 5 Jahren wie einen perfekten Tag vorstellst - wie würde dieser Tag konkret aussehen?',
          q2: 'Welche innere Haltung und welches Lebensgefühl möchtest du dann verkörpern?',
          q3: 'An welchen äußeren Zeichen würdest du erkennen, dass du dein ideales Leben erreicht hast?',
        },
      },
      naechster_lebensabschnitt: {
        id: 'naechster_lebensabschnitt',
        title: 'Was wünschst du dir für deinen nächsten Lebensabschnitt?',
        questions: {
          q1: 'Welche Erfahrungen möchtest du unbedingt noch machen, bevor es "zu spät" ist?',
          q2: 'Was möchtest du in den nächsten Jahren lernen, entdecken oder zum ersten Mal ausprobieren?',
          q3: 'Welche Art von Mensch möchtest du in deinem nächsten Lebenskapitel sein?',
        },
      },
      alles_moeglich: {
        id: 'alles_moeglich',
        title: 'Wenn alles möglich wäre: Wie würde dein Leben aussehen?',
        questions: {
          q1: 'Welche Träume hast du aufgegeben, weil sie "unrealistisch" erschienen - was wäre, wenn sie doch möglich wären?',
          q2: 'Wenn Geld und gesellschaftliche Erwartungen keine Rolle spielten - was würdest du dann tun?',
          q3: 'Welches Leben würdest du führen, wenn du keine Angst vor dem Urteil anderer hättest?',
        },
      },
      bilder_gefuehle: {
        id: 'bilder_gefuehle',
        title:
          'Welche Bilder, Gefühle oder Metaphern kommen auf, wenn du an deine Zukunft denkst?',
        questions: {
          q1: 'Wenn dein zukünftiges Leben eine Landschaft wäre - wie würde sie aussehen, riechen und sich anfühlen?',
          q2: 'Welche Farben, Klänge oder Symbole verbindest du mit deiner idealen Zukunft?',
          q3: 'Welches Tier oder welche Naturkraft verkörpert die Energie, die du in deinem Leben spüren möchtest?',
        },
      },
      werte: {
        id: 'werte',
        title: 'Welche Werte sollen dein Leben prägen?',
        questions: {
          q1: 'Wenn du nur noch ein Jahr zu leben hättest - welche Werte würden dann absolute Priorität haben?',
          q2: 'Bei welchen Werten spürst du körperlich eine Resonanz, ein "Ja, das bin ich"?',
          q3: 'Welche Werte hast du von anderen übernommen, ohne zu prüfen, ob sie wirklich zu dir gehören?',
        },
      },
    },
  },
  eigenliebe_identitaet: {
    id: 'eigenliebe_identitaet',
    title: 'Eigenliebe & Identität',
    subtopics: {
      wer_bin_ich: {
        id: 'wer_bin_ich',
        title: 'Wer bist du - jenseits deiner beruflichen Rolle?',
        questions: {
          q1: 'Wenn du alle deine Titel, Rollen und Funktionen weglässt - welcher Wesenskern bleibt dann übrig?',
          q2: 'Was macht dich einzigartig und unverwechselbar, unabhängig von dem, was du tust oder leistest?',
          q3: 'Welche Eigenschaften an dir schätzen Menschen, die dich wirklich kennen und lieben?',
        },
      },
      ueberzeugungen: {
        id: 'ueberzeugungen',
        title: 'Was sind deine innersten Überzeugungen über dich selbst?',
        questions: {
          q1: 'Welche unbewussten Geschichten erzählst du dir über deine Fähigkeiten und deinen Wert?',
          q2: 'Wo hörst du noch die kritischen Stimmen aus deiner Vergangenheit - und stimmen sie überhaupt?',
          q3: 'Was würde sich in deinem Leben ändern, wenn du wirklich glauben würdest, dass du genug bist, so wie du bist?',
        },
      },
      selbstliebe: {
        id: 'selbstliebe',
        title: 'Was brauchst du, um dich selbst zu lieben und zu akzeptieren?',
        questions: {
          q1: 'Welche Teile von dir hast du bisher abgelehnt oder versteckt - und was würde passieren, wenn du sie annimmst?',
          q2: 'Wie würdest du mit dir selbst umgehen, wenn du dein bester Freund wärst?',
          q3: 'Welche täglichen Gewohnheiten oder Rituale würden deine Selbstliebe nähren und stärken?',
        },
      },
    },
  },
  familie_partnerschaft: {
    id: 'familie_partnerschaft',
    title: 'Familie & Partnerschaft',
    subtopics: {
      familiaere_beziehungen: {
        id: 'familiaere_beziehungen',
        title: 'Wie erlebst du deine familiären Beziehungen?',
        questions: {
          q1: 'In welchen familiären Beziehungen fühlst du dich gesehen und geliebt - in welchen missverstanden oder eingeengt?',
          q2: 'Welche unausgesprochenen Erwartungen oder alten Rollen bestimmen noch immer deine Familiendynamik?',
          q3: 'Wo bist du in familiären Beziehungen noch das Kind von früher, statt der Erwachsene, der du heute bist?',
        },
      },
      wuensche: {
        id: 'wuensche',
        title:
          'Was wünschst du dir für deine Partnerschaft, Kinder oder Eltern?',
        questions: {
          q1: 'Welche Art von Nähe und Verbindung möchtest du in deinen wichtigsten Beziehungen erleben?',
          q2: 'Was möchtest du deinen Kindern oder wichtigen Menschen über das Leben weitergeben?',
          q3: 'Wie möchtest du mit den Herausforderungen des Älterwerdens deiner Eltern oder deiner selbst umgehen?',
        },
      },
      veraenderungen: {
        id: 'veraenderungen',
        title: 'Was soll sich in diesem Bereich verändern oder erhalten?',
        questions: {
          q1: 'Welche Familientraditionen oder Gewohnheiten sind dir heilig und sollen unbedingt bleiben?',
          q2: 'Welche destruktiven Muster möchtest du durchbrechen, damit sie nicht an die nächste Generation weitergegeben werden?',
          q3: 'Welche schwierigen Gespräche schiebst du schon lange vor dir her und was würde passieren, wenn du sie führst?',
        },
      },
    },
  },
  freundschaften_soziales: {
    id: 'freundschaften_soziales',
    title: 'Freundschaften & soziales Umfeld',
    subtopics: {
      energie: {
        id: 'energie',
        title: 'Wer tut dir gut - wer raubt dir Energie?',
        questions: {
          q1: 'Nach welchen Begegnungen fühlst du dich beflügelt und inspiriert - nach welchen ausgelaugt oder irritiert?',
          q2: 'Welche Menschen in deinem Umfeld spiegeln dir deine beste Version wider - welche verstärken deine Zweifel?',
          q3: 'Wo gibst du aus Gewohnheit oder schlechtem Gewissen Energie, ohne etwas zurückzubekommen?',
        },
      },
      beziehungen_gestalten: {
        id: 'beziehungen_gestalten',
        title:
          'Welche Beziehungen möchtest du vertiefen, lösen oder neu aufbauen?',
        questions: {
          q1: 'Mit welchen Menschen möchtest du mehr Zeit verbringen und tiefere Gespräche führen?',
          q2: 'Welche Beziehungen belasten dich mehr, als dass sie dich nähren - und warum hältst du noch daran fest?',
          q3: 'Welche Art von Menschen fehlt in deinem Leben und wo könntest du sie finden?',
        },
      },
    },
  },
  gesundheit_wohlbefinden: {
    id: 'gesundheit_wohlbefinden',
    title: 'Gesundheit & Wohlbefinden',
    subtopics: {
      zustand: {
        id: 'zustand',
        title: 'Wie geht es dir körperlich, seelisch und mental?',
        questions: {
          q1: 'Welche Signale sendet dir dein Körper über deinen Zustand - hörst du sie und nimmst du sie ernst?',
          q2: 'Wann fühlst du dich energiegeladen und wann erschöpft - welche Muster erkennst du?',
          q3: 'Welche emotionalen oder mentalen Lasten trägst du mit dir herum, die sich auch körperlich bemerkbar machen?',
        },
      },
      gewohnheiten: {
        id: 'gewohnheiten',
        title: 'Was sind Gewohnheiten, die dir gut tun - welche schaden dir?',
        questions: {
          q1: 'Welche täglichen Routinen geben dir Kraft und Stabilität - welche schwächen dich langfristig?',
          q2: 'Womit belohnst oder beruhigst du dich, was dir aber eigentlich schadet?',
          q3: 'Welche gesunden Gewohnheiten möchtest du etablieren, scheiterst aber immer wieder daran - und warum?',
        },
      },
      vitalitaet: {
        id: 'vitalitaet',
        title: 'Was brauchst du, um vital und ausgeglichen zu sein?',
        questions: {
          q1: 'Unter welchen Bedingungen schläfst du am besten und fühlst dich am erholsamsten?',
          q2: 'Welche Art von Bewegung oder körperlicher Aktivität macht dir Freude statt sie als Pflicht zu empfinden?',
          q3: 'Wie kannst du Stress nicht nur reduzieren, sondern auch deine Resilienz stärken?',
        },
      },
    },
  },
  beruf_berufung: {
    id: 'beruf_berufung',
    title: 'Beruf & Berufung',
    subtopics: {
      begeisterung: {
        id: 'begeisterung',
        title: 'Was begeistert dich an deiner Arbeit - was nicht (mehr)?',
        questions: {
          q1: 'Welche Tätigkeiten in deinem Beruf bringen dich in einen Flow-Zustand - welche lähmen dich?',
          q2: 'Was an deiner Arbeit gibt dir das Gefühl, wirklich etwas zu bewirken und sinnvoll zu sein?',
          q3: 'Welche Aspekte deines Jobs machst du nur noch aus Gewohnheit oder finanzieller Notwendigkeit?',
        },
      },
      stimmigkeit: {
        id: 'stimmigkeit',
        title:
          'Ist deine Tätigkeit noch stimmig oder ist eine Neuausrichtung nötig?',
        questions: {
          q1: 'Wenn du ehrlich bist - arbeitest du noch in deinem Beruf oder "funktionierst" du nur noch?',
          q2: 'Was müsste sich in deiner Arbeitssituation ändern, damit du wieder mit Begeisterung zur Arbeit gehst?',
          q3: 'Welche Ängste halten dich davon ab, berufliche Veränderungen anzugehen, die eigentlich nötig wären?',
        },
      },
      berufung: {
        id: 'berufung',
        title: 'Was ist deine Berufung - nicht nur dein Beruf?',
        questions: {
          q1: 'Womit beschäftigst du dich in deiner Freizeit, weil es dich wirklich interessiert und erfüllt?',
          q2: 'Welche gesellschaftlichen Probleme oder Themen bewegen dich so sehr, dass du gerne dazu beitragen möらをchteßt?',
          q3: 'Was würdest du tun, wenn du wüsstest, dass du erfolgreich sein wirst und genug Geld verdienen kannst?',
        },
      },
    },
  },
  sinn_spiritualitaet: {
    id: 'sinn_spiritualitaet',
    title: 'Sinn & Spiritualität',
    subtopics: {
      lebenssinn: {
        id: 'lebenssinn',
        title: 'Was gibt deinem Leben Sinn?',
        questions: {
          q1: 'Wofür stehst du morgens gerne auf und was lässt dich abends zufrieden ins Bett gehen?',
          q2: 'Welchen Beitrag möchtest du in der Welt hinterlassen, wenn du nicht mehr da bist?',
          q3: 'In welchen Momenten spürst du am stärksten, dass dein Leben wichtig und bedeutsam ist?',
        },
      },
      glaube: {
        id: 'glaube',
        title: 'Glaubst du an etwas Größeres als dich selbst?',
        questions: {
          q1: 'Was verbindet dich mit dem Universum, der Natur oder einer höheren Ordnung?',
          q2: 'Welche spirituellen oder philosophischen Ideen geben dir Halt und Orientierung?',
          q3: 'Wie erlebst du Momente der Transzendenz, des Staunens oder der tiefen Verbundenheit?',
        },
      },
      spirituelle_praxis: {
        id: 'spirituelle_praxis',
        title: 'Wie möchtest du deine Spiritualität leben?',
        questions: {
          q1: 'Welche Rituale oder Praktiken nähren deine spirituelle Seite und geben dir Kraft?',
          q2: 'Wie kannst du mehr Achtsamkeit und Dankbarkeit in deinen Alltag integrieren?',
          q3: 'Welche Fragen oder Zweifel hast du zu deinem Glauben, die du klären möchtest?',
        },
      },
    },
  },
  finanzen_besitz: {
    id: 'finanzen_besitz',
    title: 'Finanzen & Besitz',
    subtopics: {
      finanzielle_situation: {
        id: 'finanzielle_situation',
        title: 'Wie ist deine finanzielle Situation?',
        questions: {
          q1: 'Fühlst du dich finanziell sicher und frei oder gestresst und eingeschränkt?',
          q2: 'Welche emotionalen Muster und Glaubenssätze prägen deinen Umgang mit Geld?',
          q3: 'Wo stehst du finanziell im Verhältnis zu deinen Lebenszielen und Träumen?',
        },
      },
      wuensche_aengste: {
        id: 'wuensche_aengste',
        title: 'Welche Wünsche und Ängste hast du in Bezug auf Geld?',
        questions: {
          q1: 'Was würdest du mit Geld machen, wenn du deutlich mehr davon hättest?',
          q2: 'Welche finanziellen Sorgen rauben dir nachts den Schlaf oder belasten dich täglich?',
          q3: 'Wo verwechselst du finanzielle Sicherheit mit Kontrolle über dein Leben?',
        },
      },
      finanzieller_frieden: {
        id: 'finanzieller_frieden',
        title: 'Was bedeutet für dich finanzieller Frieden?',
        questions: {
          q1: 'Wieviel Geld bräuchtest du wirklich, um dich frei und sicher zu fühlen?',
          q2: 'Welche Ausgaben bereust du und welche erfüllen dich mit Freude und Dankbarkeit?',
          q3: 'Wie kannst du Geld als Werkzeug für deine Werte und Ziele nutzen, statt es zum Selbstzweck zu machen?',
        },
      },
    },
  },
  freizeit_kreativitaet: {
    id: 'freizeit_kreativitaet',
    title: 'Freizeit, Kreativität & Abenteuer',
    subtopics: {
      leichtigkeit: {
        id: 'leichtigkeit',
        title: 'Wie viel Raum haben Leichtigkeit und Spiel in deinem Leben?',
        questions: {
          q1: 'Wann hast du das letzte Mal richtig gelacht oder etwas nur zum Spaß gemacht?',
          q2: 'Welche spielerischen oder spontanen Seiten von dir sind im Erwachsenenleben verloren gegangen?',
          q3: 'Wo nimmst du dich und das Leben zu ernst und verpasst dadurch Freude und Leichtigkeit?',
        },
      },
      begeisterung: {
        id: 'begeisterung',
        title: 'Was begeistert dich außerhalb von Arbeit und Pflicht?',
        questions: {
          q1: 'Womit kannst du dich stundenlang beschäftigen, ohne müde zu werden oder auf die Uhr zu schauen?',
          q2: 'Welche kreativen Ausdrucksformen entsprechen deiner Natur - Kunst, Musik, Schreiben, Handwerk?',
          q3: 'Welche Aktivitäten bringen dich in Kontakt mit deiner kindlichen Neugier und Begeisterung?',
        },
      },
      hobbys_leidenschaften: {
        id: 'hobbys_leidenschaften',
        title: 'Welche Hobbys oder Leidenschaften willst du (wieder) leben?',
        questions: {
          q1: 'Welche Interessen hast du im Laufe der Jahre aufgegeben und vermisst sie heute?',
          q2: 'Was wolltest du schon immer lernen oder ausprobieren, hast es aber immer aufgeschoben?',
          q3: 'Welche Abenteuer oder Reisen stehen noch auf deiner Liste und wann wirst du sie angehen?',
        },
      },
    },
  },
  innere_landkarte: {
    id: 'innere_landkarte',
    title: 'Innere Landkarte: Glaubenssätze & Lebensmuster',
    subtopics: {
      muster: {
        id: 'muster',
        title: 'Welche wiederkehrenden Muster erkennst du in deinem Leben?',
        questions: {
          q1: 'Welche Situationen oder Herausforderungen begegnen dir immer wieder, obwohl die äußeren Umstände verschieden sind?',
          q2: 'Wie reagierst du typischerweise auf Stress, Konflikte oder Veränderungen - und dient dir diese Reaktion noch?',
          q3: 'Welche Beziehungsmuster wiederholst du unbewusst, obwohl sie dir nicht guttun?',
        },
      },
      glaubenssaetze: {
        id: 'glaubenssaetze',
        title:
          'Welche (unbewussten) Glaubenssätze leiten dich - hilfreich oder hinderlich?',
        questions: {
          q1: 'Welche Sätze über dich selbst, das Leben oder andere Menschen prägen deine Entscheidungen?',
          q2: 'Welche Überzeugungen hast du von deinen Eltern oder der Gesellschaft übernommen, ohne sie zu hinterfragen?',
          q3: 'Welche limitierenden Glaubenssätze hindern dich daran, das Leben zu leben, das du dir wünschst?',
        },
      },
      innere_stimmen: {
        id: 'innere_stimmen',
        title: 'Welche inneren Stimmen treiben oder bremsen dich?',
        questions: {
          q1: 'Welche kritischen oder ängstlichen Stimmen in deinem Kopf kommentieren ständig deine Entscheidungen?',
          q2: 'Welche inneren Antreiber ("Du musst perfekt sein", "Sei stark") bestimmen dein Verhalten?',
          q3: 'Wo ist die liebevolle, ermutigende Stimme in dir und wie kannst du sie stärken?',
        },
      },
      loslassen: {
        id: 'loslassen',
        title: 'Was darfst du loslassen, um weiterzukommen?',
        questions: {
          q1: 'Welche alten Identitäten, Rollen oder Selbstbilder entsprechen nicht mehr dem, wer du heute bist?',
          q2: 'Welche Grolls, Enttäuschungen oder Verletzungen trägst du noch mit dir herum?',
          q3: 'Was hältst du krampfhaft fest, obwohl es dich daran hindert, dich weiterzuentwickeln?',
        },
      },
    },
  },
  ressourcen_potenziale: {
    id: 'ressourcen_potenziale',
    title: 'Ressourcen & Potenziale',
    subtopics: {
      staerken: {
        id: 'staerken',
        title: 'Was sind deine größten Stärken, Fähigkeiten und Talente?',
        questions: {
          q1: 'Was gelingt dir mühelos und natürlich, während andere sich schwer damit tun?',
          q2: 'Wofür kommen Menschen zu dir, wenn sie Rat oder Hilfe brauchen?',
          q3: 'Welche Fähigkeiten besitzt du, die du selbst als selbstverständlich ansiehst, die aber wertvoll sind?',
        },
      },
      erfahrungen: {
        id: 'erfahrungen',
        title: 'Welche Erfahrungen haben dich geprägt und stark gemacht?',
        questions: {
          q1: 'Welche schwierigen Situationen hast du gemeistert und welche Stärken hast du dabei entwickelt?',
          q2: 'Welche positiven Erfahrungen haben dir gezeigt, was in dir steckt und wozu du fähig bist?',
          q3: 'Was hast du aus Fehlern oder Rückschlägen gelernt, das dir heute hilft?',
        },
      },
      unterstuetzung: {
        id: 'unterstuetzung',
        title: 'Wer oder was unterstützt dich auf deinem Weg?',
        questions: {
          q1: 'Welche Menschen in deinem Leben glauben an dich und ermutigen dich?',
          q2: 'Welche Orte, Aktivitäten oder Rituale geben dir Kraft und Inspiration?',
          q3: 'Welche äußeren Ressourcen (finanzielle Mittel, Netzwerke, Wissen) stehen dir zur Verfügung?',
        },
      },
    },
  },
  wertekompass: {
    id: 'wertekompass',
    title: 'Wertekompass & Prioritäten',
    subtopics: {
      wichtigste_werte: {
        id: 'wichtigste_werte',
        title: 'Was sind deine 5 wichtigsten Werte im Leben?',
        questions: {
          q1: 'Bei welchen Werten spürst du eine tiefe emotionale Resonanz und das Gefühl "Das bin ich"?',
          q2: 'Welche Werte würdest du niemals für Geld, Erfolg oder Anerkennung aufgeben?',
          q3: 'Welche Werte möchtest du durch dein Leben und deine Entscheidungen verkörpern?',
        },
      },
      werte_leben: {
        id: 'werte_leben',
        title: 'Wo lebst du sie bereits - wo vernachlässigst du sie?',
        questions: {
          q1: 'In welchen Bereichen deines Lebens sind deine Werte deutlich sichtbar und spürbar?',
          q2: 'Wo machst du Kompromisse bei deinen Werten und wie fühlt sich das an?',
          q3: 'Welche Entscheidungen der letzten Zeit entsprachen deinen Werten - welche widersprachen ihnen?',
        },
      },
      zukuenftige_werte: {
        id: 'zukuenftige_werte',
        title: 'Welche Werte sollen dein zukünftiges Leben bestimmen?',
        questions: {
          q1: 'Wenn du auf dein Leben zurückblickst - für welche Werte möchtest du bekannt sein?',
          q2: 'Welche Werte werden für dich in den nächsten Lebensjahren wichtiger werden?',
          q3: 'Wie kannst du deine Werte zu einem praktischen Kompass für Entscheidungen machen?',
        },
      },
    },
  },
  entscheidungen_uebergaenge: {
    id: 'entscheidungen_uebergaenge',
    title: 'Entscheidungen & Übergänge',
    subtopics: {
      anstehende_entscheidungen: {
        id: 'anstehende_entscheidungen',
        title: 'Welche Lebensentscheidungen stehen aktuell an?',
        questions: {
          q1: 'Welche wichtigen Entscheidungen schiebst du schon länger vor dir her?',
          q2: 'An welchen Weggabelungen stehst du gerade - beruflich, privat oder persönlich?',
          q3: 'Welche Entscheidungen drängen sich auf, weil sich die Umstände ändern?',
        },
      },
      veraenderungen: {
        id: 'veraenderungen',
        title: 'Was möchtest du bewusst beenden, wandeln oder neu beginnen?',
        questions: {
          q1: 'Welche Kapitel deines Lebens sind abgeschlossen und dürfen nun enden?',
          q2: 'Was in deinem Leben braucht eine Erneuerung oder Transformation?',
          q3: 'Welche neuen Erfahrungen oder Projekte warten darauf, begonnen zu werden?',
        },
      },
      aengste_risiken: {
        id: 'aengste_risiken',
        title: 'Welche Ängste oder Risiken blockieren dich?',
        questions: {
          q1: 'Was ist das Schlimmste, was passieren könnte, wenn du eine wichtige Veränderung angehst?',
          q2: 'Welche irrationalen Ängste hindern dich daran, Schritte zu gehen, die rational sinnvoll wären?',
          q3: 'Wo verwechselst du Vorsicht mit Feigheit oder Perfektionismus mit Angst vor dem Scheitern?',
        },
      },
      alternativen: {
        id: 'alternativen',
        title: 'Welche Alternativen hast du?',
        questions: {
          q1: 'Welche verschiedenen Wege führen zu deinen Zielen - auch die unkonventionellen?',
          q2: 'Was wären kreative oder unerwartete Lösungen für deine Herausforderungen?',
          q3: 'Welche Optionen übersiehst du, weil du zu sehr in gewohnten Denkmustern verhaftet bist?',
        },
      },
      stimmige_entscheidung: {
        id: 'stimmige_entscheidung',
        title:
          'Welche Entscheidung fühlt sich stimmig an - auch körperlich/intuitiv?',
        questions: {
          q1: 'Bei welchen Optionen spürst du körperlich Aufregung und Vorfreude statt Angst?',
          q2: 'Welche Entscheidung würdest du treffen, wenn du nur auf dein Bauchgefühl hören würdest?',
          q3: 'Was sagt deine Intuition, wenn du alle rationalen Argumente für einen Moment beiseite lässt?',
        },
      },
    },
  },
};

/*
export const guidedTopicsOld: GuidedTopic[] = [
  {
    id: 'standortbestimmung',
    title: 'Standortbestimmung: Wo stehst du heute?',
    subtopics: [
      {
        id: 'rollen',
        title: 'Welche Rollen füllst du aktuell aus (Unternehmer, Partner, Elternteil)?',
        questions: [
          { text: 'In welchen Rollen fühlst du dich authentisch und lebendig - in welchen spielst du nur Theater?' },
          { text: 'Welche deiner Rollen sind aus innerer Überzeugung entstanden und welche aus äußeren Erwartungen?' },
          { text: 'Wo erlebst du Rollenkonflikte oder das Gefühl, zwischen verschiedenen Identitäten hin- und hergerissen zu sein?' }
        ]
      },
      {
        id: 'funktionierendes',
        title: 'Was funktioniert gut in deinem Leben? Wo erlebst du Energie, Sinn, Freude?',
        questions: [
          { text: 'In welchen Momenten des letzten Monats hast du dich am lebendigsten und erfülltesten gefühlt?' },
          { text: 'Welche Tätigkeiten oder Begegnungen geben dir so viel Energie, dass du dabei die Zeit vergisst?' },
          { text: 'Woran merkst du körperlich und emotional, dass etwas "richtig" für dich ist?' }
        ]
      },
      {
        id: 'mangel',
        title: 'Wo spürst du Mangel, Unzufriedenheit oder unerfüllte Sehnsüchte?',
        questions: [
          { text: 'Welche wiederkehrenden Gedanken oder Gefühle signalisieren dir, dass etwas fehlt oder nicht stimmt?' },
          { text: 'Wovon träumst du heimlich, traust dich aber nicht, es auszusprechen oder anzugehen?' },
          { text: 'Welche Bereiche deines Lebens fühlen sich wie ein ständiger Kompromiss oder Verzicht an?' }
        ]
      },
      {
        id: 'erfolge',
        title: 'Was hast du bisher erreicht, worauf bist du stolz?',
        questions: [
          { text: 'Welche Herausforderungen hast du gemeistert, die dich heute zu dem Menschen gemacht haben, der du bist?' },
          { text: 'Was würde dein jüngeres Ich über dein heutiges Leben denken - womit wäre es beeindruckt?' },
          { text: 'Welche deiner Erfolge entstanden aus deiner authentischen Natur heraus, nicht aus Anpassung?' }
        ]
      },
      {
        id: 'belastungen',
        title: 'Was ist ungelöst oder belastend?',
        questions: [
          { text: 'Welche alten Wunden oder unausgesprochenen Konflikte trägst du noch mit dir herum?' },
          { text: 'Was beschäftigt dich nachts, wenn du nicht schlafen kannst oder morgens beim Aufwachen?' },
          { text: 'Welche Situationen oder Menschen lösen in dir regelmäßig Stress, Ärger oder Traurigkeit aus?' }
        ]
      }
    ]
  },
  {
    id: 'vision_zielbild',
    title: 'Vision & Zielbild: Wo willst du hin?',
    subtopics: [
      {
        id: 'ideales_leben',
        title: 'Wie sieht dein ideales Leben in 3-5 Jahren aus - beruflich, privat, seelisch?',
        questions: [
          { text: 'Wenn du dir dein Leben in 5 Jahren wie einen perfekten Tag vorstellst - wie würde dieser Tag konkret aussehen?' },
          { text: 'Welche innere Haltung und welches Lebensgefühl möchtest du dann verkörpern?' },
          { text: 'An welchen äußeren Zeichen würdest du erkennen, dass du dein ideales Leben erreicht hast?' }
        ]
      },
      {
        id: 'naechster_lebensabschnitt',
        title: 'Was wünschst du dir für deinen nächsten Lebensabschnitt?',
        questions: [
          { text: 'Welche Erfahrungen möchtest du unbedingt noch machen, bevor es "zu spät" ist?' },
          { text: 'Was möchtest du in den nächsten Jahren lernen, entdecken oder zum ersten Mal ausprobieren?' },
          { text: 'Welche Art von Mensch möchtest du in deinem nächsten Lebenskapitel sein?' }
        ]
      },
      {
        id: 'alles_moeglich',
        title: 'Wenn alles möglich wäre: Wie würde dein Leben aussehen?',
        questions: [
          { text: 'Welche Träume hast du aufgegeben, weil sie "unrealistisch" erschienen - was wäre, wenn sie doch möglich wären?' },
          { text: 'Wenn Geld und gesellschaftliche Erwartungen keine Rolle spielten - was würdest du dann tun?' },
          { text: 'Welches Leben würdest du führen, wenn du keine Angst vor dem Urteil anderer hättest?' }
        ]
      },
      {
        id: 'bilder_gefuehle',
        title: 'Welche Bilder, Gefühle oder Metaphern kommen auf, wenn du an deine Zukunft denkst?',
        questions: [
          { text: 'Wenn dein zukünftiges Leben eine Landschaft wäre - wie würde sie aussehen, riechen und sich anfühlen?' },
          { text: 'Welche Farben, Klänge oder Symbole verbindest du mit deiner idealen Zukunft?' },
          { text: 'Welches Tier oder welche Naturkraft verkörpert die Energie, die du in deinem Leben spüren möchtest?' }
        ]
      },
      {
        id: 'werte',
        title: 'Welche Werte sollen dein Leben prägen?',
        questions: [
          { text: 'Wenn du nur noch ein Jahr zu leben hättest - welche Werte würden dann absolute Priorität haben?' },
          { text: 'Bei welchen Werten spürst du körperlich eine Resonanz, ein "Ja, das bin ich"?' },
          { text: 'Welche Werte hast du von anderen übernommen, ohne zu prüfen, ob sie wirklich zu dir gehören?' }
        ]
      }
    ]
  },
  {
    id: 'eigenliebe_identitaet',
    title: 'Eigenliebe & Identität',
    subtopics: [
      {
        id: 'wer_bin_ich',
        title: 'Wer bist du - jenseits deiner beruflichen Rolle?',
        questions: [
          { text: 'Wenn du alle deine Titel, Rollen und Funktionen weglässt - welcher Wesenskern bleibt dann übrig?' },
          { text: 'Was macht dich einzigartig und unverwechselbar, unabhängig von dem, was du tust oder leistest?' },
          { text: 'Welche Eigenschaften an dir schätzen Menschen, die dich wirklich kennen und lieben?' }
        ]
      },
      {
        id: 'ueberzeugungen',
        title: 'Was sind deine innersten Überzeugungen über dich selbst?',
        questions: [
          { text: 'Welche unbewussten Geschichten erzählst du dir über deine Fähigkeiten und deinen Wert?' },
          { text: 'Wo hörst du noch die kritischen Stimmen aus deiner Vergangenheit - und stimmen sie überhaupt?' },
          { text: 'Was würde sich in deinem Leben ändern, wenn du wirklich glauben würdest, dass du genug bist, so wie du bist?' }
        ]
      },
      {
        id: 'selbstliebe',
        title: 'Was brauchst du, um dich selbst zu lieben und zu akzeptieren?',
        questions: [
          { text: 'Welche Teile von dir hast du bisher abgelehnt oder versteckt - und was würde passieren, wenn du sie annimmst?' },
          { text: 'Wie würdest du mit dir selbst umgehen, wenn du dein bester Freund wärst?' },
          { text: 'Welche täglichen Gewohnheiten oder Rituale würden deine Selbstliebe nähren und stärken?' }
        ]
      }
    ]
  },
  {
    id: 'familie_partnerschaft',
    title: 'Familie & Partnerschaft',
    subtopics: [
      {
        id: 'familiaere_beziehungen',
        title: 'Wie erlebst du deine familiären Beziehungen?',
        questions: [
          { text: 'In welchen familiären Beziehungen fühlst du dich gesehen und geliebt - in welchen missverstanden oder eingeengt?' },
          { text: 'Welche unausgesprochenen Erwartungen oder alten Rollen bestimmen noch immer deine Familiendynamik?' },
          { text: 'Wo bist du in familiären Beziehungen noch das Kind von früher, statt der Erwachsene, der du heute bist?' }
        ]
      },
      {
        id: 'wuensche',
        title: 'Was wünschst du dir für deine Partnerschaft, Kinder oder Eltern?',
        questions: [
          { text: 'Welche Art von Nähe und Verbindung möchtest du in deinen wichtigsten Beziehungen erleben?' },
          { text: 'Was möchtest du deinen Kindern oder wichtigen Menschen über das Leben weitergeben?' },
          { text: 'Wie möchtest du mit den Herausforderungen des Älterwerdens deiner Eltern oder deiner selbst umgehen?' }
        ]
      },
      {
        id: 'veraenderungen',
        title: 'Was soll sich in diesem Bereich verändern oder erhalten?',
        questions: [
          { text: 'Welche Familientraditionen oder Gewohnheiten sind dir heilig und sollen unbedingt bleiben?' },
          { text: 'Welche destruktiven Muster möchtest du durchbrechen, damit sie nicht an die nächste Generation weitergegeben werden?' },
          { text: 'Welche schwierigen Gespräche schiebst du schon lange vor dir her und was würde passieren, wenn du sie führst?' }
        ]
      }
    ]
  },
  {
    id: 'freundschaften_soziales',
    title: 'Freundschaften & soziales Umfeld',
    subtopics: [
      {
        id: 'energie',
        title: 'Wer tut dir gut - wer raubt dir Energie?',
        questions: [
          { text: 'Nach welchen Begegnungen fühlst du dich beflügelt und inspiriert - nach welchen ausgelaugt oder irritiert?' },
          { text: 'Welche Menschen in deinem Umfeld spiegeln dir deine beste Version wider - welche verstärken deine Zweifel?' },
          { text: 'Wo gibst du aus Gewohnheit oder schlechtem Gewissen Energie, ohne etwas zurückzubekommen?' }
        ]
      },
      {
        id: 'beziehungen_gestalten',
        title: 'Welche Beziehungen möchtest du vertiefen, lösen oder neu aufbauen?',
        questions: [
          { text: 'Mit welchen Menschen möchtest du mehr Zeit verbringen und tiefere Gespräche führen?' },
          { text: 'Welche Beziehungen belasten dich mehr, als dass sie dich nähren - und warum hältst du noch daran fest?' },
          { text: 'Welche Art von Menschen fehlt in deinem Leben und wo könntest du sie finden?' }
        ]
      }
    ]
  },
  {
    id: 'gesundheit_wohlbefinden',
    title: 'Gesundheit & Wohlbefinden',
    subtopics: [
      {
        id: 'zustand',
        title: 'Wie geht es dir körperlich, seelisch und mental?',
        questions: [
          { text: 'Welche Signale sendet dir dein Körper über deinen Zustand - hörst du sie und nimmst du sie ernst?' },
          { text: 'Wann fühlst du dich energiegeladen und wann erschöpft - welche Muster erkennst du?' },
          { text: 'Welche emotionalen oder mentalen Lasten trägst du mit dir herum, die sich auch körperlich bemerkbar machen?' }
        ]
      },
      {
        id: 'gewohnheiten',
        title: 'Was sind Gewohnheiten, die dir gut tun - welche schaden dir?',
        questions: [
          { text: 'Welche täglichen Routinen geben dir Kraft und Stabilität - welche schwächen dich langfristig?' },
          { text: 'Womit belohnst oder beruhigst du dich, was dir aber eigentlich schadet?' },
          { text: 'Welche gesunden Gewohnheiten möchtest du etablieren, scheiterst aber immer wieder daran - und warum?' }
        ]
      },
      {
        id: 'vitalitaet',
        title: 'Was brauchst du, um vital und ausgeglichen zu sein?',
        questions: [
          { text: 'Unter welchen Bedingungen schläfst du am besten und fühlst dich am erholsamsten?' },
          { text: 'Welche Art von Bewegung oder körperlicher Aktivität macht dir Freude statt sie als Pflicht zu empfinden?' },
          { text: 'Wie kannst du Stress nicht nur reduzieren, sondern auch deine Resilienz stärken?' }
        ]
      }
    ]
  },
  {
    id: 'beruf_berufung',
    title: 'Beruf & Berufung',
    subtopics: [
      {
        id: 'begeisterung',
        title: 'Was begeistert dich an deiner Arbeit - was nicht (mehr)?',
        questions: [
          { text: 'Welche Tätigkeiten in deinem Beruf bringen dich in einen Flow-Zustand - welche lähmen dich?' },
          { text: 'Was an deiner Arbeit gibt dir das Gefühl, wirklich etwas zu bewirken und sinnvoll zu sein?' },
          { text: 'Welche Aspekte deines Jobs machst du nur noch aus Gewohnheit oder finanzieller Notwendigkeit?' }
        ]
      },
      {
        id: 'stimmigkeit',
        title: 'Ist deine Tätigkeit noch stimmig oder ist eine Neuausrichtung nötig?',
        questions: [
          { text: 'Wenn du ehrlich bist - arbeitest du noch in deinem Beruf oder "funktionierst" du nur noch?' },
          { text: 'Was müsste sich in deiner Arbeitssituation ändern, damit du wieder mit Begeisterung zur Arbeit gehst?' },
          { text: 'Welche Ängste halten dich davon ab, berufliche Veränderungen anzugehen, die eigentlich nötig wären?' }
        ]
      },
      {
        id: 'berufung',
        title: 'Was ist deine Berufung - nicht nur dein Beruf?',
        questions: [
          { text: 'Womit beschäftigst du dich in deiner Freizeit, weil es dich wirklich interessiert und erfüllt?' },
          { text: 'Welche gesellschaftlichen Probleme oder Themen bewegen dich so sehr, dass du gerne dazu beitragen möchtest?' },
          { text: 'Was würdest du tun, wenn du wüsstest, dass du erfolgreich sein wirst und genug Geld verdienen kannst?' }
        ]
      }
    ]
  },
  {
    id: 'sinn_spiritualitaet',
    title: 'Sinn & Spiritualität',
    subtopics: [
      {
        id: 'lebenssinn',
        title: 'Was gibt deinem Leben Sinn?',
        questions: [
          { text: 'Wofür stehst du morgens gerne auf und was lässt dich abends zufrieden ins Bett gehen?' },
          { text: 'Welchen Beitrag möchtest du in der Welt hinterlassen, wenn du nicht mehr da bist?' },
          { text: 'In welchen Momenten spürst du am stärksten, dass dein Leben wichtig und bedeutsam ist?' }
        ]
      },
      {
        id: 'glaube',
        title: 'Glaubst du an etwas Größeres als dich selbst?',
        questions: [
          { text: 'Was verbindet dich mit dem Universum, der Natur oder einer höheren Ordnung?' },
          { text: 'Welche spirituellen oder philosophischen Ideen geben dir Halt und Orientierung?' },
          { text: 'Wie erlebst du Momente der Transzendenz, des Staunens oder der tiefen Verbundenheit?' }
        ]
      },
      {
        id: 'spirituelle_praxis',
        title: 'Wie möchtest du deine Spiritualität leben?',
        questions: [
          { text: 'Welche Rituale oder Praktiken nähren deine spirituelle Seite und geben dir Kraft?' },
          { text: 'Wie kannst du mehr Achtsamkeit und Dankbarkeit in deinen Alltag integrieren?' },
          { text: 'Welche Fragen oder Zweifel hast du zu deinem Glauben, die du klären möchtest?' }
        ]
      }
    ]
  },
  {
    id: 'finanzen_besitz',
    title: 'Finanzen & Besitz',
    subtopics: [
      {
        id: 'finanzielle_situation',
        title: 'Wie ist deine finanzielle Situation?',
        questions: [
          { text: 'Fühlst du dich finanziell sicher und frei oder gestresst und eingeschränkt?' },
          { text: 'Welche emotionalen Muster und Glaubenssätze prägen deinen Umgang mit Geld?' },
          { text: 'Wo stehst du finanziell im Verhältnis zu deinen Lebenszielen und Träumen?' }
        ]
      },
      {
        id: 'wuensche_aengste',
        title: 'Welche Wünsche und Ängste hast du in Bezug auf Geld?',
        questions: [
          { text: 'Was würdest du mit Geld machen, wenn du deutlich mehr davon hättest?' },
          { text: 'Welche finanziellen Sorgen rauben dir nachts den Schlaf oder belasten dich täglich?' },
          { text: 'Wo verwechselst du finanzielle Sicherheit mit Kontrolle über dein Leben?' }
        ]
      },
      {
        id: 'finanzieller_frieden',
        title: 'Was bedeutet für dich finanzieller Frieden?',
        questions: [
          { text: 'Wieviel Geld bräuchtest du wirklich, um dich frei und sicher zu fühlen?' },
          { text: 'Welche Ausgaben bereust du und welche erfüllen dich mit Freude und Dankbarkeit?' },
          { text: 'Wie kannst du Geld als Werkzeug für deine Werte und Ziele nutzen, statt es zum Selbstzweck zu machen?' }
        ]
      }
    ]
  },
  {
    id: 'freizeit_kreativitaet',
    title: 'Freizeit, Kreativität & Abenteuer',
    subtopics: [
      {
        id: 'leichtigkeit',
        title: 'Wie viel Raum haben Leichtigkeit und Spiel in deinem Leben?',
        questions: [
          { text: 'Wann hast du das letzte Mal richtig gelacht oder etwas nur zum Spaß gemacht?' },
          { text: 'Welche spielerischen oder spontanen Seiten von dir sind im Erwachsenenleben verloren gegangen?' },
          { text: 'Wo nimmst du dich und das Leben zu ernst und verpasst dadurch Freude und Leichtigkeit?' }
        ]
      },
      {
        id: 'begeisterung',
        title: 'Was begeistert dich außerhalb von Arbeit und Pflicht?',
        questions: [
          { text: 'Womit kannst du dich stundenlang beschäftigen, ohne müde zu werden oder auf die Uhr zu schauen?' },
          { text: 'Welche kreativen Ausdrucksformen entsprechen deiner Natur - Kunst, Musik, Schreiben, Handwerk?' },
          { text: 'Welche Aktivitäten bringen dich in Kontakt mit deiner kindlichen Neugier und Begeisterung?' }
        ]
      },
      {
        id: 'hobbys_leidenschaften',
        title: 'Welche Hobbys oder Leidenschaften willst du (wieder) leben?',
        questions: [
          { text: 'Welche Interessen hast du im Laufe der Jahre aufgegeben und vermisst sie heute?' },
          { text: 'Was wolltest du schon immer lernen oder ausprobieren, hast es aber immer aufgeschoben?' },
          { text: 'Welche Abenteuer oder Reisen stehen noch auf deiner Liste und wann wirst du sie angehen?' }
        ]
      }
    ]
  },
  {
    id: 'innere_landkarte',
    title: 'Innere Landkarte: Glaubenssätze & Lebensmuster',
    subtopics: [
      {
        id: 'muster',
        title: 'Welche wiederkehrenden Muster erkennst du in deinem Leben?',
        questions: [
          { text: 'Welche Situationen oder Herausforderungen begegnen dir immer wieder, obwohl die äußeren Umstände verschieden sind?' },
          { text: 'Wie reagierst du typischerweise auf Stress, Konflikte oder Veränderungen - und dient dir diese Reaktion noch?' },
          { text: 'Welche Beziehungsmuster wiederholst du unbewusst, obwohl sie dir nicht guttun?' }
        ]
      },
      {
        id: 'glaubenssaetze',
        title: 'Welche (unbewussten) Glaubenssätze leiten dich - hilfreich oder hinderlich?',
        questions: [
          { text: 'Welche Sätze über dich selbst, das Leben oder andere Menschen prägen deine Entscheidungen?' },
          { text: 'Welche Überzeugungen hast du von deinen Eltern oder der Gesellschaft übernommen, ohne sie zu hinterfragen?' },
          { text: 'Welche limitierenden Glaubenssätze hindern dich daran, das Leben zu leben, das du dir wünschst?' }
        ]
      },
      {
        id: 'innere_stimmen',
        title: 'Welche inneren Stimmen treiben oder bremsen dich?',
        questions: [
          { text: 'Welche kritischen oder ängstlichen Stimmen in deinem Kopf kommentieren ständig deine Entscheidungen?' },
          { text: 'Welche inneren Antreiber ("Du musst perfekt sein", "Sei stark") bestimmen dein Verhalten?' },
          { text: 'Wo ist die liebevolle, ermutigende Stimme in dir und wie kannst du sie stärken?' }
        ]
      },
      {
        id: 'loslassen',
        title: 'Was darfst du loslassen, um weiterzukommen?',
        questions: [
          { text: 'Welche alten Identitäten, Rollen oder Selbstbilder entsprechen nicht mehr dem, wer du heute bist?' },
          { text: 'Welche Grolls, Enttäuschungen oder Verletzungen trägst du noch mit dir herum?' },
          { text: 'Was hältst du krampfhaft fest, obwohl es dich daran hindert, dich weiterzuentwickeln?' }
        ]
      }
    ]
  },
  {
    id: 'ressourcen_potenziale',
    title: 'Ressourcen & Potenziale',
    subtopics: [
      {
        id: 'staerken',
        title: 'Was sind deine größten Stärken, Fähigkeiten und Talente?',
        questions: [
          { text: 'Was gelingt dir mühelos und natürlich, während andere sich schwer damit tun?' },
          { text: 'Wofür kommen Menschen zu dir, wenn sie Rat oder Hilfe brauchen?' },
          { text: 'Welche Fähigkeiten besitzt du, die du selbst als selbstverständlich ansiehst, die aber wertvoll sind?' }
        ]
      },
      {
        id: 'erfahrungen',
        title: 'Welche Erfahrungen haben dich geprägt und stark gemacht?',
        questions: [
          { text: 'Welche schwierigen Situationen hast du gemeistert und welche Stärken hast du dabei entwickelt?' },
          { text: 'Welche positiven Erfahrungen haben dir gezeigt, was in dir steckt und wozu du fähig bist?' },
          { text: 'Was hast du aus Fehlern oder Rückschlägen gelernt, das dir heute hilft?' }
        ]
      },
      {
        id: 'unterstuetzung',
        title: 'Wer oder was unterstützt dich auf deinem Weg?',
        questions: [
          { text: 'Welche Menschen in deinem Leben glauben an dich und ermutigen dich?' },
          { text: 'Welche Orte, Aktivitäten oder Rituale geben dir Kraft und Inspiration?' },
          { text: 'Welche äußeren Ressourcen (finanzielle Mittel, Netzwerke, Wissen) stehen dir zur Verfügung?' }
        ]
      }
    ]
  },
  {
    id: 'wertekompass',
    title: 'Wertekompass & Prioritäten',
    subtopics: [
      {
        id: 'wichtigste_werte',
        title: 'Was sind deine 5 wichtigsten Werte im Leben?',
        questions: [
          { text: 'Bei welchen Werten spürst du eine tiefe emotionale Resonanz und das Gefühl "Das bin ich"?' },
          { text: 'Welche Werte würdest du niemals für Geld, Erfolg oder Anerkennung aufgeben?' },
          { text: 'Welche Werte möchtest du durch dein Leben und deine Entscheidungen verkörpern?' }
        ]
      },
      {
        id: 'werte_leben',
        title: 'Wo lebst du sie bereits - wo vernachlässigst du sie?',
        questions: [
          { text: 'In welchen Bereichen deines Lebens sind deine Werte deutlich sichtbar und spürbar?' },
          { text: 'Wo machst du Kompromisse bei deinen Werten und wie fühlt sich das an?' },
          { text: 'Welche Entscheidungen der letzten Zeit entsprachen deinen Werten - welche widersprachen ihnen?' }
        ]
      },
      {
        id: 'zukuenftige_werte',
        title: 'Welche Werte sollen dein zukünftiges Leben bestimmen?',
        questions: [
          { text: 'Wenn du auf dein Leben zurückblickst - für welche Werte möchtest du bekannt sein?' },
          { text: 'Welche Werte werden für dich in den nächsten Lebensjahren wichtiger werden?' },
          { text: 'Wie kannst du deine Werte zu einem praktischen Kompass für Entscheidungen machen?' }
        ]
      }
    ]
  },
  {
    id: 'entscheidungen_uebergaenge',
    title: 'Entscheidungen & Übergänge',
    subtopics: [
      {
        id: 'anstehende_entscheidungen',
        title: 'Welche Lebensentscheidungen stehen aktuell an?',
        questions: [
          { text: 'Welche wichtigen Entscheidungen schiebst du schon länger vor dir her?' },
          { text: 'An welchen Weggabelungen stehst du gerade - beruflich, privat oder persönlich?' },
          { text: 'Welche Entscheidungen drängen sich auf, weil sich die Umstände ändern?' }
        ]
      },
      {
        id: 'veraenderungen',
        title: 'Was möchtest du bewusst beenden, wandeln oder neu beginnen?',
        questions: [
          {
            text: 'Welche Kapitel deines Lebens sind abgeschlossen und dürfen nun enden?'
          },
          {
            text: 'Was in deinem Leben braucht eine Erneuerung oder Transformation?'
          },
          {
            text: 'Welche neuen Erfahrungen oder Projekte warten darauf, begonnen zu werden?'
          }
        ]
      },
      {
        id: 'aengste_risiken',
        title: 'Welche Ängste oder Risiken blockieren dich?',
        questions: [
          {
            text: 'Was ist das Schlimmste, was passieren könnte, wenn du eine wichtige Veränderung angehst?'
          },
          {
            text: 'Welche irrationalen Ängste hindern dich daran, Schritte zu gehen, die rational sinnvoll wären?'
          },
          {
            text: 'Wo verwechselst du Vorsicht mit Feigheit oder Perfektionismus mit Angst vor dem Scheitern?'
          }
        ]
      },
      {
        id: 'alternativen',
        title: 'Welche Alternativen hast du?',
        questions: [
          {
            text: 'Welche verschiedenen Wege führen zu deinen Zielen - auch die unkonventionellen?'
          },
          {
            text: 'Was wären kreative oder unerwartete Lösungen für deine Herausforderungen?'
          },
          {
            text: 'Welche Optionen übersiehst du, weil du zu sehr in gewohnten Denkmustern verhaftet bist?'
          }
        ]
      },
      {
        id: 'stimmige_entscheidung',
        title: 'Welche Entscheidung fühlt sich stimmig an - auch körperlich/intuitiv?',
        questions: [
          {
            text: 'Bei welchen Optionen spürst du körperlich Aufregung und Vorfreude statt Angst?'
          },
          {
            text: 'Welche Entscheidung würdest du treffen, wenn du nur auf dein Bauchgefühl hören würdest?'
          },
          {
            text: 'Was sagt deine Intuition, wenn du alle rationalen Argumente für einen Moment beiseite lässt?'
          }
        ]
      }
    ]
  }
];
*/
