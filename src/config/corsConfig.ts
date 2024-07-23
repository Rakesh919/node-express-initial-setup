import { WHITE_LIST_URLS } from "@src/constants";

export const corsOptions = {
    origin: function (origin, callback) {
      var originIsWhitelisted = WHITE_LIST_URLS.indexOf(origin) !== -1
      callback(null, originIsWhitelisted)
    },
    credentials: true,
  }