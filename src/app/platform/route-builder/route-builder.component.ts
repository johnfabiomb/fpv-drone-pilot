import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteBuilderService, Difficulty, Pace, PlanInput, ItineraryDay } from '../../shared/services/route-builder.service';

type AppView = 'list' | 'wizard' | 'result';

interface SavedPlanEntry {
  id: string;
  name: string;
  itinerary: ItineraryDay[];
  inputs: PlanInput;
  savedAt: string;
  isFavorite: boolean;
}

const STORAGE_KEY = 'malta_plans_v1';

@Component({
  selector: 'app-route-builder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-builder.component.html',
  styleUrl: './route-builder.component.scss',
})
export class RouteBuilderComponent implements OnInit {
  view: AppView = 'list';
  step = 1;
  selectedDays = 2;
  selectedPreferences: string[] = [];
  selectedDifficulty: Difficulty = 'moderate';
  selectedPace: Pace = 'balanced';
  itinerary: ItineraryDay[] = [];
  loading = false;
  savedPlans: SavedPlanEntry[] = [];
  currentPlanId: string | null = null;
  pendingDeleteId: string | null = null;
  anchorLocation: any | null = null;

  dayOptions = [
    { value: 1, label: '1 Day', sublabel: 'Quick escape' },
    { value: 2, label: '2 Days', sublabel: 'Weekend trip' },
    { value: 3, label: '3 Days', sublabel: 'Short break' },
    { value: 7, label: '1 Week', sublabel: 'Full explorer' },
  ];

  preferenceOptions = [
    { value: 'hidden', label: 'Hidden Gems', emoji: '💎' },
    { value: 'beach', label: 'Beaches', emoji: '🏖️' },
    { value: 'cave', label: 'Caves', emoji: '🪨' },
    { value: 'sea-cave', label: 'Sea Caves', emoji: '🌊' },
    { value: 'viewpoint', label: 'Viewpoints', emoji: '🔭' },
    { value: 'hiking', label: 'Hiking', emoji: '🥾' },
    { value: 'swimming', label: 'Swimming', emoji: '🏊' },
    { value: 'snorkeling', label: 'Snorkeling', emoji: '🤿' },
    { value: 'historical', label: 'History', emoji: '🏛️' },
    { value: 'cultural', label: 'Culture', emoji: '🎭' },
    { value: 'easy', label: 'Easy Access', emoji: '🚶' },
    { value: 'adventure', label: 'Adventure', emoji: '⚡' },
    { value: 'gozo', label: 'Gozo', emoji: '⛵' },
    { value: 'comino', label: 'Comino', emoji: '🌿' },
    { value: 'sunset', label: 'Sunset', emoji: '🌅' },
    { value: 'photography', label: 'Photography', emoji: '📸' },
  ];

  difficultyOptions: { value: Difficulty; label: string; sublabel: string; icon: string }[] = [
    { value: 'easy', label: 'Easy', sublabel: 'Accessible to everyone', icon: '🚶' },
    { value: 'moderate', label: 'Moderate', sublabel: 'Some walking required', icon: '🥾' },
    { value: 'hard', label: 'Hard', sublabel: 'Challenging terrain', icon: '⛰️' },
  ];

