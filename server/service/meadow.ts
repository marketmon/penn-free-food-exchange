import { getMeadows } from "../repository/meadow";

export async function getMeadowsService() {
  try {
    const meadows = await getMeadows();
    if (meadows.length === 0) {
      throw new NotFoundError("No meadows found");
    }
    return meadows;
  } catch (error) {
    throw new ServerError("ServerError");
  }
}
