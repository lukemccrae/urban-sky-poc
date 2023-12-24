import { Viewer } from "./types";

import { mockBalloons } from "./mockBalloons";
import { mockViewers } from "./mockViewers";
import { Event } from "./schema";

interface Resolvers {
  [key: string]: {
    [key: string]: (...args: any[]) => any;
  };
}

const resolvers: Resolvers = {
  Query: {
    viewer: (_, args: { id: string }) => {
      const viewer = mockViewers.find((viewer) => {
        return viewer.id === args.id;
      });

      if (!viewer) throw new Error("Viewer not found");

      return { ...viewer };
    },
  },
  Viewer: {
    balloons: (viewer: Viewer, args: { ids: string[] }) => {
      console.log(viewer, "<< resolver chain balloons");
      // Fetch balloons related to the fetched viewer

      const locationMatchedBalloons = mockBalloons.filter(
        (obj) => obj.constructionLocation === viewer.id
      );

      if (args.ids && args.ids.length > 0) {
        const matchedBalloons = locationMatchedBalloons.filter((balloon) =>
          args.ids.includes(balloon.id)
        );

        return matchedBalloons;
      } else {
        return locationMatchedBalloons;
      }
    },
  },
};

export const handler = async (event: Event, context: any): Promise<any> => {
  if (event.info.parentTypeName === "Mutation") {
    try {
      return {
        balloons: [...mockBalloons, event.arguments.balloon],
        success: true,
      };
    } catch (e) {
      return { success: false };
    }
  }
  try {
    const parentTypeName = event.info.parentTypeName;
    const fieldName = event.info.fieldName;
    console.log(event, "<< event");
    // invoke the first link of the resolver chain with argument id
    return resolvers[parentTypeName][fieldName](event.source, event.arguments);
  } catch (e) {
    console.log(e);
  }
};