  paceOptions: { value: Pace; label: string; sublabel: string; icon: string }[] = [
    { value: 'relaxed', label: 'Relaxed', sublabel: 'Fewer stops, more time per place', icon: '😌' },
    { value: 'balanced', label: 'Balanced', sublabel: 'The perfect mix', icon: '⚖️' },
    { value: 'full-explorer', label: 'Full Explorer', sublabel: 'See as much as possible', icon: '🗺️' },
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeBuilderService: RouteBuilderService,
  ) {}

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this.savedPlans = JSON.parse(raw);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }

    // Check for "start from location" deep-link (e.g. ?from=44)
    const fromId = this.activatedRoute.snapshot.queryParamMap.get('from');
    if (fromId !== null) {
      const loc = this.routeBuilderService.getLocationById(Number(fromId));
      if (loc) this.anchorLocation = loc;
    }

    if (this.savedPlans.length === 0 || this.anchorLocation) {
      this.view = 'wizard';
    }
  }

  get sortedPlans(): SavedPlanEntry[] {
    return [...this.savedPlans].sort((a, b) => {
      if (a.isFavorite !== b.isFavorite) return a.isFavorite ? -1 : 1;
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    });
  }

  clearAnchor(): void {
    this.anchorLocation = null;
  }

  anchorTagLine(): string {
    if (!this.anchorLocation) return '';
    const tags: string[] = (this.anchorLocation.tags || [])
      .filter((t: string) => !['easy', 'moderate', 'hard'].includes(t))
      .slice(0, 2)
      .map((t: string) => t.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    return [this.anchorLocation.difficulty.charAt(0).toUpperCase() + this.anchorLocation.difficulty.slice(1), ...tags].join(' · ');
  }

  openPlan(plan: SavedPlanEntry): void {
    if (this.pendingDeleteId === plan.id) { this.pendingDeleteId = null; return; }
    this.anchorLocation = null;
    this.itinerary = plan.itinerary;
    this.selectedDays = plan.inputs.days;
    this.selectedPreferences = plan.inputs.preferences;
    this.selectedDifficulty = plan.inputs.difficulty;
    this.selectedPace = plan.inputs.pace;
    this.currentPlanId = plan.id;
    this.view = 'result';
  }

  requestDelete(id: string, event: Event): void {
    event.stopPropagation();
    this.pendingDeleteId = id;
  }

  cancelDelete(event: Event): void {
    event.stopPropagation();
    this.pendingDeleteId = null;
  }

  confirmDelete(id: string, event: Event): void {
    event.stopPropagation();
    this.savedPlans = this.savedPlans.filter(p => p.id !== id);
    this.persistPlans();
    this.pendingDeleteId = null;
  }

  toggleFavorite(id: string, event: Event): void {
    event.stopPropagation();
    const plan = this.savedPlans.find(p => p.id === id);
    if (plan) {
      plan.isFavorite = !plan.isFavorite;
      this.persistPlans();
    }
  }

  createNew(): void {
    this.step = 1;
    this.selectedDays = 2;
    this.selectedPreferences = [];
    this.selectedDifficulty = 'moderate';
    this.selectedPace = 'balanced';
    this.itinerary = [];
    this.loading = false;
    this.currentPlanId = null;
    this.anchorLocation = null;
    this.view = 'wizard';
  }

  togglePreference(value: string): void {
    const idx = this.selectedPreferences.indexOf(value);
    if (idx >= 0) {
      this.selectedPreferences.splice(idx, 1);
    } else {
      this.selectedPreferences.push(value);
    }
  }

  isPreferenceSelected(value: string): boolean {
    return this.selectedPreferences.includes(value);
  }

  next(): void {
    if (this.step < 4) {
      this.step++;
    } else if (this.step === 4) {
      this.generate();
    }
  }

  prev(): void {
    if (this.view === 'list') {
      this.router.navigate(['/malta']);
    } else if (this.view === 'wizard') {
      if (this.step > 1) {
        this.step--;
      } else {
        if (this.savedPlans.length > 0) {
          this.view = 'list';
        } else {
          this.router.navigate(['/malta']);
        }
      }
    } else if (this.view === 'result') {
      this.anchorLocation = null;
      this.view = 'list';
    }
  }

  generate(): void {
    this.loading = true;
    this.view = 'result';
    setTimeout(() => {
      const input: PlanInput = {
        days: this.selectedDays,
        preferences: this.selectedPreferences,
        difficulty: this.selectedDifficulty,
        pace: this.selectedPace,
      };
      this.itinerary = this.routeBuilderService.buildPlan(input, this.anchorLocation || undefined);
      const entry: SavedPlanEntry = {
        id: Date.now().toString(),
        name: this.generatePlanName(input),
        itinerary: this.itinerary,
        inputs: input,
        savedAt: new Date().toISOString(),
        isFavorite: false,
      };
      this.savedPlans.push(entry);
      this.currentPlanId = entry.id;
      this.persistPlans();
      this.loading = false;
    }, 600);
  }

  private generatePlanName(input: PlanInput): string {
    const dayStr = input.days === 1 ? '1-Day' : `${input.days}-Day`;
    const diff = input.difficulty.charAt(0).toUpperCase() + input.difficulty.slice(1);
    const pace = this.formatPace(input.pace);
    return `${dayStr} ${diff} · ${pace}`;
  }

  private persistPlans(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.savedPlans));
  }

  formatSavedDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  }

  formatPace(pace: Pace): string {
    return pace === 'full-explorer' ? 'Full Explorer' : pace.charAt(0).toUpperCase() + pace.slice(1);
  }

  openOnMap(location: any): void {
    this.router.navigate(['/malta'], {
      queryParams: { title: encodeURIComponent(location.title.replace(' ', '-')) },
    });
  }

  goToMap(): void {
    this.router.navigate(['/malta']);
  }

  get progressWidth(): string {
    const pct = Math.min(this.step, 4) / 4 * 100;
    return `${pct}%`;
  }
}
