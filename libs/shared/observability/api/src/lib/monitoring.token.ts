import { InjectionToken } from "@angular/core";
import { IMonitoringService } from "./monitoring.repository";

export const MONITORING_TOKEN = new InjectionToken<IMonitoringService>(
  'MONITORING',
);
