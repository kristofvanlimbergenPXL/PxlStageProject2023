import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { patch } from '@ngxs/store/operators';
import { GoogleSheet } from '../models/googleSheet';
import { GetGoogleSheets } from './settings.actions';
import { SettingsService } from './settings.service';
import { GoogleFile } from '../models/googleFile';

export interface SettingsStateModel {
  sheets: GoogleSheet[];
}

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    sheets: [],
  },
})
@Injectable()
export class SettingsState {
  constructor(private settingsService: SettingsService, private store: Store) {}

  @Selector()
  static googleSheets(state: SettingsStateModel): GoogleSheet[] {
    return state?.sheets;
  }

  @Action(GetGoogleSheets)
  fetch(ctx: StateContext<SettingsStateModel>, action: GetGoogleSheets) {
    return this.settingsService.GetGoogleDriveFiles(action.token).subscribe({
      next: (res) => {
        ctx.setState(patch<SettingsStateModel>({ sheets: res.files }));
      },
    });
  }
}
