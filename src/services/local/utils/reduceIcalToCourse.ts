import {TimetableClass} from "@/services/shared/Timetable";

function extractNames (text: string) {
  const pattern = /\b([A-ZÀ-Ÿ]+)\s+([A-ZÀ-Ÿ][a-zà-ÿ]+)\b/g;
  const matches = [...text.matchAll(pattern)];
  return matches.map(match => `${match[1]} ${match[2]}`);
}

export const reduceIcalToCourse = (course: any, identityProvider: any, url: string): TimetableClass => {
  let returnCourse: TimetableClass = {
    subject: course.summary?.value || "",
    id: course.uid?.value || "",
    type: "lesson",
    title: course.summary?.value || null,
    startTimestamp: course.dtstart && new Date(course.dtstart?.value).getTime() || null,
    endTimestamp: course.dtend && new Date(course.dtend?.value).getTime() || null,
    room: course.location?.value || null,
    teacher: course.organizer?.value || null,
    backgroundColor: undefined,
    itemType: undefined,
    status: undefined,
    source: "ical://"+url,
  };

  if (
    identityProvider.identifier === "univ-rennes1" ||
    identityProvider.identifier === "iut-lannion"
  ) {
    const teacher =
      extractNames(course.description?.value.trim()).join(", ") || undefined;

    // get ressource
    const ressourceRegex = /(R\d{3})\s?-/;
    const ressource = course.summary?.value.match(ressourceRegex);

    // Get if CM, TD, TP
    const courseType: ("CM" | "TD" | "TP" | "DS")[] =
      course.summary?.value.match(/(CM|TD|TP|DS)/);
    const courseTypes = {
      CM: "CM (Cours magistral)",
      TD: "TD (Travaux dirigés)",
      TP: "TP (Travaux pratiques)",
      DS: "DS (Devoir surveillé)",
    };

    const itemType =
      (ressource ? ressource[0].replace("-", "") + " - " : "") +
      (courseType ? courseTypes[courseType[0]] : "");

    // class
    const classRegex = /\b[A-Za-z]{2}\s\d[A-Za-z](?:\d)?\s[A-Za-z]+\b/g;
    const classes = course.summary?.value.match(classRegex);

    const cmRegex = /\bCM\s+\w+\b/g;
    const cm = course.summary?.value.match(cmRegex);

    const cmSRegex = /\d{1,2}[a-z]\s[A-Z]{2,}/i;
    const cmS = course.summary?.value.match(cmSRegex);

    // remove ressource from title
    let title = course.summary?.value;
    if (ressource) {
      title = title.replace(ressource[0], "");
    }

    // remove class
    title = title.replace(classRegex, "");
    if (cm && cm.length > 0) {
      // remove CM
      title = title.replace(cmRegex, "");
    } else {
      // remove cmS
      title = title.replace(cmSRegex, "");
    }

    // if ends with "Autonomie', move to beginning
    if (title.trim().endsWith("Autonomie")) {
      title = "Autonomie " + title.replace("Autonomie", "");
    }

    if (title.trim().endsWith("Suivi")) {
      title = "Suivi " + title.replace("Suivi", "");
    }

    returnCourse = {
      ...returnCourse,
      title: title,
      subject: title,
      itemType: itemType,
      teacher,
    };
  }

  return returnCourse;
};
