interface IVehicles {
  licensePlate?: string,
  class?: string,
  fuelType?: string,
  manufacture?: string,
  odometer?: string
  lastDrive?: Object[]
}

interface lastDrive {
  driveId?: string,
  driveName?: string
}
