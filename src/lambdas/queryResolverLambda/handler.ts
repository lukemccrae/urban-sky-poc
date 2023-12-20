import {
  Balloon,
  BalloonModels,
  ConstructionAreas,
  ConstructionPhases,
  EnvelopeTypes,
  GasTypes,
  RecoverySystems,
  Viewer,
} from "./types";

const getBalloonsForViewer = (args: any): Viewer => {
  return {
    id: "5456789",
    username: "urbansky",
    email: "dev@urbansky.com",
    balloons: [
      {
        id: "5678909",
        model: BalloonModels.Microballoon,
        cameraPayload: 1,
        trackingPayloadId: 2,
        constructionArea: ConstructionAreas.Bay_1,
        constructionPhase: ConstructionPhases.Packaging,
        envelopeType: EnvelopeTypes.Chloroprene,
        gasType: GasTypes.Helium,
        recoverySystem: RecoverySystems.Parachute,
      },
    ],
  };
};

export const handler = async (event: any, context: any): Promise<any> => {
  try {
    console.log(event, "< event");
    if (event.info.parentTypeName === "Query") {
      switch (event.info.fieldName) {
        case "viewer":
          return getBalloonsForViewer(event.arguments);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
