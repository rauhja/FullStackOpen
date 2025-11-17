import { HealthCheckEntry, HealthCheckRating } from "../../types";

const getHealthCheckIcon = (rating: HealthCheckRating): string | undefined => {
  switch (rating) {
    case 0:
      return "💚";
    case 1:
      return "💛";
    case 2:
      return "🧡";
    case 3:
      return "❤️";
  }
};

const HealthCheckEntryDetail: React.FC<{
  entry: HealthCheckEntry;
}> = ({ entry }) => {
  return <>{getHealthCheckIcon(entry.healthCheckRating)}</>;
};

export default HealthCheckEntryDetail;
