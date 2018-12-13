import { NotificationManager } from "react-notifications";

function createNotification(type, message) {
  switch (type) {
    case "info":
      NotificationManager.info(message, "INFO");
      break;
    case "success":
      NotificationManager.success(message, "SUCCESS");
      break;
    case "warning":
      NotificationManager.warning(message, "WARNING", 5000);
      break;
    case "error":
      NotificationManager.error(message, "ERROR", 10000);
      break;
  }
}

exports.createNotification = createNotification;
