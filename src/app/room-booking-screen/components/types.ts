export type RoomClass = 'Economy' | 'Standard' | 'Premium';
export type RoomStatus = 'available' | 'limited' | 'full';

export interface Room {
  id: string;
  roomNumber: string;
  block: string;
  floor: string;
  sharingType: 1 | 2 | 3 | 4;
  roomClass: RoomClass;
  totalBeds: number;
  availableBeds: number;
  pricePerSemester: number;
  amenities: string[];
  status: RoomStatus;
  floorArea: number; // sq ft
  windowFacing: string;
  attachedBathroom: boolean;
  description: string;
}

export interface RoomFiltersState {
  block: string;
  floor: string;
  sharingType: string;
  priceRange: string;
  messIncluded: boolean;
  availability: string;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  messOption: boolean;
  bedsRequired: number;
}