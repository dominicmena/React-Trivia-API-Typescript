import axios from "axios";

/*

NOTE:

This exists to create some transient errors. Please handle the errors.

*/

class UnreliableAxios {
  public async get(path: string) {
    const res = await axios.get(path);

    if (Math.random() < 0.2) {
      throw new Error("UNKNOWN_ERROR");
    }

    return res;
  }
}

export default new UnreliableAxios();
