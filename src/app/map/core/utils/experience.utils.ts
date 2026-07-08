import { Experience, ExperienceSpot, Location, Provider, ProviderDiscount } from '@map/core/models';
import { ExperienceType } from '@map/core/models/enums';
import { haversineKm } from '@map/core/utils/geo.utils';
import { buildBookingUrl, resolveProviderColor, NEAR_LOCATION_KM } from '@map/core/utils/provider.utils';

/** Default icon per experience type — overridden by Experience.emoji when set. */
const EXPERIENCE_ICONS: Record<ExperienceType, string> = {
  [ExperienceType.Wakeboard]: '🏄',
  [ExperienceType.Wakesurf]:  '🌊',
  [ExperienceType.Wakefoil]:  '🪽',
  [ExperienceType.Tube]:      '🛟',
  [ExperienceType.Buggy]:     '🚙',
  [ExperienceType.Quad]:      '🏍️',
  [ExperienceType.TukTuk]:    '🛺',
  [ExperienceType.Jeep]:      '🛻',
  [ExperienceType.Boat]:      '⛵',
  [ExperienceType.Kayak]:     '🛶',
  [ExperienceType.Dive]:      '🤿',
  [ExperienceType.Stay]:      '🏨',
};

/** One experience rendered at one spot — the unit the map draws a pin for. */
export interface ExperiencePin {
  experience: Experience;
  provider: Provider;
  spot: ExperienceSpot;
}

/** Pairs every experience with its parent provider (provider colour, contact, etc.). */
export function getAllExperiences(providers: Provider[]): { experience: Experience; provider: Provider }[] {
  return providers.flatMap(provider =>
    (provider.experiences ?? []).map(experience => ({ experience, provider })),
  );
}

/** Flattens providers → one pin per experience spot, for the map layer. */
export function getExperiencePins(providers: Provider[]): ExperiencePin[] {
  return getAllExperiences(providers).flatMap(({ experience, provider }) =>
    experience.spots.map(spot => ({ experience, provider, spot })),
  );
}

/** Finds an experience by id across all providers, with its parent provider. */
export function findExperience(
  providers: Provider[],
  id: string,
): { experience: Experience; provider: Provider } | undefined {
  return getAllExperiences(providers).find(({ experience }) => experience.id === id);
}

/** The icon shown on the pin — explicit emoji wins, else the type default. */
export function experienceIcon(experience: Experience): string {
  return experience.emoji ?? EXPERIENCE_ICONS[experience.type] ?? '🏷️';
}

/** Accent colour follows the parent brand so experiences stay visually grouped. */
export function experienceColor(provider: Provider): string {
  return resolveProviderColor(provider);
}

/** Discount falls back to the provider's when the experience doesn't override it. */
export function resolveExperienceDiscount(
  experience: Experience,
  provider: Provider,
): ProviderDiscount | undefined {
  return experience.discount ?? provider.discount;
}

/** Booking link falls back to the provider's website / booking config. */
export function resolveExperienceBookUrl(experience: Experience, provider: Provider): string | null {
  return experience.bookUrl ?? buildBookingUrl(provider);
}

/**
 * Experiences relevant to a location: any whose spot is tagged with the
 * location id, or whose nearest spot sits within NEAR_LOCATION_KM.
 * Explicitly-tagged experiences rank first (an intentional "this belongs here"
 * beats a proximity coincidence); ties then break by distance.
 */
export function getExperiencesNearLocation(
  location: Location,
  providers: Provider[],
): { experience: Experience; provider: Provider }[] {
  return getAllExperiences(providers)
    .map(entry => ({
      ...entry,
      dist: nearestSpotKm(location, entry.experience),
      tagged: entry.experience.spots.some(s => s.nearLocationIds?.includes(location.id)),
    }))
    .filter(({ tagged, dist }) => tagged || dist <= NEAR_LOCATION_KM)
    .sort((a, b) => Number(b.tagged) - Number(a.tagged) || a.dist - b.dist)
    .map(({ experience, provider }) => ({ experience, provider }));
}

function nearestSpotKm(location: Location, experience: Experience): number {
  return experience.spots.reduce(
    (min, s) => Math.min(min, haversineKm(location.lat, location.lon, s.lat, s.lon)),
    Infinity,
  );
}
